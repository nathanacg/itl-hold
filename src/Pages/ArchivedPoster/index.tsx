import React, { memo, useEffect, useState } from 'react';
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import { FlatList } from 'react-native';
import { Container, OptionText, StoryOptions } from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { getArquiveStorys } from '../../Service/Profile';
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { TextNotPublicationsArchiveds } from '../ArchivedPublications/style';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDestackStory } from '../../Service/Destack';
import ConfirmModal from '../../Components/ConfirmModal';
import { deleteStorie } from '../../Service/Story';
import { Post } from './postStoryType';
import ArquivedCardDrops from '../../Components/ArchivedCardDrops';

const ArchivedPoster = () => {
  const navigation = useNavigation<StackRoutes>();
  const route = useRoute();
  const params = route.params as { destackId: number, isFromDestack: boolean }
  const [publicationsArchiveds, setpublicationsArchiveds] = useState<Post[]>([]);
  const [confirmDeleteStory, setConfirmDeleteStory] = useState(false)
  const { user } = useUserProfile();
  const [openModal, setOpenModal] = useState(false);
  const [stateToPostHexId, setStateToPostHexId] = useState<string>('')

  const publicationsInRows = [];
  let row = [];
  for (let i = 0; i < publicationsArchiveds.length; i++) {
    row.push(publicationsArchiveds[i]);
    if (row.length === 3 || i === publicationsArchiveds.length - 1) {
      publicationsInRows.push(row);
      row = [];
    }
  }

  const handlePress = (postHexId: string) => {
    setOpenModal(!openModal)
    setStateToPostHexId(postHexId)
  }

  const addDestackStoryFunc = (postHexId: string) => {
    try {
      addDestackStory(params.destackId, postHexId)
      navigation.navigate('MyProfileScreen')
    } catch (e) {
      console.log(e)
    }
  }

  const deleteMyStorie = async (postHexId: string) => {
    await deleteStorie(postHexId)
      .then(async (response) => {
        const res = await getArquiveStorys(user.userId);
        const posts = res.data.response.data.posts;
        const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
        setpublicationsArchiveds(flattenedPosts);
      })
      .catch((e) => {
        console.warn('DeleteStorie - ArchievedPoster')
        console.log(e)
      })
  };

  useEffect(() => {
    const fetchArchiveItems = async () => {
      try {
        const response = await getArquiveStorys(user.userId);
        const posts = response.data.response.data.posts;
        const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
        setpublicationsArchiveds(flattenedPosts);
      } catch (error) {
        console.error('Erro ao buscar itens arquivados', error);
      }
    };
    fetchArchiveItems();
  }, []);

  return (
    <SafeAreaViewContainer>
      <Container
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={250}
        scrollEnabled={true}
      >
        <Header isFromDestack={params.isFromDestack} titleHeader='Cartazes arquivados' />
        <FlatList
          data={publicationsInRows}
          keyExtractor={(item) => item[0].postHexId.toString()}
          numColumns={3}
          ListEmptyComponent={
            <TextNotPublicationsArchiveds>
              Você não tem Cartaz arquivado ainda.
            </TextNotPublicationsArchiveds>
          }
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <>
                {item.map((post) => (
                  <ArquivedCardDrops
                    key={post.postHexId}
                    source={post.principalMedia.url}
                    onPress={() => { navigation.navigate('VizualizatedArquiveStory', { uri: post.principalMedia.url }) }}
                    onLongPress={() => handlePress(post.postHexId)}
                  />
                ))}
              </>
            );
          }}
        />

      </Container>
      <BottomModal
        title=''
        setvisibleBottonModal={() => { setOpenModal(!openModal) }}
        children={
          <>
            <StoryOptions onPress={() => {
              setOpenModal(!openModal)
              setConfirmDeleteStory(true)
            }}>
              <Ionicons
                name="trash-outline"
                color={"#231F20"}
                size={22}
                style={{ marginBottom: 5 }}
              />
              <OptionText>Excluir cartaz</OptionText>
            </StoryOptions>
            <StoryOptions onPress={() => {
              setOpenModal(!openModal)
              addDestackStory(params.destackId, stateToPostHexId)
            }}>
              <MaterialCommunityIcons
                name="card-plus-outline"
                color={"#231F20"}
                size={22}
                style={{ marginBottom: 5, marginLeft: 1 }}
              />
              <OptionText>Adicionar aos destaques</OptionText>
            </StoryOptions>
          </>
        }
        visibleBottonModal={openModal}
      />
      <ConfirmModal
        setvisibleBottonModal={setConfirmDeleteStory}
        isModalVisible={confirmDeleteStory}
        title="Excluir cartaz"
        text="Caso exclua esse cartaz ele não ficará disponível no seu feed"
        onCancel={() => {
          setConfirmDeleteStory(false)
        }}
        onConfirm={() => {
          setConfirmDeleteStory(false)
          deleteMyStorie(stateToPostHexId)

        }} postHexId={""}
      />
    </SafeAreaViewContainer>
  );
}

export default memo(ArchivedPoster);