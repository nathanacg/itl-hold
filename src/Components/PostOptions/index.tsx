import React, { SetStateAction, useEffect, useState } from 'react';
import BottomModal from '../BottomModal';
import { Image, View } from 'react-native';
import { OptionText, StoryOptions } from './style';

import ShareModal from '../ShareModal';
import DenunciaModal from '../DenunciaModal';
import SelectUsesModal from '../SelectUsersModal';
import ConfirmModal from '../ConfirmModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Info from '../Info';
import {
  addSilentPerson,
  archiveReels,
  deleteSilentPerson,
  deltFollowingProfile,
  postFollowingProfile,
  unArquiveDropsItems,
} from '../../Service/Profile';
import { shareLink } from '../../Utils/share';
import { deleteStorie, getUserStories } from '../../Service/Story';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { deletePost } from '../../Service/Publications';
import { archiveItens } from '../../Service/Profile';
import { unArquiveItems } from '../../Service/Profile';
import { useNotification } from '../../context/notification';
import { deleteDrop } from '../../Service/Drop';
import Clipboard from '@react-native-clipboard/clipboard';
import useFeedData from '../../GlobalState/feed.zustand';
import useStories from '../../GlobalState/stories.zustand';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

interface PostOptionsProps {
  visibleBottonModal: boolean;
  setvisibleBottonModal2: React.Dispatch<SetStateAction<boolean>>;
  setvisibleBottonModal: (isVisible: boolean) => void;
  onDeleteAfterHandler?: () => void;
  spoilerOnDenuncia?: boolean;
  onClose?: () => void;
  postUserId: number;
  followingUser: number;
  admin?: boolean;
  type?: 'Cartaz' | 'drops';
  onEdit?: () => void;
  onDelete: () => void;
  postUrl: string;
  followEnable: boolean;
  postHexId?: any;
  postId?: any;
  isArquivaded?: boolean;
  keyRealsArquive?: any;
  postExIdReels?: any;
  userNickname?: string;
  profileImage?: string;
  userId?: any;
  myPost?: boolean;
}

export default function PostOptions(props: PostOptionsProps) {
  const [silence, setSilence] = useState(false);
  const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { removePostFromList } = useFeedData();
  const [isArquive, setIsArquive] = useState(
    !props.isArquivaded ? false : true,
  );
  const [userProfile, setUserProfile] = useState<number>();
  const { user } = useUserProfile();

  const { setHasStory } = useStories();

  const { sendNotificationFollower } = useNotification();

  useEffect(() => {
    setUserProfile(user.userId);
  }, [user]);

  const navigation = useNavigation<StackRoutes>();

  const [confirmDeletePost, setConfirmDeletePost] = useState(false);
  const [confirmDeleteStory, setConfirmDeleteStory] = useState(false);

  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [popoutText, setPopoutText] = useState('');
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string }[]
  >([]);
  const [keyRealsArquive, setKeyRealsArquive] = useState<boolean>(false);
  const [bells, setBells] = useState<boolean>(false);
  const [notify, setNotify] = useState<boolean>(false);

  const [followingUser, setfollowingUser] = useState(props.followingUser);

  const handlePopout = (text: string) => {
    setPopoutText(text);
    props.setvisibleBottonModal(false);
    setshowSmallPopup(true);
  };

  useEffect(() => {
    setKeyRealsArquive(props.keyRealsArquive);
  }, []);

  const addFriend = () => {
    sendNotificationFollower(props.userId);
    postFollowingProfile(props.postUserId);
    setfollowingUser(1);
  };

  const removeFriend = () => {
    deltFollowingProfile(props.postUserId);
    setfollowingUser(0);
  };

  // const deleteMyPost = async () => {
  //   try {
  //     if (navigation.canGoBack()) {
  //       navigation.goBack();
  //     }
  //     await deletePost(props.postHexId);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleNotifyAccount = (text: string) => {
    handlePopout(text);
    setNotify(!notify);
    if (bells == false) {
      const userId = user.userId;
      const silentUserId = props.userId;
      try {
        addSilentPerson(userId, silentUserId, 1, 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      let userId = user.userId;
      let silentUserId = props.userId;
      try {
        deleteSilentPerson(userId, silentUserId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSilenceAccounts = (text: string) => {
    handlePopout(text);
    setBells(!bells);
    if (bells == false) {
      const userId = user.userId;
      const silentUserId = props.userId;
      try {
        addSilentPerson(userId, silentUserId, 1, 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      let userId = user.userId;
      let silentUserId = props.userId;
      try {
        deleteSilentPerson(userId, silentUserId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const arquivePost = () => {
    let postId = props.postId;
    let userId = user.userId;
    if (isArquive == false) {
      archiveItens(postId, userId)
        .then(response => {})
        .catch(e => {
          console.warn('ArchiveItems - PostFooterDrop');
          console.log(e);
        });
    } else {
      unArquiveItems(postId, userId)
        .then(response => {})
        .catch(e => {
          console.warn('UnArchiveItems - PostFooterDrop');
          console.log(e);
        });
    }
  };

  const arquiveDrops = () => {
    let userId = user.userId;
    let postExIdReels = props.postExIdReels;

    if (isArquive == false) {
      archiveReels(userId, postExIdReels)
        .then(response => {})
        .catch(e => {
          console.warn('ArchiveReels - PostFooterDrop');
          console.log(e);
        });
    } else {
      unArquiveDropsItems(userId, postExIdReels)
        .then(response => {})
        .catch(e => {
          console.warn('UnArchivesDropItems- PostFooterDrop');
          console.log(e);
        });
    }
  };

  return (
    <>
      <BottomModal
        visibleBottonModal={props.visibleBottonModal}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          props.setvisibleBottonModal(false);
        }}
        title=""
        children={
          <View>
            {/*    <StoryOptions onPress={() => {
                            const message = `http://post.intellectus.app.br/${props.postHexId}`
                            Clipboard.setString(message)
                            handlePopout("Link copiado")
                        }} >
                            <Ionicons
                                name="ios-infinite"
                                size={20}
                                color={"#231F20"}
                                style={{ transform: [{ rotate: '-50deg' }] }}
                            />
                            <OptionText>Copiar link</OptionText>
                        </StoryOptions> */}
            {/*  <StoryOptions onPress={() => {
                            props.setvisibleBottonModal()
                            shareLink({ message: props.postUrl, title: '', url: "" })
                        }}>
                            <Image style={{ width: 22, height: 20 }} source={require("../../Assets/Icons/shareBlack.png")} />
                            <OptionText>Compartilhar em</OptionText>
                        </StoryOptions> */}
            <StoryOptions
              onPress={() => {
                props.setvisibleBottonModal(false);
                setIsUsersModalOpen(true);
              }}>
              <Feather name="send" size={20} color={'#231F20'} />
              <OptionText>Compartilhar com</OptionText>
            </StoryOptions>

            {props.admin ? (
              <>
                {props.onEdit && (
                  <StoryOptions onPress={props.onEdit}>
                    <Feather name="edit" size={20} color={'#231F20'} />
                    <OptionText>Editar</OptionText>
                  </StoryOptions>
                )}

                {props.postExIdReels ? (
                  <StoryOptions
                    onPress={() => {
                      arquiveDrops(), setIsArquive(!isArquive);
                    }}>
                    {!isArquive ? (
                      <MaterialCommunityIcons
                        name="archive-check-outline"
                        color={'#231F20'}
                        size={23}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="archive-cancel-outline"
                        color={'#231F20'}
                        size={23}
                      />
                    )}

                    {!isArquive ? (
                      <OptionText>Arquivar</OptionText>
                    ) : (
                      <OptionText>Desarquivar2</OptionText>
                    )}
                  </StoryOptions>
                ) : (
                  <></>
                )}

                {props.postId ? (
                  <StoryOptions
                    onPress={() => {
                      arquivePost(), setIsArquive(!isArquive);
                    }}>
                    {!isArquive ? (
                      <MaterialCommunityIcons
                        name="archive-check-outline"
                        color={'#231F20'}
                        size={23}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="archive-cancel-outline"
                        color={'#231F20'}
                        size={23}
                      />
                    )}

                    {!isArquive ? (
                      <OptionText>Arquivar</OptionText>
                    ) : (
                      <OptionText>Desarquivar</OptionText>
                    )}
                  </StoryOptions>
                ) : (
                  <></>
                )}

                {props.postExIdReels ? (
                  <StoryOptions
                    onPress={() => {
                      props.setvisibleBottonModal(false);
                      setConfirmDeleteStory(true);
                    }}>
                    <Ionicons
                      name="trash-outline"
                      color={'#231F20'}
                      size={22}
                    />
                    <OptionText>Excluir</OptionText>
                  </StoryOptions>
                ) : (
                  <></>
                )}

                {props.postId ? (
                  <StoryOptions
                    onPress={() => {
                      props.setvisibleBottonModal(false);
                      setTimeout(() => {
                        setConfirmDeletePost(true);
                      }, 400);
                    }}>
                    <Ionicons
                      name="trash-outline"
                      color={'#231F20'}
                      size={22}
                    />
                    <OptionText>Excluir</OptionText>
                  </StoryOptions>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <StoryOptions
                  onPress={() => {
                    const message = notify
                      ? 'Notificaçoes desativadas'
                      : 'Notificaçoes ativadas';
                    handleNotifyAccount(message);
                  }}>
                  <MaterialCommunityIcons
                    name="bell-ring-outline"
                    color={'#231F20'}
                    size={23}
                  />
                  {notify ? (
                    <OptionText>Desativar notificações</OptionText>
                  ) : (
                    <OptionText>Ativar notificações</OptionText>
                  )}
                </StoryOptions>
                <StoryOptions
                  onPress={() => {
                    const message = bells
                      ? 'Usuário reativado'
                      : 'Usuário silenciado';
                    handleSilenceAccounts(message);
                  }}>
                  {bells ? (
                    <FontAwesome
                      name="bell-slash-o"
                      color={'#231F20'}
                      size={20}
                    />
                  ) : (
                    <FontAwesome name="bell-o" color={'#231F20'} size={20} />
                  )}

                  {bells ? (
                    <OptionText>Reativar</OptionText>
                  ) : (
                    <OptionText>Silenciar</OptionText>
                  )}
                </StoryOptions>
                {props.followEnable && followingUser ? (
                  <StoryOptions
                    onPress={() => {
                      props.setvisibleBottonModal(false);
                      setTimeout(() => {
                        setIsConfirmModalOpen(true);
                      }, 400);
                    }}>
                    <AntDesign name="deleteuser" color={'#231F20'} size={23} />
                    <OptionText>Deixar de seguir</OptionText>
                  </StoryOptions>
                ) : (
                  props.followEnable && (
                    <StoryOptions
                      onPress={() => {
                        props.setvisibleBottonModal(false);
                        addFriend();
                      }}>
                      <AntDesign name="adduser" color={'#231F20'} size={23} />
                      <OptionText>Seguir</OptionText>
                    </StoryOptions>
                  )
                )}
                <StoryOptions
                  onPress={() => {
                    props.setvisibleBottonModal(false);
                    setIsdenunciaModalOpen(true);
                  }}>
                  <MaterialCommunityIcons
                    name="alert-octagon-outline"
                    color={'#231F20'}
                    size={23}
                  />
                  <OptionText>Denunciar</OptionText>
                </StoryOptions>
              </>
            )}
          </View>
        }
      />

      <ConfirmModal
        setvisibleBottonModal={props.setvisibleBottonModal2}
        isModalVisible={isConfirmModalOpen}
        title="Deixar de seguir"
        text="Você tem certeza? Caso queira seguir novamente, terá que fazer uma nova solicitação."
        onCancel={() => {
          props.onClose && props.onClose();
          setIsConfirmModalOpen(false);
        }}
        onConfirm={() => {
          props.onClose && props.onClose();
          setIsConfirmModalOpen(false);
          removeFriend();
        }}
      />

      <ConfirmModal
        setvisibleBottonModal={props.setvisibleBottonModal2}
        isModalVisible={confirmDeletePost}
        title="Excluir publicação"
        text="Caso exclua essa publicação ela não ficará disponível no seu feed"
        onCancel={() => {
          props.setvisibleBottonModal(false);
          setConfirmDeletePost(false);
        }}
        onConfirm={() => {
          props.setvisibleBottonModal(false);
          props.onDelete();
          props.onDeleteAfterHandler && props.onDeleteAfterHandler();
          setConfirmDeletePost(false);
          removePostFromList(props.postHexId);
        }}
        postHexId={''}
      />

      <ConfirmModal
        setvisibleBottonModal={props.setvisibleBottonModal2}
        isModalVisible={confirmDeleteStory}
        title="Excluir cartaz"
        text="Caso exclua esse cartaz ele não ficará disponível no seu feed"
        onCancel={() => {
          props.onClose && props.onClose();
          setConfirmDeleteStory(false);
        }}
        onConfirm={() => {
          props.onDelete();
          setConfirmDeleteStory(false);
          deleteDrop(props.postHexId);
          props.onDeleteAfterHandler && props.onDeleteAfterHandler();
          setHasStory(false);
          getUserStories(props.userId);
        }}
        postHexId={''}
      />

      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      />

      <ShareModal
        postUrl={props.postUrl}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          setIsShareModalOpen(!isShareModalOpen);
        }}
        visibleBottonModal={isShareModalOpen}
      />

      <DenunciaModal
        postHexId={props.postHexId}
        spoilerOption={props.spoilerOnDenuncia}
        visibleBottonModal={isDenunciaModalOpen}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          setIsdenunciaModalOpen(!isDenunciaModalOpen);
        }}
      />

      <SelectUsesModal
        messageOption
        markedUsers={markedUsers}
        setMarkedUsers={setMarkedUsers}
        visibleBottonModal={isUsersModalOpen}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          setIsUsersModalOpen(!isUsersModalOpen);
        }}
      />
    </>
  );
}
