import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { Container, TextNotPublicationsArchiveds } from './style'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import Header from '../../Components/Header'

import { getArquivePost } from '../../Service/Profile';
import useUserProfile from "../../GlobalState/userProfile.zustand";
import ArquivedCardPost from '../../Components/ArchivedCardPost';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';

import { ArchivedPublication } from './archivedPublication';

export default function ArchivedPublications() {
  const navigation = useNavigation<StackRoutes>();
  const [publicationsArchiveds, setpublicationsArchiveds] = useState<ArchivedPublication[]>([]); // Uso do tipo aqui
  const { user: userProfile } = useUserProfile();
  const { setPost } = useOtherProfilePost()
  const isArquivaded = (true);
  const postCopyVariable = 1;

  const publicationsInRows = [];
  let row = [];
  for (let i = 0; i < publicationsArchiveds.length; i++) {
    row.push(publicationsArchiveds[i]);
    if (row.length === 3 || i === publicationsArchiveds.length - 1) {
      publicationsInRows.push(row);
      row = [];
    }
  }



  const fetchArchiveItems = async () => {
    try {
      const response = await getArquivePost(userProfile.userId)
      setpublicationsArchiveds(response.data.response.data.post.reverse())
    } catch (error) {
      console.error('Erro ao buscar itens arquivados', error)
    }
  }

  useEffect(() => {
    fetchArchiveItems()
  }, [publicationsArchiveds])

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
        <Header titleHeader='Posts arquivados' />
        <FlatList
          data={publicationsArchiveds}
          keyExtractor={(item) => item.postId.toString()}
          numColumns={3}
          ListEmptyComponent={
            <TextNotPublicationsArchiveds>Nenhuma publicação</TextNotPublicationsArchiveds>
          }
          renderItem={({ item }) => {
            const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
            const postId = item.postId;
            const postHexId = item.postHexId;
            return (
              <ArquivedCardPost
                isPost={true}
                source={{ uri: mediaUrl }}
                onPress={() => {
                  setPost(item);
                  navigation.push("PostScreen", { postHexId: postHexId, isArquivaded, postCopyVariable, postId });
                }}
                styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
              />
            );
          }}
        />

      </Container>
    </SafeAreaViewContainer>
  );
}
