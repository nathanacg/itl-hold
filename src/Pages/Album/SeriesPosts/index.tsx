import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import ArchivedCardPost from '../../../Components/ArchivedCardPost';
import { Post } from '../AlbumSelect/albumSelectType';
import { fontStyle, theme } from '../../../Theme/theme';
import ArquivedCardPostSelect from '../../../Components/ArchivedCardPostSelect';
import { useNavigation } from '@react-navigation/native';
import useOtherProfilePost from '../../../GlobalState/otherProfilePosts.zustand';
import useUserProfile from '../../../GlobalState/userProfile.zustand';
import { StackRoutes } from '../../../Routes/StackTypes';

interface SeriesPost {
     publicationsAlbums: Post[];
     idSelect: (idArray: number) => void
     setSelection: (selection: boolean) => void
     selection: boolean
}

const Series = (props: SeriesPost) => {
     const [filmePosts, setFilmePosts] = useState<Post[]>([]);
     const [longPressPostDelete, setLongPressPostDelete] = useState<boolean>(false);
     const navigation = useNavigation<StackRoutes>();
     const { setPost } = useOtherProfilePost()
     const { user } = useUserProfile()

     useEffect(() => {
          const filteredPosts = props.publicationsAlbums.filter(
               (post) => post.postCategorie === 'Série'
          );
          setFilmePosts(filteredPosts);
     }, [props.publicationsAlbums]);

     useEffect(() => {
          setLongPressPostDelete(props.selection)
     }, [props.selection])

     return (
          <>
               <FlatList
                    data={filmePosts}
                    keyExtractor={(item) => item.postHexId}
                    numColumns={3}
                    style={{ marginTop: 10 }}
                    ListEmptyComponent={
                         <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, height: 60 }}>
                              <Text style={{ color: theme.lightGray }}>
                                   Não há posts com Séries
                              </Text>
                         </View>
                    }
                    renderItem={({ item }) => {
                         const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                         return (
                              <>
                                   {longPressPostDelete == false ? (
                                        <ArchivedCardPost
                                             source={{ uri: mediaUrl }}
                                             onLongPress={() => {
                                                  setLongPressPostDelete(true),
                                                       props.setSelection(true)
                                             }}
                                             onPress={() => {
                                                  setPost(item);
                                                  navigation.navigate('PostScreen', { postHexId: item.postHexId, isArquivaded: false, postCopyVariable: 0, postId: user.userId });
                                             }}
                                             styleType={'single'}
                                        />
                                   ) : (
                                        <ArquivedCardPostSelect
                                             source={{ uri: mediaUrl }}
                                             onLongPress={() => { setLongPressPostDelete(false), props.setSelection(true) }}
                                             onPress={() => { props.idSelect(item.postId) }}
                                             styleType={'single'}
                                        />

                                   )}
                              </>
                         );
                    }}
               />
          </>
     );
};

export default Series;
