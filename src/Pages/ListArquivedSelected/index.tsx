import { useNavigation, useRoute } from "@react-navigation/native";
import { StoryAndPost } from "../../Service/StoryDestackType";
import React, { useEffect, useState } from "react";
import { Container, SafeAreaViewContainer } from "../../Components/elementsComponents";
import { ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import { getArquiveStorys, getPostProfile } from "../../Service/Profile";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { LoagingContainer } from "./style";
import { theme } from "../../Theme/theme";
import { Post } from "../ArchivedPoster/postStoryType";
import ArquivedListSelect from "../../Components/ArquivedListSelect";
import {
  delPostForDestack,
  delStoryForDestack,
  getHighlight,
  postHighlight,
  storyHighlight
} from "../../Service/Destack";
import useDestackInfoStore from "../../GlobalState/destacksInfo.zustand";
import { IUserInfoConfig } from "../../Types/feedProps";
import Header from "../../Components/Header";
import { TextHeader } from "../NewDestack/style";
import { StackRoutes } from "../../Routes/StackTypes";
import Info from "../../Components/Info";

export default function ListArquivedSelect() {
  const route = useRoute();
  const params = route.params as { isPost: boolean }
  const [imagesStoryPost, setImagesStoryPost] = useState<StoryAndPost[]>([]);
  const navigation = useNavigation<StackRoutes>()
  const { user } = useUserProfile()
  const [publicationsArchiveds, setpublicationsArchiveds] = useState<Post[]>([]);
  const { destackId } = useDestackInfoStore()
  const [postsSelectedDelete, setPostSelectedDelete] = useState<number[]>([])

  const [loading, setLoading] = useState(false)
  const numberPostIds = imagesStoryPost.map((item: { postId: number }) => item.postId)
  const numberStoryIds = imagesStoryPost.map((item: { storyId: number }) => item.storyId)
  const [count, setCount] = useState<number>(0)
  const [showSmallPopup, setshowSmallPopup] = useState<boolean>(false)

  const getDestacks = () => {
    getHighlight(destackId)
      .then((res) => {
        setImagesStoryPost(res.data)
        return

      })
      .catch((e) => {
        console.warn('ListArquiveSelect -- VizuDEstack')
        console.error('Error: ', e)
      })
  }

  const removeRepostDuplicates = (listRepost: Post[]) => {
    const uniqueRepost = listRepost.filter((obj, index) => {
      if (obj.publicationType == 'repost') {
        return index === listRepost.findIndex(o => {
          if (o.publicationType == 'repost') {
            return obj.repostOwner.repostHexId === o.repostOwner.repostHexId
          }
          return 1 == 1
        });
      }
      return 1 == 1

    });
    return uniqueRepost
  }

  const getItemsArquived = () => {
    setLoading(true)
    if (params.isPost == true) {
      getPostProfile(user.userId)
        .then((response) => {
          const uniqueRepost = removeRepostDuplicates(response?.data.post)
          setpublicationsArchiveds(uniqueRepost)
          const infoOther: IUserInfoConfig = {
            showLikes: response?.data.userPostConfig.show_likes,
            showVisualizations: response?.data.userPostConfig.show_visualizations
          }
        })
        .catch((e) => {
          console.warn('GetPostProfile - PostProfileGroupsMyProfile');
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      getArquiveStorys(user.userId)
        .then((response) => {
          const posts = response.data.response.data.posts;
          const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
          setpublicationsArchiveds(flattenedPosts);
        })
        .catch((error) => {
          console.error('Erro ao buscar itens arquivados', error);
        })
        .finally(() => {
          setLoading(false)
        })
    }
  };

  const [publication, setPublication] = useState<number[]>([])
  const [publication2, setPublication2] = useState<number[]>([])
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => console.log('=> => ', publication, publication2, selectedNumbers), [publication, publication2, selectedNumbers])

  const toggleSelection = (index: number, id: number) => {
    let newNumbers = [...selectedNumbers];
    if (newNumbers.includes(index)) {
      newNumbers = newNumbers.filter((num) => num !== index);
    } else {
      newNumbers.push(index);
    }
    setSelectedNumbers(newNumbers);

    if (!publication2.includes(id)) {
      setPublication2((inserch) => [...inserch, id])
    } else {
      setPublication2((inserch) => inserch.filter((num) => num != id))
    }
  };

  const getNumberForItem = (index: number) => {
    const selectedIndex = selectedNumbers.indexOf(index);
    return selectedIndex !== -1 ? selectedIndex + 1 : 0;
  };

  const findIdByPostId = (id: number) => {
    if (params.isPost) {
      const foundItem = imagesStoryPost.find((item) => item.postId === id);
      return foundItem ? foundItem.id : -1;
    } else {
      const foundItem = imagesStoryPost.find((item) => item.storyId === id);
      return foundItem ? foundItem.id : -1;
    }
  };

  const pushAndPullIds = () => {
    if (publication2.length < 1) {
      setshowSmallPopup(true)
      return
    }

    for (let i = 0; i < publication.length; i++) {
      for (let i = 0; i < publication2.length; i++) {
        const isNotIn = !publication.includes(publication2[i]);
        if (isNotIn) {
          postHighlight(publication2[i], destackId)
            .then((res) => {
              console.log('deletando', publication2[i])
            })
            .catch((e) => {
              console.warn('ListArquiveSelect -- erro ao inserir postId');
              console.error('Error ', e);
            });
        }
      }

      for (let i = 0; i < publication.length; i++) {
        const isNotIn = !publication2.includes(publication[i]);
        if (isNotIn) {
          const idForDeletion = findIdByPostId(publication[i]);
          delPostForDestack(idForDeletion)
            .then((res) => {
              console.log('deletando', publication[i])
            })
            .catch((e) => {
              console.error('Error on delete postHighlightId', idForDeletion, e);
            });
        }
      }
    }
    navigation.pop()
  }

  const pushAndPullIdsStory = () => {
    if (publication2.length < 1) {
      setshowSmallPopup(true)
      return
    }

    for (let i = 0; i < publication.length; i++) {
      console.log(i)
      for (let i = 0; i < publication2.length; i++) {
        const isNotIn = !publication.includes(publication2[i]);
        if (isNotIn) {
          storyHighlight(publication2[i], destackId)
            .then((res) => {
              console.log('deletando', publication2[i])
            })
            .catch((e) => {
              console.warn('ListArquiveSelect -- erro ao inserir postId');
              console.error('Error ', e);
            });
        }
      }

      for (let i = 0; i < publication.length; i++) {
        const isNotIn = !publication2.includes(publication[i]);
        if (isNotIn) {
          const idForDeletion = findIdByPostId(publication[i]);
          delStoryForDestack(idForDeletion)
            .then((res) => {
            })
            .catch((e) => {
              console.error('Error on delete postHighlightId', idForDeletion, e);
            });
        }
      }
    }
    navigation.pop()
  }

  useEffect(() => {
    getDestacks()
    getItemsArquived();
  }, [])

  const [estadoTeste, setestadoTeste] = useState<boolean>(true)

  return (
    <>
      <SafeAreaViewContainer>
        <Container>
          <Header
            titleHeader='Selecionar Publicação'
            actionHeaderElement={
              <TouchableOpacity onPress={() => { params.isPost ? pushAndPullIds() : pushAndPullIdsStory() }}>
                <TextHeader>Avançar</TextHeader>
              </TouchableOpacity>
            }
          />
          {loading == false &&
            <FlatList
              data={publicationsArchiveds}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(item) => item.postHexId}
              renderItem={({ item, index }) => {
                const secondPostId = item.originalPost && item.originalPost?.post?.postId
                const arrayIncludes = numberPostIds.includes(secondPostId != undefined ? secondPostId : item.postId)

                const arrayIncludesStory = numberStoryIds.includes(item.storyId)
                const imageMediaSource = item.medias && item.medias[0].mediaUrl
                const originalPost = item.originalPost && item.originalPost?.medias?.[0].mediaUrl
                const secondPostColor = item.originalPost && item.originalPost?.post?.postColor
                const secondPostLegend = item.originalPost && item.originalPost?.post?.postLegend

                if (params.isPost) {
                  if (arrayIncludes) {
                    if (estadoTeste) {
                      setPublication((inserch) => [...inserch, secondPostId ? secondPostId : item.postId])
                      setPublication2((inserch) => [...inserch, secondPostId ? secondPostId : item.postId])

                      setSelectedNumbers((prevSelectedNumbers) => [...prevSelectedNumbers, index])
                      setestadoTeste(false)
                    }
                  }
                } else {
                  if (arrayIncludesStory) {
                    if (estadoTeste) {
                      setPublication((inserch) => [...inserch, item.storyId])
                      setPublication2((inserch) => [...inserch, item.storyId])

                      setSelectedNumbers((prevSelectedNumbers) => [...prevSelectedNumbers, index])
                      setestadoTeste(false)
                    }
                  }
                }

                return (
                  <>
                    {params.isPost &&
                      <>
                        <ArquivedListSelect
                          source={{
                            uri: originalPost ? originalPost : imageMediaSource
                          }}
                          onPress={() =>
                            toggleSelection(index, secondPostId ? secondPostId : item.postId)
                          }
                          marcados={getNumberForItem(index)}
                          isPost={true}
                          valueId={arrayIncludes}
                          colorPost={secondPostColor ? secondPostColor : item.postColor}
                          postLegend={secondPostLegend ? secondPostLegend : item.postLegend}
                          index={index}
                        />
                      </>
                    }

                    {!params.isPost &&
                      <>
                        <ArquivedListSelect
                          source={{
                            uri: item.principalMedia.url
                          }}
                          onPress={() =>
                            toggleSelection(index, item.storyId)
                          }
                          marcados={getNumberForItem(index)}
                          isPost={false}
                          valueId={arrayIncludesStory}
                          colorPost={item.postColor}
                          postLegend={item.postLegend}
                          index={index}
                        />
                      </>
                    }
                  </>
                )
              }}
            />
          }
        </Container>
      </SafeAreaViewContainer>

      {loading == true &&
        <LoagingContainer>
          <ActivityIndicator size="large" color={theme.primarycolor} />
        </LoagingContainer>
      }

      <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={'Não é possível retirar todos os destaques'} />
    </>
  )
}