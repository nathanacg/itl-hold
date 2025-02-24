import React, { memo, useEffect, useState } from 'react';
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import { FlatList } from 'react-native';
import { Container, OptionText, PublicationContainer, StoryOptions } from './style';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { getArquiveDrops, unArquiveDropsItems } from '../../Service/Profile';
import useUserProfile from "../../GlobalState/userProfile.zustand";
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { TextNotPublicationsArchiveds } from '../ArchivedPublications/style';
import ArquivedCardDrops from '../../Components/ArchivedCardDrops';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmModal from '../../Components/ConfirmModal';
import { deleteDrop } from '../../Service/Drop';
import useDropsStore from '../../GlobalState/drops.zustand';
import { Post } from './postType';

interface DropsArchiveds extends Post {
  idreels: number
}

const ArquivedDrops = () => {
  const navigation = useNavigation<StackRoutes>();
  const [publicationsArchiveds, setpublicationsArchiveds] = useState<DropsArchiveds[]>([]);
  const { user } = useUserProfile();
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteStory, setConfirmDeleteStory] = useState(false)
  const [postHexIdReels, setPostHexIdReels] = useState<any>()
  const { post } = useOtherProfilePost()
  const { setInitialDrop } = useDropsStore()

  const publicationsInRows = [];
  let row = [];
  for (let i = 0; i < publicationsArchiveds.length; i++) {
    row.push(publicationsArchiveds[i]);
    if (row.length === 3 || i === publicationsArchiveds.length - 1) {
      publicationsInRows.push(row);
      row = [];
    }
  }

  const passPosHexId = (postHexId: string) => {
    setOpenModal(!openModal)
    setPostHexIdReels(postHexId)
  }

  const arquiveDrops = async (postHexId: any) => {
    let userId = user.userId;
    unArquiveDropsItems(userId, postHexId)
      .then(async response => {
        if (response == 200) {
          setOpenModal(!openModal)
          const res = await getArquiveDrops(user.userId);
          const posts = res.data.response.data.posts;

          const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
          setpublicationsArchiveds(flattenedPosts);
        } else {
          console.log('erro')
        }
      })
      .catch((e) => {
        console.warn('UnArquiveDropsItems - ArchievedDrops')
        console.log(e)
      })
  }

  const handleNavigate = async (
    userId: number,
    id: number,
    postHexId: string,
    userImage: string,
    userName: string,
    poster: string,
    video: string,
    commentsCount: number,
    likesCount: number,
    viewsCount: number,
    Iliked: number,
    usersLiked: string,
    isSaved: boolean
  ) => {
    setInitialDrop({
      userId: userId,
      idreels: id,
      postHexId: postHexId,
      profileImage: userImage,
      username: userName,
      thumbnail: {
        url: poster
      },
      principalMedia: {
        url: video,
      },
      commentsCount: commentsCount,
      likesCount: likesCount,
      viewsCount: viewsCount,
      Iliked: Iliked,
      usersLiked: usersLiked,
      isSaved: isSaved
    })
    navigation.navigate("DropsScreen", {
      postHexId: post.postHexId,
      index: 0,
      archived: true
    })
  }

  useEffect(() => {
    const fetchArchiveItems = async () => {
      try {
        const response = await getArquiveDrops(user.userId);
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

        <Header titleHeader='Drops arquivados' />

        <FlatList
          data={publicationsArchiveds}
          keyExtractor={(item) => item.postHexId.toString()}
          numColumns={3}
          ListEmptyComponent={
            <TextNotPublicationsArchiveds>
              Você não tem Drops arquivado ainda.
            </TextNotPublicationsArchiveds>
          }
          renderItem={({ item }) => {
            return (
              <>
                <ArquivedCardDrops
                  key={item.idreels}
                  onPress={() => {
                    handleNavigate(
                      item.userId, 1,
                      item.postHexId,
                      item.profileImage,
                      item.username,
                      item.thumbnail.url,
                      item.principalMedia.url,
                      0, 0, 0, 1,
                      '',
                      false
                    )
                  }}
                  source={item.principalMedia.url}
                  onLongPress={() => passPosHexId(item.postHexId)}
                />
              </>
            );
          }}
        />


      </Container>
      <BottomModal
        title='Menu'
        setvisibleBottonModal={() => { setOpenModal(!openModal) }}
        children={
          <>
            <StoryOptions onPress={() => { setConfirmDeleteStory(!confirmDeleteStory) }}>
              <Ionicons
                name="trash-outline"
                color={"#231F20"}
                size={22}
                style={{ marginBottom: 5 }}
              />
              <OptionText>Excluir</OptionText>
            </StoryOptions>
            <StoryOptions onPress={() => { arquiveDrops(postHexIdReels) }}>
              <MaterialCommunityIcons
                name="archive-cancel-outline"
                color={"#231F20"}
                size={23}
                style={{ marginBottom: 5 }}
              />
              <OptionText>Desarquivar Drops</OptionText>
            </StoryOptions>
          </>
        }
        visibleBottonModal={openModal}
      />
      <ConfirmModal
        isModalVisible={confirmDeleteStory}
        title="Excluir cartaz"
        text="Caso exclua esse cartaz ele não ficará disponível no seu feed"
        onCancel={() => {
          setConfirmDeleteStory(false)
        }}
        onConfirm={async () => {
          setConfirmDeleteStory(false)
          deleteDrop(postHexIdReels)
          const response = await getArquiveDrops(user.userId);
          const posts = response.data.response.data.posts;
          const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
          setpublicationsArchiveds(flattenedPosts);
        }} postHexId={""}
      />
    </SafeAreaViewContainer>
  );
}

export default memo(ArquivedDrops);