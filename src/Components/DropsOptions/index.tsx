import React, { SetStateAction, useEffect, useState } from 'react';
import BottomModal from '../BottomModal';
import { Image, View } from 'react-native';
import { OptionText, StoryOptions } from './style';

import ShareModal from '../ShareModal';
import SelectUsesModal from '../SelectUsersModal';
import ConfirmModal from '../ConfirmModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Info from '../Info';
import {
  archiveReels,
  deltFollowingProfile,
  getOtherProfile,
  postFollowingProfile,
  unArquiveDropsItems,
} from '../../Service/Profile';
import { shareLink } from '../../Utils/share';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import { useNavigation } from '@react-navigation/native';
import { deletePost } from '../../Service/Publications';
import { StackRoutes } from '../../Routes/StackTypes';

import { useNotification } from '../../context/notification';
import { deleteDrop } from '../../Service/Drop';
import Clipboard from '@react-native-clipboard/clipboard';
import useDropsStore from '../../GlobalState/drops.zustand';
import useFeedData from '../../GlobalState/feed.zustand';
import SelectUsesrModal from '../SelectUsersModal';
import { useSocket } from '../../context/socket';
import DenunciaModal from '../DenunciaModal';

interface DropsOptionsProps {
  visibleBottonModal: boolean;
  userNickname: string;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  dropsUserId: number;
  spoilerOnDenuncia?: boolean;
  followingUser: number;
  admin?: boolean;
  onEdit?: () => void;
  dropsUrl: string;
  followEnable: boolean;
  postHexId: string;
  archi?: boolean;
}

export default function DropsOptions(props: DropsOptionsProps) {
  const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isArquive, setIsArquive] = useState(!props.archi ? false : true);
  const [userProfile, setUserProfile] = useState<number>();
  const { user, populateFollowingProfilesNickname } = useUserProfile();
  const { removeDropFromList } = useDropsStore();
  const { removePostFromList } = useFeedData();

  const { sendNotificationFollower } = useNotification();

  useEffect(() => {
    setUserProfile(user.userId);
  }, [user]);

  const [confirmDeleteDrops, setConfirmDeleteDrops] = useState<boolean>(false);

  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [popoutText, setPopoutText] = useState('');
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string }[]
  >([]);

  const navigation = useNavigation<StackRoutes>();

  const { sendDrop } = useSocket();

  const handlePopout = (text: string) => {
    setPopoutText(text);
    props.setvisibleBottonModal(false);
    setshowSmallPopup(true);
  };

  const deleteMyDrops = async () => {
    await deleteDrop(props.postHexId)
      .then(res => {
        props.setvisibleBottonModal(true);
      })
      .catch(e => console.log(e));
  };

  const arquiveDrops = async () => {
    if (isArquive == false) {
      await archiveReels(user.userId, props.postHexId)
        .then(response => {
          console.log('drops arquivado.', response);
        })
        .catch(e => {
          console.warn('ArchiveReels - DropOptions');
          console.log(e);
        });
    } else {
      await unArquiveDropsItems(user.userId, props.postHexId)
        .then(response => {})
        .catch(e => {
          console.warn('UnArquiveDropsItems - DropOptions');
          console.log(e);
        });
    }
  };

  const handleUserModal = () => {
    setIsUsersModalOpen(!isUsersModalOpen);
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
            {/*  <StoryOptions onPress={() => {
                            const message = `https://reels.intellectus.app.br/${props.postHexId}`
                            Clipboard.setString(message)
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
            {/* <StoryOptions onPress={() => {
                            props.setvisibleBottonModal()
                            shareLink({ message: props.dropsUrl, title: 'Drops - Intellectus', url: props.dropsUrl })
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

                {props.postHexId ? (
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
                      <OptionText>Desarquivar</OptionText>
                    )}
                  </StoryOptions>
                ) : (
                  <></>
                )}

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
                {/*  <StoryOptions>
                                    <MaterialCommunityIcons
                                        name="message-text-lock-outline"
                                        color={"#231F20"}
                                        size={20}
                                    />
                                    <OptionText>Desabilitar comentários</OptionText>
                                </StoryOptions> */}

                {props.postHexId ? (
                  <StoryOptions
                    onPress={() => {
                      props.setvisibleBottonModal(false);
                      setTimeout(() => {
                        setConfirmDeleteDrops(true);
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
                {/*  <StoryOptions>
                                        <MaterialCommunityIcons
                                            name="bell-ring-outline"
                                            color={"#231F20"}
                                            size={23}
                                        />
                                        <OptionText>Ativar notificações</OptionText>
                                    </StoryOptions> */}
                {/* <StoryOptions onPress={() => {
                                        const message = bells ? "Usuário reativado" : "Usuário silenciado";
                                        // handleSilenceAccounts(message);
                                    }}>
                                        {bells == true ? (
                                            <FontAwesome
                                                name="bell-slash-o"
                                                color={"#231F20"}
                                                size={20}
                                            />
                                        ) : (
                                            <FontAwesome
                                                name="bell-o"
                                                color={"#231F20"}
                                                size={20}
                                            />
                                        )}

                                        {bells == true ? (
                                            <OptionText>Reativar</OptionText>
                                        ) : (
                                            <OptionText>Silenciar</OptionText>
                                        )}
                                    </StoryOptions> */}
                {props.followEnable && props.followingUser ? (
                  <StoryOptions
                    onPress={async () => {
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
                      onPress={async () => {
                        props.setvisibleBottonModal(false);
                        sendNotificationFollower(props.dropsUserId);
                        await postFollowingProfile(props.dropsUserId);
                        populateFollowingProfilesNickname();
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

      <DenunciaModal
        postHexId={props.postHexId}
        spoilerOption={props.spoilerOnDenuncia}
        visibleBottonModal={isDenunciaModalOpen}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          setIsdenunciaModalOpen(!isDenunciaModalOpen);
        }}
      />

      <ConfirmModal
        title="Excluir drops"
        text="Caso exclua esse drop ela não ficará disponível no seu feed"
        onCancel={() => {
          props.setvisibleBottonModal(false);
          setConfirmDeleteDrops(!confirmDeleteDrops);
        }}
        onConfirm={async () => {
          await deleteMyDrops();
          props.setvisibleBottonModal(false);
          setConfirmDeleteDrops(false);
          props.onClose && props.onClose();
          removePostFromList(props.postHexId);
          removeDropFromList(props.postHexId);
        }}
        setvisibleBottonModal={() => props.setvisibleBottonModal}
        isModalVisible={confirmDeleteDrops}
        postHexId={props.postHexId}
      />

      <ConfirmModal
        setvisibleBottonModal={() => props.setvisibleBottonModal}
        isModalVisible={isConfirmModalOpen}
        title="Deixar de seguir"
        text="Você tem certeza? Caso queira seguir novamente, terá que fazer uma nova solicitação."
        onCancel={() => {
          props.onClose && props.onClose();
          setIsConfirmModalOpen(false);
        }}
        onConfirm={async () => {
          props.onClose && props.onClose();
          setIsConfirmModalOpen(false);
          await deltFollowingProfile(props.dropsUserId);
          populateFollowingProfilesNickname();
        }}
      />

      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      />

      <ShareModal
        postUrl={props.dropsUrl}
        setvisibleBottonModal={() => {
          props.onClose && props.onClose();
          setIsShareModalOpen(!isShareModalOpen);
        }}
        visibleBottonModal={isShareModalOpen}
      />

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
    </>
  );
}
