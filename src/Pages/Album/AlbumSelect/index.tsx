import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, StyleSheet, Alert } from 'react-native';

import {
     Container,
     SafeAreaViewContainer
} from '../../../Components/elementsComponents';

import Header from '../../../Components/Header';
import { OptionText, StoryOptions, TabsContainer, Text, TextTab } from './style';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../Routes/StackTypes';
import { useRoute } from '@react-navigation/native';
import BottomModal from '../../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { delSaveDrops, delSavePost, getSavedDrops, getSavedPost } from '../../../Service/Profile';
import { TextNotPublicationsArchiveds } from '../../ArchivedPublications/style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import useUserProfile from '../../../GlobalState/userProfile.zustand';
import { fontStyle, theme } from '../../../Theme/theme';
import ArquivedCardPostSelect from '../../../Components/ArchivedCardPostSelect';
import { ArchivedPublication, Post } from './albumSelectType';
import { saveAlbumContent, saveAlbumContentDrops } from '../../../Service/ItemsOnAlbum';
import ArquivedCardDrops from '../../../Components/ArchivedCardDrops';
import ArquivedCardDropsSelect from '../../../Components/ArchivedCardDropsSelect';

export default function AlbumSelect() {
     const { user } = useUserProfile();
     const route = useRoute();
     const params = route.params as { folderName: string, idFolders: number, photoImage: string, albumId: number, titleAlbum: string, imageAlbum: string }
     const navigation = useNavigation<StackRoutes>();
     const [postOptionsModal, setPostOptionsModal] = useState(false)
     const [publicationsArchiveds, setpublicationsArchiveds] = useState<ArchivedPublication[]>([]);
     const [publicationsDrops, setpublicationsDrops] = useState<Post[][]>([]);
     const [passPostId, setpassPostId] = useState<number | string>();
     const [tabSelected, setTabSelected] = useState<0 | 1>(0)
     const [arrayIds, setArrayIds] = useState<number[]>([])
     const [arrayPostHexIds, setSrrayPostHexIds] = useState<string[]>([])


     const deleteSavePostandDrops = async (postId: any) => {
          const userId = (user.userId);
          const idFolders = params.idFolders;
          if (typeof postId === 'number') {
               try {
                    delSavePost(userId, idFolders, postId)
                    const response = await getSavedPost(idFolders, user.userId);
                    const archivedData = response?.data?.response?.data?.post || [];
                    setpublicationsArchiveds(archivedData);
                    setPostOptionsModal(!postOptionsModal)
               } catch (error) {
                    console.log('Error on pass for delete params', error)
               }
          } else {
               const postHexId = postId;
               try {
                    delSaveDrops(userId, idFolders, postHexId)
                    const res = await getSavedDrops(idFolders, user.userId);
                    const dropsAccount = res?.data?.response?.data?.posts[1] || [];
                    setpublicationsDrops(dropsAccount);
                    setPostOptionsModal(!postOptionsModal)
               } catch (error) {
                    console.log('Error on pass for delete params', error)
               }
          }
     }

     const readIdsArrayFunc = (idPubli: number) => {
          if (!arrayIds.includes(idPubli)) {
               setArrayIds((prevNumbers) => [...prevNumbers, idPubli])
          } else {
               setArrayIds((prevNumbers) => prevNumbers.filter((num) => num !== idPubli))
          }
     }

     const readPostHexIdsArrayFunc = (postHexIdPubli: string) => {
          if (!arrayPostHexIds.includes(postHexIdPubli)) {
               setSrrayPostHexIds((prevNumbers) => [...prevNumbers, postHexIdPubli])
          } else {
               setSrrayPostHexIds((prevNumbers) => prevNumbers.filter((num) => num !== postHexIdPubli))
          }
     }

     const navigationFunc = () => {
          navigation.navigate('Album', {
               titleAlbum: params.titleAlbum,
               albumId: params.albumId,
               imagealbum: params.imageAlbum,
               userId: user.userId
          })
     }

     async function insideItemsOnAlbumPost() {
          for (var i = 0; i <= arrayIds.length; i++) {
               if (arrayIds[i] != undefined) {
                    await saveAlbumContent(user.userId, params.albumId, arrayIds[i])
                         .then(res => {
                              if (res != undefined) {
                                   navigationFunc()
                              } else {
                                   navigationFunc()
                              }
                         })
               } else {
                    return
               }
          }
     }

     async function insideItemsOnAlbumDrops() {
          for (var i = 0; i <= arrayPostHexIds.length; i++) {
               if (arrayPostHexIds[i] != undefined) {
                    await saveAlbumContentDrops(user.userId, params.albumId, arrayPostHexIds[i])
                         .then((res) => {
                              if (res != undefined) {
                                   navigation.navigate('Album', {
                                        titleAlbum: params.titleAlbum,
                                        albumId: params.albumId,
                                        imagealbum: params.imageAlbum,
                                        userId: user.userId
                                   })
                              } else {
                                   navigation.navigate('Album', {
                                        titleAlbum: params.titleAlbum,
                                        albumId: params.albumId,
                                        imagealbum: params.imageAlbum,
                                        userId: user.userId
                                   })
                              }
                         })
               } else {
                    return
               }
          }
     }

     useEffect(() => {
          const fetchArchiveItems = async () => {
               const idFolders = params.idFolders;
               try {
                    const response = await getSavedPost(idFolders, user.userId);
                    const archivedData = response?.data?.response?.data?.post || [];
                    setpublicationsArchiveds(archivedData);

                    const res = await getSavedDrops(idFolders, user.userId);
                    const dropsAccount = res?.data?.response?.data?.posts;
                    console.log('dropsAccount ===>> ', dropsAccount);
                    setpublicationsDrops(dropsAccount);
               } catch (error) {
                    console.error('Erro ao buscar itens arquivados', error);
               }
          };
          fetchArchiveItems();
     }, []);

     useEffect(() => {
          console.log(publicationsDrops, ' =====<<<< ')
     }, [publicationsDrops])

     useEffect(() => {
          const unsubscribe = navigation.addListener('blur', () => {
               //Put your Data loading function here instead of my loadData()
          });

          return unsubscribe;
     }, [navigation]);

     return (
          <SafeAreaViewContainer>
               <Header
                    titleHeader={params.folderName}
                    actionHeaderElement={
                         <></>
                    }
               />
               <Container style={{ backgroundColor: '#fff' }}
               >
                    <>
                         <TabsContainer>
                              <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                              <TouchableOpacity
                                   style={tabSelected === 0 ? styles.SelectedTabButton : styles.TabButton}
                                   onPress={() => { setTabSelected(0), setArrayIds([]), setSrrayPostHexIds([]) }}
                              >
                                   <TextTab style={{ paddingRight: 15, paddingLeft: 42 }} active={tabSelected === 0}>Publicações</TextTab>
                              </TouchableOpacity>
                              <TouchableOpacity
                                   style={tabSelected === 1 ? styles.SelectedTabButton : styles.TabButton}
                                   onPress={() => { setTabSelected(1), setArrayIds([]), setSrrayPostHexIds([]) }}
                              >
                                   <TextTab style={{ paddingRight: 15, paddingLeft: 62 }} active={tabSelected === 1}>Drops</TextTab>
                              </TouchableOpacity>
                              <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                         </TabsContainer>
                    </>
                    {publicationsArchiveds.length > 0 ? (
                         <>
                              {tabSelected === 0 && (
                                   <FlatList
                                        scrollEnabled={false}
                                        data={publicationsArchiveds}
                                        keyExtractor={(item) =>
                                             item.postId ? item.postId.toString() : Math.random().toString()
                                        }
                                        numColumns={3}
                                        style={{ marginTop: 10 }}
                                        renderItem={({ item }) => {
                                             const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                                             if (mediaUrl) {
                                                  return (
                                                       <>
                                                            <ArquivedCardPostSelect
                                                                 source={{ uri: mediaUrl }}
                                                                 onPress={() => { readIdsArrayFunc(item.postId) }}
                                                                 styleType={'single'}
                                                            />
                                                       </>
                                                  );
                                             }
                                             return null;
                                        }}
                                   />
                              )}

                              {tabSelected === 1 && (
                                   <FlatList
                                        data={publicationsDrops}
                                        // keyExtractor={(item) => item}
                                        numColumns={3}
                                        style={{ marginTop: 10 }}
                                        renderItem={({ item }) => {
                                             console.log('item: ', item[0]);
                                             const mediaUrl = item[0]?.principalMedia && item[0]?.principalMedia.url && item[0]?.principalMedia.url;
                                             if (mediaUrl) {
                                                  return (
                                                       <ArquivedCardDropsSelect
                                                            source={mediaUrl}
                                                            onPress={() => { readPostHexIdsArrayFunc(item[0]?.postHexId) }}
                                                            styleType={'single'}
                                                       />
                                                  );
                                             }
                                             return null;
                                        }}
                                   />
                              )}
                         </>
                    ) : (
                         <TextNotPublicationsArchiveds>Você não tem Publicações salvas nesta pasta ainda.</TextNotPublicationsArchiveds>
                    )}
               </Container>
               <BottomModal
                    title=''
                    setvisibleBottonModal={() => setPostOptionsModal(!postOptionsModal)}
                    children={
                         <>
                              <StoryOptions onPress={() => deleteSavePostandDrops(passPostId)}>
                                   <Ionicons
                                        name="trash-outline"
                                        color={"#231F20"}
                                        size={22}
                                   />
                                   <OptionText>{`Excluir publicação da pasta (${params.folderName})`}</OptionText>
                              </StoryOptions>
                              <StoryOptions onPress={() => { }}>
                                   <Fontisto name="paste" size={20} color={'#231F20'} style={{ marginRight: 0, marginLeft: 5 }} />
                                   <OptionText>{'Navegar para a publicação'}</OptionText>
                              </StoryOptions>
                         </>
                    }
                    visibleBottonModal={postOptionsModal}
               />
               {arrayIds.length > 0 ? (
                    <TouchableOpacity style={styles.ButtonSaave} onPress={() => { insideItemsOnAlbumPost() }}>
                         <Text style={styles.textWhite}>Salvar</Text>
                    </TouchableOpacity>
               ) : (
                    <></>
               )}

               {arrayPostHexIds.length > 0 ? (
                    <TouchableOpacity style={styles.ButtonSaave} onPress={() => { insideItemsOnAlbumDrops() }}>
                         <Text style={styles.textWhite}>Salvar</Text>
                    </TouchableOpacity>
               ) : (
                    <></>
               )}
          </SafeAreaViewContainer >
     );
}

const styles = StyleSheet.create({
     SelectedTabButton: {
          flex: 1,
          gap: 2,
          paddingVertical: 3,
          paddingHorizontal: 9,
          borderWidth: 1,
          borderColor: theme.primarycolor,
          borderBottomWidth: 0,
          flexDirection: "row",
          alignItems: "flex-end",
          borderRadius: 6,
          borderBottomRightRadius: 1,
          borderBottomLeftRadius: 1,
          // paddingLeft: 10
     },
     TabButton: {
          flex: 1,
          gap: 2,
          paddingVertical: 3,
          borderColor: theme.primarycolor,
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 6,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
     },
     ButtonSaave: {
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
          backgroundColor: theme.primarycolor,
          bottom: 50,
          width: '80%',
          left: 40,
          height: 55,
          borderRadius: 10
     },
     textWhite: {
          color: 'white',
          fontSize: 20,
          fontFamily: fontStyle.semiBold
     }
})