import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { HeaderContainer, UserInfos, HeaderActions, UserName } from './style';
import { theme } from '../../Theme/theme';
import { Icon } from 'react-native-elements';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackRoutes, StackRoutes } from '../../Routes/StackTypes';

import { ProfilePhoto } from '../HeaderPost/style';
import { Verified } from '../Verified';
import useNavigationParams from '../../GlobalState/navigationParams.zustand';

interface ProfileHeaderProps {
  title?: string;
  userImage?: string;
  verified?: boolean;
  fromComponent?: string;
  actionHeaderElement1?: React.ReactNode;
  actionHeaderElement2?: React.ReactNode;
  actionHeaderElement3?: React.ReactNode;
}

export default function ProfileHeader(props: ProfileHeaderProps) {
  const navigation = useNavigation<StackRoutes>();
  const { navigationParams, setNavigationParams } = useNavigationParams();
  const [isReturnButtonDisabled, setIsReturnButtonDisabled] = useState(false);
  const route = useRoute<RouteProp<RootStackRoutes, 'OtherProfileScreen'>>();
  const { from } = route.params || {};

  // console.log('route.params In ProfileHeader', route.params);
  // console.log('navigationParams?.from', navigationParams?.from);
  // console.log('props.fromComponent', props.fromComponent);
  function handleNavigationGoBack() {
    setIsReturnButtonDisabled(true);
    // const _from = navigation.getState().history;

    try {
      // const origin = _from[_from?.length - 2].key.split('-')[0];
      // const actual = route.key.split('-')[0];
      // console.log(from, origin, actual);

      // console.log('route.params In ProfileHeader From Inside', route.params);
      // console.log('navigationParams?.from From Inside', navigationParams?.from);
      if (
        // _from &&
        // _from.length > 1 &&
        // origin === 'Feed' &&
        // (actual === 'MyProfile' || actual === 'OtherProfile') &&
        navigationParams?.from !== 'TabNavigation' ||
        from === 'FOLLOWERS_FOLLOWING' ||
        props.fromComponent === 'Publications' ||
        props.fromComponent === 'Repost'
      ) {
        navigation.pop();
        // navigation.push('FeedScreen');
      } else {
        setNavigationParams({ from: '' });
        navigation.goBack();
      }
    } catch (error) {
      navigation.goBack();
    } finally {
      setIsReturnButtonDisabled(false);
    }
  }

  return (
    <HeaderContainer>
      <UserInfos>
        <TouchableOpacity
          onPress={handleNavigationGoBack}
          disabled={isReturnButtonDisabled}>
          <Icon
            name="chevron-small-left"
            type="entypo"
            color={theme.primarycolor}
            size={40}
          />
        </TouchableOpacity>

        <ProfilePhoto source={{ uri: props?.userImage }} />

        <UserName>{props.title}</UserName>
        {props.verified && <Verified width={12} height={12} />}
      </UserInfos>
      <HeaderActions>
        {props.actionHeaderElement1}
        {props.actionHeaderElement2}
        {props.actionHeaderElement3}
      </HeaderActions>
    </HeaderContainer>
  );
}
