import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { TouchableOpacity } from 'react-native';
import React, { SetStateAction } from 'react';
import useCreatePost from '../../GlobalState/createPost.zustand';

interface NavigateToProfileProps {
  children: React.ReactNode;
  userNickName: string;
  onPress?: () => void;
  setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>;
}
export default function NavigateToProfile({
  children,
  userNickName,
  onPress,
}: NavigateToProfileProps) {
  const navigation = useNavigation<StackRoutes>();
  const { user } = useUserProfile();
  // const { setNickName } = useCreatePost();

  const handleNavigateDirection = () => {
    // setNickName(userNickName);

    onPress && onPress();

    if (user.userNickname === userNickName) {
      navigation.push('TabNavigation', {
        screen: 'MyProfileScreen',
        params: {
          from: 'FOLLOWERS_FOLLOWING',
          nickName: userNickName,
        },
      });
    } else {
      navigation.push('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: {
          from: 'FOLLOWERS_FOLLOWING',
          nickName: userNickName,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handleNavigateDirection}
      style={{
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}>
      {children}
    </TouchableOpacity>
  );
}
