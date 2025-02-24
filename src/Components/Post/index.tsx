import { memo, useEffect, useRef, useState } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
  ImageURISource,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { theme } from '../../Theme/theme';

import { emojiFace } from '../../Utils/emojiFaceAvaliation';

import { useNotification } from '../../context/notification';

import { ILikes, MovieProps, PostProps } from '../../Types/postProps';
import { medias } from '../../Types/feedProps';

import PostImage from '../PostImage';
import PostFooter from '../PostFooter';
import PostComment from '../PostComment';
import PostOptions from '../PostOptions';
import BottomModal from '../BottomModal';
import SelectedLink from '../SelectedLink';
import DocumentCard from '../DocumentCard';
import SelectedMovie from '../SelectedMovie';
import HeaderPublication from '../HeaderPost';

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
  MaskSpoiler3,
  MaskSpoiler4,
  MaskSpoiler,
} from './style';

import AudioMessageReceived from '../PostInput/AudioMessageReceived';
import ComentsList from '../../Pages/Feed/components/ComentsList';
import LikesList from '../../Pages/Feed/components/LikesList';
import BackgroundImage from './components/BackgroundImage';

import { DocContainer } from '../../Pages/Publication/style';
import { PostLegendText } from '../../Pages/PostPreview/style';

import { getFindSerie } from '../../Service/Tv';
import { getProfile } from '../../Service/Profile';
import { getVolumeBookId } from '../../Service/Books';
import { deleteLike, getLikes, newLike } from '../../Service/Like';
import {
  deletePost,
  getMovie,
  getMusic,
  updatePost,
} from '../../Service/Publications';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import useFeedData from '../../GlobalState/feed.zustand';
import React from 'react';

const Post = memo((props: PostProps) => {
  const navigation = useNavigation<StackRoutes>();

  const { user } = useUserProfile();
  const { initializeFeed } = useFeedData();
  const { sendNotificationLikedPost } = useNotification();

  const inputRef = useRef<TextInput>(null);

  const [newLegend, setNewLegend] = useState(props.postLegend);

  const [hideSpoiler, setHideSpoiler] = useState<boolean>(false);
  const [arquive, setArquive] = useState<medias[]>();

  const [likes, setLikes] = useState<ILikes[]>([]);
  const [postOptionsModal, setPostOptionsModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);
  const [typeBottonModal, setTypeButtonModal] = useState<
    'Comentários' | 'Curtidas'
  >('Comentários');
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  const hasAudioMedia = (props?.medias || []).some(
    media => media.mediaExtension === 'm4a',
  );
  const audioMedia = (props?.medias || []).find(
    media => media.mediaExtension === 'm4a',
  );

  const [movie, setMovie] = useState<MovieProps>({} as MovieProps);
  const [emoji, setEmoji] = useState<ImageURISource>({} as ImageURISource);
  const [listMedias, setListMedias] = useState<medias[]>([]);
  const [openMarkers, setOpenMarkers] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const handleEdit = () => {
    setPostOptionsModal(false);
    setOnEdit(!onEdit);
    inputRef.current?.focus();
  };

  const updateLikes = () => {
    getLikes(props.postHexId)
      .then(res => {
        setLikes(res.data.users);
      })
      .catch(e => {
        console.warn('UpdateLikes - Post');
        console.log(e);
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

  const deleteMyPost = () => {
    deletePost(props.postHexId)
      .then(res => {
        const isFromRoom = Boolean(props?.roomId);

        if (navigation.canGoBack() && !isFromRoom) {
          navigation.goBack();
        }
        // initializeFeed()
      })
      .catch(e => {
        console.warn('DeleteMyPost - Post');
        console.log('erro ao deletar publicação.', e);
      });
  };

  const handleBottonModal = (type: 'Comentários' | 'Curtidas') => {
    setvisibleBottonModal(!visibleBottonModal);
    setTypeButtonModal(type);
  };

  const getSpoilerState = async () => {
    await getProfile()
      .then(res => {
        setHideSpoiler(res.data.allow_spoiler === 1 ? true : false);
      })
      .catch(error => {
        console.log('erro ao obter se o usuário permite ver spoiler.', error);
      });
  };

  const handleLike = async (notUnLiked?: boolean) => {
    if (!liked) {
      await newLike({ postHexId: props.postHexId });
      setLikeCount(pv => pv + 1);
      updateLikes();
      sendNotificationLikedPost(props.postHexId);
      setLiked(true);
    } else if (!notUnLiked) {
      await deleteLike({ postHexId: props.postHexId });
      setLikeCount(pv => pv - 1);
      updateLikes();
      setLiked(false);
    }
  };

  const inputStyle = {
    margin: 14,
    backgroundColor: '#fbfbfb',
    fontSize: 16,
    color: theme.inputTextColor,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderColor: '#0245F4',
    borderWidth: 0.5,
    borderRadius: 6,
  };

  const handleFileSelection = (url: string) => {
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
    if (!!props.tmdbMovieId && props.postCategorie == 'Filme') {
      getMovie(Number(props.tmdbMovieId))
        .then(res => {
          setMovie(res.data);
        })
        .catch(e => {
          console.warn('GetMovie - Post');
          console.log(e);
        })
        .finally(() => setLoading(false));
    } else if (!!props.tmdbMovieId && props.postCategorie == 'Série') {
      getFindSerie(props.tmdbMovieId.toString(), 'w342')
        .then(res => {
          setMovie({
            ...res,
            movieId: props.tmdbMovieId,
          });
        }).catch(err => {
          console.warn(
            'ERRO AO FAZER REQUEST NA API DE DETALHES DA SERIE',
            err,
          );
        })
        .finally(() => setLoading(false));
    } else if (!!props.tmdbMovieId && props.postCategorie == 'Música') {
      getMusic(props.tmdbMovieId.toString())
        .then(response => {
          setMovie({
            movieTitle: response.data.name,
            movieId: response.data.id,
            movieOverview: response.data.artists[0].name,
            movieDate: response.data.album.release_date,
            movieImagens: response.data.album.images[0].url,
          });
        }).catch(error => {
          console.warn('ERRO AO FAZER REQUEST NA API DE MUSICAS', error);
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
            movieImagens: !!response.volumeInfo.imageLinks.thumbnail
              ? `https://books.google.com/books/content?id=${props.tmdbMovieId}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api`
              : null,
          });
        }).catch(e => {
          console.warn('GetVolumeBookId - Post');
          console.log(e);
        })
        .finally(() => setLoading(false));
    } else {
      setMovie({
        movieTitle: '',
        movieId: '',
        movieOverview: '',
        movieDate: '',
        movieImagens: '',
      });
    }

    getSpoilerState();
  }, []);

  useEffect(() => {
    updateLikes();
    const findedEmoji = emojiFace.find(
      item => item.name === props.avaliationPost,
    );
    if (findedEmoji) {
      setEmoji(findedEmoji.selectedImage);
    }
  }, []);

  useEffect(() => {
    const filteredMedias = props.medias
      ? (props.medias?.filter(
        media =>
          media.mediaExtension == 'jpeg' ||
          media.mediaExtension == 'png' ||
          media.mediaExtension == 'jpg' ||
          media.mediaExtension == 'mp4')) as medias[] : null;

    const getArquives = props.medias
      ? (props.medias?.filter(
        media => media.mediaType == 'application/pdf',
      ) as medias[])
      : null;
    setListMedias(filteredMedias);
    if (getArquives?.length == 0) {
      return;
    }
    setArquive(getArquives);
  }, [props.medias]);

  useEffect(() => {
    if (inputRef.current && onEdit) {
      setTimeout(() => {
        inputRef.current?.blur();
        inputRef.current?.focus();
      }, 100);
    }
  }, [onEdit]);

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
        index={props.index}
        postCategorie={props.postCategorie}
        userId={props.userId}
        postDate={props.postDate}
        onEdit={onEdit}
        postSpoiler={props.postSpoiler}
        Actions={props.Actions}
        onSave={setUpdatePost}
        userNickname={props.userNickname}
        profileImage={props.profileImage}
        hasSpoiler={props.hasSpoiler}
        showSpoiler={!hideSpoiler}
        action={() => setPostOptionsModal(!postOptionsModal)}
      />

      <Container paddingTop={props.paddingTop}>
        {props.postSpoiler === '1' && props.userId !== user.userId && (
          <>
            {!hideSpoiler && props.postColor && props.postColor.length > 0 && (
              <MaskSpoiler>
                <Image
                  style={{ marginTop: 100 }}
                  source={require('../../Assets/Icons/spoilerIcon.png')}
                />
                <MarkText>
                  Publicação ocultada por {'\n'}conter <Bold>spoiler.</Bold>
                </MarkText>
                <TouchableOpacity onPress={() => setHideSpoiler(!hideSpoiler)}>
                  <MaskButtonText>Ver spoiler</MaskButtonText>
                </TouchableOpacity>
              </MaskSpoiler>
            )}
            {!hideSpoiler && props.tmdbMovieId == null && (
              <MaskSpoiler2>
                <Image
                  style={{ marginTop: 100 }}
                  source={require('../../Assets/Icons/spoilerIcon.png')}
                />
                <MarkText>
                  Publicação ocultada por {'\n'}conter <Bold>spoiler.</Bold>
                </MarkText>
                <TouchableOpacity onPress={() => setHideSpoiler(!hideSpoiler)}>
                  <MaskButtonText>Ver spoiler</MaskButtonText>
                </TouchableOpacity>
              </MaskSpoiler2>
            )}

            {!hideSpoiler && hasAudioMedia && (
              <MaskSpoiler4>
                <Image
                  style={{ marginTop: 100 }}
                  source={require('../../Assets/Icons/spoilerIcon.png')}
                />
                <MarkText>
                  Publicação ocultada por {'\n'}conter <Bold>spoiler.</Bold>
                </MarkText>
                <TouchableOpacity onPress={() => setHideSpoiler(!hideSpoiler)}>
                  <MaskButtonText>Ver spoiler</MaskButtonText>
                </TouchableOpacity>
              </MaskSpoiler4>
            )}
            {!hideSpoiler &&
              props.medias &&
              props.medias?.length > 0 &&
              !hasAudioMedia && (
                <MaskSpoiler3>
                  <Image
                    style={{ marginTop: 100 }}
                    source={require('../../Assets/Icons/spoilerIcon.png')}
                  />
                  <MarkText>
                    Publicação ocultada por {'\n'}conter <Bold>spoiler.</Bold>
                  </MarkText>
                  <TouchableOpacity
                    onPress={() => setHideSpoiler(!hideSpoiler)}>
                    <MaskButtonText>Ver spoiler</MaskButtonText>
                  </TouchableOpacity>
                </MaskSpoiler3>
              )}
          </>
        )}

        {onEdit && (
          <TextInput
            style={inputStyle}
            ref={inputRef}
            value={newLegend}
            onChangeText={setNewLegend}
            autoFocus
          />
        )}
        {!onEdit && !props.hiddenPostLegend && (
          <>
            {props.postColor && !props.screen ? (
              <>
                <View
                  style={{
                    backgroundColor: props?.postColor.split('&')[0],
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                  }}>
                  <PostLegendText
                    style={{
                      color: props?.postColor.split('&')[1],
                    }}>
                    {newLegend}
                  </PostLegendText>
                </View>
              </>
            ) : (
              <>
                {newLegend ? (
                  <PostLegend>{newLegend}</PostLegend>
                ) : (
                  <View style={{ height: 10 }} />
                )}
              </>
            )}
          </>
        )}
        {arquive && (
          <>
            {arquive?.length > 0 ? (
              <TouchableOpacity
                onPress={() => handleFileSelection(arquive?.[0]?.mediaUrl)}
                style={{
                  marginLeft: '5%',
                  width: '93%',
                  marginBottom: hasAudioMedia ? -18 : 6,
                  marginTop: -15,
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
                    position={{ x: 0, y: 0 }}
                    storyDocument={{
                      url: '',
                      name: '',
                    }}
                  />
                </DocContainer>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleFileSelection(
                    props.medias ? props.medias[0].mediaUrl : '',
                  )
                }
                style={{
                  marginLeft: '5%',
                  width: '93%',
                  marginTop: -15,
                  marginBottom: -8,
                }}>
                <DocContainer>
                  <DocumentCard
                    absolute={false}
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

        {hasAudioMedia && props.postLegend.length > 0 && (
          <View
            style={{
              marginTop: !arquive ? 0 : 30,
              width: '91%',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: props.hiddenPostLegend ? 10 : 10,
            }}>
            <AudioMessageReceived
              uri={audioMedia.mediaUrl}
              configAudMetrics={[
                -33.92938995361328, -38.041709899902344, -41.189544677734375,
                -35.6361083984375, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -39.822540283203125,
                -33.92938995361328, -38.041709899902344, -41.189544677734375,
                -35.6361083984375, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -39.822540283203125,
                -42.133541107177734, -42.133541107177734, -32.26824188232422,
                -32.26824188232422, -13.833025932312012, -13.833025932312012,
                -24.762142181396484, -24.762142181396484, -23.383811950683594,
                -23.383811950683594, -21.76665687561035, -21.76665687561035,
                -16.243961334228516, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -22.325828552246094,
                -20.04671287536621, -26.937410354614258, -37.697021484375,
                -38.041709899902344, -41.189544677734375, -38.041709899902344,
                -41.189544677734375, -38.041709899902344, -41.189544677734375,
                -35.6361083984375, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -39.822540283203125,
                -33.92938995361328, -38.041709899902344, -41.189544677734375,
                -35.6361083984375, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -39.822540283203125,
                -42.133541107177734, -42.133541107177734, -32.26824188232422,
                -32.26824188232422, -13.833025932312012, -13.833025932312012,
                -24.762142181396484, -24.762142181396484, -23.383811950683594,
                -23.383811950683594, -21.76665687561035, -21.76665687561035,
                -16.243961334228516, -22.325828552246094, -20.04671287536621,
                -26.937410354614258, -37.697021484375, -22.325828552246094,
                -20.04671287536621, -26.937410354614258, -37.697021484375,
                -38.041709899902344, -41.189544677734375, -38.041709899902344,
                -41.189544677734375, -35.6361083984375, -22.325828552246094,
                -20.04671287536621, -26.937410354614258, -37.697021484375,
                -39.822540283203125, -33.92938995361328, -38.041709899902344,
                -41.189544677734375, -35.6361083984375, -22.325828552246094,
                -20.04671287536621, -26.937410354614258, -37.697021484375,
                -39.822540283203125, -42.133541107177734, -42.133541107177734,
                -32.26824188232422, -32.26824188232422, -13.833025932312012,
                -13.833025932312012, -24.762142181396484, -24.762142181396484,
                -23.383811950683594, -23.383811950683594, -21.76665687561035,
                -21.76665687561035, -16.243961334228516, -22.325828552246094,
                -20.04671287536621, -26.937410354614258, -37.697021484375,
                -22.325828552246094, -20.04671287536621, -26.937410354614258,
                -37.697021484375, -38.041709899902344, -41.189544677734375,
                -38.041709899902344, -41.189544677734375,
              ]}
              feed
            />
          </View>
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
            {emoji && (
              <Image style={{ width: 20, height: 20 }} source={emoji} />
            )}
          </AvaliationConteiner>
        )}

        {props.postColor && (
          <BackgroundImage
            postColor={props.postColor}
            newLegend={newLegend}
            audioPath={audioMedia?.mediaUrl}
            markedUsers={props.markedUsers}
            openMarkers={openMarkers}
            setOpenMarkers={value => setOpenMarkers(value)}
            handleLike={handleLike}
          />
        )}

        {props.medias && (
          <PostImage handleLike={handleLike} medias={listMedias} />
        )}

        {movie && props.tmdbMovieId !== null && movie.movieTitle && (
          <View
            style={{
              marginLeft: 20,
            }}>
            <SelectedMovie
              loading={loading}
              marginTop="15"
              marginBottom="0"
              category={props.postCategorie}
              name={movie.movieTitle}
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
          props.link.length > 0 && <SelectedLink description={props.link} />}

        {props.postCategorie === 'Podcast' &&
          props.link &&
          props.link.length > 0 && <SelectedLink description={props.link} />}

        {props.postActions && (
          <>
            <PostFooter
              openComment={() => handleBottonModal('Comentários')}
              likeList={likes}
              userId={props.userId}
              updateLikes={updateLikes}
              liked={liked}
              showLikes={props.showLikes}
              repostEnabled={props.repostEnabled}
              postHexId={props.postHexId}
              handleLike={handleLike}
              repost={props.postHexId}
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
                marginTop: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={{ justifyContent: 'center' }}
                onPress={() => {
                  handleBottonModal('Curtidas');
                }}>
                {props.showLikes && (
                  <Likes>
                    {likes.length}{' '}
                    {likes.length > 1 || likes.length == 0
                      ? 'curtidas'
                      : 'curtida'}
                  </Likes>
                )}

                {!props.showLikes && likes.length > 0 && (
                  <Likes>
                    {`Curtido por ${likes.sort()[0].userNickname} ${likes.length > 1 ? 'e outras pessoas' : ''
                      }`}
                  </Likes>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </Container>

      {props.postActions && (
        <PostComment
          likes={likes.length > 0}
          createdAt={props.postDate}
          profileImage={user.profileImage}
          postHexId={props.postHexId}
          openComment={() => handleBottonModal('Comentários')}
        />
      )}

      <PostOptions
        followEnable
        setvisibleBottonModal2={setvisibleBottonModal}
        postUrl={`https://post.intellectus.app.br/${props.postHexId}`}
        visibleBottonModal={postOptionsModal}
        setvisibleBottonModal={(isVisible: boolean) =>
          setPostOptionsModal(isVisible)
        }
        onDeleteAfterHandler={props?.onDeleteAfterHandler}
        admin={props.userId === user.userId ? true : false}
        spoilerOnDenuncia
        onEdit={handleEdit}
        onDelete={deleteMyPost}
        postUserId={props.userId}
        followingUser={props.followingUser}
        postHexId={props.postHexId}
        isArquivaded={props.isArquivaded}
        postId={props.postId}
        userNickname={props.userNickname}
        profileImage={props.profileImage}
        userId={props.userId}
        myPost={props.myPost}
      />

      <BottomModal
        visibleBottonModal={visibleBottonModal}
        setvisibleBottonModal={setvisibleBottonModal}
        title={''}
        marginLeftRight="0"
        children={
          <>
            {typeBottonModal === 'Comentários' && (
              <ComentsList
                setvisibleBottonModal={setvisibleBottonModal}
                postId={props.postHexId}
              />
            )}
            {typeBottonModal === 'Curtidas' && (
              <LikesList
                setvisibleBottonModal={setvisibleBottonModal}
                postId={props.postHexId}
              />
            )}
          </>
        }
      />
    </View>
  );
});


export default Post;
