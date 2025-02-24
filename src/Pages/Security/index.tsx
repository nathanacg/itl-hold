import React from 'react';

import { TouchableOpacity } from "react-native"

import {
   Container,
   SafeAreaViewContainer
} from '../../Components/elementsComponents';

import Header from '../../Components/Header';
import { Text, ContentainerConfigurations } from '../../Components/configurationsElemetsStyle';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';


export default function Security() {
   const navigation = useNavigation<StackRoutes>();

   return (
      <SafeAreaViewContainer>
         <Header titleHeader='Segurança' />
         <Container>
            <ContentainerConfigurations>
               {/*  <TouchableOpacity onPress={() => navigation.navigate('FactorAutenticator')}>
                  <Text>Autenticação de dois fatores</Text>
               </TouchableOpacity> */}
               <TouchableOpacity onPress={() => navigation.navigate('PasswordSecurity')}>
                  <Text>Senha</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('ActivityLogin')}>
                  <Text>Atividade de login</Text>
               </TouchableOpacity>
            </ContentainerConfigurations>
         </Container>
      </SafeAreaViewContainer>
   );
};
