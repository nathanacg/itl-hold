import { useEffect, useState } from 'react';
import mime from 'mime';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { StackRoutes } from '../../Routes/StackTypes';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  ColorsBg,
  PrincipalMedia,
  ResponsePost,
  StoryFiles,
} from './interface';

import { fontSize, theme } from '../../Theme/theme';
import { DocumentPickerResponse } from 'react-native-document-picker';

import {
  ButtonText,
  HeaderButton,
  PostContainer,
  PostPreviewContainer,
  PreviewContent,
  RowDirection,
  TextRegularMedium,
  TextRegularSmall,
  UserInfo,
  UserName,
  AvaliationConteiner,
  AvaliationText,
  ModalImage,
  ModalSave,
  PostLegendText,
  MarkedUserNameContainer,
  MarkedUserName,
  MarkedUserNameContainer2,
  MarkedUserName2,
} from './style';

import { DocContainer } from '../Publication/style';
import {
  ProfilePhoto,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import { medias } from '../../Types/feedProps';

import { emojiFace } from '../../Utils/emojiFaceAvaliation';

import { PostColors } from './components';
import PostImage from '../../Components/PostImage';
import BottomModal from '../../Components/BottomModal';
import ToggleSwitch from '../../Components/ToggleSwitch';
import ProfileHeader from '../../Components/ProfileHeader';
import SelectedMovie from '../../Components/SelectedMovie';
import PostImagePreview from '../../Components/PostPreview';
import PostFooterPrev from '../../Components/PostFooterPrev';
import AudioMessageCenter from './components/AudioMessageCenter';
import AudioMessageReceived from './components/AudioMessageReceived';

import DocumentCard from '../../Components/DocumentCard';
import SelectedLink from '../../Components/SelectedLink';

import { newStory } from '../../Service/Story';
import {
  createMarcation,
  newPost,
  newRoomPost,
  uploadMedias,
} from '../../Service/Publications';

import useRoom from '../../GlobalState/room.zustand';
import useFeedData from '../../GlobalState/feed.zustand';
import useStories from '../../GlobalState/stories.zustand';
import useCreatePost from '../../GlobalState/createPost.zustand';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useCaptureImageStore from '../../GlobalState/zustand.store';

import { useNotification } from '../../context/notification';
import { MarkedProps } from '../../Types/postProps';
import React from 'react';
import { RoomLocationEnum } from '../../enum/index';

export default function PostPreview() {
  const navigation = useNavigation<StackRoutes>();
  const route = useRoute();

  const { room } = useRoom();
  const { user } = useUserProfile();
  const { populateFriendsStories } = useStories();
  const { setCaptureImage } = useCaptureImageStore();
  const { sendNotificationMarcation } = useNotification();
  const { incrementFeed, initializeFeed } = useFeedData();
  const {
    files,
    post,
    imagesUpload,
    setFiles,
    setImagesUpload,
    setPost,
    movieSelected,
  } = useCreatePost();
  // console.log('-----------------imagesUpload on PostPreview', imagesUpload);
  // console.log('-----------------post on savePreview', post);
  // console.log('-----------------files on savePreview', files['_parts']);
  const { audioPath, link, attachmentFile, from } = route.params as {
    from: boolean;
    audioPath: string;
    link: string;
    attachmentFile: DocumentPickerResponse[];
    metrics: string;
  };

  const [color, setColor] = useState<ColorsBg>();

  const [principalMidia, setPrincipalMidia] = useState<{
    fileName: string;
    uri: string;
    top: number;
    left: number;
    scale: number;
  }>({ fileName: '', uri: '', left: 0, scale: 1, top: 0 });
  const [publishInCartaz, setPublishInCartaz] = useState<boolean>(false);
  const [publishInCartazModal, setPublishInCartazModal] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { markedPerson, setMarkedPerson } = useCreatePost();
  const [markedUsers, setmarkedUsers] = useState<MarkedProps[]>([]);
  const [openMarkers, setOpenMarkers] = useState<boolean>(false);

  useEffect(() => {
    if (color) {
      let tempPost = {
        ...post,
        postColor: `${color.color}&${color.text ? '#000000' : '#ffffff'}`,
      };
      setPost(tempPost);
    }
  }, [color]);

  useEffect(() => {
    if (!color && imagesUpload.length < 1) {
      let tempPost = { ...post, postColor: '#ffffff&#000000' };
      setPost(tempPost);
    }
  }, []);

  const setNewPostUser = (
    postHexId: string,
    postId: number,
    medias: medias[],
  ) => {
    incrementFeed({
      medias: medias,
      accountConfig: {
        showLikes: true,
        showVisualizations: true,
      },
      postCategorie: post.postCategorie,
      postDate: `${new Date()}`,
      profileImage: user.profileImage,
      followingUser: 0,
      postEnable: 1,
      link: post.link,
      isSaved: post.isSaved,
      isClosed: post.isClosed ? 1 : 0,
      postEvaluation: post.postEvaluation,
      postSpoiler: post.postSpoiler ? 1 : 0,
      postHexId: postHexId,
      postId: postId,
      postColor: post.postColor,
      postLegend: post.postLegend,
      userId: user.userId,
      userNickname: user.userNickname,
      publicationType: 'post',
      tmdbMovieId: post.tmdbMovieId,
    });
  };

  useEffect(() => {
    const transferImagesOnLoad = () => {
      let medias: MarkedProps[] = [];
      var x = 15;
      var y = 15;
      imagesUpload.forEach(image => {
        const filterPerson = markedPerson.filter(
          person => person.marker == image.key,
        );
        if (filterPerson) {
          let users: {
            username: string;
            profileImage: string;
            position: { x: number; y: number };
          }[] = [];
          filterPerson.map(persons => {
            users.push({
              username: persons.userNickname,
              profileImage: persons.profileImage,
              position: { x, y },
            });
            y += 40;
          });
          medias.push({
            markedUsers: users,
            mediaUrl: image.url,
            type: image.type,
          });
        }
      });

      setmarkedUsers(medias);
    };
    transferImagesOnLoad();
  }, [imagesUpload]);

  const handlePosting = () => {
    if (publishInCartaz) {
      setPublishInCartazModal(!publishInCartazModal);
    } else {
      setIsLoading(true);
      savePreview();
    }
  };

  const savePreview = async () => {
    const isRoomPost = Boolean(post.idRoom);
    let response: any = null;
    try {
      if (isRoomPost) {
        response = await newRoomPost(post);
      } else {
        response = await newPost(post);
      }

      if (response.data.postHexId) {
        let x = 15;
        let y = 15;
        if (!!color && markedPerson.length > 0) {
          markedPerson.map(async markerUser => {
            y += 40;
            await createMarcation({
              userId: user.userId,
              marcatedUserId: markerUser.id,
              mediaName: undefined,
              postHexId: response.data.postHexId,
              scale: 1,
              x,
              y,
            });
            sendNotificationMarcation(user.userId, response.data.postHexId);
          });
        } else if (files) {
          await saveFiles(response.data.postHexId, response.data.postId);
        }

        if (!isRoomPost) {
          setNewPostUser(response.data.postHexId, response.data.postId, []);
        }

        setCaptureImage([]);
        setFiles({});
        setImagesUpload([]);
        setPost({
          postCategorie: '',
          postEvaluation: '',
          link: '',
          postLegend: '',
          postSpoiler: false,
          isSaved: false,
          isClosed: false,
          surveyOpinion: [
            {
              letter: '',
              text: '',
            },
          ],
          postColor: '',
          tmdbMovieId: null,
        });
        setMarkedPerson([]);

        if (post.idRoom) {
          navigation.navigate('RoomCommunity', {
            from: RoomLocationEnum.FROM_POST,
            Room: room,
            UserType: 'admin',
            RoomId: post.idRoom,
          });
        } else {
          navigation.navigate('FeedScreen');
        }
      }
      initializeFeed(true);
    } catch (error) {
      console.log('Erro ao publicar.', error);
    }
  };

  const saveStoryTo = async () => {
    try {
      const { data } = await newPost(post);

      const response: ResponsePost = data;

      if (response.postHexId) {
        if (files) {
          setPublishInCartazModal(!publishInCartazModal);
          const dataForm = new FormData();
          dataForm.append('file', {
            uri: imagesUpload[0]?.url,
            type: mime.getType(imagesUpload[0]?.url),
            name:
              imagesUpload[0]?.fileName +
              `.${
                mime.getType(imagesUpload[0]?.url)?.split('/').pop()
                  ? mime.getType(principalMidia.uri)?.split('/').pop()
                  : 'jpg'
              }`,
          });

          const principalMedia: StoryFiles = {
            fileName: imagesUpload[0]?.fileName,
            usage_media: 'principal_media',
            position: { x: 0, y: 0 },
            scale: 1,
            postHexId: response.postHexId,
          };

          const myData: PrincipalMedia = {
            principalMedia,
            hasSpoiler: post.postSpoiler ? true : false,
            isClosed: post.isClosed ? true : false,
          };

          dataForm.append('storie_data', JSON.stringify(myData));

          populateFriendsStories();

          await newStory(dataForm)
            .then(res => {})
            .catch(err => {
              console.log('error ao postar no stories', err);
            });
          await saveFiles(response.postHexId, response.postId);
          navigation.reset({
            index: 1,
            routes: [{ name: 'FeedScreen' }],
          });
        } else if (color) {
          setPublishInCartazModal(!publishInCartazModal);
          const dataForm = new FormData();

          const principalMedia: StoryFiles = {
            fileName: imagesUpload[0]?.fileName,
            usage_media: 'principal_media',
            position: { x: 0, y: 0 },
            scale: 1,
          };

          const myData: PrincipalMedia = {
            principalMedia,
            hasSpoiler: post.postSpoiler ? true : false,
            isClosed: post.isClosed ? true : false,
          };

          dataForm.append('storie_data', JSON.stringify(myData));

          newStory(data)
            .then(res => {})
            .catch(err => {
              console.log('error ao postar no stories', err);
            });
          navigation.reset({
            index: 1,
            routes: [{ name: 'FeedScreen' }],
          });
        } else {
          setNewPostUser(response.postHexId, response.postId, []);
          setCaptureImage([]);
          setFiles({});
          setImagesUpload([]);
          setPost({
            postCategorie: '',
            postEvaluation: '',
            link: '',
            postLegend: '',
            postSpoiler: false,
            isSaved: false,
            isClosed: false,
            surveyOpinion: [
              {
                letter: '',
                text: '',
              },
            ],
            tmdbMovieId: null,
            postColor: '',
          });
          navigation.reset({
            index: 1,
            routes: [{ name: 'FeedScreen' }],
          });
        }
      }
    } catch (error) {
      console.log('Error saving preview:', error);
    }
  };

  const saveFiles = async (postHexId: string, postId: number) => {
    if (postHexId) {
      var marked_users: {
        fileName: string;
        users: {
          username: string;
          position: { x: number; y: number };
        }[];
      }[] = [];

      var x = 15;
      var y = 15;

      imagesUpload.forEach(item => {
        var users: {
          username: string;
          userId: number;
          position: { x: number; y: number };
        }[] = [];
        markedPerson.forEach(async marked => {
          if (item.key == marked.marker) {
            users.push({
              username: marked.userNickname,
              userId: Number(marked.userId),
              position: { x, y },
            });
          }
          y += 40;
        });
        marked_users.push({
          fileName: item.fileName,
          users,
        });
      });

      files.append(
        'postDetails',
        JSON.stringify({
          postHexId,
          marked_users,
        }),
      );

      try {
        if (audioPath) {
          files.append('file', {
            uri: audioPath,
            type: 'audio/x-m4a',
            name: 'audio.m4a',
          });
        }
        const responseUpload = await uploadMedias(files);
        setNewPostUser(postHexId, postId, responseUpload?.data);
        setCaptureImage([]);
        setFiles({});
        setImagesUpload([]);
        setPost({
          postCategorie: '',
          postEvaluation: '',
          link: '',
          postLegend: '',
          postSpoiler: false,
          isSaved: false,
          isClosed: false,
          surveyOpinion: [
            {
              letter: '',
              text: '',
            },
          ],
          tmdbMovieId: null,
          postColor: '',
        });
        setMarkedPerson([]);
      } catch (error) {
        console.log('Error: Upload Files');
      }
    }
  };

  return (
    <>
      <SafeAreaViewContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostPreviewContainer>
            <ProfileHeader
              userImage={user.profileImage}
              title="Pré-visualizar"
              actionHeaderElement1={
                <>
                  {isLoading ? (
                    <ActivityIndicator
                      size={'small'}
                      color={theme.primarycolor}
                    />
                  ) : (
                    <HeaderButton onPress={handlePosting}>
                      <ButtonText>Publicar</ButtonText>
                    </HeaderButton>
                  )}
                </>
              }
            />
            <PreviewContent>
              <TextRegularMedium>Revise sua publicação</TextRegularMedium>
              <RowDirection>
                <TextRegularSmall>
                  Publicar também em seu Cartaz
                </TextRegularSmall>
                <ToggleSwitch
                  value={publishInCartaz}
                  setValue={() => setPublishInCartaz(!publishInCartaz)}
                />
              </RowDirection>
              <PostContainer>
                <UserInfo>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                    <ProfilePhoto source={{ uri: user?.profileImage }} />
                    <UserName>{user?.userNickname}</UserName>
                    {post.postSpoiler && (
                      <Image
                        style={{ width: 21, height: 21 }}
                        source={require('../../Assets/Icons/spoilerIcon.png')}
                      />
                    )}
                  </View>
                </UserInfo>

                {attachmentFile?.[0] && (
                  <View style={{ width: '112.5%', marginLeft: '0.5%' }}>
                    <DocContainer>
                      <DocumentCard
                        size="95%"
                        absolute={false}
                        scale={1}
                        docInfos={{
                          name: attachmentFile?.[0].name,
                          url: attachmentFile?.[0].uri,
                          size: attachmentFile?.[0].size,
                        }}
                        position={{ x: 0, y: 0 }}
                        storyDocument={{
                          url: '',
                          name: '',
                        }}
                      />
                    </DocContainer>
                  </View>
                )}

                <TextRegularMedium
                  style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}>
                  {imagesUpload.length > 0 && post.postLegend}
                </TextRegularMedium>
                {audioPath && post.postLegend.length > 0 && (
                  <View style={{ marginTop: 20 }}>
                    <AudioMessageReceived
                      uri={audioPath}
                      configAudMetrics={[
                        -33.92938995361328, -35.6361083984375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -39.822540283203125, -38.041709899902344,
                        -41.189544677734375, -35.6361083984375,
                        -22.325828552246094, -38.041709899902344,
                        -41.189544677734375, -35.6361083984375,
                        -38.041709899902344, -41.189544677734375,
                        -35.6361083984375, -22.325828552246094,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -39.822540283203125, -42.133541107177734,
                        -42.133541107177734, -32.26824188232422,
                        -32.26824188232422, -13.833025932312012,
                        -13.833025932312012, -24.762142181396484,
                        -38.041709899902344, -41.189544677734375,
                        -35.6361083984375, -22.325828552246094,
                        -24.762142181396484, -23.383811950683594,
                        -23.383811950683594, -21.76665687561035,
                        -21.76665687561035, -16.243961334228516,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -38.041709899902344, -41.189544677734375,
                        -38.041709899902344, -41.189544677734375,
                        -38.041709899902344, -41.189544677734375,
                        -35.6361083984375, -22.325828552246094,
                        -20.04671287536621, -26.937410354614258,
                        -37.697021484375, -39.822540283203125,
                        -33.92938995361328, -38.041709899902344,
                        -41.189544677734375, -35.6361083984375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -39.822540283203125, -20.133541107177734,
                        -42.133541107177734, -32.26824188232422,
                        -32.26824188232422, -13.833025932312012,
                        -13.833025932312012, -24.762142181396484,
                        -24.762142181396484, -23.383811950683594,
                        -23.383811950683594, -21.76665687561035,
                        -21.76665687561035, -16.243961334228516,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -38.041709899902344, -41.189544677734375,
                        -38.041709899902344, -41.189544677734375,
                        -35.6361083984375, -22.325828552246094,
                        -20.04671287536621, -26.937410354614258,
                        -37.697021484375, -39.822540283203125,
                        -33.92938995361328, -38.041709899902344,
                        -41.189544677734375, -35.6361083984375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -39.822540283203125, -42.133541107177734,
                        -42.133541107177734, -32.26824188232422,
                        -32.26824188232422, -13.833025932312012,
                        -13.833025932312012, -24.762142181396484,
                        -24.762142181396484, -23.383811950683594,
                        -23.383811950683594, -21.76665687561035,
                        -21.76665687561035, -16.243961334228516,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -20.697021484375,
                        -22.325828552246094, -20.04671287536621,
                        -26.937410354614258, -37.697021484375,
                        -38.041709899902344, -41.189544677734375,
                        -38.041709899902344, -10.189544677734375,
                      ]}
                      preview
                    />
                  </View>
                )}

                {post.postEvaluation && (
                  <AvaliationConteiner>
                    <AvaliationText>
                      Avaliou como
                      <Text
                        style={
                          post.postEvaluation == 'Excelente'
                            ? { color: '#44AB1B' }
                            : post.postEvaluation == 'Bom'
                            ? { color: '#B6CE3A' }
                            : post.postEvaluation == 'Nada mal'
                            ? { color: '#F9C900' }
                            : post.postEvaluation == 'Ruim'
                            ? { color: '#F28A19' }
                            : post.postEvaluation == 'Muito ruim' && {
                                color: '#EA3106',
                              }
                        }>
                        {` ${post.postEvaluation}`}
                      </Text>
                    </AvaliationText>
                    {post.postEvaluation && (
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={
                          emojiFace.find(
                            item => item.name === post.postEvaluation,
                          )?.selectedImage
                        }
                      />
                    )}
                  </AvaliationConteiner>
                )}
                {!post.postLegend && !audioPath && !attachmentFile && (
                  <View style={{ marginTop: -23 }} />
                )}
                {imagesUpload.length > 0 &&
                markedPerson &&
                markedPerson.length > 0 ? (
                  <PostImage handleLike={() => {}} medias={markedUsers} />
                ) : markedPerson &&
                  markedPerson.length == 0 &&
                  imagesUpload.length > 0 ? (
                  <PostImagePreview medias={markedUsers} />
                ) : (
                  <>
                    {color ? (
                      <>
                        <View
                          style={{
                            backgroundColor: color.color,
                            marginTop: -30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300,
                            zIndex: 2,
                            borderRadius: 5,
                          }}>
                          <Image
                            style={{
                              position: 'absolute',
                              height: 300,
                              width: '100%',
                              resizeMode: 'cover',
                            }}
                            source={
                              color?.id == 2
                                ? require('../../Assets/Image/background_app2.png')
                                : require('../../Assets/Image/background_app.png')
                            }
                          />

                          <View
                            style={{
                              flexDirection: 'row',
                              position: 'absolute',
                              top: 10,
                              left: 10,
                            }}>
                            <View>
                              {markedPerson.length > 0 && (
                                <View style={{ width: 300 }}>
                                  <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setOpenMarkers(!openMarkers);
                                      }}>
                                      <Image
                                        style={{
                                          width: 20,
                                          height: 20,
                                          resizeMode: 'cover',
                                        }}
                                        source={require('../../Assets/Icons/user.png')}
                                      />
                                    </TouchableOpacity>
                                    {openMarkers &&
                                      markedPerson.map(({ userNickname }) => {
                                        return (
                                          <View key={userNickname}>
                                            <MarkedUserNameContainer2>
                                              <MarkedUserName2>
                                                {userNickname}
                                              </MarkedUserName2>
                                            </MarkedUserNameContainer2>
                                          </View>
                                        );
                                      })}
                                  </ScrollView>
                                </View>
                              )}
                            </View>
                          </View>
                          {post.postLegend.length > 0 ? (
                            <PostLegendText
                              style={{
                                color: color.text ? '#000' : '#fff',
                              }}>
                              {post.postLegend}
                            </PostLegendText>
                          ) : (
                            <AudioMessageCenter
                              uri={audioPath}
                              configAudMetrics={[
                                -33.92938995361328, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -42.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -20.04671287536621, -26.937410354614258,
                                -37.697021484375, -39.822540283203125,
                                -33.92938995361328, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -20.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -20.04671287536621, -26.937410354614258,
                                -37.697021484375, -39.822540283203125,
                                -33.92938995361328, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -42.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -20.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -10.189544677734375,
                              ]}
                              preview
                            />
                          )}

                          <PostColors
                            handleColor={setColor}
                            colorSelect={color.id.toString()}
                          />
                        </View>
                      </>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#ffffff',
                          flex: 1,
                          marginTop: -24,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 300,
                          borderRadius: 5,
                        }}>
                        <Image
                          style={{
                            position: 'absolute',
                            height: 300,
                            width: '100%',
                            resizeMode: 'cover',
                          }}
                          source={
                            color?.id == 2 || color?.id == 7
                              ? require('../../Assets/Image/background_app2.png')
                              : require('../../Assets/Image/background_app.png')
                          }
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            top: 10,
                            left: 0,
                          }}>
                          {markedPerson.length > 0 && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setOpenMarkers(!openMarkers);
                                }}>
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,

                                    marginTop: -10,
                                    marginLeft: 10,
                                    resizeMode: 'cover',
                                  }}
                                  source={require('../../Assets/Icons/user.png')}
                                />
                              </TouchableOpacity>
                              {openMarkers &&
                                markedPerson.map(({ userNickname }) => {
                                  return (
                                    <MarkedUserNameContainer key={userNickname}>
                                      <MarkedUserName>
                                        {userNickname}
                                      </MarkedUserName>
                                    </MarkedUserNameContainer>
                                  );
                                })}
                            </View>
                          )}
                        </View>

                        {post.postLegend.length > 0 ? (
                          <PostLegendText
                            style={{
                              color: '#000000',
                            }}>
                            {post.postLegend}
                          </PostLegendText>
                        ) : (
                          <View style={{ marginTop: 30, marginLeft: 30 }}>
                            <AudioMessageCenter
                              uri={audioPath}
                              configAudMetrics={[
                                -33.92938995361328, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -42.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -20.04671287536621, -26.937410354614258,
                                -37.697021484375, -39.822540283203125,
                                -33.92938995361328, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -20.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -41.189544677734375,
                                -35.6361083984375, -22.325828552246094,
                                -20.04671287536621, -26.937410354614258,
                                -37.697021484375, -39.822540283203125,
                                -33.92938995361328, -38.041709899902344,
                                -41.189544677734375, -35.6361083984375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -39.822540283203125, -42.133541107177734,
                                -42.133541107177734, -32.26824188232422,
                                -32.26824188232422, -13.833025932312012,
                                -13.833025932312012, -24.762142181396484,
                                -24.762142181396484, -23.383811950683594,
                                -23.383811950683594, -21.76665687561035,
                                -21.76665687561035, -16.243961334228516,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -20.697021484375,
                                -22.325828552246094, -20.04671287536621,
                                -26.937410354614258, -37.697021484375,
                                -38.041709899902344, -41.189544677734375,
                                -38.041709899902344, -10.189544677734375,
                              ]}
                              preview
                            />
                          </View>
                        )}

                        <PostColors handleColor={setColor} />
                      </View>
                    )}
                  </>
                )}
                {/*  <RowDirection style={{ marginTop: 10, marginBottom: 10 }} >
                                    <TextRegularSmall style={{
                                        fontWeight: 600,
                                        fontSize: fontSize.normal,
                                    }}>
                                        Cor do texto: {colorText ? `Preto` : `Branco`}
                                    </TextRegularSmall>
                                    <ToggleSwitch
                                        value={colorText}
                                        setValue={() => setColorText(!colorText,)}
                                    />
                                </RowDirection> */}

                {movieSelected && (
                  <View style={{ marginLeft: 10 }}>
                    <SelectedMovie
                      preview
                      name={movieSelected?.name}
                      description={movieSelected?.description}
                      ImageUrl={movieSelected?.image}
                    />
                  </View>
                )}

                {!movieSelected && link && <SelectedLink description={link} />}

                <PostFooterPrev />
              </PostContainer>
            </PreviewContent>
          </PostPreviewContainer>
        </ScrollView>
      </SafeAreaViewContainer>
      <BottomModal
        title=""
        setvisibleBottonModal={setPublishInCartazModal}
        visibleBottonModal={publishInCartazModal}
        children={
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                height: 400,
                width: 250,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <>
                {post.postSpoiler && (
                  <Image
                    style={{
                      width: 21,
                      height: 21,
                      position: 'absolute',
                      zIndex: 10,
                      top: 10,
                      left: 10,
                    }}
                    source={require('../../Assets/Icons/spoilerIcon.png')}
                  />
                )}
                {!!color && !imagesUpload[0]?.url ? (
                  <View
                    style={{
                      backgroundColor: color ? color.color : '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                    }}>
                    <PostLegendText
                      style={{
                        color: '#000',
                      }}>
                      {post.postLegend}
                    </PostLegendText>
                  </View>
                ) : (
                  <ImageBackground
                    resizeMode="cover"
                    source={
                      color?.id == 2
                        ? require('../../Assets/Image/background_app2.png')
                        : require('../../Assets/Image/background_app.png')
                    }
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 400,
                    }}
                  />
                )}
              </>
              {imagesUpload[0]?.url && (
                <ModalImage
                  style={{ height: 400, width: 250, borderRadius: 10 }}
                  source={{ uri: imagesUpload[0]?.url }}
                />
              )}

              {markedPerson && markedPerson.length > 1 && (
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 6,
                    borderRadius: 4,
                    position: 'absolute',
                    left: 10,
                    bottom: 10,
                  }}>
                  {markedUsers.map((user, index) => (
                    <Text
                      key={index}
                      style={{
                        color: theme.inputTextColor,
                        fontSize: fontSize.thin,
                        fontWeight: '400',
                      }}>
                      @{user.markedUsers[0].username}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            <ModalSave
              onPress={() => {
                saveStoryTo();
              }}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                Salvar
              </Text>
            </ModalSave>
          </View>
        }
      />
    </>
  );
}
