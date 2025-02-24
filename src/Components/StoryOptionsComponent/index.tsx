import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { OptionText, StoryOptions } from './style';

import Info from '../Info';
import ShareModal from '../ShareModal';
import BottomModal from '../BottomModal';
import ConfirmModal from '../ConfirmModal';
import SelectUsesModal from '../SelectUsersModal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  addSilentPerson,
  archiveStory,
  deltFollowingProfile,
  getSilentPerson,
  postFollowingProfile,
  unArquiveStoryItems,
} from '../../Service/Profile';

import { deleteStorie, hideStoryPerson } from '../../Service/Story';
import useStories from '../../GlobalState/stories.zustand';

import { useNotification } from '../../context/notification';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import DenunciaModalStory from '../DenunciaModalStory';

interface PostOptionsProps {
  postId: number;
  visibleBottonModal: boolean;
  setvisibleBottonModal: (postUserId?: number) => void;
  spoilerOnDenuncia?: boolean;
  onClose?: () => void;
  postUserId: number;
  followingUser: boolean;
  admin?: boolean;
  type?: 'Cartaz' | 'drops';
  onEdit?: () => void;
  onDeletePost?: () => void;
  postUrl?: string;
  followEnable: boolean;
  onDeleteStorie?: () => void;
  postHexId: string;
  index?: number;
}

export default function StoryOptionsComponent(props: PostOptionsProps) {
  const [silenced, setSilenced] = useState<number>(0);
  const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [confirmDeleteStory, setConfirmDeleteStory] = useState(false);

  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [popoutText, setPopoutText] = useState('');
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string }[]
  >([]);
  const [isArquive, setIsArquive] = useState(false);

  const { sendNotificationFollower } = useNotification();

  const { user } = useUserProfile();

  const [followingUser, setfollowingUser] = useState<boolean>(
    props.followingUser,
  );

  const handlePopout = (text: string) => {
    setPopoutText(text);
    props.setvisibleBottonModal();
    setshowSmallPopup(true);
  };

  const addFriend = async () => {
    await postFollowingProfile(props.postUserId);
    sendNotificationFollower(props.postUserId);
    setfollowingUser(true);
  };

  const removeFriend = async () => {
    await deltFollowingProfile(props.postUserId);
    setfollowingUser(false);
  };

  const { currentStory, setCurrentStory, populateFriendsStories } = useStories();

  const deleteMyStorie = async () => {
    try {
      await deleteStorie(props.postHexId);

      const historiasAtualizadas = currentStory.filter(
        story => story.postHexId !== props.postHexId,
      );
      if (historiasAtualizadas.length === 0) {
        populateFriendsStories();
      }
      setCurrentStory([...historiasAtualizadas]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSilencePerson = async () => {
    if (silenced == 1) {
      await addSilentPerson(user.userId, props.postUserId, false, false).then(
        res => {
          handlePopout('Usuário reativado');
        },
      );
    } else {
      await addSilentPerson(user.userId, props.postUserId, false, true);

      handlePopout('Usuário silenciado');
    }
  };

  const getSilenced = async () => {
    try {
      await getSilentPerson().then(res => {
        const filteredUser = res.data.silentUsers.filter(
          (person: { userId: number }) => person.userId == props.postUserId,
        );
        setSilenced(filteredUser[0].story);
      });
    } catch (error) {
      console.log('Deu ruim ao saber se a conta esta silenciada', error);
    }
  };

  const arquivated = () => {
    setIsArquive(!isArquive);
    if (isArquive == false) {
      archiveStory(props.postHexId, props.postUserId)
        .then(response => {})
        .catch(e => {
          console.warn('ArchiveStory - StoryOptionsComponent');
          console.log(e);
        });
    } else {
      unArquiveStoryItems(props.postHexId, props.postUserId)
        .then(response => {})
        .catch(e => {
          console.warn('UnArchiveStory - StoryOptionsComponent');
          console.log(e);
        });
    }
  };

  const hidePersonStory = async (userId: number) => {
    await hideStoryPerson(userId)
      .then(res => {
        console.log('cartaz ocultado', res?.data.message);
        handlePopout('Cartaz ocultado');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getSilenced();
  }, [props.postHexId]);

  return (
    <>
      <BottomModal
        visibleBottonModal={props.visibleBottonModal}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          props.setvisibleBottonModal();
        }}
        title=""
        children={
          <View>
            {/*           <StoryOptions onPress={() => {
                            Clipboard.setString(props.postUrl)
                            handlePopout("Link copiado")
                        }

                        }  >
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
                props.setvisibleBottonModal();
                setIsUsersModalOpen(true);
              }}>
              <Feather name="send" size={20} color={'#231F20'} />
              <OptionText>Compartilhar com</OptionText>
            </StoryOptions>
            {props.type && (
              <StoryOptions
                onPress={() => {
                  props.setvisibleBottonModal();
                  setIsUsersModalOpen(true);
                }}>
                <Image
                  style={{ width: 22, height: 20 }}
                  source={require('../../Assets/Icons/repostBlack.png')}
                />
                <OptionText>Repostar no seu {props.type}</OptionText>
              </StoryOptions>
            )}

            {props.admin ? (
              <>
                {props.onEdit && (
                  <StoryOptions onPress={props.onEdit}>
                    <Feather name="edit" size={20} color={'#231F20'} />
                    <OptionText>Editar</OptionText>
                  </StoryOptions>
                )}

                <StoryOptions
                  onPress={() => {
                    arquivated(), setIsArquive(!isArquive);
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

                {/*  <StoryOptions onPress={() => {
                                    !silence && handlePopout("Notificações silenciadas")
                                    setSilence(!silence)
                                }}>
                                    <FontAwesome
                                        name={silence ? "bell-slash" : "bell-slash-o"}
                                        color={"#231F20"}
                                        size={20}
                                    />
                                    <OptionText>Silenciar notificações</OptionText>
                                </StoryOptions> */}
                {/*   <StoryOptions>
                                    <MaterialCommunityIcons
                                        name="message-text-lock-outline"
                                        color={"#231F20"}
                                        size={20}
                                    />
                                    <OptionText>Desabilitar comentários</OptionText>
                                </StoryOptions> */}

                <StoryOptions
                  onPress={() => {
                    props.setvisibleBottonModal();
                    setConfirmDeleteStory(true);
                  }}>
                  <Ionicons name="trash-outline" color={'#231F20'} size={22} />
                  <OptionText>Excluir</OptionText>
                </StoryOptions>
              </>
            ) : (
              <>
                {/* <StoryOptions>
                                        <MaterialCommunityIcons
                                            name="bell-ring-outline"
                                            color={"#231F20"}
                                            size={23}
                                        />
                                        <OptionText>Ativar notificações</OptionText>
                                    </StoryOptions> */}
                <StoryOptions
                  onPress={() => {
                    props.onClose && props.onClose();
                    props.setvisibleBottonModal();
                    hidePersonStory(props.postUserId);
                  }}>
                  <FontAwesome name={'ban'} color={'#231F20'} size={20} />
                  <OptionText>Ocultar cartaz</OptionText>
                </StoryOptions>
                <StoryOptions onPress={handleSilencePerson}>
                  <FontAwesome
                    name={silenced == 1 ? 'bell-slash' : 'bell-slash-o'}
                    color={'#231F20'}
                    size={20}
                  />
                  <OptionText>
                    {silenced == 1 ? 'Reativar' : 'Silenciar'}
                  </OptionText>
                </StoryOptions>
                {props.followEnable && followingUser ? (
                  <StoryOptions
                    onPress={() => {
                      props.setvisibleBottonModal();
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
                        props.setvisibleBottonModal();
                        addFriend();
                      }}>
                      <AntDesign name="adduser" color={'#231F20'} size={23} />
                      <OptionText>Seguir</OptionText>
                    </StoryOptions>
                  )
                )}
                <StoryOptions
                  onPress={() => {
                    props.setvisibleBottonModal();
                    setTimeout(() => {
                      setIsdenunciaModalOpen(true);
                    }, 200);
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
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
        }}
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
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
        }}
        isModalVisible={confirmDeleteStory}
        title="Excluir cartaz"
        text="Caso exclua esse cartaz ele não ficará disponível no seu feed"
        onCancel={() => {
          props.onClose && props.onClose();
          setConfirmDeleteStory(false);
        }}
        onConfirm={() => {
          props.onDeleteStorie && props.onDeleteStorie();
          setConfirmDeleteStory(false);
          deleteMyStorie();
          props.onDeletePost && props.onDeletePost();
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

      <DenunciaModalStory
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
