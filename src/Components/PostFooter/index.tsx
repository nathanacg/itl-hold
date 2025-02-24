import React, { SetStateAction, useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import mime from 'mime';

import { CloseScationContainer, Container, SocialActions } from './style';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { theme } from '../../Theme/theme';
import SelectUsesrModal from '../SelectUsersModal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useCreateComment from '../../GlobalState/handleComments.zustand';
import { getStoreObject } from '../../Lib/asyncStorage';
import { useSocket } from '../../context/socket';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useRepostPubli from '../../GlobalState/repostPost.zustand';
import {
  getUserFolders,
  savePostItem,
  unsavePostItem,
} from '../../Service/Profile';
import BottomModal from '../BottomModal';
import PostersBottom from '../PostersBottom';
import {
  CardImageCreateAlbum,
  TextRegularSmall,
} from '../../Pages/PostPreview/style';
import useCreatePost from '../../GlobalState/createPost.zustand';

interface PostFooterProps {
  isRepost?: boolean;
  repostEnabled: boolean;
  postHexId: string;
  liked?: boolean;
  showLikes?: boolean;
  setLiked: React.Dispatch<SetStateAction<boolean>>;
  saved?: boolean;
  updateLikes: () => void;
  userId: number;
  likeList: {
    likeId: number;
    userId: number;
    postHexId: string;
    profileImage: string;
    userName: string;
    userNickname: string;
  }[];
  openComment: () => void;
  handleLike: () => void;
  repost: string;
  postId: number;
  isSaved: boolean;
  mediaImage?: any;
  audioPath?: string;
  userImage?: any;
  userNickname: string;
  time?: any;
  legend?: any;
  tmdbMovieId?: string | number | null;
}

export interface Folder {
  idFolders: number;
  userId: number;
  foldersName: string;
  story_saved: any;
  post_saved: any;
  reels_saved: any;
  cover_url: {
    mediaUrl: string;
  };
}

interface Data {
  folders: Folder[];
  message: string;
}
export default function PostFooter(props: PostFooterProps) {
  const { user } = useUserProfile();

  const navigation = useNavigation<StackRoutes>();

  const { setPost, setFiles, setPostId } = useCreatePost();
  const { setCommentType } = useCreateComment();
  const { setRepost } = useRepostPubli();
  const { sendPost } = useSocket();

  const [openModal, setopenModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const [saved, setSaved] = useState(props.isSaved);
  const [messageText, setMessageText] = useState<string>('');
  const [legendButtons, setLegendButtons] = useState<
    { letter: string; text: string }[]
  >([]);
  const [movieSelected, setMovieSelected] = useState<{
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number;
  }>();

  const [selectedUsers, setSelectedUsers] = useState<
    { name: string; address: string; userId?: number }[]
  >([]);
  const [requestCount, setRequestCount] = useState(0);
  const [idFolder, setIdFolder] = useState<number>(0);

  useEffect(() => {
    getStoreObject('@intellectus:userProfile')
      .then(res => {
        if (props.likeList.find(item => item.userId == res.userId)) {
          props.setLiked(true);
        } else {
          props.setLiked(false);
        }
      })
      .catch(e => {
        console.warn('GetStoreObject - PostFooter');
        console.log(e);
      });
  }, [props.likeList]);

  useEffect(() => {
    navigation.addListener('focus', () => {});
    return () => {
      navigation.removeListener('focus', () => {});
    };
  }, [navigation]);

  useEffect(() => {
    const fetchUsersFolder = async () => {
      try {
        const response = await getUserFolders(user.userId);
        setData(response.data);
        setRequestCount(requestCount + 1);
      } catch (error) {
        console.error('Error fetching user folders: ', error);
      }
    };
    fetchUsersFolder();
  }, [openModal]);

  const handledSavedItem = async () => {
    if (saved) {
      await unsavePostItem(user.userId, idFolder, props.postId);
      setSaved(!saved);
    } else {
      setopenModal(!openModal);
    }
  };

  const saveItems = async (idFolders: number) => {
    setopenModal(!openModal);

    if (!saved) {
      try {
        await savePostItem(user.userId, idFolders, props.postId);
        setIdFolder(idFolders);
        setSaved(!saved);
      } catch (error) {
        console.error(error);
      }
    } else {
      await unsavePostItem(user.userId, idFolders, props.postId);
    }
  };

  const transformLiked = () => {
    props.setLiked(!liked);
  };

  const respostFunction = () => {
    const data = new FormData();

    data.append('file', {
      uri: props.mediaImage,
      type: mime.getType(props.mediaImage?.uri || ''),
      name: props.mediaImage?.filename + '.jpg',
    });

    if (props.mediaImage) {
      data.append('file', {
        uri: props.mediaImage?.uri,
        type: props.mediaImage?.type,
        name: props.mediaImage?.name,
        size: props.mediaImage?.size,
      });
    }
    setFiles(data);
    setPost({
      postLegend: props.legend,
      postSpoiler: false,
      isClosed: false,
      postEvaluation: '',
      postCategorie: '',
      surveyOpinion: legendButtons,
      tmdbMovieId: movieSelected ? movieSelected.tmdbMovieId : null,
    });

    setRepost({
      postHexId: props.postHexId,
      userId: props.userId,
      mediaImage: props.mediaImage,
      userImage: props.userImage,
      userNickname: props.userNickname,
      time: props.time,
      legend: props.legend,
      audioPath: props.audioPath,
      postId: props.postId,
    });
    navigation.push('Repost', {
      postHexId: props.postHexId,
      userId: props.userId,
      mediaImage: props.mediaImage,
      userImage: props.userImage,
      userNickname: props.userNickname,
      time: props.time,
      legend: props.legend,
      audioPath: props.audioPath,
      postId: props.postId,
    });
  };
  function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname.length > maxLength) {
      return nickname.slice(0, maxLength) + '...';
    }
    return nickname;
  }
  return (
    <>
      <Container>
        <SocialActions>
          <TouchableOpacity
            onPress={() => {
              props.handleLike();
              transformLiked();
            }}>
            <Ionicons
              name={props.liked ? 'ios-heart' : 'ios-heart-outline'}
              size={28}
              color={theme.primarycolor}
              style={{ marginRight: -2 }}
              adjustsFontSizeToFit
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCommentType('comentary');
              props.openComment();
            }}>
            <Image
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
              source={require('../../Assets/Icons/comment.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShareModal(true)}>
            <Image
              style={{ width: 24, height: 25, resizeMode: 'contain' }}
              source={require('../../Assets/Icons/share.png')}
            />
          </TouchableOpacity>
        </SocialActions>
        <CloseScationContainer>
          {props.repostEnabled && (
            <TouchableOpacity onPress={() => respostFunction()}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 32,
                  tintColor: theme.primarycolor,
                }}
                source={require('../../Assets/Icons/repost-4.png')}
              />
            </TouchableOpacity>
          )}
          {!props.isRepost && (
            <TouchableOpacity onPress={handledSavedItem}>
              <Image
                style={{ width: 20, height: 25, resizeMode: 'contain' }}
                source={
                  saved
                    ? require('../../Assets/Icons/saveButtonFill.png')
                    : require('../../Assets/Icons/saveButton.png')
                }
              />
            </TouchableOpacity>
          )}
        </CloseScationContainer>
      </Container>
      <SelectUsesrModal
        visibleBottonModal={shareModal}
        setvisibleBottonModal={setShareModal}
        markedUsers={selectedUsers}
        setMarkedUsers={setSelectedUsers}
        messageOption
        setMessageText={setMessageText}
        onSend={text =>
          sendPost(
            selectedUsers.map(item => item.userId || 0),
            props.postHexId,
            text || null,
          )
        }
        mediaImage={props.mediaImage}
      />
      <BottomModal
        children={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 130,
            }}>
            <ScrollView>
              <FlatList
                horizontal
                showsVerticalScrollIndicator={false}
                key={data?.folders.length}
                data={data?.folders || []}
                keyExtractor={(item, index) => `${item.idFolders}${index}`}
                contentContainerStyle={{ marginTop: 16, gap: 3 }}
                ListHeaderComponent={
                  <CardImageCreateAlbum
                    onPress={() => {
                      setopenModal(!openModal);
                      setPostId(props.postId);
                      navigation.push('AlbumCreateSaveditems');
                    }}>
                    <Ionicons
                      name="add-circle"
                      size={32}
                      style={{ marginLeft: 5 }}
                      color={'#0245F4'}
                    />
                  </CardImageCreateAlbum>
                }
                // ListEmptyComponent={
                //     <>
                //         <TextRegularSmall>Nehuma pasta encontrada.</TextRegularSmall>
                //     </>
                // }
                renderItem={({ item }) => {
                  return (
                    <>
                      <PostersBottom
                        key={item.foldersName}
                        imageUrl={item.cover_url.mediaUrl}
                        title={limitNicknameLength(item.foldersName, 10)}
                        navigation={() => {
                          {
                            saveItems(item.idFolders);
                          }
                        }}
                      />
                    </>
                  );
                }}
              />
            </ScrollView>
          </View>
        }
        title="Salvar na pasta"
        visibleBottonModal={openModal}
        setvisibleBottonModal={() => {
          setopenModal(!openModal);
        }}
      />
    </>
  );
}
