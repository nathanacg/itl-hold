import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  TextContainer,
  AccountPrivateContainer,
  Text,
  Text12,
  ContentOptions
} from './style'
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import ToggleSwitch from '../../Components/ToggleSwitch';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { getPrivacyAccount, updatePrivacyAccount } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { useToast } from 'react-native-toast-notifications';
import { theme } from '../../Theme/theme';

export default function Privacy() {

  const { user: userProfile } = useUserProfile()

  const navigation = useNavigation<StackRoutes>()

  const [privateAccount, setPrivateAccount] = useState<boolean>(false)

  const toast = useToast()


  useEffect(() => {

    const getPrivate = async () => {
      try {
        const response = await getPrivacyAccount(userProfile.userId)
        setPrivateAccount(response.data.private_account === 1 ? true : false)
      } catch (error) {
        console.log('deu ruim ao ataulizar a conta.', error)
      }
    }

    getPrivate()

  }, [])

  const handlePrivate = () => {
    updatePrivacyAccount(privateAccount ? 0 : 1)
      .then(res => {
        console.log('Conta atualizada.', privateAccount)
        // toast.show("Conta atualizada com sucesso.", { type: "normal", normalColor: theme.primarycolor, style: { marginBottom: 30 } })
      })
      .catch((e) => {
        console.warn('UpdatePrivacyAccount - Privacy')
        console.log(e)
      })
  }

  return (
    <SafeAreaViewContainer>
      <Header titleHeader='Privacidade' />
      <Container>
        <AccountPrivateContainer>
          <TextContainer>
            <Text>Conta privada</Text>
            <ToggleSwitch
              value={privateAccount}
              setValue={() => {
                handlePrivate()
                setPrivateAccount(!privateAccount)
              }}
            />
          </TextContainer>
          <Text12>As pessoas precisam pedir autorização para seguir seu perfil.</Text12>
        </AccountPrivateContainer>
        <ContentOptions>
          <TouchableOpacity onPress={() => navigation.navigate('Comentary')}>
            <Text>Comentários</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Marcations')}>
            <Text>Marcações</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PosterConfiguration')}>
            <Text>Cartaz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BlockedAccounts')}>
            <Text>Contas bloqueadas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MutedAccounts')}>
            <Text>Contas silenciadas</Text>
          </TouchableOpacity>
        </ContentOptions>
      </Container>
    </SafeAreaViewContainer>
  );
};
