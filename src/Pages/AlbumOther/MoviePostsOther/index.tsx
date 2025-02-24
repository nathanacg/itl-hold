import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ArchivedCardPost from '../../../Components/ArchivedCardPost';
import { Post } from '../AlbumSelect/albumSelectType';
import { fontStyle, theme } from '../../../Theme/theme';
import ArquivedCardPostSelect from '../../../Components/ArchivedCardPostSelect';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../Routes/StackTypes';
import useOtherProfilePost from '../../../GlobalState/otherProfilePosts.zustand';
import useUserProfile from '../../../GlobalState/userProfile.zustand';


interface MoviePosts {
     publicationsAlbums: Post[];
     ifAll?: boolean
}

const Movies = (props: MoviePosts) => {
     const [filmePosts, setFilmePosts] = useState<Post[]>([]);
     const [allPosts, setAllPosts] = useState<Post[]>([]);
     const navigation = useNavigation<StackRoutes>();
     const { setPost } = useOtherProfilePost()
     const {user} = useUserProfile()

     useEffect(() => {
          setAllPosts(props.publicationsAlbums);
          const filteredPosts = props.publicationsAlbums.filter(
               (post) => post.postCategorie === 'Filme'
          );
          setFilmePosts(filteredPosts);
     }, [props.publicationsAlbums]);

     return (
          <>
               {props.ifAll ? (
                    <FlatList
                         data={allPosts}
                         keyExtractor={(item) => item.postHexId}
                         numColumns={3}
                         ListEmptyComponent={
                              <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, height: 60 }}>
                                   <Text style={{ color: theme.lightGray }}>
                                        Não há post no Álbum
                                   </Text>
                              </View>
                         }
                         style={{ marginTop: 10 }}
                         renderItem={({ item }) => {
                              const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                              return (
                                   <>
                                             <ArchivedCardPost
                                                  source={{ uri: mediaUrl }}
                                                  onPress={() => {
                                                       setPost(item);
                                                       navigation.navigate('PostScreen', { postHexId: item.postHexId, isArquivaded: false, postCopyVariable: 0, postId: user.userId });
                                                  }}
                                                  styleType={'single'}
                                             />
                                        
                                   </>
                              );
                         }}
                    />
               ) : (
                    <FlatList
                         data={filmePosts}
                         keyExtractor={(item) => item.postHexId}
                         numColumns={3}
                         ListEmptyComponent={
                              <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, height: 60 }}>
                                   <Text style={{ color: theme.lightGray }}>
                                        Você não possui post com Filmes
                                   </Text>
                              </View>
                         }
                         style={{ marginTop: 10 }}
                         renderItem={({ item }) => {
                              const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                              return (
                                   <>
                                             <ArchivedCardPost
                                                  source={{ uri: mediaUrl }}
                                                  onPress={() => {
                                                       setPost(item);
                                                       navigation.navigate('PostScreen', { postHexId: item.postHexId, isArquivaded: false, postCopyVariable: 0, postId: user.userId });
                                                  }}
                                                  styleType={'single'}
                                             />
                                   </>
                              );
                         }}
                    />
               )}
          </>
     );
};

export default Movies;
