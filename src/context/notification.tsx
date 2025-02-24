import { createContext, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { CreateChat, MessageChat, MessageUpdate } from '../Types/chats.type';
import useUserProfile from '../GlobalState/userProfile.zustand';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import {
  FbToken,
  NotificationCalling,
  NotificationCommentPost,
  NotificationFollower,
  NotificationFollowerReq,
  NotificationJoinRoom,
  NotificationLikeCartaz,
  NotificationLikeComment,
  NotificationLikeDrop,
  NotificationLikePost,
  NotificationMarcation,
  NotificationMessage,
  TypeNotification,
} from '../Types/notification.type';
import { getPost } from '../Service/Publications';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../Routes/StackTypes';
import { RegisteredStyle } from 'react-native';
import useCreatePost from '../GlobalState/createPost.zustand';
import useOtherProfilePost from '../GlobalState/otherProfilePosts.zustand';
import useDropsStore from '../GlobalState/drops.zustand';
import { getDrop } from '../Service/Drop';
import { getUserStories } from '../Service/Story';
import useStories from '../GlobalState/stories.zustand';
import { Platform } from 'react-native';
import { theme } from '../Theme/theme';
import RNCallKeep from 'react-native-callkeep';
import {
  Notifications,
  RegistrationError,
  Notification as RNNotification,
} from 'react-native-notifications';

interface NotificationContextData {
  sendNotificationLikedPost: (postHexId: string) => void;
  sendNotificationLikedDrop: (postHexId: string) => void;
  sendNotificationLikeCartaz: (fbUserId: number, postHexId: string) => void;
  sendNotificationMessage: (
    chatRoomId: string,
    messageCummomId: string,
  ) => void;
  sendNotificationCommentPost: (
    commentId: number,
    postHexId: string,
    response?: boolean,
  ) => void;
  sendNotificationLikeComment: (commentId: number, isAnswer: boolean) => void;
  sendNotificationFollower: (fbUserId: number) => void;
  sendNotificationMarcation: (fbUserId: number, postHexId: string) => void;
  sendNotificationaskedToFollow: (fbUserId: number, userId: number) => void;
  sendNotificationCalling: (
    ownerUserId: number,
    token: string,
    channel: string,
  ) => void;
  sendNotificationRequestJoinRoom: (userId: number, roomId: number) => void;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

interface ServerToClientEvents {
  receivedMessage: (messageChat: MessageChat) => void;
  newMessage: (messageChat: { message: MessageChat; chat: CreateChat }) => void;
  readMessage: (message: MessageUpdate) => void;
}

interface ClientToServerEvents {
  inicializeFbToken: (
    props: FbToken,
    callback: (result: { code: number }) => void,
  ) => void;
  sendNotificationLikePost: (props: NotificationLikePost) => void;
  sendNotificationLikeDrop: (props: NotificationLikeDrop) => void;
  sendNotificationLikeCartaz: (props: NotificationLikeCartaz) => void;
  sendNotificationMessage: (props: NotificationMessage) => void;
  sendNotificationCommentPost: (props: NotificationCommentPost) => void;
  sendNotificationLikeComment: (props: NotificationLikeComment) => void;
  sendNotificationFollower: (props: NotificationFollower) => void;
  sendNotificationaskedToFollow: (props: NotificationFollowerReq) => void;
  sendNotificationCalling: (props: NotificationCalling) => void;
  sendNotificationRequestJoinRoom: (props: NotificationJoinRoom) => void;
  sendNotificationRequestMarcation: (props: NotificationMarcation) => void;
}

interface ICallStorage {
  user: number;
  channel: string;
  channelToken: string;
  uuid: string;
}

export const NotificationProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<number>(0);
  const [fbToken, setFbToken] = useState('');
  const [apnToken, setApnToken] = useState(null);

  const navigation = useNavigation<StackRoutes>();
  //   const { setNickName } = useCreatePost();

  const { setPost } = useOtherProfilePost();
  const { user } = useUserProfile();
  const { setDropsList } = useDropsStore();
  const {
    setCurrentStory,
    setModalVisible,
    setInitialStoryIndex,
    isModalVisible,
  } = useStories();
  const [callStore, setCallStore] = useState<ICallStorage>();
  const [call, setCall] = useState<boolean>(false);

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    if (call && callStore) {
      console.log(callStore);
      RNCallKeep.startCall(callStore.uuid, callStore.channel);
      navigationCall(
        callStore.channelToken,
        callStore.channel,
        callStore.user,
        callStore.uuid,
      );
    }
  }, [callStore, call]);

  const answerCall = ({ callUUID }) => {
    if (Platform.OS == 'android') {
      const info = callUUID.split('}-{');
      RNCallKeep.endCall(callUUID);
      RNCallKeep.endAllCalls();
      RNCallKeep.backToForeground();
      console.log('Atendeu a ligação');
      navigationCall(info[0], info[1], info[2], '');
      return;
    } else {
      setCall(true);
    }
  };

  useEffect(() => {
    const options = {
      ios: {
        appName: 'IntellectusApp',
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription:
          'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon',
        additionalPermissions: [],
        foregroundService: {
          channelId: 'com.intellectus',
          channelName: 'Foreground service for my app',
          notificationTitle: 'Intellectus is running on background',
          notificationIcon: 'Path to the resource icon of the notification',
        },
      },
    };

    RNCallKeep.setup(options).then(accepted => {});
  }, []);

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', answerCall);
    RNCallKeep.addEventListener('endCall', () => RNCallKeep.endAllCalls());

    return () => {
      RNCallKeep.removeEventListener('answerCall');
      RNCallKeep.removeEventListener('endCall');
    };
  }, []);

  const updateBadgeCount = (count: number) => {
    if (Platform.OS === 'ios') {
      const iOSBadgeCount = Math.max(0, count);
      notifee.setBadgeCount(iOSBadgeCount);
    }
  };

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (detail.notification?.data.type == 'CALLING') {
        const { channelToken, channel, user } = detail.notification?.data;
        setCallStore({
          user: user,
          channel: channel,
          channelToken: channelToken,
          uuid: identifier,
        });
        RNCallKeep.displayIncomingCall(
          'ada1f8f3-84e3-4b1e-8c79-f1c798a2b54f',
          channel,
          '',
          undefined,
        );
        console.log('Ligação');
        navigationCall(
          channelToken,
          channel,
          user,
          'ada1f8f3-84e3-4b1e-8c79-f1c798a2b54f',
        );
      }
      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          const bodyNotification = detail.notification
            ?.data as TypeNotification;
          verifyNotificationAction(bodyNotification);

          updateBadgeCount(0);
          break;
      }
    });
  }, []);

  const getTokenMessenger = async () => {
    if (Platform.OS == 'android') {
      await messaging().registerDeviceForRemoteMessages();
    }

    if (Platform.OS == 'ios') {
      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered(
        (event: RegisteredStyle) => {
          // console.log('APN: ', event.deviceToken)
          setApnToken(event.deviceToken);
        },
      );
      Notifications.events().registerRemoteNotificationsRegistrationFailed(
        (event: RegistrationError) => {
          console.error(event);
        },
      );
    }

    const token = await messaging().getToken();
    setFbToken(token);

    await messaging().onTokenRefresh(newToken => {
      console.log('user new Token', newToken);
    });
  };

  const inicializeFbToken = () => {
    socketRef.current?.emit(
      'inicializeFbToken',
      {
        fbToken,
        platform: Platform.OS,
        apnToken: apnToken,
        fbUserId: userId,
      },
      props => {},
    );
  };

  useEffect(() => {
    Notifications.events().registerNotificationReceivedBackground(
      (notification: RNNotification) => {
        console.log(
          'Notification Received - Background',
          notification.payload.data,
        );
        const remoteMessage = notification.payload;
        if (remoteMessage?.data?.type === 'CALLING') {
          if (Platform.OS == 'ios') {
            setCallStore({
              user: remoteMessage.data.user,
              channel: remoteMessage.data.channel,
              channelToken: remoteMessage.data.channelToken,
              uuid: remoteMessage.identifier,
            });
            RNCallKeep.displayIncomingCall(
              remoteMessage.identifier,
              remoteMessage.callerName,
              '',
              undefined,
            );
          }
        }
      },
    );
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('remoteMessage', remoteMessage);
      verifyNotificationAction(remoteMessage.data as TypeNotification);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('remoteMessage on getInitialNotification', remoteMessage);
        if (remoteMessage) {
          verifyNotificationAction(remoteMessage.data as TypeNotification);
        }
      })
      .catch(e => {
        console.warn('getInitialNotification - NotificationProvider');
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setUserId(user.userId);
    permissionIOS();
    getTokenMessenger();

    const unsubscribe = messaging().onMessage(onMessageReceived);
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (userId && fbToken) {
      socketRef.current = io(
        'https://notifications.intellectus.app.br/notification',
        {
          query: {
            userId,
          },
        },
      );

      socketRef.current.on('connect', () => {
        inicializeFbToken();
      });

      socketRef.current.on('newMessage', messageChat => {
        updateBadgeCount(1);
        notifee.displayNotification({
          title: messageChat.chat.userNickname,
          body: messageChat.message.messageText,
          android: {
            channelId: 'messages',
            color: theme.primarycolor,
            colorized: true,
          },
          ios: {
            sound: 'default',
            badgeCount: 1,
            foregroundPresentationOptions: {
              alert: true,
              badge: true,
              sound: true,
            },
          },
        });
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [userId, fbToken]);

  const permissionIOS = async () => {
    const result = await messaging().hasPermission();

    if (result !== messaging.AuthorizationStatus.AUTHORIZED) {
      await messaging().requestPermission();
    }

    if (result === messaging.AuthorizationStatus.AUTHORIZED) {
      // console.log('User has notification permissions enabled.');
    } else if (result === messaging.AuthorizationStatus.PROVISIONAL) {
      // console.log('User has provisional notification permissions.');
    } else {
      // console.log('User has notification permissions disabled');
    }
  };

  const handleUrl = (event: any) => {
    const { url } = event;
    // Linking.openURL(url)
    if (url.includes('post')) {
      const postHexId = url?.split('/').pop();
      navigationPost(postHexId);
    } else if (url.includes('profile')) {
      const userNickName = url?.split('/').pop();
      // setNickName(userNickName)
      navigation.push('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: { nickName: userNickName },
      });
    } else if (url.includes('reels')) {
      const postHexId = url?.split('/').pop();
      getDrop(postHexId)
        .then(res => {
          setDropsList(res.data);
        })
        .catch(e => {
          console.warn('GetDrop - NotificationProvider');
          console.log(e);
        });
      navigation.push('DropsScreen', { postHexId });
    } else if (url.includes('stories')) {
      const parts = url?.split('/');
      const index = parts[5];
      const userId = parts[4];
      getUserStories(userId)
        .then(res => {
          setCurrentStory(res.data);
          setInitialStoryIndex(index);
          setModalVisible(true);
        })
        .catch(e => {
          console.warn('GetUserStories - NotificationProvider');
          console.log(e);
        });
    }
  };

  const verifyNotificationAction = (bodyNotification: TypeNotification) => {
    console.log('bodyNotification', bodyNotification);
    switch (bodyNotification.type) {
      case 'LIKED_POST':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
      case 'CHAT_MESSAGE':
        bodyNotification.userId && navigationChat(bodyNotification.userId);
        break;
      case 'FOLLOW':
        bodyNotification.userNickname &&
          navigationFollow(bodyNotification.userNickname);
        break;
      case 'FOLLOWER':
        bodyNotification.userNickname &&
          navigationFollow(bodyNotification.userNickname);
        break;
      case 'COMMENT_POST':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
      case 'LIKED_COMMENT':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
      case 'RESPONSE_COMMENT':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
      case 'LIKE_AWNSER':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
      case 'LIKED_DROP':
        bodyNotification.postHexId &&
          navigationDrops(bodyNotification.postHexId);
        break;
      case 'LIKED_CARTAZ':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
      case 'REQUEST_MARCATION':
        bodyNotification.postHexId &&
          navigationPost(bodyNotification.postHexId);
        break;
    }
  };

  const navigationDrops = (postHexId: string) => {
    navigation.navigate('DropsScreen', { postHexId, index: 0 });
  };

  const navigationFollow = (user: string) => {
    // setNickName(user);
    navigation.navigate('TabNavigation', {
      screen: 'OtherProfileScreen',
      params: { nickName: user },
    });
  };

  const navigationPost = (postHexId: string) => {
    getPost(postHexId)
      .then(res => {
        setPost(res.data.post[0]);
      })
      .catch(e => {
        console.warn('GetPost - NotificationProvider');
        console.log(e);
      });
    navigation.navigate('PostScreen', { postHexId });
  };

  const navigationCall = (
    channelToken: string,
    channel: string,
    user: number,
    uuid: string,
  ) => {
    navigation.navigate('ReceiveCall', {
      userId: user,
      channel,
      channelToken,
      uuid,
    });
  };

  const navigationChat = (userId: number) => {
    navigation.navigate('Chat', { userId: userId });
  };

  const onMessageReceived = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      const notify = await notifee.displayNotification({
        title: 'Intellectus',
        body:
          remoteMessage.notification.title +
          ' ' +
          remoteMessage.notification.body,
        data: remoteMessage.data,
        android: {
          channelId: remoteMessage.notification.android?.channelId,
          colorized: true,
        },
        ios: {
          sound: 'default',
          badgeCount: 1,
          foregroundPresentationOptions: {
            alert: true,
            badge: true,
            sound: true,
          },
        },
      });
    }
  };

  const sendNotificationLikedPost = (postHexId: string) => {
    socketRef.current?.emit('sendNotificationLikePost', {
      postHexId,
      fbUserId: userId,
    });
  };

  const sendNotificationLikeCartaz = (fbUserId: number, postHexId: string) => {
    socketRef.current?.emit('sendNotificationLikeCartaz', {
      postHexId,
      fbUserId,
    });
  };

  const sendNotificationRequestJoinRoom = (userId: number, roomId: number) => {
    socketRef.current?.emit('sendNotificationRequestJoinRoom', {
      userId,
      roomId,
    });
  };

  const sendNotificationLikedDrop = (postHexId: string) => {
    socketRef.current?.emit('sendNotificationLikeDrop', {
      postHexId,
      fbUserId: userId,
    });
  };

  const sendNotificationMessage = (
    chatRoomId: string,
    messageCummomId: string,
  ) => {
    socketRef.current?.emit('sendNotificationMessage', {
      chatRoomId,
      messageCummomId,
      userId: userId,
    });
  };

  const sendNotificationCommentPost = (
    commentId: number,
    postHexId: string,
    response?: boolean,
  ) => {
    socketRef.current?.emit('sendNotificationCommentPost', {
      commentId,
      postHexId,
      userId: userId,
      response: response || false,
    });
  };

  const sendNotificationLikeComment = (
    commentId: number,
    isAnswer: boolean,
  ) => {
    socketRef.current?.emit('sendNotificationLikeComment', {
      commentId,
      userId: userId,
      isAnswer,
    });
  };

  const sendNotificationFollower = (fbUserId: number) => {
    socketRef.current?.emit('sendNotificationFollower', {
      fbUserId,
      userId: userId,
    });
  };

  const sendNotificationaskedToFollow = (fbUserId: number, userId: number) => {
    socketRef.current?.emit('sendNotificationaskedToFollow', {
      fbUserId,
      userId,
    });
  };

  const sendNotificationCalling = (
    ownerUserId: number,
    token: string,
    channel: string,
  ) => {
    socketRef.current?.emit('sendNotificationCalling', {
      fbUserId: userId,
      ownerUserId,
      channel,
      token,
    });
  };

  const sendNotificationMarcation = (fbUserId: number, postHexId: string) => {
    socketRef.current?.emit('sendNotificationRequestMarcation', {
      fbUserId,
      postHexId,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        sendNotificationLikedPost,
        sendNotificationMessage,
        sendNotificationCommentPost,
        sendNotificationLikeComment,
        sendNotificationFollower,
        sendNotificationLikedDrop,
        sendNotificationLikeCartaz,
        sendNotificationaskedToFollow,
        sendNotificationCalling,
        sendNotificationMarcation,
        sendNotificationRequestJoinRoom,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
