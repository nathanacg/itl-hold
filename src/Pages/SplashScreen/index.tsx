import { useEffect } from 'react';
import { Image, Platform, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { SafeAreaView } from './style';
import {
  clearStorage,
  getStoreItem,
  setStoreObject,
} from '../../Lib/asyncStorage';

import { getUser } from '../../Service/UserRegister';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useGaleryData from '../../GlobalState/galeryData.zustand';
import { hasAndroidPermission } from '../../Utils/React-native-camera-row';

import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { deltAccount } from '../../Service/Profile';

export default function SplashScreen() {
  const navigation = useNavigation<StackRoutes>();
  const { initializeProfile } = useUserProfile();

  const { initializeGalery } = useGaleryData();

  const checkNotificationPermission = async () => {
    const permissionStatus = await notifee.requestPermission();

    if (
      permissionStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED
    ) {
      // console.log('Permissão de notificação está ativa');
    } else {
      // console.log('Permissão de notificação não está ativa');
    }
  };

  const checkFullPermission = async () => {
    Platform.OS == 'android' && (await hasAndroidPermission());
    initializeGalery();
    await checkNotificationPermission();
  };
  useEffect(() => {
    checkFullPermission();
  }, []);

  const getUserToken = async () => {
    const tokenStorage = await getStoreItem('@intellectus:tokenUser');
    const tokenUser = tokenStorage?.split('"').join('');
    if (tokenUser) {
      getUser(tokenUser)
        .then(response => {
          if (response.status === 200) {
            if (response.data.profile.userActive === 0) {
              deltAccount();
              clearStorage();
              navigation.reset({
                index: 1,
                routes: [{ name: 'Welcome' }],
              });
              return;
            }
            setStoreObject('@intellectus:userProfile', response.data.profile);
            initializeProfile();

            setTimeout(() => {
              navigation.reset({
                index: 1,
                routes: [{ name: 'TabNavigation' }],
              });
            }, 600);
          } else {
            navigation.reset({
              index: 1,
              routes: [{ name: 'Welcome' }],
            });
          }
        })
        .catch(error => {
          console.log('deu ruim.', error);
          navigation.push('TabNavigation');
        });
    } else {
      clearStorage();
      setTimeout(() => {
        navigation.reset({
          index: 1,
          routes: [{ name: 'Welcome' }],
        });
      }, 2750);
    }
  };

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <Image
        style={{ width: '100%', height: '100%' }}
        defaultSource={require('../../Assets/Image/splash.png')}
        source={require('../../Assets/Image/splash.png')}
      />
    </SafeAreaView>
  );
}
