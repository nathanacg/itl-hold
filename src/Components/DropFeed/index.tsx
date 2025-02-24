/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { theme } from '../../Theme/theme';

import {
  BoldWhite,
  DropContainer,
  DropHeader,
  UserInfo,
  Volume,
  LikesLabel,
  Container,
} from './style';

import { DropContentProps } from '../../Types/drop.type';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import BottomModal from '../BottomModal';
import PostComment from '../PostComment';
import DropsOptions from '../DropsOptions';
import PostFooterDrop from '../PostFooterDrop';
import SelectUsesrModal from '../SelectUsersModal';
import UserImageRoundedDrop from '../UserImageProfileDrop';

import ComentsList from '../../Pages/Feed/components/ComentsList';
import LikesList from '../../Pages/Feed/components/LikesList';

import useDropsStore from '../../GlobalState/drops.zustand';
import useCreatePost from '../../GlobalState/createPost.zustand';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import Video from 'react-native-video';
import { useSocket } from '../../context/socket';
import { useNotification } from '../../context/notification';

import { deleteLike, newLike } from '../../Service/Like';
import React from 'react';
import useDropsConfig from '../../GlobalState/drops.config.zustand';
import { Text } from 'react-native-elements';
import useFeedData from '../../GlobalState/feed.zustand';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function _handleIsMuted(propsMuted: boolean, focusOutMuted: boolean) {
  return propsMuted || !(!propsMuted && !focusOutMuted);
}

const DropFeed = (props: DropContentProps) => {
  const videoRef = useRef<Video>(null);
  const { isMuted, toggleIsMuted } = useDropsConfig();
  const { followingProfilesNickname, isFollowingByNickname } = useUserProfile();
  const { currentContentInViewHexId } = useFeedData();
  const { sendDrop } = useSocket();
  const { setInitialDrop } = useDropsStore();
  const { sendNotificationLikedDrop } = useNotification();

  const navigation = useNavigation<StackRoutes>();

  // const { setNickName } = useCreatePost();
  const [isFollowingUser, setIsFollowingUser] = useState(
    Number(isFollowingByNickname(props.userNickname)),
  );

  const [liked, setLiked] = useState(props.Iliked ? true : false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string; userId?: number }[]
  >([]);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [typeBottonModal, setTypeButtonModal] = useState<
    'Comentários' | 'Curtidas'
  >('Comentários');
  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);
  const [focusOutMuted, setFocusOutMuted] = useState<boolean>(true);
  const [countLikes, setCountLikes] = useState<number>(0);
  const [localIsMuted, setLocalIsMuted] = useState(
    _handleIsMuted(isMuted, focusOutMuted),
  );
  // const [oldMuted, setOldMuted] = useState(false);
  // const [videoMutedOld, setVideoMutedOld] = useState<boolean>();
  // console.log('videoMutedOld', videoMutedOld);
  // useEffect(() => {
  //   navigation.addListener('blur', () => {
  //     // setVideoMutedOld(true);
  //   });
  //   return () => {
  //     navigation.removeListener('blur', () => {});
  //   };
  // }, []);

  useEffect(() => {
    setIsFollowingUser(
      Number(followingProfilesNickname.includes(props.userNickname)),
    );
  }, [props.userNickname, followingProfilesNickname]);

  const handleLike = async () => {
    if (!liked) {
      await newLike({ postHexId: props.postHexId });
      sendNotificationLikedDrop(props.postHexId);
      setCountLikes(1);
    } else {
      await deleteLike({ postHexId: props.postHexId });
      setCountLikes(0);
    }
    setLiked(!liked);
  };

  const handleUserModal = () => {
    setIsUsersModalOpen(!isUsersModalOpen);
  };

  const handleBottonModal = (type: 'Comentários' | 'Curtidas') => {
    setvisibleBottonModal(!visibleBottonModal);
    setTypeButtonModal(type);
  };

  const handlePress = () => {
    setInitialDrop({
      index: props.id,
      userNickname: props.userNickname,
      userId: props.userId,
      idreels: props.id,
      postHexId: props.postHexId,
      profileImage: props.userImage,
      username: props.userName,

      principalMedia: {
        url: props.video,
      },

      commentsCount: props.commentsCount,
      likesCount: props.likesCount,
      viewsCount: props.viewsCount,
      Iliked: props.Iliked,
      usersLiked: props.usersLiked,
      isSaved: props.isSaved,
    });
    setLocalIsMuted(true);
    navigation.navigate('DropsScreen', { postHexId: props.postHexId });
  };

  const { user } = useUserProfile();

  useEffect(() => {
    let isFocusOutMuted = false;
    if (props.postHexId !== currentContentInViewHexId && !isMuted) {
      // setVideoMutedOld(muted);
      isFocusOutMuted = true;
    } else if (props.postHexId === currentContentInViewHexId) {
      isFocusOutMuted = false;
    }
    setFocusOutMuted(isFocusOutMuted);
    setLocalIsMuted(_handleIsMuted(isMuted, isFocusOutMuted));
  }, [isMuted, currentContentInViewHexId]);

  useEffect(() => {
    let isFocusOutMuted = focusOutMuted;
    if (props.postHexId === currentContentInViewHexId) {
      isFocusOutMuted = false;
    }
    setFocusOutMuted(isFocusOutMuted);
    setLocalIsMuted(_handleIsMuted(isMuted, isFocusOutMuted));
  }, []);

  // useEffect(() => {
  //   setLocalIsMuted(_handleIsMuted(isMuted, focusOutMuted));
  // }, [isMuted]);
  // console.log('Current postHexId', props.postHexId);
  // console.log('Current currentContentInViewHexId', currentContentInViewHexId);
  // console.log('localIsMuted', localIsMuted);
  // console.log('isMuted', isMuted);
  // console.log('focusOutMuted', focusOutMuted);
  const [dropOptionsModal, setDropOptionsModal] = useState<boolean>(false);

  const navigatorByUserId = (userNickname: string) => {
    setLocalIsMuted(true);
    if (props.userId === user.userId) {
      navigation.navigate('TabNavigation', {
        screen: 'MyProfileScreen',
        params: { nickName: userNickname },
      });
    } else {
      navigation.navigate('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: { nickName: userNickname },
      });
    }
  };

  return (
    <>
      <Container style={{ marginTop: props.paddingTop }} onPress={handlePress}>
        <Video
          key={props.id}
          ref={videoRef}
          style={{ width: width, height: height - 270 }}
          source={{ uri: props.video }}
          resizeMode="cover"
          muted={localIsMuted}
          paused={props.postHexId !== currentContentInViewHexId}
          repeat={true}
          ignoreSilentSwitch={'ignore'}
        />
      </Container>
      {/* <Text>{String(props.postHexId)}</Text> */}
      <Volume
        onPress={() => {
          // setOldMuted(muted);
          // console.log('isMuted', isMuted);
          // console.log('localIsMuted', localIsMuted);
          if (!isMuted && localIsMuted) {
            setLocalIsMuted(false);
          } else {
            toggleIsMuted();
          }
          // setVideoMutedOld(!muted);
        }}>
        <IconMaterial
          name={localIsMuted ? 'volume-off' : 'volume-up'}
          size={14}
          color={'white'}
        />
      </Volume>

      <PostFooterDrop
        openComment={() => handleBottonModal('Comentários')}
        userId={props.userId}
        liked={liked}
        userNickname={props.userName}
        postHexId={props.postHexId}
        userImage={props.userImage}
        handleLike={handleLike}
        setLiked={setLiked}
        postId={props.postId}
        isSaved={props.isSaved}
      />
      <TouchableOpacity onPress={() => handleBottonModal('Curtidas')}>
        <LikesLabel>
          {countLikes ? props.likesCount + countLikes : props.likesCount}{' '}
          {props.likesCount > 1 ? 'curtidas' : 'curtida'}
        </LikesLabel>
      </TouchableOpacity>
      <DropContainer>
        <DropHeader showInFeed={props.showInFeed}>
          <UserInfo
            onPress={() => {
              navigatorByUserId(props.userNickname);
            }}>
            <UserImageRoundedDrop url={props.userImage} size={33} />

            <BoldWhite>{props.userNickname}</BoldWhite>
          </UserInfo>

          <TouchableOpacity
            onPress={() => setDropOptionsModal(!dropOptionsModal)}>
            <Icon
              name="ellipsis-vertical"
              color={theme.secondaryColor}
              size={20}
            />
          </TouchableOpacity>
        </DropHeader>
      </DropContainer>

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
      <PostComment
        createdAt={props.createdAt}
        profileImage={user.profileImage}
        postHexId={props.postHexId}
        openComment={() => handleBottonModal('Comentários')}
      />

      <BottomModal
        visibleBottonModal={visibleBottonModal}
        setvisibleBottonModal={setvisibleBottonModal}
        title={typeBottonModal}
        marginLeftRight="0"
        children={
          <View>
            {typeBottonModal === 'Comentários' && (
              <ComentsList
                setvisibleBottonModal={setvisibleBottonModal}
                postId={props.postHexId}
              />
            )}
            {typeBottonModal === 'Curtidas' && (
              <LikesList postId={props.postHexId} />
            )}
          </View>
        }
      />

      <DropsOptions
        userNickname={props.userNickname}
        spoilerOnDenuncia
        postHexId={props.postHexId}
        dropsUrl={`https://reels.intellectus.app.br/${props.postHexId}`}
        setvisibleBottonModal={isVisible => setDropOptionsModal(isVisible)}
        visibleBottonModal={dropOptionsModal}
        dropsUserId={props.userId}
        admin={props.userId === user.userId ? true : false}
        followingUser={isFollowingUser}
        followEnable={true}
      />
    </>
  );
};

export default DropFeed;
