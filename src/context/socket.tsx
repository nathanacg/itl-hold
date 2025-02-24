import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { getStoreItem, getStoreObject } from '../Lib/asyncStorage';
import {
  AllChat,
  AllMessage,
  CreateChat,
  MessageChat,
  MessageUpdate,
  SocketCallbackErro,
} from '../Types/chats.type';
import {
  getAllProfiles,
  getOtherProfile,
  getProfile,
} from '../Service/Profile';
import { ProfileList } from '../Types/User';
import useUserProfile from '../GlobalState/userProfile.zustand';
import { theme } from '../Theme/theme';

import notifee, { AndroidColor, EventType } from '@notifee/react-native';
import { Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../Routes/StackTypes';
import useCreatePost from '../GlobalState/createPost.zustand';
import useOtherProfilePost from '../GlobalState/otherProfilePosts.zustand';
import { useNotification } from './notification';
import { getPost } from '../Service/Publications';
import { getDrop } from '../Service/Drop';
import useDropsStore from '../GlobalState/drops.zustand';
import { axiosClientChat_api } from '../Lib/Chat_api';

interface SocketContextData {
  countViewsLiveRoom: number;
  listPartipantsLive: number[];
  listUserIsOn: number[];
  getAllchat: () => void;
  chatList: CreateChat[];
  handleSetChat: (chat: CreateChat) => void;
  getAllMessage: () => void;
  messageList: MessageChat[];
  currentChat: CreateChat | undefined;
  currentGroupChat: CreateChat | undefined;
  userId: number;
  sendMessage: (message: string) => void;
  forwardMessage: (message: MessageChat) => void;
  deleteMessage: (messageCummomId: string) => void;
  solicitationsList: CreateChat[];
  getProfileList: (nickName: string) => void;
  sendAudio: (
    data: FormData,
    configAudMetrics: string,
    configAudTime: number,
    chatRoomId?: string,
  ) => Promise<void>;
  sendFile: (
    data: FormData,
    message: string,
    type: string,
    chatRoomId?: string,
  ) => Promise<void>;
  usersList: ProfileList[];
  handleParticipantId: (id: number) => void;
  clearChat: () => void;
  clearAllListChat: () => void;
  clearUnreadMessages: () => void;
  changeMessageState: (
    ids: string[],
    state: 'send' | 'delivered' | 'read',
    chatRoomId: string,
  ) => void;
  acceptAllChatSolicitation: () => void;
  acceptOneChatSolicitation: (chatId: string, chat: CreateChat) => void;
  removeAllChatSolicitation: () => void;
  removeOneChatSolicitation: (chatId: string) => void;
  deleteChat: (roomId: string) => void;
  verifyGroupChat: (chatRoomId: number, chatOwnerUserId: number) => void;
  addMemberGroupChat: (memberUserId: number, chatRoomId: number) => void;
  sendGroupMessage: (message: MessageChat) => void;
  getAllGroupMessage: (userId: number, chatRoomId: number) => void;
  setPageChat: React.Dispatch<SetStateAction<number>>;
  endChat: boolean;
  unrendedChats: number;
  getUserOnline: (userId: number) => Promise<{ code: number; online: boolean }>;
  sendPost: (
    userIds: number[],
    postHexId: string,
    message: string | null,
  ) => void;
  sendDrop: (
    userIds: number[],
    postHexId: string,
    message: string | null,
  ) => void;
  sendStory: (
    userIdStory: number,
    postHexId: string,
    message: string | null,
    isMp4?: any,
  ) => void;
  sendRoom: (
    userIds: number[],
    idRoom: number,
    message: string | null,
    roomImage: string | null,
  ) => void;
  verifyRoomLive: (roomId: number, userId: number) => void;
  admJoinRoomLive: (roomId: number) => void;
  admLeaveRoomLive: (roomId: number) => void;
  updateParticipantsLiveRoom: (chatRoomId: number) => void;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

interface ServerToClientEvents {
  countChatsWithNewMessages: (data: {
    totalChatsWithNewMessages: number;
  }) => void;
  receivedMessage: (messageChat: MessageChat) => void;
  receivedMessageGroup: (messageChat: {
    chat: any;
    message: MessageChat;
  }) => void;
  newMessage: (messageChat: { message: MessageChat; chat: CreateChat }) => void;
  readMessage: (message: MessageUpdate) => void;
  deletedMessage: (deleted: { messageCummomId: string }) => void;
}

interface ClientToServerEvents {
  getAllChat: (
    body: AllChat,
    callback: (result: {
      code: number;
      chats: CreateChat[];
      solicitations: CreateChat[];
    }) => void,
  ) => void;
  getAllMessage: (
    body: AllMessage,
    callback: (result: { code: number; messages: MessageChat[] }) => void,
  ) => void;
  getAllGroupMessage: (
    body: AllMessage,
    callback: (result: { code: number; messages: MessageChat[] }) => void,
  ) => void;
  deleteMessage: (
    body: { messageCummomId: string; toUserId?: number },
    callback: (result: { code: number }) => void,
  ) => void;
  sendMessage: (
    message: MessageChat,
    callback: (result: { code: number; messageCummomId: string }) => void,
  ) => void;
  verifyChat: (
    createChat: { chatOwnerUserId: number; chatParticipantUserId: number },
    callback: (result: {
      code: number;
      chatRoomId: string;
      chat: CreateChat;
    }) => void,
  ) => void;
  changeMessageState: (
    message: MessageUpdate,
    callback: (result: { code: number }) => void,
  ) => void;
  acceptChatSolicitation: (
    body: { chatRoomId: string[]; userId: number },
    callback: (result: { code: number }) => void,
  ) => void;
  removeSolicitation: (
    body: { chatRoomId: string[]; userId: number },
    callback: (result: { code: number }) => void,
  ) => void;
  deleteChat: (
    body: { chatRoomId: string; chatUserId: number },
    callback: (result: { code: number }) => void,
  ) => void;
  getOnline: (
    body: { userId: number },
    callback: (result: { code: number; online: boolean }) => void,
  ) => void;
  verifyGroupChat: (
    body: { chatOwnerUserId: number; chatRoomId: number },
    callback: (result: IVerifyGroupChat) => void,
  ) => void;
  verifyRoomLive: (
    body: { roomId: number; userId: number },
    callback: (result: { code: number; admsIdOn: number[] }) => void,
  ) => void;
  updateParticipantsLiveRoom: (
    body: { chatRoomId: number },
    callback: (result: { code: number; participantsCount: number }) => void,
  ) => void;
  AdmJoinRoomLive: (
    body: { roomId: number },
    callback: (result: { admsIdOn: number[]; code: number }) => void,
  ) => void;
  AdmLeaveRoomLive: (
    body: { roomId: number },
    callback: (result: { code: number; ok: boolean }) => void,
  ) => void;
  addMemberGroupChat: (
    body: { memberUserId: number; chatRoomId: number },
    callback: (result: { data: any }) => void,
  ) => void;
  sendGroupMessage: (
    message: MessageChat,
    callback: (result: { data: any }) => void,
  ) => void;
}

interface IChat {
  chatAccepted: number;
  chatBlocked: number;
  chatDate: string;
  chatId: number;
  chatOwnerUserId: number;
  chatRoomId: string;
  chatSolicited: number;
  lastMessage: string;
  unreadMessagens: number;
}

interface IVerifyGroupChat {
  chat: CreateChat;
  chatRoomId: number;
  code: number;
  usersIdOn: number[];
}

export const SocketProvider = ({ children }: any) => {
  const [userId, setUserId] = useState<number>(0);
  const [chatList, setChatList] = useState<CreateChat[]>([]);
  const [solicitationsList, setSolicitationsList] = useState<CreateChat[]>([]);
  const [currentChat, setCurrentChat] = useState<CreateChat | undefined>(
    {} as CreateChat,
  );
  const [currentGroupChat, setCurrentGroupChat] = useState<
    CreateChat | undefined
  >({} as CreateChat);
  const [messageList, setMessageList] = useState<MessageChat[]>([]);
  const [usersList, setUsersList] = useState<ProfileList[]>([]);
  const [pagechat, setPageChat] = useState<number>(1);
  const [endChat, setEndChat] = useState(false);
  const [unrendedChats, setUnrendedChats] = useState(0);
  const [listUserIsOn, setListUserIsOn] = useState<number[]>([]);
  const [listPartipantsLive, setListPartipantsLive] = useState<number[]>([]);
  const [countViewsLiveRoom, setCountViewsLiveRoom] = useState<number>(0);
  const [countNewMessages, setCountNewMessages] = useState<number>(0);

  const { setUser, user } = useUserProfile();
  const { setDropsList } = useDropsStore();

  const { sendNotificationMessage } = useNotification();

  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    setUserId(user.userId);
  }, [user]);

  useEffect(() => {
    if (userId) {
      socketRef.current = io('https://chat.intellectus.app.br/chat', {
        query: {
          userId,
        },
      });

      socketRef.current.on('connect', () => {});

      socketRef.current.on(
        'countChatsWithNewMessages',
        (data: { totalChatsWithNewMessages: number }) => {
          setUnrendedChats(data.totalChatsWithNewMessages);
        },
      );

      socketRef.current.on('receivedMessage', (data: MessageChat) => {
        if (currentChat) {
          console.log('Entrou');
          setMessageList(prev => [...prev, data]);
        }
      });

      socketRef.current.on('receivedMessageGroup', data => {
        if (currentGroupChat) {
          console.log('Recebeu no grupo');
          console.log(data);
          setMessageList(prev => [
            ...prev,
            {
              ...data.message,
            },
          ]);
        }
      });

      socketRef.current.on('deletedMessage', deleted => {
        const filteredMessageList = messageList.filter(
          message => message.messageCummomId !== deleted.messageCummomId,
        );
        setMessageList(filteredMessageList);
      });

      socketRef.current.on('newMessage', _messageChat => {
        setMessageList(prev => [...prev, _messageChat.message]);
      });

      socketRef.current.on('readMessage', message => {
        setMessageList(prev =>
          prev.map(msg =>
            message.messageCummomId.some(
              message => message == msg.messageCummomId,
            )
              ? { ...msg, messageState: 'read' }
              : msg,
          ),
        );
      });

      socketRef.current.on('disconnect', () => {});

      /*  return () => {
                 socketRef.current?.disconnect();
             } */
    }
  }, [userId]);

  useEffect(() => {
    getAllMessage();
  }, [currentChat]);

  useEffect(() => {
    getAllchat();
  }, [userId]);

  useEffect(() => {}, [pagechat, messageList]);

  //Chat Live Room
  const verifyGroupChat = (chatRoomId: number, chatOwnerUserId: number) => {
    socketRef.current?.emit(
      'verifyGroupChat',
      {
        chatOwnerUserId: chatOwnerUserId,
        chatRoomId: chatRoomId,
      },
      result => {
        setCurrentGroupChat(result.chat);
        setListUserIsOn(result.usersIdOn);
      },
    );
  };

  const admJoinRoomLive = (roomId: number) => {
    console.log('admin entrou');
    socketRef.current?.emit(
      'AdmJoinRoomLive',
      {
        roomId,
      },
      result => {},
    );
  };

  const admLeaveRoomLive = (roomId: number) => {
    socketRef.current?.emit(
      'AdmLeaveRoomLive',
      {
        roomId,
      },
      result => {
        if (result.code == 200) {
          console.log('admin leave', result.ok);
        }
      },
    );
  };

  const verifyRoomLive = (roomId: number) => {
    socketRef.current?.emit(
      'verifyRoomLive',
      {
        roomId,
        userId,
      },
      result => {
        if (result.code == 200) {
          setListPartipantsLive(result.admsIdOn);
        }
      },
    );
  };

  const updateParticipantsLiveRoom = (chatRoomId: number) => {
    socketRef.current?.emit(
      'updateParticipantsLiveRoom',
      {
        chatRoomId: chatRoomId,
      },
      result => {
        setCountViewsLiveRoom(result.participantsCount);
      },
    );
  };

  const addMemberGroupChat = (memberUserId: number, chatRoomId: number) => {
    socketRef.current?.emit(
      'addMemberGroupChat',
      {
        memberUserId,
        chatRoomId,
      },
      result => {},
    );
  };

  const sendGroupMessage = (message: MessageChat) => {
    socketRef.current?.emit('sendGroupMessage', message, result => {
      setMessageList(prev => [...prev, result.message]);
    });
  };

  const getAllGroupMessage = (userId: number, chatRoomId: number) => {
    socketRef.current?.emit(
      'getAllGroupMessage',
      {
        userId,
        chatRoomId,
      },
      result => {
        if (result.code == 200) {
          setMessageList(result.messages);
        } else {
          console.log('Erro - getAllGroupMessage');
          console.log(result);
        }
      },
    );
  };

  const getAllchat = () => {
    socketRef.current?.emit(
      'getAllChat',
      {
        chatOwnerUserId: userId,
        page: 1,
        limit: 50,
      },
      result => {
        if (result.code == 200) {
          setChatList(result.chats);
          setSolicitationsList(result.solicitations);
          const chats = result.chats.filter(chat => chat.unreadMessagens > 0);
          setUnrendedChats(chats.length);
        } else {
          console.log('erro no getAllChat');
        }
      },
    );
  };

  const handleSetChat = (chat: CreateChat) => {
    handleParticipantId(chat.chatParticipantUserId);
  };

  const deleteMessage = (messageCummomId: string) => {
    socketRef.current?.emit(
      'deleteMessage',
      {
        messageCummomId,
        toUserId: currentChat?.chatParticipantUserId,
      },
      result => {
        console.log(result);
      },
    );
  };

  const getAllMessage = () => {
    if (currentChat) {
      socketRef.current?.emit(
        'getAllMessage',
        {
          chatRoomId: currentChat.chatRoomId,
          page: pagechat,
          limit: 10,
          userId: userId,
        },
        result => {
          if (result.code == 200) {
            if (pagechat > 1) {
              setMessageList(prev => [...result.messages, ...prev]);
              if (result.messages.length < 1) {
                setEndChat(true);
              } else {
                setEndChat(false);
              }
            } else {
              setMessageList(result.messages);
            }
          } else {
            console.log('erro ao buscar mensagens');
          }
        },
      );
    }
  };

  const forwardMessage = (message: MessageChat) => {
    socketRef.current?.emit(
      'sendMessage',
      {
        ...message,
        forwarded: true,
        userId: userId,
      },
      result => {
        sendNotificationMessage(message.chatRoomId, result.messageCummomId);
        //Alert.alert('Messagem encaminhada!')
      },
    );
  };

  const sendMessage = (message: string) => {
    if (currentChat) {
      socketRef.current?.emit(
        'sendMessage',
        {
          userId: userId,
          messageText: message,
          chatRoomId: currentChat.chatRoomId,
          messageState: 'send',
          messageUri: null,
          messageType: 'TEXT',
          configAudMetrics: '',
          configAudTime: 0,
        },
        result => {
          sendNotificationMessage(
            currentChat.chatRoomId,
            result.messageCummomId,
          );
          setMessageList(prev => [
            ...prev,
            {
              messageText: message,
              messageDate: new Date(),
              chatRoomId: currentChat.chatRoomId,
              userId: userId,
              messageState: 'send',
              messageCummomId: result.messageCummomId,
              messageType: 'TEXT',
              messageUri: null,
              configAudMetrics: '',
              configAudTime: 0,
            },
          ]);
        },
      );
    }
  };

  const sendAudio = async (
    file: FormData,
    configAudMetrics: string,
    configAudTime: number,
    chatRoomId?: string,
  ) => {
    if (chatRoomId) {
      getStoreItem('@intellectus:tokenUser').then(token => {
        axiosClientChat_api
          .post('/sendAudio', file, {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: 'Enviou um áudio',
                chatRoomId: `${chatRoomId}`,
                messageState: 'delivered',
                messageUri: res.data?.mediaUrl,
                messageType: 'AUDIO',
                configAudMetrics,
                configAudTime,
              },
              result => {
                sendNotificationMessage(
                  `${chatRoomId}`,
                  result.messageCummomId,
                );
                setMessageList(prev => [
                  ...prev,
                  {
                    messageText: 'Enviou um áudio',
                    messageDate: new Date(),
                    chatRoomId: `${chatRoomId}`,
                    userId: userId,
                    messageState: 'send',
                    messageCummomId: result.messageCummomId,
                    messageType: 'AUDIO',
                    messageUri: res.data?.mediaUrl,
                    configAudMetrics,
                    configAudTime,
                  },
                ]);
              },
            );
          })
          .catch(e => {
            console.warn('GetStoreItem - Socket');
            console.log(e);
          });
      });
    } else if (currentChat) {
      getStoreItem('@intellectus:tokenUser').then(token => {
        axiosClientChat_api
          .post('/sendAudio', file, {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: 'Enviou um áudio',
                chatRoomId: currentChat.chatRoomId,
                messageState: 'send',
                messageUri: res.data?.mediaUrl,
                messageType: 'AUDIO',
                configAudMetrics,
                configAudTime,
              },
              result => {
                sendNotificationMessage(
                  currentChat.chatRoomId,
                  result.messageCummomId,
                );
                setMessageList(prev => [
                  ...prev,
                  {
                    messageText: 'Enviou um áudio',
                    messageDate: new Date(),
                    chatRoomId: currentChat.chatRoomId,
                    userId: userId,
                    messageState: 'send',
                    messageCummomId: result.messageCummomId,
                    messageType: 'AUDIO',
                    messageUri: res.data?.mediaUrl,
                    configAudMetrics,
                    configAudTime,
                  },
                ]);
              },
            );
          })
          .catch(e => {
            console.warn('GetStoreItem - Socket');
            console.log(e);
          });
      });
    }
  };

  const sendFile = async (
    file: FormData,
    message: string,
    type: string,
    chatRoomId?: string,
  ) => {
    if (chatRoomId) {
      getStoreItem('@intellectus:tokenUser').then(token => {
        axiosClientChat_api
          .post('/sendFile', file, {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: message,
                chatRoomId: `${chatRoomId}`,
                messageState: 'send',
                messageUri: res.data?.mediaUrl,
                messageType: type == 'image' ? 'IMAGE' : 'FILE',
                configAudMetrics: '',
                configAudTime: 0,
              },
              result => {
                sendNotificationMessage(
                  `${chatRoomId}`,
                  result.messageCummomId,
                );
                setMessageList(prev => [
                  ...prev,
                  {
                    messageText: message,
                    messageDate: new Date(),
                    chatRoomId: `${chatRoomId}`,
                    userId: userId,
                    messageState: 'send',
                    messageCummomId: result.messageCummomId,
                    messageType: type == 'image' ? 'IMAGE' : 'FILE',
                    messageUri: res.data?.mediaUrl,
                    configAudMetrics: '',
                    configAudTime: 0,
                  },
                ]);
              },
            );
          })
          .catch(e => {
            console.warn('GetStoreItem - Socket');
            console.log(e);
          });
      });
    } else if (currentChat) {
      getStoreItem('@intellectus:tokenUser').then(token => {
        axiosClientChat_api
          .post('/sendFile', file, {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: message,
                chatRoomId: `${chatRoomId}`,
                messageState: 'send',
                messageUri: res.data?.mediaUrl,
                messageType: type == 'image' ? 'IMAGE' : 'FILE',
                configAudMetrics: '',
                configAudTime: 0,
              },
              result => {
                sendNotificationMessage(
                  `${chatRoomId}`,
                  result.messageCummomId,
                );
                setMessageList(prev => [
                  ...prev,
                  {
                    messageText: message,
                    messageDate: new Date(),
                    chatRoomId: `${chatRoomId}`,
                    userId: userId,
                    messageState: 'send',
                    messageCummomId: result.messageCummomId,
                    messageType: type == 'image' ? 'IMAGE' : 'FILE',
                    messageUri: res.data?.mediaUrl,
                    configAudMetrics: '',
                    configAudTime: 0,
                  },
                ]);
              },
            );
          })
          .catch(e => {
            console.warn('GetStoreItem - Socket');
            console.log(e);
          });
      });
    }
  };

  const sendPost = (
    userIds: number[],
    postHexId: string,
    message: string | null,
  ) => {
    for (const uuid of userIds) {
      socketRef.current?.emit(
        'verifyChat',
        {
          chatOwnerUserId: userId,
          chatParticipantUserId: uuid,
        },
        result => {
          if (result.code == 200) {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: 'Enviou uma publicação',
                chatRoomId: result.chatRoomId,
                messageState: 'send',
                messageUri: postHexId,
                messageType: 'POST',
                configAudMetrics: '',
                configAudTime: 0,
              },
              res => {
                sendNotificationMessage(result.chatRoomId, res.messageCummomId);

                if (message) {
                  socketRef.current?.emit(
                    'sendMessage',
                    {
                      userId: userId,
                      messageText: message,
                      chatRoomId: result.chatRoomId,
                      messageState: 'send',
                      messageUri: null,
                      messageType: 'TEXT',
                      configAudMetrics: '',
                      configAudTime: 0,
                    },
                    result => {},
                  );
                }
              },
            );
          }
        },
      );
    }
  };

  const sendDrop = (
    userIds: number[],
    postHexId: string,
    message: string | null,
  ) => {
    for (const uuid of userIds) {
      socketRef.current?.emit(
        'verifyChat',
        {
          chatOwnerUserId: userId,
          chatParticipantUserId: uuid,
        },
        result => {
          if (result.code == 200) {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: 'Enviou um Drops',
                chatRoomId: result.chatRoomId,
                messageState: 'send',
                messageUri: postHexId,
                messageType: 'DROP',
                configAudMetrics: '',
                configAudTime: 0,
              },
              res => {
                sendNotificationMessage(result.chatRoomId, res.messageCummomId);

                if (message) {
                  socketRef.current?.emit(
                    'sendMessage',
                    {
                      userId: userId,
                      messageText: message,
                      chatRoomId: result.chatRoomId,
                      messageState: 'send',
                      messageUri: null,
                      messageType: 'TEXT',
                      configAudMetrics: '',
                      configAudTime: 0,
                    },
                    result => {},
                  );
                }
              },
            );
          }
        },
      );
    }
  };
  const sendStory = (
    userIdStory: number,
    postHexId: string,
    message: string | null,
  ) => {
    socketRef.current?.emit(
      'verifyChat',
      {
        chatOwnerUserId: userIdStory,
        chatParticipantUserId: user.userId,
      },
      result => {
        if (result.code == 200) {
          socketRef.current?.emit(
            'sendMessage',
            {
              userId: userId,
              messageText: 'Enviou um cartaz',
              chatRoomId: result.chatRoomId,
              messageState: 'send',
              messageUri: postHexId,
              messageType: 'CARTAZ',
              configAudMetrics: '',
              configAudTime: 0,
            },
            res => {
              sendNotificationMessage(result.chatRoomId, res.messageCummomId);
              if (message) {
                socketRef.current?.emit(
                  'sendMessage',
                  {
                    userId: userId,
                    messageText: message,
                    chatRoomId: result.chatRoomId,
                    messageState: 'send',
                    messageUri: null,
                    messageType: 'TEXT',
                    configAudMetrics: '',
                    configAudTime: 0,
                  },
                  result => {},
                );
              }
            },
          );
        }
      },
    );
  };

  const sendRoom = (
    userIds: number[],
    idRoom: number,
    message: string | null,
  ) => {
    for (const uuid of userIds) {
      socketRef.current?.emit(
        'verifyChat',
        {
          chatOwnerUserId: userId,
          chatParticipantUserId: uuid,
        },
        result => {
          if (result.code == 200) {
            socketRef.current?.emit(
              'sendMessage',
              {
                userId: userId,
                messageText: 'Compartilhou uma sala',
                chatRoomId: result.chatRoomId,
                messageState: 'send',
                messageUri: idRoom,
                messageType: 'ROOM',
                configAudMetrics: '',
                configAudTime: 0,
              },
              res => {
                sendNotificationMessage(result.chatRoomId, res.messageCummomId);

                if (message) {
                  socketRef.current?.emit(
                    'sendMessage',
                    {
                      userId: userId,
                      messageText: message,
                      chatRoomId: result.chatRoomId,
                      messageState: 'send',
                      messageUri: null,
                      messageType: 'TEXT',
                      configAudMetrics: '',
                      configAudTime: 0,
                    },
                    result => {},
                  );
                }
              },
            );
          }
        },
      );
    }
  };

  const getProfileList = (nickName: string) => {
    getAllProfiles(nickName)
      .then(res => {
        setUsersList(res.data.profiles);
      })
      .catch(e => {
        console.warn('GetAllProfiles - Socket');
        console.log(e);
      });
  };

  const handleParticipantId = (id: number) => {
    socketRef.current?.emit(
      'verifyChat',
      {
        chatOwnerUserId: userId,
        chatParticipantUserId: id,
      },
      result => {
        if (result.code == 200) {
          setCurrentChat(result.chat);
        }
      },
    );
  };

  const changeMessageState = (
    ids: string[],
    state: 'send' | 'delivered' | 'read',
    chatId: string,
  ) => {
    setMessageList(prev =>
      prev.map(msg =>
        ids.some(message => message == msg.messageCummomId)
          ? { ...msg, messageState: 'read' }
          : msg,
      ),
    );
    socketRef.current?.emit(
      'changeMessageState',
      {
        messageCummomId: ids,
        messageState: state,
        chatRoomId: chatId,
      },
      result => {},
    );
  };

  const acceptOneChatSolicitation = (chatId: string, chat: CreateChat) => {
    socketRef.current?.emit(
      'acceptChatSolicitation',
      {
        chatRoomId: [chatId],
        userId: userId,
      },
      result => {
        if (result.code == 200) {
          getAllchat();
          handleSetChat(chat);
        }
      },
    );
  };

  const acceptAllChatSolicitation = () => {
    const solicitations = solicitationsList.map(message => message.chatRoomId);
    if (solicitations.length > 0) {
      socketRef.current?.emit(
        'acceptChatSolicitation',
        {
          chatRoomId: solicitations,
          userId: userId,
        },
        result => {
          if (result.code == 200) {
            setSolicitationsList([]);
            getAllchat();
          }
        },
      );
    }
  };

  const removeOneChatSolicitation = (chatId: string) => {
    socketRef.current?.emit(
      'removeSolicitation',
      {
        chatRoomId: [chatId],
        userId: userId,
      },
      result => {
        if (result.code == 200) {
          getAllchat();
        }
      },
    );
  };

  const removeAllChatSolicitation = () => {
    const solicitations = solicitationsList.map(message => message.chatRoomId);
    if (solicitations.length > 0) {
      socketRef.current?.emit(
        'removeSolicitation',
        {
          chatRoomId: solicitations,
          userId: userId,
        },
        result => {
          if (result.code == 200) {
            setSolicitationsList([]);
            getAllchat();
          }
        },
      );
    }
  };

  const clearChat = () => {
    setMessageList([]);
    setCurrentChat(undefined);
    setPageChat(1);
    setEndChat(false);
  };

  const clearAllListChat = () => {
    setChatList([]);
  };

  const clearUnreadMessages = () => {
    setUnrendedChats(0);
  };

  const deleteChat = (roomId: string) => {
    socketRef.current?.emit(
      'deleteChat',
      {
        chatRoomId: roomId,
        chatUserId: userId,
      },
      result => {
        console.log('Chat deletado', result);
      },
    );
  };

  function getUserOnline(
    userId: number,
  ): Promise<{ code: number; online: boolean }> {
    return new Promise((resolve, reject) => {
      socketRef.current?.emit(
        'getOnline',
        {
          userId,
        },
        result => {
          const data = { code: result.code, online: result.online };
          resolve(data);
        },
      );
    });
  }

  return (
    <SocketContext.Provider
      value={{
        listPartipantsLive,
        countViewsLiveRoom,
        listUserIsOn,
        verifyRoomLive,
        admJoinRoomLive,
        admLeaveRoomLive,
        updateParticipantsLiveRoom,
        verifyGroupChat,
        currentGroupChat,
        addMemberGroupChat,
        sendGroupMessage,
        getAllGroupMessage,
        getAllchat,
        chatList,
        handleSetChat,
        getAllMessage,
        messageList,
        currentChat,
        userId,
        sendMessage,
        deleteMessage,
        solicitationsList,
        getProfileList,
        usersList,
        handleParticipantId,
        clearChat,
        clearAllListChat,
        clearUnreadMessages,
        changeMessageState,
        acceptAllChatSolicitation,
        removeAllChatSolicitation,
        deleteChat,
        setPageChat,
        endChat,
        unrendedChats,
        acceptOneChatSolicitation,
        removeOneChatSolicitation,
        forwardMessage,
        sendAudio,
        sendFile,
        getUserOnline,
        sendPost,
        sendDrop,
        sendStory,
        sendRoom,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
