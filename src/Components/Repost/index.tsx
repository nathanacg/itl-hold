/* eslint-disable react-native/no-inline-styles */
import React, {
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
  ImageBackground,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { Icon } from 'react-native-elements';
import { theme } from '../../Theme/theme';
import { emojiFace } from '../../Utils/emojiFaceAvaliation';

import {
  Container,
  PostLegend,
  AvaliationConteiner,
  AvaliationText,
  Likes,
  MarkText,
  MaskButtonText,
  Bold,
  MaskSpoiler2,
  IndexContainer,
  MarkedUserNameContainer,
  MarkedUserName,
  PostLegendRepost,
} from './style';

import PostFooter from '../PostFooter';
import PostComment from '../PostComment';
import PostOptions from '../PostOptions';
import BottomModal from '../BottomModal';
import SelectedLink from '../SelectedLink';
import DocumentCard from '../DocumentCard';
import SelectedMovie from '../SelectedMovie';
import HeaderPublication from '../HeaderPost';
import NavigateToProfile from '../NavigatetoProfile';
import HeaderPublicationRepost from '../HeaderPublicationRepost';
import AudioMessageReceived from '../PostInput/AudioMessageReceived';

import ComentsList from '../../Pages/Feed/components/ComentsList';
import LikesList from '../../Pages/Feed/components/LikesList';

import { DocContainer } from '../../Pages/Publication/style';
import { CarouselIndex, MarkedContainer } from '../PostImage/style';

import { AllTypesPostsFeed } from '../../Types/discriminator';

import { getFindSerie } from '../../Service/Tv';
import { getProfile } from '../../Service/Profile';
import { getVolumeBookId } from '../../Service/Books';
import { deleteLike, getLikes, newLike } from '../../Service/Like';
import {
  deleteRepost,
  getMovie,
  getMusic,
  updatePost,
} from '../../Service/Publications';

import useFeedData from '../../GlobalState/feed.zustand';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';

import { MovieProps } from '../../Types/postProps';
import { MediaSecundary, RootMedia, medias } from '../../Types/feedProps';

import { useNotification } from '../../context/notification';
import PostImage from '../PostImage';

interface postProps {
  index: number;
  hiddenPostLegend?: boolean;
  userNicknameRepost: string;
  profileImageRepost: string;
  postDateRepost: string;
  postLegendRepost: string;
  userNickname: string;
  profileImage: string;
  followingUser: number;
  medias: medias[];
  postLegend: string;
  avaliationPost?: string;
  postActions: boolean;
  isClosed: number;
  handleOpenBottomModal?: (type: 'comments' | 'likes') => void;
  paddingTop?: string;
  postHexId: string;
  repostHexId: string;
  userId: number;
  userIdRepost: number;
  postDate: string;
  user_verified: number;
  postColor?: string;
  hasSpoiler?: boolean;
  tmdbMovieId: string | number | null;
  postId: number;
  isArquivaded?: boolean;
  isSaved: boolean;
  showLikes: boolean;
  mediaImage?: any;
  Actions?: boolean;
  setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>;
  repostData: AllTypesPostsFeed;
  repostScreen?: boolean;
  mediaSecundary?: RootMedia[];
  postCategorie: string;
  link?: string | null;
}

const Repost = memo((props: postProps) => {
  const { user } = useUserProfile();

  const navigation = useNavigation<StackRoutes>();
  const { setRepost, setPost } = useOtherProfilePost();
  const inputRef = useRef<TextInput>(null);
  const [newLegend, setNewLegend] = useState(props.postLegend);
  const [hideSpoiler, setHideSpoiler] = useState<boolean>(false);
  const [markers, setMarkers] = useState<boolean>(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itemValue, setItemValue] = useState<MediaSecundary[] | undefined>();
  const [likes, setLikes] = useState([]);
  const [postOptionsModal, setPostOptionsModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);
  const [typeBottonModal, setTypeButtonModal] = useState<
    'Comentários' | 'Curtidas'
  >('Comentários');
  const { sendNotificationLikedPost } = useNotification();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const hasAudioMedia = (props?.medias || []).some(
    media => media.mediaExtension === 'm4a',
  );
  const audioMedia = (props?.medias || []).find(
    media => media.mediaExtension === 'm4a',
  );
  const getImagePost =
    itemValue && itemValue.find(media => media.mediaExtension == 'jpg');
  const [listMedias, setListMedias] = useState([]);
  const [movie, setMovie] = useState<MovieProps>();
  const { initializeFeed } = useFeedData();
  const [arquive, setArquive] = useState<medias[]>();

  const handleEdit = () => {
    setPostOptionsModal(false);
    setOnEdit(!onEdit);
    inputRef.current?.focus();
  };

  const getSpoilerState = async () => {
    await getProfile()
      .then(res => {
        setHideSpoiler(res.data.allow_spoiler === 1 ? true : false);
      })
      .catch(error => console.log(error));
  };

  const handleNavigateToRepostScreen = () => {
    setRepost(props.repostData);
    navigation.push('RepostScreen');
  };

  const handleNavigateToPostScreen = () => {
    setPost({ ...props });
    navigation.push('PostScreen', {
      postHexId: props.postHexId,
      postId: props.postId,
    });
  };

  const updateLikes = () => {
    getLikes(props.repostHexId)
      .then(res => {
        setLikes(res.data.users);
      })
      .catch(e => {
        console.warn('GetLikes - Repost');
        console.error(e);
      });
  };

  const setUpdatePost = async () => {
    await updatePost({
      postHexId: props.postHexId,
      postLegend: newLegend,
      marked_users: [],
    });
    setOnEdit(false);
  };

  const deleteMyPost = async () => {
    deleteRepost(props.repostHexId)
      .then(res => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
        initializeFeed();
      })
      .catch(e => {
        console.warn('DeletePost - Repost');
        console.error(e);
      });
  };

  useEffect(() => {
    if (!!props.tmdbMovieId && props.postCategorie == 'Filme') {
      getMovie(Number(props.tmdbMovieId))
        .then(res => {
          setMovie(res.data);
        })
        .catch(e => {
          console.warn('GetMovie - Post');
          console.error(e);
        })
        .finally(() => setLoading(false));
    } else if (!!props.tmdbMovieId && props.postCategorie == 'Série') {
      getFindSerie(props.tmdbMovieId.toString(), 'w342')
        .then(res => {
          setMovie({
            ...res,
            movieId: props.tmdbMovieId,
          });
        })
        .catch(err => {
          console.warn('ERRO AO FAZER REQUEST NA API DE DETALHES DA SERIE');
          console.error(JSON.stringify(err));
        })
        .finally(() => setLoading(false));
    } else if (!!props.tmdbMovieId && props.postCategorie == 'Música') {
      getMusic(props.tmdbMovieId?.toString())
        .then(response => {
          setMovie(response.data);
        })
        .catch(e => {
          console.warn('GetMusicId - Post');
          console.error(e);
        })
        .finally(() => setLoading(false));
    } else if (!!props.tmdbMovieId && props.postCategorie == 'Livro') {
      getVolumeBookId(props.tmdbMovieId?.toString())
        .then(response => {
          function removeHtmlTags(htmlString: string) {
            return htmlString.replace(/<[^>]*>/g, '');
          }
          const descriptionWithoutHtml = removeHtmlTags(
            response.volumeInfo.description,
          );
          setMovie({
            movieTitle: response.volumeInfo.title,
            movieId: props.tmdbMovieId?.toString(),
            movieOverview: descriptionWithoutHtml,
            movieDate: response.volumeInfo.publishedDate,
            movieImagens: response.volumeInfo.imageLinks.thumbnail
              ? response.volumeInfo.imageLinks.thumbnail
              : '',
          });
        })
        .catch(e => {
          console.warn('GetVolumeBookId - Post');
          console.error(e);
        })
        .finally(() => setLoading(false));
    } else {
      setMovie({
        movieTitle: undefined,
        movieId: undefined,
        movieOverview: undefined,
        movieDate: undefined,
        movieImagens: undefined,
      });
    }
  }, []);

  useEffect(() => {
    getSpoilerState();
    if (props.hasSpoiler) {
      setHideSpoiler(true);
    }
  }, []);

  useEffect(() => {
    updateLikes();
  }, []);

  useEffect(() => {
    if (inputRef.current && onEdit === true) {
      setTimeout(() => {
        inputRef.current?.blur();
        inputRef.current?.focus();
      }, 100);
    }
  }, [onEdit]);

  useEffect(() => {
    if (props.mediaSecundary) {
      setItemValue(props.mediaSecundary.medias);
    }
  }, []);

  const handleFileSelection = (url: any) => {
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.error('Cannot handle URL: ' + url);
        } else {
          console.log('URL opened: ' + url);
        }
      })
      .catch(e => {
        console.warn('DownloadFile - Post');
        console.log(e);
      });
  };

  useEffect(() => {
    const filteredMedias = props.medias
      ? (props.medias?.filter(
        media =>
          media.mediaExtension == 'jpeg' ||
          media.mediaExtension == 'png' ||
          media.mediaExtension == 'jpg',
      ) as medias[])
      : null;
    setListMedias(filteredMedias);

    const getArquives = props.medias
      ? (props.medias?.filter(
        media => media.mediaType == 'application/pdf',
      ) as medias[])
      : null;
    if (getArquives?.length == 0) {
      return;
    }
    setArquive(getArquives);
  }, [props.medias]);

  const handleBottonModal = (type: 'Comentários' | 'Curtidas') => {
    setvisibleBottonModal(!visibleBottonModal);
    setTypeButtonModal(type);
  };

  const handleLike = async () => {
    if (!liked) {
      try {
        await newLike({ postHexId: props.repostHexId });
        setLikeCount(pv => pv + 1);
        updateLikes();
        sendNotificationLikedPost(props.postHexId);
        setLiked(true);
      } catch (error) {
        console.warn('NewLike - Repost');
        console.error(error);
      }
    } else if (liked) {
      try {
        await deleteLike({ postHexId: props.repostHexId });
        setLikeCount(pv => pv - 1);
        updateLikes();
        setLiked(false);
      } catch (error) {
        console.warn('DeleteLike - Repost');
        console.error(error);
      }
    }
  };
  // console.log('Repost props', props);
  // console.log('Repost medias', props.medias);
  // console.log('On Repost', listMedias.length);
  return (
    <View
      style={
        props.index == 0 && {
          borderTopWidth: 1,
          borderTopColor: '#11111110',
          paddingTop: 10,
        }
      }>
      <HeaderPublication
        postCategorie={props.postCategorie}
        userId={props.userIdRepost}
        postDate={props.postDateRepost}
        postSpoiler={props.hasSpoiler ? 1 : 0}
        onEdit={onEdit}
        Actions={props.Actions}
        index={props.index}
        onSave={setUpdatePost}
        userNickname={props.userNicknameRepost}
        profileImage={props.profileImageRepost}
        hasSpoiler={props.hasSpoiler}
        showSpoiler={!hideSpoiler}
        action={() => setPostOptionsModal(!postOptionsModal)}
      />
      <Container paddingTop={props.paddingTop}>
        <TouchableOpacity
          onPress={handleNavigateToRepostScreen}
          disabled={props.repostScreen}
          style={{
            width: '100%',
          }}>
          {props.postLegendRepost ? (
            <PostLegend>{props.postLegendRepost}</PostLegend>
          ) : (
            <View style={{ height: 10 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToPostScreen}
          style={{
            width: 360,
            alignSelf: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#d3d3d3',
          }}>
          <HeaderPublicationRepost
            userId={props.postId}
            postDate={props.postDate}
            onEdit={false}
            user_verified={props.user_verified}
            onSave={setUpdatePost}
            userNickname={props.userNickname}
            profileImage={props.profileImage}
            hasSpoiler={props.hasSpoiler}
            showSpoiler={!hideSpoiler}
            action={() => setPostOptionsModal(!postOptionsModal)}
          />
          <Container paddingTop={props.paddingTop}>
            {hideSpoiler && (
              <MaskSpoiler2>
                <Image
                  style={{ marginTop: 100 }}
                  source={require('../../Assets/Icons/spoilerIcon.png')}
                />
                <MarkText>
                  Publicação ocultada por conter <Bold>spoiler.</Bold>
                </MarkText>
                <TouchableOpacity onPress={() => setHideSpoiler(!hideSpoiler)}>
                  <MaskButtonText>Ver spoiler</MaskButtonText>
                </TouchableOpacity>
              </MaskSpoiler2>
            )}

            {!props.postLegend &&
              !arquive &&
              !hasAudioMedia &&
              props.medias && <View style={{ marginTop: -24 }} />}

            {arquive && (
              <>
                {arquive?.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => handleFileSelection(arquive?.[0]?.mediaUrl)}
                    style={{
                      marginLeft: '5%',
                      width: '93%',
                      marginBottom: hasAudioMedia ? -18 : 0,
                      marginTop: -10,
                    }}>
                    <DocContainer>
                      <DocumentCard
                        absolute={false}
                        size={''}
                        scale={1}
                        docInfos={{
                          name: arquive?.[0]?.mediaName,
                          url: arquive ? arquive?.[0]?.mediaUrl : '',
                          size: arquive?.[0]?.mediaSize,
                        }}
                      />
                    </DocContainer>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleFileSelection}
                    style={{
                      marginLeft: '5%',
                      width: '93%',
                      marginTop: -15,
                      marginBottom: -8,
                    }}>
                    <DocContainer>
                      <DocumentCard
                        absolute={false}
                        scale={1}
                        docInfos={{
                          name: props.medias?.[0]?.mediaName,
                          url: props.medias?.[0]?.mediaUrl,
                          size: props.medias?.[0]?.mediaSize,
                        }}
                        position={{ x: 0, y: 0 }}
                        storyDocument={{
                          url: '',
                          name: '',
                        }}
                      />
                    </DocContainer>
                  </TouchableOpacity>
                )}
              </>
            )}

            {hasAudioMedia && (
              <View
                style={{
                  paddingHorizontal: '5%',
                  marginVertical: '2%',
                  width: '100%',
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <AudioMessageReceived
                  uri={audioMedia.mediaUrl}
                  configAudMetrics={[
                    -33.92938995361328, -38.041709899902344,
                    -41.189544677734375, -35.6361083984375, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -39.822540283203125, -33.92938995361328,
                    -38.041709899902344, -41.189544677734375, -35.6361083984375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -39.822540283203125,
                    -42.133541107177734, -42.133541107177734,
                    -32.26824188232422, -32.26824188232422, -13.833025932312012,
                    -13.833025932312012, -24.762142181396484,
                    -24.762142181396484, -23.383811950683594,
                    -23.383811950683594, -21.76665687561035, -21.76665687561035,
                    -16.243961334228516, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -38.041709899902344,
                    -41.189544677734375, -38.041709899902344,
                    -41.189544677734375, -38.041709899902344,
                    -41.189544677734375, -35.6361083984375, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -39.822540283203125, -33.92938995361328,
                    -38.041709899902344, -41.189544677734375, -35.6361083984375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -39.822540283203125,
                    -42.133541107177734, -42.133541107177734,
                    -32.26824188232422, -32.26824188232422, -13.833025932312012,
                    -13.833025932312012, -24.762142181396484,
                    -24.762142181396484, -23.383811950683594,
                    -23.383811950683594, -21.76665687561035, -21.76665687561035,
                    -16.243961334228516, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -38.041709899902344,
                    -41.189544677734375, -38.041709899902344,
                    -41.189544677734375, -35.6361083984375, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -39.822540283203125, -33.92938995361328,
                    -38.041709899902344, -41.189544677734375, -35.6361083984375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -39.822540283203125,
                    -42.133541107177734, -42.133541107177734,
                    -32.26824188232422, -32.26824188232422, -13.833025932312012,
                    -13.833025932312012, -24.762142181396484,
                    -24.762142181396484, -23.383811950683594,
                    -23.383811950683594, -21.76665687561035, -21.76665687561035,
                    -16.243961334228516, -22.325828552246094,
                    -20.04671287536621, -26.937410354614258, -37.697021484375,
                    -22.325828552246094, -20.04671287536621,
                    -26.937410354614258, -37.697021484375, -38.041709899902344,
                    -41.189544677734375, -38.041709899902344,
                    -41.189544677734375,
                  ]}
                  repost
                />
              </View>
            )}

            {!props.postColor && (
              <PostLegendRepost>{newLegend}</PostLegendRepost>
            )}
            {props.avaliationPost && (
              <AvaliationConteiner>
                <AvaliationText>
                  Avaliou como
                  <Text
                    style={
                      props.avaliationPost == 'Excelente'
                        ? { color: '#44AB1B' }
                        : props.avaliationPost == 'Bom'
                          ? { color: '#B6CE3A' }
                          : props.avaliationPost == 'Nada mal'
                            ? { color: '#F9C900' }
                            : props.avaliationPost == 'Ruim'
                              ? { color: '#F28A19' }
                              : props.avaliationPost == 'Muito ruim' && {
                                color: '#EA3106',
                              }
                    }>
                    {` ${props.avaliationPost}`}
                  </Text>
                </AvaliationText>
                {props.avaliationPost && (
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={
                      emojiFace.find(item => item.name === props.avaliationPost)
                        ?.selectedImage
                    }
                  />
                )}
              </AvaliationConteiner>
            )}
            {props.postColor && listMedias.length < 1 && (
              <ImageBackground
                source={require('../../Assets/Image/background_app.png')}
                defaultSource={require('../../Assets/Image/background_app.png')}
                style={{
                  width: '100%',
                  height: 250,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: props.postColor
                    ? props.postColor.split('&')[0]
                    : '#FFF',
                }}>
                <PostLegend
                  style={{
                    color: props.postColor
                      ? props.postColor.split('&')[1]
                      : '#000',
                  }}>
                  {newLegend}
                </PostLegend>
              </ImageBackground>
            )}

            {listMedias.length > 0 && (
              <>
                <PostImage handleLike={handleLike} medias={listMedias} />
              </>
            )}

            {movie && props.tmdbMovieId !== null && (
              <View
                style={{
                  marginLeft: 15,
                }}>
                <SelectedMovie
                  category={props.postCategorie}
                  name={movie.movieTitle}
                  preview
                  loading={loading}
                  marginTop="10"
                  id={props.tmdbMovieId}
                  description={movie.movieOverview}
                  ImageUrl={
                    (movie.movieImagens && props.postCategorie == 'Música') ||
                      (movie.movieImagens && props.postCategorie == 'Livro') ||
                      (movie.movieImagens && props.postCategorie == 'Série')
                      ? movie.movieImagens
                      : movie?.movieImagens?.poster_sizes?.w342
                  }
                />
              </View>
            )}

            {props.postCategorie === 'Artigo' &&
              props.link &&
              props.link?.length > 0 && (
                <SelectedLink description={props.link || ''} />
              )}

            {props.postCategorie === 'Podcast' &&
              props.link &&
              props.link?.length > 0 && (
                <SelectedLink description={props.link || ''} />
              )}
          </Container>
        </TouchableOpacity>
      </Container>

      {props.postActions && (
        <View>
          <PostFooter
            openComment={() => handleBottonModal('Comentários')}
            likeList={likes}
            userId={props.userId}
            updateLikes={updateLikes}
            liked={liked}
            showLikes={props.showLikes}
            repostEnabled={false}
            postHexId={props.repostHexId}
            handleLike={handleLike}
            repost={props.repostHexId}
            isRepost
            setLiked={setLiked}
            postId={props.postId}
            isSaved={props.isSaved}
            mediaImage={props.mediaImage}
            userImage={props.profileImage}
            userNickname={props.userNickname}
            time={props.postDate}
            legend={props.postLegend}
            tmdbMovieId={props.tmdbMovieId}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => {
                // setPostId(props.postHexId)
                handleBottonModal('Curtidas');
              }}>
              {props.showLikes && (
                <Likes>
                  {likes.length} {likes.length > 1 ? 'curtidas' : 'curtida'}
                </Likes>
              )}

              {!props.showLikes && likes.length > 0 && (
                <Likes>{`Curtido por ${likes.sort()[0].userNickname}`}</Likes>
              )}
            </TouchableOpacity>
          </View>
          <PostComment
            createdAt={props.postDateRepost}
            profileImage={user.profileImage}
            postHexId={props.repostHexId}
            openComment={() => handleBottonModal('Comentários')}
          />
        </View>
      )}

      <PostOptions
        followEnable
        postUrl={`https://post.intellectus.app.br/${props.postHexId}`}
        visibleBottonModal={postOptionsModal}
        setvisibleBottonModal2={setvisibleBottonModal}
        setvisibleBottonModal={() => setPostOptionsModal(!postOptionsModal)}
        admin={props.userId == user.userId ? true : false}
        onEdit={handleEdit}
        onDelete={deleteMyPost}
        postUserId={props.userIdRepost}
        followingUser={props.followingUser}
        postHexId={props.repostHexId}
        isArquivaded={props.isArquivaded}
        postId={props.postId}
        userNickname={props.userNicknameRepost}
        profileImage={props.profileImageRepost}
        userId={props.userIdRepost}
      />
      <BottomModal
        visibleBottonModal={visibleBottonModal}
        setvisibleBottonModal={setvisibleBottonModal}
        title={typeBottonModal}
        marginLeftRight="0"
        children={
          <>
            {typeBottonModal === 'Comentários' && (
              <ComentsList
                setvisibleBottonModal={setvisibleBottonModal}
                postId={props.repostHexId}
              />
            )}
            {typeBottonModal === 'Curtidas' && (
              <LikesList postId={props.repostHexId} />
            )}
          </>
        }
      />
    </View>
  );
});

export default Repost;
