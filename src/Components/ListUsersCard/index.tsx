import React, { SetStateAction, useEffect, useState } from 'react';
import { Modal, View } from 'react-native';

import {
  UserInfo,
  UserName,
  UserAddress,
  CardContainer,
  Container,
  ModalContainer,
} from './style';

import DarkButton from '../DarkButton';
import LigthButton from '../LigthButton';

import UserImageRounded from '../UserImageProfile';

import {
  deltFollowingProfile,
  getOtherProfile,
  getVerfication,
  postFollowingProfile,
} from '../../Service/Profile';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import NavigateToProfile from '../NavigatetoProfile';
import { acceptFriend } from '../../Service/Followers';
import { useNotification } from '../../context/notification';
import { Verified } from '../Verified';

interface LikeCardProps {
  userId: number;
  userName: string;
  userNickname: string;
  rightButton?: React.ReactNode;
  userHasCartaz?: boolean;
  inverted?: boolean;
  isFollowing?: number;
  borderBottom?: boolean;
  user_verified?: number;
  private_account?: number;
  btnText?: string;
  limitNick: number;
  profileImage?: string;
  onPress?: () => void;
  userRequest?: boolean;
  setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>;
  isShare?: boolean;
  following?: boolean;
  actionElement?: React.ReactNode;
}

export default function ListUsersCard(props: LikeCardProps) {
  const [isAccept, setIsAccept] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);

  const { sendNotificationFollower } = useNotification();

  function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname.length > maxLength) {
      return nickname.slice(0, maxLength) + '...';
    }
    return nickname;
  }
  const [verified, setVerified] = useState<number>();

  const getVerifiedUser = async () => {
    try {
      const response = await getVerfication(props.userId);
      setVerified(response.data.result[0].user_verified);
    } catch (error) {
      console.warn('GetVerfication - Story');
      console.log(error);
    }
  };

  const { user: userProfile } = useUserProfile();

  const [isFollowing1, setIsFollowing1] = useState<number>(0);

  const acceptingFriend = async () => {
    try {
      await acceptFriend(props.userId, true);
    } catch (error) {
      console.log(error);
    }
  };

  const refusedFriend = async () => {
    try {
      await acceptFriend(props.userId, false);
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = () => {
    setIsFollowing1(1);
    sendNotificationFollower(props.userId);
    postFollowingProfile(props.userId)
      .then(response => {})
      .catch(error => {
        console.warn('PostFollowingProfile - ListUsersCard');
      });
  };

  const removeFriend = () => {
    setIsFollowing1(0);
    deltFollowingProfile(props.userId);
  };

  const handleOptions = () => {
    setModalOptions(!modalOptions);
  };

  const handleAcceptButton = () => {
    setModalOptions(!modalOptions);
    setIsAccept(true);
    acceptingFriend();
  };

  const handleRefusedButton = () => {
    setModalOptions(!modalOptions);
    setIsAccept(true);
    refusedFriend();
  };

  useEffect(() => {
    getOtherProfile(props.userNickname)
      .then(res => {
        setIsFollowing1(res.data.userFollowing);
      })
      .catch(e => {
        console.warn('GetOtherProfile - ListUsersCard');
        console.log(e);
      });
  }, [modalOptions]);

  useEffect(() => {
    getVerifiedUser();
  }, []);

  return (
    <>
      <CardContainer border={props.borderBottom}>
        <NavigateToProfile
          onPress={props.onPress}
          userNickName={props.userNickname}>
          <UserInfo>
            <UserImageRounded
              hasCartaz={props.userHasCartaz}
              url={props.profileImage}
              size={44}
            />
            <View style={{ justifyContent: 'center' }}>
              <UserAddress>
                {props.userNickname}{' '}
                {verified === 1 && <Verified width={10} height={10} />}
              </UserAddress>
              <UserName>
                {limitNicknameLength(props.userName, props.limitNick)}
              </UserName>
            </View>
          </UserInfo>
        </NavigateToProfile>
        {props.userRequest ? (
          <>
            <DarkButton onPress={handleOptions} title={'Opções'} size="sm" />
          </>
        ) : (
          <>
            {props.isShare == false || props.isShare == undefined ? (
              <>
                {props.userId !== userProfile.userId && (
                  <>
                    {isFollowing1 === 0 && props.btnText != 'Solicitado' && (
                      <DarkButton
                        onPress={addFriend}
                        title={'Seguir'}
                        size="sm"
                      />
                    )}
                    {isFollowing1 === 1 && props.btnText != 'Solicitado' && (
                      <LigthButton
                        onPress={removeFriend}
                        title={'Seguindo'}
                        size="sm"
                      />
                    )}
                    {isFollowing1 === 0 && props.btnText == 'Solicitado' && (
                      <LigthButton
                        disable={true}
                        onPress={removeFriend}
                        title={'Solicitado'}
                        size="sm"
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        )}
        {props.rightButton}
      </CardContainer>
      <Modal visible={modalOptions} transparent>
        <ModalContainer>
          <Container>
            <DarkButton
              onPress={handleAcceptButton}
              title={'Aceitar'}
              size="sm"
            />
            <LigthButton
              onPress={handleRefusedButton}
              title={'Recusar'}
              size="sm"
            />
          </Container>
        </ModalContainer>
      </Modal>
    </>
  );
}
