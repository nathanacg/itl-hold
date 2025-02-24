import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  CardImage,
  CardPost,
  CloseView,
  ContainerGeral,
  ImagePostColor,
  IndicatorBG,
  IndicatorRow,
  LeftTouch,
  NavigationButtons,
  OptionText,
  OptionsView,
  ProfileView,
  RightTouch,
  StoryOptions,
  TextUserName,
  TimelineContainer,
} from './style';
import UserImageRounded from '../../Components/UserImageProfile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deletehighlight, getHighlight } from '../../Service/Destack';
import { StackRoutes } from '../../Routes/StackTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StoryAndPost } from '../../Service/StoryDestackType';
import useDestackInfoStore from '../../GlobalState/destacksInfo.zustand';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import Video from 'react-native-video';
import ConfirmModal from '../../Components/ConfirmModal';
import mime from 'mime';
import { fontStyle } from '../../Theme/theme';
import { DocumentPickerResponse } from 'react-native-document-picker';

export default function StoryDestackComponent() {
  const navigation = useNavigation<StackRoutes>();
  const route = useRoute();
  const params = route.params as { idProfile: number; profileImage: string };
  const [result, setResult] = useState<DocumentPickerResponse[]>([]);
  const {
    destackId,
    destackName,
    destackImage,
    setDestackImage,
    setDestackName,
    setDestackId,
  } = useDestackInfoStore();
  const progress = useSharedValue(0);
  const grayProgress = useSharedValue(1);

  const [imagesStoryPost, setImagesStoryPost] = useState<StoryAndPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [bottomModalDelete, setBottomModalDelete] = useState<boolean>(false);
  const { user: userProfile } = useUserProfile();
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [renderize, setRenderize] = useState<boolean>(false);
  const isMp4 = imagesStoryPost
    ? imagesStoryPost[currentIndex]?.principalMedia?.url.endsWith('.mp4')
    : false;
  const someTypes = imagesStoryPost
    .map((item: { publicationType: string }) => item.publicationType)
    .every((type: string) => type === 'post' || type == 'repost');
  const tipoPostRepost =
    imagesStoryPost && imagesStoryPost[currentIndex]
      ? imagesStoryPost[currentIndex].publicationType
      : null;
  const postColor = imagesStoryPost[currentIndex]?.postColor
    ? imagesStoryPost[currentIndex]?.postColor
    : '';
  const postLegend = imagesStoryPost[currentIndex]?.postLegend
    ? imagesStoryPost[currentIndex]?.postLegend
    : '';
  const [currentValue, setCurrentValue] = useState<boolean>(false);

  const [renderizeAnimation, setRenderizeAnimation] = useState<boolean>(true);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const array: any[] = [];

  const storyViewDuration = () => {
    return 6 * 1500;
  };

  const avancarFoto = () => {
    if (imagesStoryPost) {
      const nextIndex = (currentIndex + 1) % imagesStoryPost.length;
      if (imagesStoryPost.length == 1) {
        navigation.push('MyProfileScreen');
        setRenderizeAnimation(false);
      } else {
        setCurrentIndex(nextIndex);
      }
      grayProgress.value = 1;
      progress.value = nextIndex / imagesStoryPost.length;
    }
  };

  const retrocederFoto = () => {
    if (imagesStoryPost) {
      const previousIndex =
        (currentIndex - 1 + imagesStoryPost.length) % imagesStoryPost.length;
      if (currentIndex == 0) {
        setCurrentValue(false);
        setCurrentIndex(currentIndex);
        return;
      }
      setCurrentValue(false);
      setCurrentIndex(previousIndex);
      progress.value = previousIndex / imagesStoryPost.length;
    }
  };

  const avancarAutomaticamente = (value?: boolean) => {
    if (value) {
      return;
    }
    const nextIndex = (currentIndex + 1) % array.length;
    setCurrentIndex(nextIndex);
    progress.value = nextIndex / array.length;
  };

  useAnimatedReaction(
    () => progress.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue && currentValue === 1) {
        if (renderizeAnimation) {
          runOnJS(avancarFoto)();
        }
      }
    },
  );

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const deleteDedstack = () => {
    setMenuModalVisible(!isMenuModalVisible);
    const highlightId = destackId;
    deletehighlight(highlightId)
      .then(res => {
        setMenuModalVisible(false);
        setBottomModalDelete(false);
        navigation.push('MyProfileScreen');
      })
      .catch(e => {
        console.warn('Delete Destack - StoryDestackComponent');
        console.error('Error to inserch the destackId of zustand', e);
      });
  };

  const getDestacks = () => {
    getHighlight(destackId)
      .then(res => {
        setImagesStoryPost(res.data);
        return;
      })
      .catch(e => {
        console.warn('StoryDestackComponent -- VizuDEstack');
        console.error('Error: ', e);
      });
  };

  useEffect(() => {
    if (renderize == false) {
      getDestacks();
      setRenderize(true);
    }
    progress.value = 0;
    progress.value = withTiming(1, {
      duration:
        storyViewDuration() > videoDuration
          ? storyViewDuration()
          : videoDuration,
      easing: Easing.linear,
    });

    const timer = setTimeout(avancarAutomaticamente, 15000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (!currentValue) {
      setCurrentValue(true);
      return;
    }
    if (currentIndex == 0) {
      avancarAutomaticamente(true);
      setRenderizeAnimation(false);
      navigation.push('MyProfileScreen');
    }
  }, [currentIndex]);

  return (
    <>
      <ContainerGeral>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent
        />

        <ProfileView>
          <UserImageRounded
            url={
              params.idProfile == userProfile.userId
                ? userProfile.profileImage
                : params.profileImage
            }
            size={43}
          />
          <TextUserName>{destackName}</TextUserName>
        </ProfileView>

        {params.idProfile == userProfile.userId && (
          <OptionsView>
            <TouchableOpacity
              onPress={() => {
                setMenuModalVisible(!isMenuModalVisible);
              }}>
              <Entypo
                name="dots-three-vertical"
                color={'#ffffff'}
                size={22}
                style={{ marginTop: 15 }}
              />
            </TouchableOpacity>
          </OptionsView>
        )}

        <CloseView>
          <TouchableOpacity
            onPress={() => {
              navigation.push('MyProfileScreen');
            }}>
            <AntDesign
              name="close"
              color={'#ffffff'}
              size={31}
              style={{ marginLeft: 10, marginTop: 15 }}
            />
          </TouchableOpacity>
        </CloseView>

        <TimelineContainer>
          <IndicatorRow>
            {imagesStoryPost.map((story, index) => (
              <IndicatorBG key={index}>
                <Animated.View
                  style={[
                    styles.indicator,
                    index === currentIndex && indicatorAnimatedStyle,
                    index > currentIndex && {
                      width: 0,
                      backgroundColor: 'gray',
                    },
                    index < currentIndex && {
                      width: '100%',
                      backgroundColor: 'gray',
                    },
                  ]}
                />
              </IndicatorBG>
            ))}
          </IndicatorRow>
        </TimelineContainer>

        <NavigationButtons>
          <LeftTouch onPress={retrocederFoto} />
          {/* <CentralTouchStoryAndPost
                              onPressIn={alteratePause}
                              onPressOut={alteratePause}>
                         </CentralTouch> */}
          <RightTouch onPress={avancarFoto} />
        </NavigationButtons>

        {isMp4 ? (
          <Video
            resizeMode="cover"
            paused={false}
            onError={error => console.error('Erro no vídeo:', error)}
            onLoad={data => setVideoDuration(data.duration)}
            style={{
              width: '100%',
              height: '90%',
              top: '3%',
              borderRadius: 10,
            }}
            source={{ uri: imagesStoryPost[currentIndex]?.principalMedia?.url }}
          />
        ) : (
          <>
            {someTypes ? (
              <>
                {postColor != '' ? (
                  <ImagePostColor
                    style={{ backgroundColor: `${postColor.split('&')[0]}` }}>
                    <Text
                      numberOfLines={3}
                      style={{
                        padding: 10,
                        fontSize: 20,
                        color: postColor.split('&')[1],
                        fontFamily: fontStyle.light,
                        textAlign: 'center',
                      }}>
                      {postLegend}
                    </Text>
                  </ImagePostColor>
                ) : (
                  <>
                    {tipoPostRepost == 'repost' ? (
                      <CardPost
                        source={{
                          uri: imagesStoryPost[currentIndex]?.originalPost
                            ?.medias?.[0]?.mediaUrl,
                        }}
                      />
                    ) : (
                      <CardPost
                        source={{
                          uri: imagesStoryPost[currentIndex]?.medias?.[0]
                            ?.mediaUrl,
                        }}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <CardImage
                source={{
                  uri: imagesStoryPost[currentIndex]?.principalMedia?.url,
                }}
              />
            )}
          </>
        )}
      </ContainerGeral>
      <SafeAreaView>
        <BottomModal
          title="Ver todos os:"
          setvisibleBottonModal={() => {
            setMenuModalVisible(true);
          }}
          children={
            <>
              <StoryOptions
                onPress={() => {
                  setBottomModalDelete(!bottomModalDelete),
                    setMenuModalVisible(false);
                }}>
                <Ionicons
                  name="trash-outline"
                  color={'#231F20'}
                  size={22}
                  style={{ marginBottom: 5 }}
                />
                <OptionText>Excluir destaque</OptionText>
              </StoryOptions>
              <StoryOptions
                onPress={() => {
                  setDestackName(destackName);
                  setResult([
                    {
                      uri: destackImage.uri,
                      name: `${mime
                        .getType(destackImage.uri)
                        ?.split('/')
                        .pop()}`,
                      type: mime.getType(destackImage.uri) || 'image/jpeg',
                      fileCopyUri: '',
                      size: 0,
                    },
                  ]);
                  setDestackImage({
                    uri: destackImage.uri,
                    name: destackImage.name,
                    mime: mime.getType(destackImage.uri) || 'image/jpeg',
                  });
                  setDestackId(destackId);
                  setMenuModalVisible(false);
                  setRenderizeAnimation(false);
                  navigation.push('EditHighlight', {
                    imagesStoryPost: imagesStoryPost,
                  });
                }}>
                <AntDesign
                  name="edit"
                  color={'#231F20'}
                  size={22}
                  style={{ marginBottom: 5 }}
                />
                <OptionText>Editar destaque</OptionText>
              </StoryOptions>
            </>
          }
          visibleBottonModal={isMenuModalVisible}
        />
      </SafeAreaView>

      <ConfirmModal
        setvisibleBottonModal={() => setBottomModalDelete(!bottomModalDelete)}
        isModalVisible={bottomModalDelete}
        title="Deletar Destaque"
        text="Você tem certeza? Caso delete este destaque ele não voltará a aparecer no deu perfil."
        onCancel={() => {
          setBottomModalDelete(false), setMenuModalVisible(true);
        }}
        onConfirm={() => {
          deleteDedstack();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'white',
    height: '100%',
  },
});
