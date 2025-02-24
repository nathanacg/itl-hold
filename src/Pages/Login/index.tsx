import React, { useState, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
  Text,
  View,
  Linking,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  PlatformConstants,
} from 'react-native';
import Device from 'react-native-device-info';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { fontStyle, theme } from '../../Theme/theme';
import { typeTheme } from '../../Config/enumTheme';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements';

import {
  LoginWithApple,
  LoginWhitGoogle,
  login,
  postLoginLog,
  ResquestLogActive,
} from '../../Service/Login';
import { addToken, getUser } from '../../Service/UserRegister';

import useUserProfile from '../../GlobalState/userProfile.zustand';

import { setStoreItem, setStoreObject } from '../../Lib/asyncStorage';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

import {
  Container,
  ContentPage,
  TitlePage,
  CircleSelectButton,
  SafeAreaViewContainer,
  ContentPage2,
  TitlePageLogin,
} from '../../Components/elementsComponents';

import {
  ContainerButtons,
  ButtonOption,
  TextButton,
  LoginOptionsContainer,
  ContentLeft,
  TextConected,
  TextForwardPassword,
  ButtonMini,
  TextButton2,
} from './style';
import { TextRegular12 } from '../../Components/configurationsElemetsStyle';
import { TextCenter } from '../EmailValidateCode/style';
import { ButtonLogin } from '../Welcome/style';
import { TextLabel, TextLabelAccess } from '../../Components/Input/style';
import userToken from '../../GlobalState/userToken.zustand';
import Octicons from 'react-native-vector-icons/Octicons';

interface PlatformCustom extends PlatformConstants {
  Model: string;
}

export default function Login() {
  const navigation = useNavigation<StackRoutes>();

  const [errEmail, setErrEmail] = useState<string>('');
  const [phoneErr, setphoneErr] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [selectedButton, setSelectedButton] = useState<string>('E-mail');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [continuConected, setContinuConected] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState(true);
  const { setToken } = userToken();
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const { initializeProfile, setUser } = useUserProfile();
  const [useLocationManager, setUseLocationManager] = useState(false);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Localização negada');
    }

    if (status === 'disabled') {
      Alert.alert('Habilite sua localização.', '', [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} },
      ]);
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        //   Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
  }, []);

  async function loginUser() {
    setIsLoading(true);
    try {
      var result: any;
      setLoginError(false);
      setEmailError(false);
      if (selectedButton == 'E-mail') {
        await login(email, password)
          .then(response => {
            result = response;
          })
          .catch(err => {
            console.log(err);
            setEmailError(true);
            setErrEmail('E-mail incorreto');
            setLoginError(true);
            if (!email) {
              setErrEmail('E-mail incorreto');
            }
            if (!password) {
              setLoginError(true);
            }
            if (!email && !password) {
              setErrEmail('E-mail incorreto');
              setLoginError(true);
            }
          });
      } else if (selectedButton == 'Telefone') {
        await login(`+55 ${phone}`, password)
          .then(response => {
            result = response;
          })
          .catch(error => {
            setLoginError(true);
            setPhoneError(true);

            if (!phone) {
              setPhoneError(true);
              setphoneErr('Telefone incorreto');
            } else {
              setphoneErr('Telefone incorreto');
            }

            if (!phone && !password) {
              setphoneErr('Telefone incorreto');
              setLoginError(true);
            }
          });
      }

      if (result) {
        setStoreItem('@intellectus:tokenUser', result?.data.token);
        setToken(result?.data.token);
      }

      if (result.data.userProfile === true) {
        getUser(result?.data.token).then(async response => {
          if (response.status === 200) {
            setStoreObject('@intellectus:userProfile', response.data.profile);

            initializeProfile();
            addToken(result?.data.token, response.data.profile.userId);

            if (location) {
              const data: ResquestLogActive = {
                userId: response.data.profile.userId,
                os: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                device: Device.getModel(),
              };
              await postLoginLog(data);
            }
            setUser(response.data.profile);

            navigation.reset({
              index: 1,
              routes: [{ name: 'FeedScreen' }],
            });
          }
        });
      } else if (result?.data.userProfile === false) {
        navigation.navigate('CompletAccount');
      }
    } catch (error) {
      setIsLoading(false);
      console.log('deu ruim o login', error);
    }
  }

  const continueConnected = (status: boolean) => {
    setContinuConected(status);
    setStoreItem('@intellectus:stayConnected', `${status}`);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setShowLogin(false);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setShowLogin(true);
    });
  }, []);
  console.log('isLoading', isLoading);

  return (
    <SafeAreaViewContainer>
      <Container
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={250}
        scrollEnabled={true}>
        <Header />
        <ContentPage2>
          <TitlePageLogin>Fazer login</TitlePageLogin>
          <ContainerButtons>
            <ButtonOption
              themeButton={selectedButton == 'E-mail' && typeTheme.default}
              onPress={() => {
                setSelectedButton('E-mail'), setLoginError(false);
              }}>
              <TextButton
                themeButton={selectedButton == 'E-mail' && typeTheme.default}>
                E-mail
              </TextButton>
            </ButtonOption>
            <ButtonOption
              themeButton={selectedButton == 'Telefone' && typeTheme.default}
              onPress={() => {
                setSelectedButton('Telefone'), setLoginError(false);
              }}>
              <TextButton
                themeButton={selectedButton == 'Telefone' && typeTheme.default}>
                Telefone
              </TextButton>
            </ButtonOption>
          </ContainerButtons>

          {selectedButton === 'E-mail' && (
            <>
              <View>
                <Input
                  label={'E-mail'}
                  type={'email'}
                  value={email.toLowerCase()}
                  textError={errEmail}
                  onSetText={setEmail}
                  error={emailError}
                  login={true}
                />
              </View>
            </>
          )}

          {selectedButton === 'Telefone' && (
            <Input
              label={'Telefone'}
              type={'phone'}
              value={phone}
              textError={phoneErr}
              onSetText={setPhone}
              error={phoneError}
            />
          )}

          <Input
            label="Senha"
            type="password"
            value={password}
            onSetText={setPassword}
            textError={loginError ? 'Senha incorreta' : ''}
            error={loginError}
          />

          <LoginOptionsContainer>
            <ContentLeft onPress={() => continueConnected(!continuConected)}>
              {continuConected ? (
                <Octicons
                  name="check-circle-fill"
                  color={theme.primarycolor}
                  size={14}
                />
              ) : (
                <Octicons name="circle" color={'gray'} size={14} />
              )}
              <TextConected>Continuar conectado</TextConected>
            </ContentLeft>
            <TouchableOpacity
              onPress={() => navigation.push('ForgotPasswordSendEmail')}>
              <TextForwardPassword>Esqueci minha senha</TextForwardPassword>
            </TouchableOpacity>
          </LoginOptionsContainer>
        </ContentPage2>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={theme.primarycolor} />
        ) : (
          <Button
            pressFunction={() => loginUser()}
            textButton="Acessar"
            typebutton={typeTheme.default}
          />
        )}
      </Container>
    </SafeAreaViewContainer>
  );
}
