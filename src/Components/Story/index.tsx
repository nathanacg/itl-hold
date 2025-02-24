/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Text,
} from 'react-native';

import { theme } from '../../Theme/theme';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  CloseButton,
  StoryOptionsPoints,
  CloseIcon,
  StoryMediaContainer,
  StoryImage,
  TextUserName,
  Time,
} from './style';

import { StoryModalProps } from './typeStory';
import { handleTimeStories } from '../../Utils/handleTime';

import InfoCenter from '../InfoCenter';
import Likecomponent from '../LikeComponent';
import UserImageRounded from '../UserImageProfile';
import StoryOptionsComponent from '../StoryOptionsComponent';
import LikesView from './components/LikesView';
import SwipeUpMyStory from './components/SwipeUpMyStory';
import StoryModalContainer from './components/StorieModal';
import { BarListStories } from './components/BarListStorys';
import { ableToReact, sendMessageStory } from '../../Service/Story';
import { deleteLike, newLike } from '../../Service/Like';
import {
  getUsersViewsStory,
  getViewsStory,
  postViewStory,
} from '../../Service/Visualizations';

import { Bold, MarkText, MaskButtonText } from '../Post/style';
import { PostLegendText } from '../../Pages/PostPreview/style';
import { SendButtonStory } from '../AddComment/style';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

import useCreatePost from '../../GlobalState/createPost.zustand';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import { useNotification } from '../../context/notification';
import { useSocket } from '../../context/socket';
import useStories from '../../GlobalState/stories.zustand';

export default function StoryModal({ isModalVisible }: StoryModalProps) {
  const { user } = useUserProfile();

  const navigation = useNavigation<StackRoutes>();

  const [textInputValue, setTextInputValue] = useState('');
  const [popoutText, setPopoutText] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [isMenuModalVisible, setMenuModalVisible] = useState(false);

  const { sendStory } = useSocket();
  const { sendNotificationLikeCartaz } = useNotification();
  const {
    storyDuration,
    viewStories,
    allStoriesProfiles,
    setCurrentStoryIndex,
    currentStoryIndex,
    setStoryDuration,
    populateAllStories,
    currentStory,
    closeModal,
  } = useStories();
  // console.log('allStoriesProfiles', allStoriesProfiles.length);
  // console.log('currentStory', currentStory.length, currentStory);
  // console.log('currentStoryIndex', currentStoryIndex);
  const [visibleBottonModal, setVisibleBottonModal] = useState(false);
  const isMp4 =
    currentStory[currentStoryIndex]?.principalMedia.url?.endsWith('.mp4');
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [hideSpoiler, setHideSpoiler] = useState<boolean>(false);
  const [ableToAnswer, setAbleToAnswer] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [views, setViews] = useState<number>(0);
  const [usersViews, setUsersViews] = useState<[]>([]);
  const [usersImagesViews, setImagesUsersViews] = useState<[]>([]);
  const [showSmallPopup, setshowSmallPopup] = useState(false);
  // const { setNickName } = useCreatePost();

  const playNextStory = async () => {
    const storyIndex = allStoriesProfiles.findIndex(
      item => item.userId == currentStory[0].userId,
    );
    // console.log('currentStoryIndex + 1', currentStoryIndex + 1, currentStory.length);
    // console.log(storyIndex, allStoriesProfiles.length - 1)
    if (currentStoryIndex + 1 < currentStory.length) {
      // setDurationStory(0);
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (storyIndex < allStoriesProfiles.length - 1) {
      await viewStories(allStoriesProfiles[storyIndex + 1].userId);
      // setDurationStory(0);
    } else {
      // setDurationStory(0);
      closeModal();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        const touchX = evt.nativeEvent.locationX;
        const screenWidth = Dimensions.get('window').width;

        if (touchX < screenWidth / 2) {
          // Handle left side tap
          if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
            // setStoryDuration(0);
          }
        } else {
          // Handle right side tap
          playNextStory();
        }
      },
    }),
  ).current;

  const handlePopout = (text: string) => {
    setPopoutText(text);
    setshowSmallPopup(true);
  };

  const sendMessage = async () => {
    setLoading(true);
    if (textInputValue.length > 0) {
      await sendMessageStory(
        currentStory[currentStoryIndex]?.postHexId,
        textInputValue,
      )
        .then(res => {
          sendStory(
            currentStory[currentStoryIndex]?.userId,
            res.data.postHexId,
            textInputValue,
            isMp4,
          );
        })
        .catch(e => {
          console.warn('SendMessageStory - Story');
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
          setTextInputValue('');
        });
    }
  };

  async function handleReactions() {
    try {
      const res = await ableToReact(currentStory[currentStoryIndex]?.userId);
      setAbleToAnswer(res?.data.showInput);
    } catch (error) {
      console.log('deu ruim ao saber se ele pode responder o story.', error);
    }
  }

  async function updateLikes(postHexId: string) {
    if (!postHexId) {
      return;
    }

    await newLike({ postHexId: currentStory[currentStoryIndex]?.postHexId })
      .then(res => {
        setLikes(res.data);
      })
      .catch(e => {
        console.warn('NewLike - Story');
        console.log(e);
      });
  }

  async function updateDeslikes(postHexId: string) {
    if (!postHexId) {
      return;
    }
    await deleteLike({ postHexId })
      .then(res => {
        setLikes(res.data);
      })
      .catch(e => {
        console.warn('DeleteLike - Story');
        console.log(e);
      });
  }

  async function handleLike(userId: number, postHexId: string) {
    sendNotificationLikeCartaz(userId, postHexId);
    if (liked == false) {
      await updateLikes(postHexId);
      setLiked(true);
    } else {
      await updateDeslikes(postHexId);
      setLiked(false);
    }
  }

  async function storyUsersViews() {
    await getUsersViewsStory(currentStory[currentStoryIndex]?.postHexId)
      .then(res => {
        setUsersViews(res.data.response.data.visualizatorsProfile);
      })
      .catch(e => {
        console.warn('StoryUsersViews - Story');
        console.log(e);
      });
  }

  async function storyImageUsersViews() {
    await getUsersViewsStory(currentStory[currentStoryIndex]?.postHexId)
      .then(res => {
        setImagesUsersViews(
          res.data.response.data.visualizatorsProfile.map(
            (item: { profileImage: string }) => item.profileImage,
          ),
        );
      })
      .catch(e => {
        console.warn('GetUsersViewsStory - Story');
        console.log(e);
      });
  }

  async function addViews() {
    await postViewStory(currentStory[currentStoryIndex]?.postHexId, user.userId)
      .then(res => {})
      .catch(e => {
        console.warn('Erro ao adicionar visualização - Story');
        console.log(e);
      });
  }

  async function storyViews() {
    await getViewsStory(currentStory[currentStoryIndex]?.postHexId)
      .then(res => {
        setViews(res.data.response);
      })
      .catch(e => {
        console.warn('Erro ao buscar visualizações - Story');
        console.log(e);
      });
  }

  useEffect(() => {
    // console.log('currentStory', currentStory)
    // console.log('currentStoryIndex', currentStoryIndex)
    Image.getSize(
      currentStory[currentStoryIndex].principalMedia.url,
      (width, height) => {
        setImageSize({ width, height });
      },
      error => {
        console.log('erro ao obter tamanho da imagem.', error);
      },
    );

    if (currentStory[currentStoryIndex]?.userId !== user.userId) {
      addViews();
      handleReactions();
    } else {
      storyViews();
      storyUsersViews();
      storyImageUsersViews();
    }
  }, [currentStory, currentStoryIndex, user]);

  function formatTimePost() {
    const time = currentStory[currentStoryIndex]?.createdAt;
    const dataOriginal = new Date(time);
    const nova = dataOriginal.setHours(dataOriginal.getHours());
    return nova;
  }

  const navigateToProfileMenu = () => {
    closeModal();
    // setNickName(currentStory[currentStoryIndex].username);
    const userNickname = currentStory[currentStoryIndex].username;
    if (user.userNickname == userNickname) {
      navigation.navigate('MyProfileScreen', {
        nickName: userNickname,
      });
    } else {
      navigation.navigate('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: { nickName: userNickname },
      });
    }
  };
  // console.log('isMp4', isMp4);
  // console.log('currentStoryIndex', currentStory[currentStoryIndex]);
  return (
    <View style={{ backgroundColor: '#000' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <StatusBar animated barStyle={'light-content'} />
        <View
          {...panResponder.panHandlers}
          style={{ marginTop: 60, marginBottom: 15 }}>
          {currentStory[currentStoryIndex]?.hasSpoiler == 1 && (
            <>
              {!hideSpoiler && (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 100,
                    opacity: 0.92,
                    backgroundColor: '#000000',
                    width: '100%',
                    height: '90%',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 100,
                      flexDirection: 'column',
                      gap: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../Assets/Icons/spoilerIcon.png')}
                    />
                    <MarkText>
                      Publicação ocultada por {'\n'}conter <Bold>spoiler.</Bold>
                    </MarkText>
                    <TouchableOpacity
                      onPress={() => setHideSpoiler(!hideSpoiler)}>
                      <MaskButtonText>Ver spoiler</MaskButtonText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}

          <BarListStories
            videoDuration={storyDuration}
            playNextStory={playNextStory}
            barCount={currentStory.length}
            currentIndex={currentStoryIndex}
          />

          <InfoCenter
            setVissible={setshowSmallPopup}
            isVisible={showSmallPopup}
            text={popoutText}
          />

          <StoryModalContainer visible={isModalVisible}>
            <View
              style={{
                left: '5%',
                top: '2.5%',
                width: '50%',
                position: 'absolute',
                zIndex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <UserImageRounded
                url={currentStory[currentStoryIndex]?.profileImage}
                size={35}
              />
              <TextUserName onTouchStart={navigateToProfileMenu}>
                {currentStory[currentStoryIndex]?.username}
              </TextUserName>
              <Time>{handleTimeStories(formatTimePost())}</Time>
            </View>
            <StoryOptionsPoints
              onPress={() => setMenuModalVisible(!isMenuModalVisible)}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: 'white',
                  right: 5,
                }}
                source={require('../../Assets/Icons/menu-horizontal.png')}
              />
            </StoryOptionsPoints>

            <CloseButton onPress={closeModal}>
              <CloseIcon>
                <AntDesign name="close" size={30} />
              </CloseIcon>
            </CloseButton>

            {currentStory[currentStoryIndex]?.text.text && (
              <View
                style={{
                  zIndex: 20,
                  backgroundColor:
                    currentStory[currentStoryIndex]?.text.background_color,
                  position: 'absolute',
                  top:
                    currentStory[currentStoryIndex]?.text.position.y + height / 3,
                  left:
                    currentStory[currentStoryIndex]?.text.position.x + width / 1.7,
                  borderRadius: 4,
                }}>
                <Text
                  style={{
                    zIndex: 10,
                    color: currentStory[currentStoryIndex]?.text.text_color,
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: currentStory[currentStoryIndex]?.text.font,
                    padding: 10,
                  }}>
                  {currentStory[currentStoryIndex]?.text.text}
                </Text>
              </View>
            )}

            <StoryMediaContainer>
              <TouchableOpacity
                // onPress={() =>
                //   // setCurrentStoryIndex(prevIndex =>
                //   //   Math.max(0, prevIndex - 1),
                //   // )
                // }
                style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  width: '50%',
                  position: 'absolute',
                  zIndex: 3,
                }}
              />

              {isMp4 ? (
                <Video
                  onError={() =>
                    handlePopout('Ocorreu um erro ao carregar o vídeo.')
                  }
                  onLoad={data => {
                    if (data && data.duration) {
                      const roundedDuration =
                        Math.round(data.duration * 1000) / 100; // Convert to milliseconds
                      setStoryDuration(roundedDuration);
                      console.log('duracao do video', roundedDuration);
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '97.4%',
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                  }}
                  source={{
                    uri: currentStory[currentStoryIndex]?.principalMedia.url,
                  }}
                />
              ) : currentStory[currentStoryIndex]?.principalMedia.url ? (
                <StoryImage
                  source={{
                    uri: currentStory[
                      currentStoryIndex
                    ]?.principalMedia.url.replace('undefined', 'jpg'),
                  }}
                  onLoad={() => setStoryDuration(60)} // Set to 60 (6 seconds) for images
                  resizeMode={
                    imageSize.height > imageSize.width ? 'cover' : 'contain'
                  }
                />
              ) : (
                currentStory[currentStoryIndex]?.postColor && (
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        currentStory[currentStoryIndex].postColor?.split('&')[0],
                    }}>
                    <PostLegendText
                      style={{
                        color:
                          currentStory[currentStoryIndex].postColor?.split('&')[1],
                        fontWeight: 600,
                      }}>
                      {currentStory[currentStoryIndex].postLegend}
                    </PostLegendText>
                  </View>
                )
              )}

              <TouchableOpacity
                onPress={playNextStory}
                style={{
                  backgroundColor: 'transparent',
                  height: '100%',
                  width: '50%',
                  position: 'absolute',
                  right: 0,
                  zIndex: 3,
                }}
              />
            </StoryMediaContainer>

            {currentStory[currentStoryIndex]?.userId === user.userId && (
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 30,
                  }}>
                  <SwipeUpMyStory
                    profileImages={usersImagesViews}
                    handleLiskeModal={() => setVisibleBottonModal(true)}
                  />
                </View>
                <LikesView
                  key={currentStory[currentStoryIndex]?.postHexId}
                  usersViewed={usersViews}
                  viewsCount={views}
                  visibleBottonModal={visibleBottonModal}
                  setvisibleBottonModal={setVisibleBottonModal}
                  storyImage={
                    currentStory[currentStoryIndex]?.principalMedia.url || ''
                  }
                />
              </>
            )}

            {ableToAnswer &&
              currentStory[currentStoryIndex]?.userId !== user.userId && (
                <>
                  <View
                    style={
                      Platform.OS === 'ios'
                        ? {
                            backgroundColor: 'transparent',
                            borderColor: '#fff',
                            borderWidth: 1,
                            width: '75%',
                            marginBottom: 25,
                            marginLeft: 25,
                            borderRadius: 30,
                            flexDirection: 'row',
                            display: 'flex',
                            paddingRight: 7,
                            paddingTop: 7,
                            paddingBottom: 7,
                            height: 40,
                          }
                        : {
                            backgroundColor: 'transparent',
                            borderColor: '#fff',
                            borderWidth: 1,
                            width: 295,
                            marginBottom: 25,
                            marginLeft: 25,
                            borderRadius: 30,
                            flexDirection: 'row',
                            display: 'flex',
                            paddingRight: 7,
                            paddingTop: 7,
                            paddingBottom: 7,
                            height: 55,
                          }
                    }>
                    <TextInput
                      value={textInputValue}
                      placeholder="Enviar mensagem..."
                      style={
                        Platform.OS === 'ios'
                          ? {
                              flex: 1,
                              maxWidth: '100%',
                              color: theme.secondaryColor,
                              paddingLeft: 20,
                            }
                          : {
                              paddingLeft: 15,
                              flex: 1,
                              color: theme.secondaryColor,
                            }
                      }
                      onChangeText={text => setTextInputValue(text)}
                    />
                    {textInputValue.length > 0 && (
                      <SendButtonStory onPress={sendMessage}>
                        {loading ? (
                          <ActivityIndicator
                            size="small"
                            color={theme.textDark}
                          />
                        ) : (
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                            }}
                            source={require('../../Assets/Icons/send.png')}
                          />
                        )}
                      </SendButtonStory>
                    )}
                  </View>
                  <Likecomponent
                    index={currentStoryIndex}
                    onPress={() => {
                      handleLike(
                        user.userId,
                        currentStory[currentStoryIndex]?.postHexId,
                      );
                    }}
                    key={currentStoryIndex}
                  />
                </>
              )}
          </StoryModalContainer>

          <StoryOptionsComponent
            postHexId={currentStory[currentStoryIndex]?.postHexId}
            visibleBottonModal={isMenuModalVisible}
            setvisibleBottonModal={() =>
              setMenuModalVisible(!isMenuModalVisible)
            }
            postUserId={currentStory[currentStoryIndex]?.userId}
            onClose={() => setMenuModalVisible(!isMenuModalVisible)}
            spoilerOnDenuncia
            admin={
              currentStory[currentStoryIndex]?.userId == user.userId ? true : false
            }
            onDeletePost={() => {
              closeModal();
              populateAllStories(user.userId);
            }}
            //postUrl={`https://currentStory.intellectus.app.br//${currentStory[currentStoryIndex]?.postHexId}/${currentStory[currentStoryIndex]?.userId}/${currentStoryIndex}`}
            followingUser={true}
            followEnable={true}
            postId={currentStory[currentStoryIndex]?.userId}
            index={currentStoryIndex}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
