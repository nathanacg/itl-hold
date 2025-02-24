import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../../Routes/StackTypes';

import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../../Theme/theme';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import Video from 'react-native-video';

import {
  BoldWhite,
  DropContainer,
  DropFooter,
  DropHeader,
  IconsOptions,
  UserImage,
  UserInfo,
  FooterRow,
  IconsCount,
  TextCount,
  Volume,
  IconsCount2,
  DropFooterFeed,
  TextCountFeed,
  LikesLabel,
  IconsCountFeed,
  IconsOptionsFeed,
} from './style';

import { deleteLike, newLike } from '../../../Service/Like';
import useCreatePostCurrent from '../../../GlobalState/currentPost.zustand';
import { getComments } from '../../../Service/Comment';
import { LikesListType, ViewsListType } from '../../../Types/likes.type';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCreatePost from '../../../GlobalState/createPost.zustand';

import useVisiblePost from '../../../GlobalState/visiblePost.zustand';
import useDropsStore from '../../../GlobalState/drops.zustand';
import { useNotification } from '../../../context/notification';
import Feather from 'react-native-vector-icons/Feather';
import SelectUsesrModal from '../../../Components/SelectUsersModal';
import { useSocket } from '../../../context/socket';
import { getViewsDrop, postViewDrop } from '../../../Service/Visualizations';
import { getVerfication } from '../../../Service/Profile';
import {
  DropText,
  SecondaryMedia,
  TextUrl,
  UserMarcation,
} from '../../../Types/drop.type';
import { SecondaryImage } from '../../../Components/SecondaryImage';
import DocumentCard from '../../../Components/DocumentCard';
import MarkedUser from '../../../Components/MarkedUser';
import PostFooterDrop from '../../../Components/PostFooterDrop';
import UserImageRounded from '../../../Components/UserImageProfile';
import useStories from '../../../GlobalState/stories.zustand';
import UserImageRoundedDrop from '../../../Components/UserImageProfileDrop';
import UserImageRoundedDropScreen from '../../../Components/UserImageProfileDropScreen';
import useUserProfile from '../../../GlobalState/userProfile.zustand';
import { Easing } from 'react-native-reanimated';
import { Verified } from '../../../Components/Verified';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface DropContentProps {
  userId: number;
  id: number;
  postHexId: string;
  postId?: number;
  isNext: boolean;
  video: string;
  userName: string;
  userImage: string;
  userNickname: string;
  handleOptionsModal: () => void;
  handleBottonModal: (type: 'comments' | 'likes') => void;
  handleAutoplay: () => void;
  onEnd?: () => void;
  showInFeed?: boolean;
  indexPositionFeed?: number;
  /*  usersMarcations: UserMarcation[]
     secondaryMedia?: SecondaryMedia
     docMedia: DocMedia
     markedUsers: UserMarcation[] */
  play: boolean;
  link?: TextUrl;
  text?: DropText;
  commentsCount: number;
  likesCount: number;
  viewsCount: number;
  Iliked: number;
  isSaved: boolean;
  saveDrops: () => void;
  usersLiked: string;
  adminDrops?: boolean;
}

const DropContent = memo((props: DropContentProps) => {
  var pauseCurrent = !props.play;

  const route = useRoute();

  const params = route.params as { userNickname: string };

  const { sendDrop } = useSocket();

  const navigation = useNavigation<StackRoutes>();

  // const { setNickName } = useCreatePost()
  const { visibleIndex } = useVisiblePost();
  const { setInitialDrop } = useDropsStore();

  const { sendNotificationLikedDrop } = useNotification();

  const [pauseNext, setPauseNext] = useState(false);
  const [muted, setMuted] = useState(true);
  const [remove, setRemove] = useState(false);
  const [liked, setLiked] = useState(props.Iliked ? true : false);
  const [isSaved, setIsSaved] = useState(props.isSaved ? true : false);
  const [likeCount, setLikeCount] = useState(
    props.likesCount ? props.likesCount : 0,
  );
  const [viewsCount, setViewsCount] = useState(props.viewsCount);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string; userId?: number }[]
  >([]);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { getAllDrops } = useDropsStore();
  const [verified, setVerified] = useState<number>(0);

  const [commentList, setCommentList] = useState([]);

  const [commentCount, setCommentCount] = useState(props.commentsCount);

  useEffect(() => {
    getComments(props.postHexId)
      .then(res => {
        const onlyComments = res.data.filter(
          (comment: any) => comment.commentedId === null,
        );
        setCommentCount(onlyComments.length);
        setCommentList(onlyComments);
      })
      .catch(error => {
        console.log('Error fetching comments:', error);
      });
  }, []);

  const addView = async () => {
    await postViewDrop(props.postHexId)
      .then(result => result)
      .catch(error => console.log('Visualização não enviada', error));
  };

  const viewsDrop = () => {
    getViewsDrop(props.postHexId)
      .then(res => {
        setViewsCount(res.data.reelsTotalVisualization);
      })
      .catch(e => {
        console.warn('GetViewsDrop - DropContent');
        console.log(e);
      });
  };

  const getUserVerify = () => {
    getVerfication(props.userId)
      .then(response => {
        const verified = response.data.result[0].user_verified;
        setVerified(verified);
      })
      .catch(e => {
        console.warn('GetVerfication - DropContent');
        console.log(e);
      });
  };

  const handleNavigationGoBack = async () => {
    setRemove(true);

    navigation.pop();
  };
  useEffect(() => {
    getUserVerify();
    viewsDrop();
    if (!props.showInFeed) {
      addView();
    }
  }, []);

  const handlePress = () => {
    if (props.showInFeed) {
      setInitialDrop({
        userId: props.userId,
        index: props.id,
        idreels: props.id,
        postHexId: props.postHexId,
        profileImage: props.userImage,
        username: props.userName,
        userNickname: props.userNickname,

        principalMedia: {
          url: props.video,
        },
        /*   docMedia: {
                      url: props.docMedia.url,
                      fileName: props.docMedia.fileName,
                      usage_media: props.docMedia.usage_media,
                      position: {
                          x: props.docMedia.position.x,
                          y: props.docMedia.position.y,
                      },
                      scale: props.docMedia.scale,
                  }, */
        commentsCount: props.commentsCount,
        likesCount: props.likesCount,
        viewsCount: props.viewsCount,
        Iliked: props.Iliked,
        usersLiked: props.usersLiked,
        isSaved: props.isSaved,
      });
      navigation.push('DropsScreen', {
        postHexId: props.postHexId,
        userId: props.userId,
      });
    } else {
      const currentTime = new Date().getTime();

      if (clicks === 1 && currentTime - lastClickTime < 300) {
        setClicks(0);
        setLastClickTime(0);
        handleLike();
      } else {
        setClicks(clicks + 1);
        setLastClickTime(currentTime);
      }
    }
  };

  const videoRef = useRef<Video>(null);

  const handleLike = async () => {
    if (!liked) {
      await newLike({ postHexId: props.postHexId });
      sendNotificationLikedDrop(props.postHexId);
      setLikeCount(pv => pv + 1);
    } else {
      await deleteLike({ postHexId: props.postHexId });
      setLikeCount(pv => pv - 1);
    }
    setLiked(!liked);
  };

  const handleSaved = () => {
    setIsSaved(!isSaved);
    if (isSaved == false) {
      props.saveDrops();
    } else {
    }
  };

  const handleUserModal = () => {
    setIsUsersModalOpen(!isUsersModalOpen);
  };

  const { user } = useUserProfile();

  const opacityAnim = useRef(new Animated.Value(0)).current;

  const animateIcon = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  return (
    <View
      style={{
        width: width,
        height: props.showInFeed ? parseInt(`${height - 300}`) : height,
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: '50%',
          backgroundColor: '#00000050',
          borderRadius: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          height: 40,
          zIndex: 2,
          opacity: opacityAnim,
          transform: [{ scale: opacityAnim }],
        }}>
        <IconMaterial
          name={remove ? 'volume-off' : 'volume-up'}
          size={22}
          color={'white'}
        />
      </Animated.View>

      <TouchableOpacity
        onPress={() => {
          animateIcon();
          setRemove(!remove);
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          height: '70%',
          flex: 1,
          top: '15%',
        }}
      />
      <Video
        key={props.id}
        ref={videoRef}
        style={
          props.showInFeed
            ? {
                width: '100%',
                height: '80%',
                marginTop: 20,
              }
            : { width: width, height: height, backgroundColor: '#111111' }
        }
        source={{ uri: props.video }}
        resizeMode="cover"
        ignoreSilentSwitch={'ignore'}
        repeat={true}
        muted={props.showInFeed ? muted : remove}
        onLoad={() => {
          if (props.isNext) {
            setTimeout(() => {
              setPauseNext(true);
            }, 100);
          }
        }}
        onEnd={props.onEnd}
        onProgress={() => {
          if (props.isNext) {
            setPauseNext(true);
          }
        }}
      />

      {props.showInFeed && (
        <FooterDropFeed
          liked={liked}
          showInFeed={props.showInFeed}
          usersLiked={props.usersLiked}
          likesCount={likeCount}
          viewsCount={viewsCount}
          commentsCount={commentCount}
          postHexId={props.postHexId}
          handleBottonModal={props.handleBottonModal}
          handleLike={handleLike}
          handleUserModal={handleUserModal}
          handleSaved={handleSaved}
          isSaved={isSaved}
        />
      )}
      <DropContainer>
        <DropHeader showInFeed={props.showInFeed}>
          <TouchableOpacity onPress={handleNavigationGoBack}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color={theme.secondaryColor}
            />
          </TouchableOpacity>
          <UserInfo
            onPress={() => {
              setRemove(true);
              // setNickName(props.userNickname)
              navigation.push('TabNavigation', {
                screen: 'OtherProfileScreen',
                params: { nickName: props.userNickname },
              });
            }}>
            <UserImageRoundedDropScreen
              onOpenCartaz={() => {}}
              url={props.userImage}
              size={34}
            />
            <BoldWhite>
              {props.userNickname == undefined
                ? props.userName
                : props.userNickname}
            </BoldWhite>
            {verified === 1 && <Verified white width={13} height={13} />}
          </UserInfo>
          {!props.showInFeed && (
            <IconsOptions>
              <TouchableOpacity onPress={() => props.handleOptionsModal()}>
                <Icon
                  name="ellipsis-vertical"
                  color={theme.secondaryColor}
                  size={20}
                />
              </TouchableOpacity>
            </IconsOptions>
          )}
        </DropHeader>
        {/*   {props.docMedia?.url && (
                    <DocumentCard docInfos={{ url: props.docMedia.url, name: props.docMedia.fileName, size: props.docMedia.usage_media }} scale={props.docMedia.scale} absolute position={{ x: props.docMedia.position.x, y: props.docMedia.position.y }} storyDocument={{ url: props.docMedia.url, name: props.docMedia.fileName }} />
                )}
                {props?.text?.text && (
                    <Text style={{ color: props.text.text_color, textAlign: 'auto', fontSize: 18, backgroundColor: props.text.background_color, paddingHorizontal: 7, borderRadius: 6, paddingBottom: 7, paddingTop: 4, position: "absolute", top: props.text.position.y, left: props.text.position.x }}
                        textBreakStrategy='highQuality'
                    >
                        {props.text.text}
                    </Text>
                )} */}

        {/* {props.secondaryMedia?.url && ()} */}
        {/*     {props.markedUsers && props.markedUsers.length > 0 && (
                    props.markedUsers.map(user => (
                        <MarkedUser userName={user.username} left={user.position.x} top={user.position.y} scale={user.scale} />
                    ))
                )} */}

        {/*   {props.text?.text && (
                    <Text
                        style={{
                            color: props.text.text_color,
                            textAlign: 'auto',
                            fontSize: 18, backgroundColor: props.text.background_color,
                            paddingHorizontal: 7, borderRadius: 6, paddingBottom: 7, paddingTop: 4,
                            position: "absolute", top: props.text.position.y,
                            left: props.text.position.x
                        }}
                        textBreakStrategy='highQuality'
                    >
                        {props.text.text}
                    </Text>
                )} */}

        {/*      {props.secondaryMedia?.url && (
                    <SecondaryImage uri={props.secondaryMedia?.url}
                        scale={props.secondaryMedia.scale} positionY={props.secondaryMedia.position.y}
                        posotionX={props.secondaryMedia.position.x} />)}

                {props.link?.url && (
                    <Link storyLink={{ left: `${props.link.position.x}px`, top: `${props.link.position.y}px`, link: props.link.url, scale: props.link.scale, type: props.link.style_type }} />
                )}
 */}

        {!props.showInFeed && (
          <FooterDrop
            liked={liked}
            adminDrops={props.userId == user.userId}
            showInFeed={props.showInFeed}
            usersLiked={props.usersLiked}
            likesCount={likeCount}
            viewsCount={viewsCount}
            commentsCount={commentCount}
            postHexId={props.postHexId}
            handleBottonModal={props.handleBottonModal}
            handleLike={handleLike}
            handleUserModal={handleUserModal}
            handleSaved={handleSaved}
            isSaved={isSaved}
          />
        )}
      </DropContainer>

      {props.showInFeed && (
        <>
          <TouchableOpacity
            onPress={handlePress}
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 100,
              height: (height - 300) / 2,
              top: (height - 100) / 3,
            }}
          />
          <Volume onPress={() => setMuted(!muted)}>
            <IconMaterial
              name={muted ? 'volume-off' : 'volume-up'}
              size={13}
              color={'white'}
            />
          </Volume>
        </>
      )}

      <SelectUsesrModal
        markedUsers={markedUsers}
        setMarkedUsers={setMarkedUsers}
        visibleBottonModal={isUsersModalOpen}
        setvisibleBottonModal={handleUserModal}
        messageOption
        onSend={text =>
          sendDrop(
            markedUsers.map(item => item.userId || 0),
            props.postHexId,
            text || null,
          )
        }
      />
    </View>
  );
});

const FooterDrop = memo(
  (props: {
    postHexId: string;
    handleBottonModal: (type: 'comments' | 'likes') => void;
    commentsCount: number;
    likesCount: number;
    viewsCount: number;
    adminDrops: boolean;
    liked: boolean;
    usersLiked: string;
    handleLike: () => void;
    showInFeed?: boolean;
    handleUserModal: () => void;
    handleSaved: () => void;
    isSaved: boolean;
  }) => {
    const { postId, setPostId } = useCreatePostCurrent();
    const [commentList, setCommentList] = useState([]);

    const [commentCount, setCommentCount] = useState(props.commentsCount);

    useEffect(() => {
      getComments(props.postHexId)
        .then(res => {
          const onlyComments = res.data.filter(
            (comment: any) => comment.commentedId === null,
          );
          setCommentCount(onlyComments.length);
          setCommentList(onlyComments);
        })
        .catch(error => {
          console.log('Error fetching comments:', error);
        });
    }, [commentList]);

    return (
      <DropFooter showInFeed={!props.showInFeed}>
        <FooterRow>
          <IconsOptions>
            <Like
              likesCount={props.likesCount}
              postHexId={props.postHexId}
              liked={props.liked}
              onPress={props.handleLike}
            />

            <IconsCount
              onPress={() => {
                setPostId(props.postHexId);
                props.handleBottonModal('comments');
              }}>
              <Image
                style={{ marginRight: 2 }}
                source={require('../../../Assets/Icons/commentDrop.png')}
              />
              <TextCount>{commentCount}</TextCount>
            </IconsCount>

            {props.adminDrops && (
              <IconsCount2>
                <Image
                  style={{ marginRight: 2, width: 24, height: 24 }}
                  source={require('../../../Assets/Icons/views.png')}
                />
                <TextCount>{props.viewsCount}</TextCount>
              </IconsCount2>
            )}
          </IconsOptions>
          <IconsOptions>
            {!props.showInFeed && (
              <>
                <Feather
                  name="send"
                  color={theme.secondaryColor}
                  size={24}
                  style={{
                    marginBottom: props.usersLiked ? 0 : 0,
                  }}
                  onPress={props.handleUserModal}
                />
                <IconsCount onPress={props.handleSaved}>
                  {props.isSaved ? (
                    <Image
                      style={{
                        width: 23,
                        height: 23,
                        resizeMode: 'contain',
                        marginLeft: -10,
                        tintColor: 'white',
                      }}
                      source={require('../../../Assets/Icons/saveButtonFill.png')}
                    />
                  ) : (
                    <Image
                      style={{
                        width: 23,
                        height: 23,
                        resizeMode: 'contain',
                        marginLeft: -10,
                        tintColor: 'white',
                      }}
                      source={require('../../../Assets/Icons/saveButton.png')}
                    />
                  )}
                </IconsCount>
              </>
            )}
          </IconsOptions>
        </FooterRow>
        {/*  {!props.showInFeed && (props.likesCount > 0 &&
                <TouchableOpacity onPress={() => {
                    setPostId(props.postHexId)
                    props.handleBottonModal("likes")
                }} >
                    <WhiteText>
                        Curtido por <BoldWhite>{props.usersLiked}</BoldWhite> {props.likesCount > 1 && 'e outros'}
                    </WhiteText>
                </TouchableOpacity>
            )
            } */}
      </DropFooter>
    );
  },
);

const FooterDropFeed = memo(
  (props: {
    postHexId: string;
    handleBottonModal: (type: 'comments' | 'likes') => void;
    commentsCount: number;
    likesCount: number;
    viewsCount: number;
    liked: boolean;
    usersLiked: string;
    handleLike: () => void;
    showInFeed?: boolean;
    handleUserModal: () => void;
    handleSaved: () => void;
    isSaved: boolean;
  }) => {
    const { postId, setPostId } = useCreatePostCurrent();
    const [likesList, setLikesList] = useState<LikesListType[]>([]);
    const [commentList, setCommentList] = useState([]);

    const [commentCount, setCommentCount] = useState(props.commentsCount);

    useEffect(() => {
      getComments(props.postHexId)
        .then(res => {
          const onlyComments = res.data.filter(
            (comment: any) => comment.commentedId === null,
          );
          setCommentCount(onlyComments.length);
          setCommentList(onlyComments);
        })
        .catch(error => {
          console.log('Error fetching comments:', error);
        });
    }, [commentList]);

    const handlerUpdateLikes = (user: LikesListType[]) => {
      setLikesList(user);
    };

    return (
      <DropFooterFeed showInFeed={!props.showInFeed}>
        <IconsOptionsFeed>
          <LikeFeed
            likesCount={props.likesCount}
            postHexId={props.postHexId}
            liked={props.liked}
            onPress={props.handleLike}
          />

          <IconsCountFeed
            onPress={() => {
              setPostId(props.postHexId);
              props.handleBottonModal('comments');
            }}>
            <Image
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
              source={require('../../../Assets/Icons/comment.png')}
            />
          </IconsCountFeed>
          <TouchableOpacity onPress={props.handleUserModal}>
            <Image
              style={{ width: 24, height: 25, resizeMode: 'contain' }}
              source={require('../../../Assets/Icons/share.png')}
            />
          </TouchableOpacity>
        </IconsOptionsFeed>

        <LikesLabel>
          {props.likesCount} {props.likesCount > 1 ? 'curtidas' : 'curtida'}
        </LikesLabel>
      </DropFooterFeed>
    );
  },
);

const Like = (props: {
  postHexId: string;
  likesCount: number;
  liked: boolean;
  onPress: () => void;
}) => {
  return (
    <IconsCount onPress={props.onPress}>
      <TouchableOpacity onPress={props.onPress}>
        <>
          {props.liked ? (
            <Icon name="heart" color={theme.secondaryColor} size={28} />
          ) : (
            <Icon name="heart-outline" color={theme.secondaryColor} size={28} />
          )}
        </>
      </TouchableOpacity>
      <TextCount onPress={() => {}}>{props.likesCount}</TextCount>
    </IconsCount>
  );
};

const LikeFeed = (props: {
  postHexId: string;
  likesCount: number;
  liked: boolean;
  onPress: () => void;
}) => {
  return (
    <IconsCount onPress={props.onPress}>
      <TouchableOpacity onPress={props.onPress}>
        {props.liked ? (
          <Icon name="heart" color={theme.primarycolor} size={28} />
        ) : (
          <Icon name="heart-outline" color={theme.primarycolor} size={28} />
        )}
      </TouchableOpacity>
    </IconsCount>
  );
};

export default DropContent;
