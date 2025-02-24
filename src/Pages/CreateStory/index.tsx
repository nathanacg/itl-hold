import React from 'react';
import mime from 'mime';
import { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Octicons from 'react-native-vector-icons/Octicons';

import BottomModal from '../../Components/BottomModal';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  CreateStoryContainer,
  IconCircle,
  OptionIcons,
  TopOptions,
  LetterIcon,
  BottomOptions,
  Button,
  ButtonText,
  WhiteText,
  LoadingText,
  TextModal,
  StoryOption2,
  TextModalOption,
} from './style';

import { SafeAreaViewContainer5 } from '../../Components/elementsComponents';
import { theme } from '../../Theme/theme';
import OnWriteMode from './components/onWriteMode';
import AddMarkedUsers from './components/AddMarkedUsers';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { newStory } from '../../Service/Story';
import Video from 'react-native-video';
import { newDrop } from '../../Service/Drop';
import useDropsCurrent from '../../GlobalState/currentDrops.zustand';
import useStories from '../../GlobalState/stories.zustand';
import ToggleSwitchStory from '../../Components/ToggleSwitchStory';
import RadioButton from '../../Components/RadioButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useFeedData from '../../GlobalState/feed.zustand';
import useDropsStore from '../../GlobalState/drops.zustand';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const closeIconCenter = { x: 50 - width / 2, y: 15 };

export default function CreateStory() {
  const route = useRoute();
  const params = route.params as { type: string };

  const { setDropList } = useDropsCurrent();
  const { setHasStory, populateAllStories } = useStories();

  const [loading, setLoading] = useState(false);
  const [errorSave, setErrorSave] = useState(false);

  const { captureImage, setCaptureImage } = useCaptureImageStore();
  const navigation = useNavigation<StackRoutes>();

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [deleteMode, setDeleteMode] = useState(false);

  const [optionModal, setOptionsModal] = useState(false);
  const handleOptionModal = () => {
    setOptionsModal(!optionModal);
  };

  const [secondaryMidia, setSecondaryMidia] = useState<{
    fileName: string;
    uri: string;
    top: number;
    left: number;
    scale: number;
  }>({ fileName: '', uri: '', left: 0, scale: 1, top: 0 });

  const imageRef = useRef(null);
  const [imagePrevPosition, setImagePrevPosition] = useState({
    positionX: 0,
    positionY: 0,
  });
  const [principalMidia, setPrincipalMidia] = useState<{
    fileName: string;
    uri: string;
    top: number;
    left: number;
    scale: number;
  }>({ fileName: '', uri: '', left: 0, scale: 1, top: 0 });
  const imagePositionX = useSharedValue(0);
  const imagePositionY = useSharedValue(0);
  const imageScale = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: imagePositionX.value },
      { translateY: imagePositionY.value },
      { scale: imageScale.value },
    ],
  }));

  const [addMarkedUsersMode, setAddMarkedUsersMode] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { userName: string; top: number; left: number; scale: number }[]
  >([]);

  const handleMarkedUsersMode = () => {
    setAddMarkedUsersMode(!addMarkedUsersMode);
    setOptionsModal(false);
  };
  /*
        const [linkModal, setLinkModal] = useState(false)
        const [LinkInput, setLinkInput] = useState("")
        const [storyLink, setStoryLink] = useState<{ link: string, top: number, left: number, scale: number, type: string }>({ link: '', left: 0, scale: 1, top: 0, type: 'normal' })

        const handleLinkModal = () => {
            setLinkModal(!linkModal)
            optionModal && handleOptionModal
        }
       const setLink = () => {
            setStoryLink({ link: LinkInput, top: 0, left: 0, scale: 1, type: "normal" })
            setOptionsModal(false)
            handleLinkModal()
        }

    */

  const [writeEnable, setWriteEnable] = useState(false);
  const [textMoveEnable, setTextMoveEnable] = useState(false);
  const [prevTextPosition, setPrevTextPosition] = useState({
    positionX: 0,
    positionY: 0,
  });
  const [storyText, setStoryText] = useState<{
    text: string;
    color: string;
    background: string;
    font: string;
    align: 'left' | 'right' | 'center' | 'auto' | 'justify';
    left: number;
    top: number;
    scale: number;
  }>({
    text: '',
    color: '',
    background: '',
    font: 'Poppins-Regular',
    align: 'center',
    left: 0,
    top: 0,
    scale: 1,
  });

  const [hasSpoiler, setHasSpoiler] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const offsetX = useSharedValue(0);

  const isTextPressed = useSharedValue(false);
  const offsetY = useSharedValue(0);
  const savedText = useSharedValue({ x: 0, y: 0 });
  const scaleBall = useSharedValue(1);

  const handleWritEnable = () => {
    setWriteEnable(!writeEnable);
    writeEnable && setTextMoveEnable(true);
  };

  const textRef = useRef(null);

  const textPositionX = useSharedValue(0);
  const textPositionY = useSharedValue(0);
  const textScale = useSharedValue(1);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: textPositionX.value },
      { translateY: textPositionY.value },
      { scale: textScale.value },
    ],
  }));
  const { initializeFeed } = useFeedData();
  const { getAllDrops } = useDropsStore();
  const [musicModal, setMusicModal] = useState(false);
  const { user } = useUserProfile();
  const [selectedMusic, setSelectedMusic] = useState<{
    uri: string;
    musicName: string;
    artist: string;
    left: number;
    top: number;
    styleType: string;
    scale: number;
  }>({
    uri: '',
    musicName: '',
    artist: '',
    left: 0,
    top: 0,
    styleType: '',
    scale: 0,
  });

  const [musicInput, setMusicInput] = useState('');
  const [configMusicMode, setConfigMusicMode] = useState(false);
  const [time, setTime] = useState<'6' | '12' | '24'>('24');

  /*
    const handleMusicModal = () => {
       handleOptionModal()
       setMusicModal(!musicModal)
   }

    const handleMusicEnable = () => {
         setConfigMusicMode(!configMusicMode)
     }

     const cancelMusic = () => {
         //setSelectedMusic({})
         setConfigMusicMode(false)
     }

   const handleSelectMusic = (item: any) => {
       setSelectedMusic({ ...item, left: 0, top: 0 })
       setConfigMusicMode(true)
   }
   */

  useEffect(() => {
    if (captureImage[captureImage.length - 1] && params.type === 'story') {
      setPrincipalMidia({
        fileName: captureImage[captureImage.length - 1].filename,
        uri: captureImage[captureImage.length - 1].uri,
        left: 0,
        scale: 1,
        top: 0,
      });
    } else if (captureImage[0] && params.type === 'drops') {
      setPrincipalMidia({
        fileName: captureImage[0].filename,
        uri: captureImage[0].uri,
        left: 0,
        scale: 1,
        top: 0,
      });
    }
  }, [captureImage]);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(
      principalMidia.uri,
      (width, height) => {
        setImageSize({ width, height });
      },
      error => {
        console.log('Error getting image size:', error);
      },
    );
  }, [principalMidia.uri]);

  const [attachmentFile, setAttachmentFile] = useState<
    | {
        name: string;
        left: number;
        top: number;
        scale: number;
        fileCopyUri: string;
        uri: string;
      }
    | any
  >({ name: '', left: 0, top: 0, scale: 0, fileCopyUri: '', uri: '' });

  async function openFileExplorer() {
    handleOptionModal();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });
      setAttachmentFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Seleção cancelada');
      } else {
        console.log('Erro ao selecionar o arquivo:', err);
      }
    }
  }

  const saveData = async () => {
    const data = new FormData();

    const mimeType = mime.getType(principalMidia.uri);
    const isVideo = principalMidia.uri.endsWith('mp4');

    const fileExtension = isVideo ? 'mp4' : 'jpg';

    data.append('file', {
      uri: principalMidia.uri,
      type: mimeType,
      name: principalMidia.fileName + `.${fileExtension}`,
    });

    /*  if (secondaryMidia.fileName) {
             data.append("file", {
                 uri: secondaryMidia.uri,
                 type: mime.getType(secondaryMidia.uri),
                 name: secondaryMidia.fileName + `.${mime.getType(secondaryMidia.uri)?.split("/").pop()}`,
             })
         }

         if (attachmentFile.name) {
             data.append("file", {
                 uri: attachmentFile.uri,
                 type: mime.getType(attachmentFile.fileCopyUri),
                 name: attachmentFile.name,
             })
         }
        */

    const principalMedia = {
      fileName: principalMidia.fileName,
      usage_media: 'principal_media',
      position: { x: principalMidia.left, y: principalMidia.left },
      scale: principalMidia.scale,
    };

    const text = {
      text: storyText.text,
      font: storyText.font,
      text_align: storyText.align,
      text_color: storyText.color,
      background_color: storyText.background,
      scale: storyText.scale,
      position: {
        x: savedText.value.x,
        y: savedText.value.y,
      },
    };

    const myData = {
      principalMedia,
      hasSpoiler: hasSpoiler ? true : false,
      isClosed: isClosed ? true : false,
      text: storyText.text ? text : {},
      config_time: time,
    };

    /*
           const docMedia = {
            fileName: attachmentFile.name.split(".")[0],
            usage_media: "doc_attachment",
            position: {
                x: attachmentFile.left,
                y: attachmentFile.top
            },
            scale: attachmentFile.scale
        }
        const text_url = {
             url: storyLink.link,
             position: {
                 x: storyLink.left,
                 y: storyLink.top
             },
             scale: storyLink.scale,
             style_type: storyLink.type
         }
          const users_marcations = markedUsers.map(user => ({
              username: user.userName,
              position: {
                  x: user.left,
                  y: user.top
              },
              scale: user.scale
          }))
            const music = {
              music_url: selectedMusic.uri,
              time: {
                  start: 0,
                  end: 0
              },
              style_type: selectedMusic.styleType,
              scale: selectedMusic.scale,
              position: {
                  x: 0,
                  y: 0,
              }
          }

          const secondaryMedia = {
               fileName: secondaryMidia.fileName,
               usage_media: "secondary_media",
               position: {
                   x: secondaryMidia.left,
                   y: secondaryMidia.top
               },
               scale: secondaryMidia.scale
           }
        secondaryMedia,
        docMedia,
        music: selectedMusic.musicName ? music : {},
         text_url: storyLink.link ? text_url : {},
        users_marcations,
        emojis: []
      if (attachmentFile.fileCopyUri) {
          myData.docMedia = docMedia
      }

      if (secondaryMidia.fileName) {
          myData.secondaryMedia = secondaryMedia
      }
     */

    try {
      setLoading(true);
      if (params.type == 'story') {
        data.append('storie_data', JSON.stringify(myData));
        setErrorSave(false);
        await newStory(data).then(res => {
          populateAllStories(user.userId);
          setHasStory(true);
          setCaptureImage([]);
        });
      } else {
        data.append('reels_data', JSON.stringify(myData));
        setErrorSave(false);
        setDropList();
        await newDrop(data).then(res => {
          console.log(res.data);
        });
        setCaptureImage([]);
      }
      await getAllDrops();
      // await initializeFeed(true);
      navigation.navigate('FeedScreen');
    } catch (error) {
      console.log('Erro ao criar story ou reels', error);
      setErrorSave(true);
      Alert.alert('Erro ao publicar', 'Falha ao publicar o Drop');
    } finally {
      setLoading(false);
    }
  };

  const flingGesture = Gesture.Fling()
    .direction(Directions.UP)
    .hitSlop({ right: 0, bottom: 0, width: 1100 })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      scaleBall.value = 1;
    });

  const textOpacity = useDerivedValue(() => {
    if (
      offsetY.value > closeIconCenter.y - 35 &&
      offsetX.value < closeIconCenter.x + 35 &&
      offsetX.value > closeIconCenter.x - 35
    ) {
      return withTiming(0.5);
    }
    return withTiming(1);
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { scale: scaleBall.value },
      ],
      opacity: textOpacity.value,
    };
  });

  const dragGesture = Gesture.Pan()
    .onUpdate(e => {
      isTextPressed.value = true;
      offsetX.value = e.translationX + savedText.value.x;
      offsetY.value = e.translationY + savedText.value.y;
      if (
        offsetY.value > closeIconCenter.y - 55 &&
        offsetX.value < closeIconCenter.x + 55 &&
        offsetX.value > closeIconCenter.x - 55
      ) {
        scaleBall.value = withSpring(0.5);
      } else {
        scaleBall.value = withSpring(1);
      }
    })

    .onEnd(() => {
      savedText.value = {
        x: offsetX.value,
        y: offsetY.value,
      };
    })
    .onFinalize(() => {
      isTextPressed.value = false;
      if (
        offsetY.value > closeIconCenter.y - 55 &&
        offsetX.value < closeIconCenter.x + 55 &&
        offsetX.value > closeIconCenter.x - 55
      ) {
        offsetX.value = withTiming(closeIconCenter.x);
        offsetY.value = withTiming(closeIconCenter.y);
        offsetY.value = withDelay(300, withSpring(closeIconCenter.y + 65));
        offsetX.value = withDelay(500, withSpring(0));
        savedText.value = {
          x: 0,
          y: 0,
        };
      }
    });

  const composedGesture = Gesture.Exclusive(dragGesture);

  return (
    <SafeAreaViewContainer5>
      <StatusBar barStyle={'light-content'} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={flingGesture}>
          <Animated.View style={styles.container}>
            {principalMidia.uri.includes('mp4') ? (
              <Video
                onLoad={({ naturalSize }) => {
                  setImageSize({
                    width: naturalSize.width,
                    height: naturalSize.height,
                  });
                }}
                resizeMode={
                  imageSize.height > imageSize.width ? 'cover' : 'contain'
                }
                source={{ uri: principalMidia.uri }}
                repeat={true}
                style={{ borderRadius: 8, width: screenWidth, height: '90%' }}
                muted={false}
                paused={false}
                ignoreSilentSwitch={'ignore'}
              />
            ) : (
              <Animated.Image
                ref={imageRef}
                style={[
                  {
                    width: screenWidth,
                    height: '90%',
                    resizeMode:
                      imageSize.height > imageSize.width ? 'cover' : 'contain',
                    borderRadius: 8,
                  },
                  imageAnimatedStyle,
                ]}
                source={{ uri: principalMidia.uri }}
              />
            )}

            {storyText?.text && textMoveEnable && (
              <GestureDetector gesture={composedGesture}>
                <Animated.View style={[styles.text, animatedText]}>
                  <TouchableOpacity onPress={handleWritEnable}>
                    <Animated.View
                      ref={textRef}
                      style={[
                        textAnimatedStyle,
                        {
                          backgroundColor: storyText.background,
                          padding: 8,
                          borderRadius: 4,
                        },
                      ]}>
                      <Text
                        style={{
                          color: storyText.color,
                          textAlign: storyText.align,
                          fontSize: 18,
                          fontFamily: storyText.font,
                        }}>
                        {storyText.text}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </Animated.View>
              </GestureDetector>
            )}

            <CreateStoryContainer>
              {writeEnable ? (
                <OnWriteMode
                  handleWritEnable={handleWritEnable}
                  setStoryText={setStoryText}
                  storyText={storyText}
                />
              ) : addMarkedUsersMode ? (
                <AddMarkedUsers
                  markedUsers={markedUsers}
                  handleMarkedUsersMode={handleMarkedUsersMode}
                />
              ) : configMusicMode ? (
                <TopOptions>
                  <TouchableOpacity onPress={() => {} /* cancelMusic */}>
                    <WhiteText>Cancelar</WhiteText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {} /* handleMusicEnable */}>
                    <WhiteText>Concluir</WhiteText>
                  </TouchableOpacity>
                </TopOptions>
              ) : (
                <TopOptions>
                  <TouchableOpacity
                    onPress={() => {
                      setCaptureImage([]);
                      navigation.pop();
                    }}>
                    <Octicons
                      name="chevron-left"
                      color={theme.secondaryColor}
                      size={32}
                      style={{ marginRight: 2 }}
                    />
                  </TouchableOpacity>
                  <OptionIcons>
                    {/*
                                                            <IconCircle>
                                                                <Image
                                                                    style={{ width: 22, height: 22 }}
                                                                    source={require("../../Assets/Icons/smileFaceLarge.png")}
                                                                />
                                                            </IconCircle>
                                                        */}

                    {params.type == 'story' && (
                      <>
                        <IconCircle onPress={handleWritEnable}>
                          <LetterIcon>Aa</LetterIcon>
                        </IconCircle>
                        <IconCircle onPress={handleOptionModal}>
                          <Ionicons name="add" size={30} color={'#FFF'} />
                        </IconCircle>
                      </>
                    )}
                  </OptionIcons>
                  <TouchableOpacity
                    onPress={() => {
                      setCaptureImage([]);
                      navigation.pop();
                    }}>
                    <Ionicons name="close" size={32} color={'#FFF'} />
                  </TouchableOpacity>
                </TopOptions>
              )}
              {/*      <View>
                        {markedUsers && (
                            markedUsers.map(user => (
                                <StoryTagUser
                                    key={user.userName}
                                    user={user}
                                    setTagUsers={setMarkedUsers}
                                    handleDeleteOption={setDeleteMode}
                                />
                            ))
                        )
                        }
                    </View>
                    {selectedMusic?.musicName && (
                        <MusicSmall handleMove={handleMove} deleteAllItem={deleteAllItem} selectedMusic={selectedMusic} setSelectedMusic={setSelectedMusic} />
                    )}

                    {storyLink?.link && (
                        <Link storyLink={storyLink} setStoryLink={setStoryLink} handleMove={handleMove} deleteAllItem={deleteAllItem} />
                    )}

                    {secondaryMidia?.fileName && (
                        <SecondaryImage cancelMidia={cancelMusic} secondaryMidia={secondaryMidia} setSecondaryMidia={setSecondaryMidia} handleMove={handleMove} deleteAllItem={deleteAllItem} />
                    )}

                    {deleteMode && (
                        <DeleteButton>
                            <Ionicons
                                name='close'
                                color={theme.secondaryColor}
                                size={30}
                            />
                        </DeleteButton>
                    )}
                      {attachmentFile?.name && (
                        <DocumentCard storyDocument={attachmentFile} setStoryDocument={setAttachmentFile} handleMove={handleMove} handleDelete={deleteAllItem} />
                    )}
                    */}

              {!errorSave && !writeEnable && (
                <BottomOptions>
                  <Button style={{ opacity: loading ? 0.5 : 1 }} disabled={loading} outline large onPress={saveData}>
                    <ButtonText>Publicar</ButtonText>
                  </Button>
                </BottomOptions>
              )}

              {errorSave && <LoadingText>Falha na publicação</LoadingText>}

              <BottomModal
                title=""
                setvisibleBottonModal={setOptionsModal}
                visibleBottonModal={optionModal}
                children={
                  <View style={{ height: 220 }}>
                    <StoryOption2>
                      <TextModal>Amigos próximos</TextModal>
                      <ToggleSwitchStory
                        value={isClosed}
                        setValue={() => setIsClosed(!isClosed)}
                      />
                    </StoryOption2>
                    <StoryOption2>
                      <TextModal>Spoiler</TextModal>
                      <ToggleSwitchStory
                        value={hasSpoiler}
                        setValue={() => setHasSpoiler(!hasSpoiler)}
                      />
                    </StoryOption2>
                    <View style={{ marginBottom: 10, gap: 5, marginTop: 8 }}>
                      <StoryOption2>
                        <TextModal>Disponibilidade</TextModal>
                      </StoryOption2>

                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <RadioButton
                          value={time == '6' && true}
                          setValue={() => setTime('6')}
                        />
                        <TextModalOption>6 horas</TextModalOption>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <RadioButton
                          value={time == '12' && true}
                          setValue={() => setTime('12')}
                        />
                        <TextModalOption>12 horas</TextModalOption>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <RadioButton
                          value={time == '24' && true}
                          setValue={() => setTime('24')}
                        />
                        <TextModalOption>24 horas</TextModalOption>
                      </View>
                    </View>
                  </View>
                }
              />

              {/*   <BottomModal
                        title=''
                        setvisibleBottonModal={handleOptionModal}
                        visibleBottonModal={optionModal}
                        children={
                            <>
                                <StoryOption onPress={handleOpenGalery}>
                                    <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../Assets/Icons/galery.png")} />
                                    <TextModal>Foto</TextModal>
                                </StoryOption>
                                {/*  <StoryOption onPress={handleMusicModal}>
                                    <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../Assets/Icons/musicFill.png")} />
                                    <TextModal>Músicas</TextModal>
                                </StoryOption>

                                <StoryOption onPress={handleLinkModal}>
                                    <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../Assets/Icons/link.png")} />
                                    <TextModal>Link</TextModal>
                                </StoryOption>

                                <StoryOption onPress={handleMarkedUsersMode}>
                                    <Image style={{ width: 20, height: 20, resizeMode: "contain" }} source={require("../../Assets/Icons/mark.png")} />
                                    <TextModal>Marcar</TextModal>
                                </StoryOption>
                                <StoryOption onPress={openFileExplorer}>
                                    <MaterialCommunityIcons
                                        name='paperclip'
                                        size={20}
                                        color={theme.textDark}
                                    />
                                    <TextModal>Documento</TextModal>
                                </StoryOption>
                            </>
                        }
                    /> */}

              {/*   <BottomModal
                        title=''
                        setvisibleBottonModal={handleMusicModal}
                        visibleBottonModal={musicModal}
                        children={
                            <>
                                <SearchInput
                                    marginTop='10px'
                                    value={musicInput}
                                    onSetText={setMusicInput}
                                />
                                <FlatList
                                    data={[{
                                        musicName: "Nonstop",
                                        artist: "Drake"
                                    }, {
                                        musicName: "Nonstop",
                                        artist: "Drake"
                                    }, {
                                        musicName: "Nonstop",
                                        artist: "Drake"
                                    }]}
                                    renderItem={({ item }) => (
                                        <MusicCard
                                            musicName={item.musicName}
                                            artist={item.artist}
                                            onPressFunction={() => {
                                                setMusicModal(!musicModal)
                                                handleSelectMusic(item)
                                            }} />
                                    )}
                                />
                            </>
                        }
                    />  */}

              {/*  <BottomModal
                        visibleBottonModal={linkModal}
                        setvisibleBottonModal={handleLinkModal}
                        title=''
                        children={
                            <View style={{ height: 100 }}>
                                <RowDirection style={{ justifyContent: "space-around" }}>
                                    <TouchableOpacity>
                                        <TextLightGray>Cancelar</TextLightGray>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text>Adicionar link</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={setLink}>
                                        <TextLightGray>Concluir</TextLightGray>
                                    </TouchableOpacity>
                                </RowDirection>
                                <RowDirection style={{ justifyContent: "space-between" }}>
                                    <TextSimple>Link</TextSimple>
                                    <AddLinkInput
                                        autoFocus
                                        placeholder='Insira aqui o link'
                                        placeholderTextColor={theme.textligthGray}
                                        value={LinkInput}
                                        onChangeText={setLinkInput}
                                    />
                                </RowDirection>
                            </View>}
                    /> */}
            </CreateStoryContainer>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaViewContainer5>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    borderRadius: 9,
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '50%',
    right: '25%',
    zIndex: 6,
  },
});
