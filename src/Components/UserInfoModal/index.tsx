/* eslint-disable react-hooks/exhaustive-deps */
import React, { SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import {
  OptionsContainer,
  RowDirection,
  TextOption,
  UserImage,
  UserInfo,
  UserName,
} from './style';

import BottomModal from '../BottomModal';
import LigthButton from '../LigthButton';
import { TextLightGray } from '../configurationsElemetsStyle';
import { getOtherProfile } from '../../Service/Profile';
import DarkButton from '../DarkButton';
import useCreatePost from '../../GlobalState/createPost.zustand';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

interface UserInfoModalProps {
  visibleBottonModal: boolean;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  userType: 'participant' | 'administrador';
  user: {
    userId: number;
    profileImage: string;
    userName: string;
    userNickname: string;
  };
}

export default function UserInfoModal(props: UserInfoModalProps) {
  const [isFollowing, setIsFollowing] = useState<number>(0);

  const navigation = useNavigation<StackRoutes>();

  const { user: userProfile } = useUserProfile();

  useEffect(() => {
    getOtherProfile(props.user.userNickname)
      .then(res => setIsFollowing(res.data.userFollowing))
      .catch(e => {
        console.warn('Get Room Participants - UserInfoModal', e);
      });
  }, []);

  // const { setNickName } = useCreatePost();

  const handleNavigateDirection = () => {
    // setNickName(props.user.userNickname);
    props.setvisibleBottonModal &&
      props.setvisibleBottonModal(pv => {
        return false;
      });
    const userNickname = props.user.userNickname;
    if (userProfile.userNickname == userNickname) {
      navigation.push('MyProfileScreen', {
        nickName: userNickname,
      });
    } else {
      navigation.push('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: { nickName: userNickname },
      });
    }
  };

  return (
    <BottomModal
      title=""
      visibleBottonModal={props.visibleBottonModal}
      setvisibleBottonModal={props.setvisibleBottonModal}
      children={
        <>
          <UserInfo style={{ alignItems: 'center' }}>
            <RowDirection>
              <UserImage
                source={{ uri: props.user.profileImage, cache: 'reload' }}
              />
              <View>
                <UserName>{props.user.userName}</UserName>
                <TextLightGray>{props.user.userNickname}</TextLightGray>
              </View>
            </RowDirection>
            {isFollowing === 1 ? (
              <LigthButton size="sm" title="Seguindo" />
            ) : (
              <DarkButton size="sm" title="Seguir" />
            )}
          </UserInfo>
          <OptionsContainer>
            <TouchableOpacity onPress={handleNavigateDirection}>
              <TextOption>Ver perfil</TextOption>
            </TouchableOpacity>
            {props.userType == 'participant' ? (
              <TouchableOpacity>
                <TextOption>Tornar administrador</TextOption>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <TextOption>Remover administrador</TextOption>
              </TouchableOpacity>
            )}

            {props.userType == 'participant' && (
              <TouchableOpacity>
                <TextOption>Remover da sala</TextOption>
              </TouchableOpacity>
            )}
          </OptionsContainer>
        </>
      }
    />
  );
}
