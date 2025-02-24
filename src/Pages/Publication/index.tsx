import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  PermissionsAndroid,
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import mime from 'mime';
import { theme } from '../../Theme/theme';

import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

import {
  getMoviesList,
  listAbleToMarcations,
} from '../../Service/Publications';

import { createThumbnail } from 'react-native-create-thumbnail';

import {
  MainContainer,
  LightText,
  CategoryList,
  CategoryCard,
  OptionContainer,
  AddList,
  HeaderButton,
  ButtonText,
  SpoilerContainer,
  SpoilerText,
  ListDivisor,
  DocContainer,
  CloseContainer,
  ContainerPage,
  NoDataSearch,
} from './style';

import SearchInput from '../../Components/SearchInput';
import ProfileHeader from '../../Components/ProfileHeader';
import SearchCard from './Components/SearchCard';
import BottomModal from '../../Components/BottomModal';
import SetAvaliation from './Components/SetAvaliation';
import AddButtons from './Components/AddButtons';
import Button from '../../Components/Button';
import PostInput from '../../Components/PostInput';
import {
  Container,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import PostImage from './Components/PostImage';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import useCreatePost, {
  markerUsers,
} from '../../GlobalState/createPost.zustand';
import DocumentCard from '../../Components/DocumentCard';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { ITvSeries, MovieProps } from '../../Types/postProps';

import { getUsersToMarcation } from '../../Service/Followers';
import { ProfileUser, UserToMarcation } from '../../Types/User';
import ProfileResultFinders from '../../Components/ProfileResultFinders';
import AddMarcationPerson from './Components/AddMarcationPerson';

import ToggleSwitch from '../../Components/ToggleSwitch';

import { getBySearchMusic } from '../../Service/Audio';
import tokenMusicApi from '../../GlobalState/tokenMusicAPI.zustand';
import { ItemMusic } from '../../Types/Music';

import { getBySeries } from '../../Service/Tv';

import { getVolumeBook } from '../../Service/Books';
import { BookResponse } from '../../Types/booksType';

import Info from '../../Components/Info';
import InputLink from '../../Components/InputLink';
import useRoom from '../../GlobalState/room.zustand';
import SelectedMoviePublication from '../../Components/SelectedMoviePublication';

import Carousel from 'react-native-reanimated-carousel';
import CarouselItem from './Components/CarouselItem';
import { useSharedValue } from 'react-native-reanimated';

interface Category {
  name: string;
  imgSource: string;
  selectedImage: string;
  style: StyleProp<ImageStyle>;
}

interface UserProfile {
  marker: string;
  profileImage: string;
  userId: number;
  userName: string;
  userNickname: string;
}

export default function Publication() {
  const navigation = useNavigation<StackRoutes>();

  const { room } = useRoom();
  const { user } = useUserProfile();
  const { token } = tokenMusicApi();

  const currentItemIndex = useSharedValue(0);

  const imageWidth = Dimensions.get('screen').width;
  const { captureImage, setCaptureImage } = useCaptureImageStore();
  const {
    setPost,
    setFiles,
    setImagesUpload,
    setMarkedPerson,
    setMarkerPhoto,
  } = useCreatePost();

  const [allSelected, setAllselected] = useState<UserToMarcation[]>([]);
  const [usersSelected, setUsersSelected] = useState<number[]>([]);
  const [usersSelectedPerson, setUsersSelectedPerson] = useState<any[]>([]);

  const [categorySelected, setCategorySelected] = useState<string>();
  const [inputSearch, setInputSearch] = useState('');
  const [legend, setLegend] = useState('');
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [attachmentFile, setAttachmentFile] =
    useState<DocumentPickerResponse[]>();

  const [metrics, setMetrics] = useState<string>('');

  const [optionAddSelected, setOptionAddSelected] = useState<
    'default' | 'list' | 'ranking'
  >('default');
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [audioPath, setAudioPath] = useState('');

  const [link, setLink] = useState<string>('');

  const [emojiSelected, setEmojiSelected] = useState<{
    name: string;
    imageUrl: any;
    selectedImage: any;
  }>();

  const [movieSelected, setMovieSelected] = useState<null | {
    id: number;
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number | string | null;
  }>();
  const [seriesSelected, setSeriesSelected] = useState<null | {
    name: string;
    description: string;
    image: string;
    tmdbMovieId: number;
  }>();
  const [bookSelected, setBookSelected] = useState<null | {
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number | string;
  }>();
  const [musicSelected, setMusicSelected] = useState<null | {
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number | string;
  }>();
  const [articleSelected, setArticleSelected] = useState<null | {
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number;
  }>();
  const [podcastSelected, setPodcastSelected] = useState<null | {
    name: string;
    description: string;
    image?: string;
    tmdbMovieId: number;
  }>();

  const { width, height } = Dimensions.get('screen');

  const [marker, setMarker] = useState<{
    type: string;
    filename: string;
    filepath: string | null;
    extension: string | null;
    uri?: string | any;
    height: number;
    width: number;
    fileSize: number | null;
    itemId?: number;
  }>();
  const [markerPhoto, setMarkerPhotoImage] = useState<
    { image?: string; persons: number[] }[]
  >([]);
  const [imageMarker, setImageMarker] = useState<markerUsers[]>([]);

  const [legendButtons, setLegendButtons] = useState<
    { letter: string; text: string }[]
  >([]);

  const handleModalOpen = () => {
    setOpenUsersModal(!openUsersModal);
  };

  const handleOptionsAdd = (option: 'default' | 'list' | 'ranking') => {
    option == optionAddSelected
      ? setOptionAddSelected('default')
      : setOptionAddSelected(option);
  };
  const categorys: Category[] = [
    {
      name: 'Filme',
      imgSource: require('../../Assets/Icons/cameraMovie.png'),
      selectedImage: require('../../Assets/Icons/cameraMovieWhite.png'),
      style: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: 2,
        marginLeft: 2,
      },
    },
    {
      name: 'Série',
      imgSource: require('../../Assets/Icons/clapperboard.png'),
      selectedImage: require('../../Assets/Icons/clapperboardWhite.png'),
      style: { width: 20, height: 20, resizeMode: 'contain', marginTop: 2 },
    },
    {
      name: 'Livro',
      imgSource: require('../../Assets/Icons/openBook.png'),
      selectedImage: require('../../Assets/Icons/openBookWhite.png'),
      style: { width: 20, height: 20, resizeMode: 'contain', marginTop: 2 },
    },
    {
      name: 'Música',
      imgSource: require('../../Assets/Icons/music.png'),
      selectedImage: require('../../Assets/Icons/musicWhite.png'),
      style: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: 4,
        marginRight: 2,
      },
    },
    {
      name: 'Artigo',
      imgSource: require('../../Assets/Icons/article.png'),
      selectedImage: require('../../Assets/Icons/articleWhite.png'),
      style: { width: 20, height: 20, resizeMode: 'contain', marginTop: 3 },
    },
    {
      name: 'Podcast',
      imgSource: require('../../Assets/Icons/podcastMicrophone.png'),
      selectedImage: require('../../Assets/Icons/podcastMicrophoneWhite.png'),
      style: { width: 20, height: 20, resizeMode: 'contain', marginTop: 2 },
    },
  ];

  const requestPermission = async () => {
    try {
      if (Platform.OS == 'ios') {
        return;
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permitir que intellectus acesse seus arquivos?',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function openFileExplorer() {
    setAttachmentFile([]);
    try {
      requestPermission();
      const res: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });
      setAttachmentFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Seleção cancelada');
      } else {
        console.log('Erro ao selecionar o arquivo:', err);
      }
    }
  }

  const [seacrMovieList, setSeacrMovieList] = useState<MovieProps[]>([]);
  const [seacrSeriesList, setSeacrSeriesList] = useState<ITvSeries[]>([]);
  const [seacrBookList, setSeacrBookList] = useState<BookResponse[]>([]);
  const [seacrMusicList, setSeacrMusicList] = useState<ItemMusic[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [userNoImagem, setUserNoImagem] = useState<boolean>(false);
  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [popoutText, setPopoutText] = useState('');
  const handleValidationError = () => {
    setshowSmallPopup(true);
  };

  useEffect(() => {
    if (inputSearch.length > 3 && categorySelected == 'Série') {
      (async () => {
        try {
          const response: ITvSeries[] = await getBySeries(
            encodeURI(inputSearch),
            'w300',
          );
          setSeacrSeriesList(response);
        } catch (error: any) {
          console.warn(JSON.stringify(error));
        }
      })();
    }
  }, [inputSearch]);

  useEffect(() => {
    if (inputSearch.length > 3 && categorySelected == 'Filme') {
      (async () => {
        await getMoviesList(encodeURI(inputSearch))
          .then(res => {
            const filterResults = res.data.movies.filter(
              movie => movie.movieImagens?.poster_sizes?.w92.length > 0,
            );
            setSeacrMovieList(filterResults);
          })
          .catch(e => {
            console.warn('GetMoviesList - Publication');
            console.log(e);
          });
      })();
    }
  }, [inputSearch]);

  useEffect(() => {
    if (inputSearch.length > 3 && categorySelected == 'Livro') {
      (async () => {
        const res: BookResponse = await getVolumeBook(inputSearch);
        setSeacrBookList(res);
      })();
    }
  }, [inputSearch]);

  useEffect(() => {
    if (inputSearch.length > 3 && categorySelected == 'Música') {
      (async () => {
        const response: ItemMusic[] = await getBySearchMusic(
          inputSearch,
          token,
        );

        setSeacrMusicList(response);
      })();
    }
  }, [inputSearch]);

  const [images, setImages] = useState<
    {
      key: string;
      fileName: string;
      url: string;
      markedUsers: {
        name: string;
        address: string;
        positionX: number;
        positionY: number;
      }[];
    }[]
  >([]);

  const removeUser = (item: any) =>
    setImages(
      images.map((img, index) =>
        index == currentItemIndex
          ? {
              ...img,
              markedUsers: img.markedUsers?.filter(
                user => user.address != item.address,
              ),
            }
          : img,
      ),
    );

  const savePreview = async () => {
    if (!categorySelected) {
      handleValidationError();
      setPopoutText('Selecionar categoria da publicação');
      return;
    }

    if (!legend && !audioPath && images.length == 0) {
      handleValidationError();
      setPopoutText('Insira uma mensagem ou uma foto');
      return;
    }

    if (categorySelected === 'Filme' && !movieSelected) {
      handleValidationError();
      setPopoutText('Selecionar o filme');
      return;
    }

    if (categorySelected === 'Série' && !seriesSelected) {
      handleValidationError();
      setPopoutText('Selecionar a série');
      return;
    }

    if (categorySelected === 'Música' && !musicSelected) {
      handleValidationError();
      setPopoutText('Selecionar a música');
      return;
    }

    const data = new FormData();
    for (const image of images || []) {
      const { url, filename, type = 'image/jpeg' } = image as any;  
      if (!url) continue; // Skip if no URI

      // Handle different image types
      const fileType = mime.getType(url) || type;
      const extension = fileType.split('/')[1] || 'jpg';

      data.append('file', {
        uri: Platform.OS === 'android' ? url : url.replace('file://', ''),
        type: fileType,
        name: `${filename}.${extension}`,
      });
    }

    if (attachmentFile && attachmentFile.length > 0) {
      data.append('file', {
        uri:
          Platform.OS === 'android'
            ? attachmentFile[0].uri
            : attachmentFile[0].uri.replace('file://', ''),
        type: attachmentFile[0].type,
        name: attachmentFile[0].name,
        size: attachmentFile[0].size,
      });
    }

    if (movieSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: movieSelected ? movieSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else if (seriesSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: seriesSelected ? seriesSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else if (bookSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: bookSelected ? bookSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else if (musicSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: musicSelected ? musicSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else if (articleSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        link: link,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: articleSelected ? articleSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else if (podcastSelected) {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: podcastSelected ? podcastSelected.tmdbMovieId : null,
        idRoom: room?.room_id,
      });
    } else {
      setPost({
        postLegend: legend,
        postSpoiler: hasSpoiler,
        isClosed: isClosed,
        postEvaluation: emojiSelected?.name || '',
        postCategorie: categorySelected,
        surveyOpinion: legendButtons,
        tmdbMovieId: null,
        link: link,
        idRoom: room?.room_id,
      });
    }

    if (usersSelectedPerson.length > 0) {
      setMarkedPerson(usersSelectedPerson);
      setMarkerPhoto(imageMarker);
    }

    setImagesUpload(images);

    setFiles(data);
    navigation.push('PostPreview', {
      audioPath: audioPath,
      metrics: metrics,
      attachmentFile: attachmentFile,
      link: link,
    });
  };

  const listMarks = async () => {
    await listAbleToMarcations()
      .then(res => {
        setAllselected(res.data.data);
      })
      .catch(error => {
        console.log('ERRRO ao listar seguidores: ', error);
      });
  };

  const handleCheckBoxChange = (person: any) => {
    setUsersSelected(prevUsersSelected => {
      const userIndex = prevUsersSelected.indexOf(person);

      if (userIndex !== -1) {
        const updatedUsersSelected = [...prevUsersSelected];
        updatedUsersSelected.splice(userIndex, 1);

        return updatedUsersSelected;
      } else {
        return [...prevUsersSelected, person];
      }
    });
  };

  const handleCheckBoxChangePerson = (
    profileImage: string,
    Id: number,
    userNickname: string,
    name: string,
  ) => {
    setUsersSelectedPerson(prevUsersSelected => {
      const userIndex = prevUsersSelected.findIndex(
        user =>
          user.profileImage === profileImage &&
          user.id === Id &&
          user.userNickname === userNickname &&
          user.name === name,
      );

      const updatedUsersSelected = [...prevUsersSelected];

      if (userIndex !== -1) {
        updatedUsersSelected.splice(userIndex, 1);
      } else {
        updatedUsersSelected.push({ profileImage, id: Id, name, userNickname });
      }
      return updatedUsersSelected;
    });
  };

  const handleRemoveUser = (item: UserProfile, marker?: string) => {
    setUsersSelectedPerson(prevUsersSelected => {
      if (!marker) {
        const updatedUsers = prevUsersSelected.filter(
          user => item.userId !== user.id,
        );
        setMarkedPerson([]);

        return updatedUsers;
      } else {
        const findRemoveIndex = usersSelectedPerson.findIndex(
          user => user.userId == item.userId && user.marker == marker,
        );

        if (findRemoveIndex == 0) {
          const temp = usersSelectedPerson.splice(
            1,
            usersSelectedPerson.length - 1,
          );
          setMarkedPerson([]);
          return temp;
        } else {
          const temp = usersSelectedPerson.slice(0, findRemoveIndex);
          const temppzin = usersSelectedPerson.slice(
            temp.length + 1,
            usersSelectedPerson.length,
          );

          // console.log(lastIndex.length)

          if (temppzin.length > 0) {
            setMarkedPerson([]);
            return [...temp, ...temppzin];
          }
          setMarkedPerson([]);
          return temp;
        }
      }
    });
  };

  function filteredUsers() {
    const regex = new RegExp(inputText, 'i');
    return allSelected.filter(function (pessoa) {
      return regex.test(pessoa.userName) || regex.test(pessoa.userNickname);
    });
  }

  const menoUsers = useMemo(() => {
    return (
      <FlatList
        data={filteredUsers()}
        style={{ height: width / 2 }}
        renderItem={({ item }) => (
          <ProfileResultFinders
            name={item.userName}
            lastName={item.userNickname}
            profileImage={item.profileImage}
            typeAction="checkBox"
            check={false}
            activeButton={false}
            onCheckBoxChange={handleCheckBoxChange}
            onCheckBoxChangePerson={() =>
              handleCheckBoxChangePerson(
                item.profileImage,
                item.userId,
                item.userNickname,
                item.userName,
              )
            }
            id={item.userId}
            userNickname={item.userNickname}
          />
        )}
      />
    );
  }, [inputText, allSelected]);

  function transformarMatriz(matrizOriginal: UserProfile[]): {
    [key: string]: UserProfile[];
  } {
    const matrizTransformada: { [key: string]: UserProfile[] } = {};
    matrizOriginal.forEach(objeto => {
      const marker = objeto.marker;
      if (!matrizTransformada[marker]) {
        matrizTransformada[marker] = [];
      }
      matrizTransformada[marker].push(objeto);
    });
    return matrizTransformada;
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };

  function resetSearchListsAndSelectedData() {
    setSeacrMovieList([]);
    setSeacrSeriesList([]);
    setSeacrBookList([]);
    setSeacrMusicList([]);
    setMovieSelected(null);
    setBookSelected(null);
    setSeriesSelected(null);
    setMusicSelected(null);
    setInputSearch('');
  }

  function getBiggerPosterSize(image: string) {
    return image.replace('w300', 'w342');
  }

  useEffect(() => {
    let temp = { ...marker };

    if (temp && !!temp.uri) {
      let menorizeMarker = {
        image: temp?.uri,
        persons:
          usersSelected.length > 0
            ? usersSelected.splice(0, usersSelected.length)
            : usersSelected,
      };
      setMarkerPhotoImage(oldMenorize => [...oldMenorize, menorizeMarker]);
    }
  }, [usersSelected, images]);

  useEffect(() => {
    if (markerPhoto) {
      const groupedPhotos = markerPhoto.reduce((accumulator, photo) => {
        const { image, persons } = photo;

        const existingImageIndex = accumulator.findIndex(
          item => item.image === image,
        );

        if (existingImageIndex !== -1) {
          const existingPersonsIndex = accumulator[
            existingImageIndex
          ].persons.findIndex(existingPerson => existingPerson === persons[0]);
          if (existingPersonsIndex === -1) {
            accumulator[existingImageIndex].persons.push(persons[0]);
          }
        } else {
          if (persons[0]) {
            accumulator.push({ image, persons: [persons[0]] });
          }
        }

        return accumulator;
      }, []);

      setImageMarker(groupedPhotos);
    }
  }, [markerPhoto, images]);

  useEffect(() => {
    if (imageMarker) {
      let temp = [];
      imageMarker.map(item => {
        item.persons.map(id => {
          const findUser = allSelected.find(user => user.userId === id);
          temp.push({
            ...findUser,
            marker: images.find(key => key.url == item.image)?.key,
          });
        });
      });
      setUsersSelectedPerson(temp);
    }
  }, [imageMarker]);

  useEffect(() => {
    listMarks();
  }, []);

  useEffect(() => {
    const backAction = () => {
      setImages([]);
      setCaptureImage([]);
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const setImagesOnCapture = () => {
      const newImages = captureImage.map(
        (
          item: { uri?: any; filename: any; extension: string | null },
          index: number,
        ) => ({
          key: `${images.length + index + 1}`,
          url: item.uri || '',
          fileName: item.filename,
          markedUsers: [],
          type: item.extension === 'mp4' ? 'video' : 'image',
        }),
      );
      setImages([...images, ...newImages]);
      if (newImages.length > 0) {
        setCaptureImage([]);
      }
    };
    setImagesOnCapture();
  }, [captureImage]);

  return (
    <SafeAreaViewContainer>
      <Container showsVerticalScrollIndicator={false}>
        <ProfileHeader
          userImage={user.profileImage}
          title="Publicação"
          fromComponent="Publications"
          actionHeaderElement1={
            <HeaderButton onPress={savePreview}>
              <ButtonText>Publicar</ButtonText>
            </HeaderButton>
          }
        />
        <MainContainer>
          <LightText>Selecione a categoria</LightText>

          <CategoryList>
            {categorys.map((item, index) => {
              const isSelected = item.name == categorySelected;
              return (
                <CategoryCard key={item.name + index}>
                  <OptionContainer
                    onPress={() => {
                      resetSearchListsAndSelectedData();
                      setCategorySelected(item.name);
                    }}
                    style={
                      isSelected
                        ? { backgroundColor: theme.primarycolor }
                        : { borderWidth: 1 }
                    }>
                    <Image
                      style={item.style}
                      source={isSelected ? item.selectedImage : item.imgSource}
                    />
                  </OptionContainer>
                  <LightText>{item.name}</LightText>
                </CategoryCard>
              );
            })}
          </CategoryList>
          {attachmentFile?.[0] && (
            <DocContainer marginTop marginBottom>
              <DocumentCard
                size="95%"
                absolute={false}
                scale={1}
                docInfos={{
                  name: attachmentFile[0].name,
                  url: attachmentFile[0].uri,
                  size: attachmentFile[0].size,
                }}
                position={{ x: 0, y: 0 }}
                storyDocument={{
                  url: '',
                  name: '',
                }}
              />
              <Ionicons
                name="close"
                size={30}
                color={'#e5e5e5'}
                onPress={() => setAttachmentFile(null)}
              />
            </DocContainer>
          )}

          <PostInput
            audioPath={audioPath}
            metrics={setMetrics}
            setAudio={setAudioPath}
            value={legend}
            setValue={setLegend}
          />

          <AddList>
            <TouchableOpacity
              onPress={() =>
                navigation.push('CameraPub', {
                  nextGaleryRouteName: 'Publication',
                  routeParams: {},
                })
              }>
              <Image
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                source={require('../../Assets/Icons/cameraGrey.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.push('PubliGalery', {
                  nextGaleryRouteName: 'Publication',
                  routeParams: {},
                })
              }>
              <Image
                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                source={require('../../Assets/Icons/galeryGrey.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openFileExplorer()}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  marginRight: -7,
                  marginLeft: -7,
                }}
                source={require('../../Assets/Icons/clip.png')}
              />
            </TouchableOpacity>

            {/*  <TouchableOpacity xonPress={() => handleOptionsAdd("list")}>
                            <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={optionAddSelected == "list" ? require("../../Assets/Icons/menuListBlue.png") : require("../../Assets/Icons/menuList.png")} />
                        </TouchableOpacity> */}

            {movieSelected && (
              <TouchableOpacity onPress={() => handleOptionsAdd('ranking')}>
                <Image
                  style={{ width: 23, height: 23, resizeMode: 'contain' }}
                  source={
                    optionAddSelected == 'ranking'
                      ? require('../../Assets/Icons/faceRankingBlue.png')
                      : require('../../Assets/Icons/faceRanking.png')
                  }
                />
              </TouchableOpacity>
            )}
            {images.length === 0 && (
              <TouchableOpacity
                onPress={() => {
                  handleOptionsAdd('default');
                  handleModalOpen();
                  setUserNoImagem(true);
                }}>
                <Image
                  style={{ width: 23, height: 23, resizeMode: 'contain' }}
                  source={require('../../Assets/Icons/userGrey.png')}
                />
              </TouchableOpacity>
            )}
          </AddList>
          {optionAddSelected === 'list' ? (
            <AddButtons buttons={legendButtons} setButtons={setLegendButtons} />
          ) : optionAddSelected === 'ranking' ? (
            <SetAvaliation
              selectedEmoji={emojiSelected}
              setSelectedEmoji={setEmojiSelected}
            />
          ) : optionAddSelected === 'default' ? (
            <>
              <ScrollView horizontal>
                <GestureHandlerRootView>
                  <View style={{ height: width / 2, marginVertical: 10 }}>
                    <Carousel
                      loop={false}
                      width={(width - 30)}
                      height={width / 2}
                      data={images}
                      scrollAnimationDuration={1000}
                      onSnapToItem={index => {
                        currentItemIndex.value = index;
                      }}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => (
                        <CarouselItem
                          item={item}
                          index={index}
                          currentItemIndex={currentItemIndex}
                          onRemove={() => handleRemoveImage(index)}
                        />
                      )}
                      mode="parallax"
                      windowSize={2}
                    />
                  </View>
                </GestureHandlerRootView>
              </ScrollView>

              {imageMarker && usersSelectedPerson.length > 0 && (
                <>
                  {images.length > 0 && (
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                      {Object.values(
                        transformarMatriz(usersSelectedPerson),
                      ).map((key, index) => {
                        return (
                          <View
                            style={{
                              width: '100%',
                            }}
                            key={index}>
                            <FlatList
                              scrollEnabled={false}
                              data={key}
                              key={index}
                              renderItem={({ item }) => {
                                return (
                                  <AddMarcationPerson
                                    key={item.userName}
                                    marker={item.marker}
                                    userImage={item.profileImage}
                                    userNickname={item.userNickname}
                                    userName={
                                      item.userName
                                        ? item.userName
                                        : item.userNickname
                                    }
                                    closeButton={() =>
                                      handleRemoveUser(item, item.marker)
                                    }
                                  />
                                );
                              }}
                              keyExtractor={(item, index) =>
                                'user' + item.id + index
                              }
                            />
                          </View>
                        );
                      })}
                    </View>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {imageMarker.length < 1 && (
            <>
              <FlatList
                scrollEnabled={false}
                style={{
                  marginHorizontal: 10,
                }}
                data={usersSelectedPerson}
                renderItem={({ item }) => {
                  return (
                    <AddMarcationPerson
                      key={item.userName}
                      marker={item.marker}
                      userImage={item.profileImage}
                      userNickname={item.userNickname}
                      userName={item.name ? item.name : item.userNickname}
                      closeButton={() => handleRemoveUser(item, item.marker)}
                    />
                  );
                }}
                keyExtractor={(item, index) => 'user3' + item.id + index}
              />
            </>
          )}

          {categorySelected == 'Filme' ? (
            <>
              {!movieSelected && (
                <SearchInput
                  marginTop="20px"
                  placeholder={`Digite o nome do ${categorySelected.toLowerCase()}`}
                  value={inputSearch}
                  onTextChange={setInputSearch}
                  resetSearch={resetSearchListsAndSelectedData}
                />
              )}

              {movieSelected ? (
                <SelectedMoviePublication
                  category="Filme"
                  id={movieSelected.tmdbMovieId}
                  marginTop={'5'}
                  onRemove={() => {
                    resetSearchListsAndSelectedData();
                  }}
                  name={movieSelected.name}
                  description={movieSelected.description}
                  ImageUrl={movieSelected.image}
                />
              ) : (
                <>
                  <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                    <FlatList
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={ListDivisor}
                      data={seacrMovieList}
                      renderItem={({ item }) => (
                        <SearchCard
                          onPressFunction={() => {
                            setMovieSelected({
                              name: item.movieTitle,
                              id: item.movieId,
                              description: item.movieOverview,
                              image: item.movieImagens?.poster_sizes?.w342,
                              tmdbMovieId: item.movieId,
                            });

                            useCreatePost.setState({
                              movieSelected: {
                                id: item.movieId,
                                name: item.movieTitle,
                                description: item.movieOverview,
                                image: item.movieImagens?.poster_sizes?.w342,
                              },
                            });
                          }}
                          category="Filme"
                          name={item.movieTitle}
                          description={item.movieOverview}
                          image={item.movieImagens?.poster_sizes?.w342}
                        />
                      )}
                    />
                  </View>
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {(categorySelected === 'Filme' ||
                    categorySelected === 'Série') && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          {categorySelected == 'Série' ? (
            <>
              {!seriesSelected && (
                <SearchInput
                  marginTop="20px"
                  placeholder={`Digite o nome da ${categorySelected.toLowerCase()}`}
                  value={inputSearch}
                  onTextChange={setInputSearch}
                  resetSearch={resetSearchListsAndSelectedData}
                />
              )}

              {inputSearch.length > 0 && seriesSelected ? (
                <SelectedMoviePublication
                  category="Série"
                  id={movieSelected?.tmdbMovieId}
                  marginTop={'5'}
                  onRemove={() => {
                    resetSearchListsAndSelectedData();
                  }}
                  name={seriesSelected.name}
                  description={seriesSelected.description}
                  ImageUrl={seriesSelected.image}
                />
              ) : (
                <>
                  {inputSearch.length > 0 && seacrSeriesList.length == 0 && (
                    <NoDataSearch>Sem resultado encontrado</NoDataSearch>
                  )}
                  <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                    <FlatList
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={ListDivisor}
                      data={seacrSeriesList}
                      keyExtractor={(item, index) => `${item}-${index}`}
                      renderItem={({ item }) => (
                        <SearchCard
                          key={item.id}
                          onPressFunction={() => {
                            setSeriesSelected({
                              name: item.name,
                              description: item.overview,
                              image: getBiggerPosterSize(
                                item.poster_path || '',
                              ),
                              tmdbMovieId: item.id,
                            });

                            useCreatePost.setState({
                              movieSelected: {
                                id: item.id,
                                name: item.name,
                                description: item.overview,
                                image: getBiggerPosterSize(
                                  item.poster_path || '',
                                ),
                              },
                            });
                          }}
                          category="Série"
                          image={getBiggerPosterSize(item.poster_path || '')}
                          name={item.name}
                          description={item.overview}
                        />
                      )}
                    />
                  </View>
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {categorySelected === 'Série' && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          {categorySelected == 'Livro' ? (
            <>
              {!bookSelected && (
                <SearchInput
                  marginTop="20px"
                  placeholder={`Digite o nome do ${categorySelected.toLowerCase()}`}
                  value={inputSearch}
                  onTextChange={setInputSearch}
                  resetSearch={resetSearchListsAndSelectedData}
                />
              )}

              {bookSelected ? (
                <SelectedMoviePublication
                  category="Livro"
                  id={bookSelected.tmdbMovieId}
                  marginTop={'5'}
                  onRemove={() => {
                    resetSearchListsAndSelectedData();
                  }}
                  name={bookSelected.name}
                  description={bookSelected.description}
                  ImageUrl={bookSelected.image}
                />
              ) : (
                <>
                  {inputSearch.length > 0 && seacrBookList.length == 0 && (
                    <NoDataSearch>Sem resultado encontrado</NoDataSearch>
                  )}
                  <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                    <FlatList
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={ListDivisor}
                      data={seacrBookList.items}
                      renderItem={({ item }) => {
                        return (
                          <SearchCard
                            onPressFunction={() => {
                              setBookSelected({
                                name: item.volumeInfo.title,
                                description: item.volumeInfo.description,
                                image:
                                  item.volumeInfo &&
                                  item.volumeInfo.imageLinks.thumbnail
                                    ? `https://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api`
                                    : null,
                                tmdbMovieId: item.id,
                              });

                              useCreatePost.setState({
                                movieSelected: {
                                  name: item.volumeInfo.title,
                                  description: item.volumeInfo.description,
                                  image:
                                    item.volumeInfo &&
                                    item.volumeInfo.imageLinks.thumbnail
                                      ? `https://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api`
                                      : null,
                                },
                              });
                            }}
                            category="Livro"
                            id={item.id}
                            name={item.volumeInfo.title}
                            description={item.volumeInfo.description}
                          />
                        );
                      }}
                    />
                  </View>
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {categorySelected === 'Livro' && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          {categorySelected == 'Música' ? (
            <>
              {!musicSelected && (
                <SearchInput
                  marginTop="20px"
                  placeholder={`Digite o nome da ${categorySelected.toLowerCase()}`}
                  value={inputSearch}
                  onTextChange={setInputSearch}
                  resetSearch={resetSearchListsAndSelectedData}
                />
              )}

              {musicSelected ? (
                <SelectedMoviePublication
                  category="Música"
                  id={movieSelected?.tmdbMovieId}
                  marginTop={'5'}
                  marginBottom={'20'}
                  onRemove={() => {
                    resetSearchListsAndSelectedData();
                  }}
                  name={musicSelected.name}
                  description={musicSelected.description}
                  ImageUrl={musicSelected.image}
                />
              ) : (
                <>
                  {inputSearch.length > 0 && seacrMusicList.length == 0 && (
                    <NoDataSearch>Sem resultado encontrado</NoDataSearch>
                  )}
                  <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                    <FlatList
                      data={seacrMusicList}
                      scrollEnabled={false}
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={ListDivisor}
                      renderItem={({ item, index }) => {
                        return (
                          <SearchCard
                            onPressFunction={() => {
                              setMusicSelected({
                                name: item.name,
                                description: item.artists[0].name,
                                image:
                                  item.album.images && item.album?.images[0]
                                    ? item.album?.images[0].url
                                    : '',
                                tmdbMovieId: item.id,
                              });

                              useCreatePost.setState({
                                movieSelected: {
                                  name: item.name,
                                  description: item.artists[0].name,
                                  image:
                                    item.album.images && item.album?.images[0]
                                      ? item.album?.images[0].url
                                      : '',
                                },
                              });
                            }}
                            category="Música"
                            image={
                              item.album?.images && item.album?.images[0]?.url
                                ? item.album?.images[0].url
                                : ''
                            }
                            name={item.name}
                            description={item.artists[0].name}
                          />
                        );
                      }}
                    />
                  </View>
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {categorySelected === 'Música' && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          {categorySelected == 'Artigo' ? (
            <>
              <InputLink
                placeholder="Digite aqui o seu link"
                value={link}
                onSetText={setLink}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {categorySelected === 'Artigo' && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          {categorySelected == 'Podcast' ? (
            <>
              {!podcastSelected && (
                <InputLink
                  placeholder="Digite aqui o seu link"
                  value={link}
                  onSetText={setLink}
                />
              )}

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -15,
                  justifyContent: 'space-between',
                }}>
                <SpoilerContainer>
                  {categorySelected === 'Podcast' && (
                    <>
                      <OptionContainer
                        onPress={() => setHasSpoiler(!hasSpoiler)}
                        style={
                          hasSpoiler
                            ? { backgroundColor: theme.primarycolor }
                            : { borderWidth: 1 }
                        }>
                        <Image
                          source={
                            hasSpoiler
                              ? require('../../Assets/Icons/spoilerWhite.png')
                              : require('../../Assets/Icons/spoilerGray.png')
                          }
                        />
                      </OptionContainer>
                      <SpoilerText>
                        {hasSpoiler ? 'Spoiler' : 'Spoiler'}
                      </SpoilerText>
                    </>
                  )}
                </SpoilerContainer>
                <CloseContainer>
                  <SpoilerText>Amigos próximos</SpoilerText>
                  <ToggleSwitch
                    value={isClosed}
                    setValue={() => setIsClosed(!isClosed)}
                  />
                </CloseContainer>
              </View>
            </>
          ) : (
            <></>
          )}

          <Modal visible={!!marker} transparent>
            <View
              style={{
                padding: Platform.OS == 'ios' ? 25 : 10,
                backgroundColor: '#FFF',
              }}
            />
            <SafeAreaViewContainer>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  paddingBottom: 5,
                }}>
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color={theme.primarycolor}
                  onPress={() => setMarker(undefined)}
                />
              </View>
              <View>
                <Image
                  style={{
                    width: width,
                    height: height / 4,
                  }}
                  resizeMode="cover"
                  source={{
                    uri: marker?.uri,
                  }}
                />
              </View>
              <ContainerPage>
                <SearchInput
                  marginTop="12px"
                  placeholder="Pesquisar..."
                  onSetText={setInputText}
                  value={inputText}
                />
              </ContainerPage>

              {menoUsers}
              <Button
                typebutton="blue"
                textButton="Concluir"
                pressFunction={() => {
                  setMarker(undefined);
                  setUserNoImagem(false);
                }}
              />
            </SafeAreaViewContainer>
          </Modal>
          <BottomModal
            visibleBottonModal={openUsersModal}
            setvisibleBottonModal={handleModalOpen}
            marginLeftRight="0"
            title=""
            children={
              <>
                <View
                  style={{
                    paddingHorizontal: Platform.OS == 'ios' ? 30 : 20,
                  }}>
                  <SearchInput
                    marginTop="12px"
                    placeholder="Pesquisar..."
                    onSetText={setInputText}
                    value={inputText}
                  />
                </View>

                {menoUsers}

                <Button
                  typebutton="blue"
                  textButton="Concluir"
                  pressFunction={() => {
                    handleModalOpen();
                  }}
                />
              </>
            }
          />
        </MainContainer>
        <Info
          setVissible={setshowSmallPopup}
          isVisible={showSmallPopup}
          text={popoutText}
        />
      </Container>
    </SafeAreaViewContainer>
  );
}
