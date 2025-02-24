import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
   SafeAreaViewContainer
} from '../../Components/elementsComponents';

import {
   TextAutenticator,
   TextDetails,
   Container,
   OptionsContainer,
   Text
} from "./style"

import Header from '../../Components/Header';
import ToggleSwitch from '../../Components/ToggleSwitch';

import {
   TextContainer,
   SectionContainer
} from '../../Components/configurationsElemetsStyle';


export default function FactorAutenticator() {

   const [authorized, setAuthorized] = useState(false)
   const [authenticationType, setAuthenticationType] = useState<"email" | "sms" | "app" | undefined>()

   // useEffect(() => {
   //    !authorized && setAuthenticationType(undefined)
   // }, [authorized])

   return (
      <SafeAreaViewContainer>
         <ScrollView>
            <Header titleHeader='Autenticação de dois fatores' />
            <Container>
               <SectionContainer borderColor={'transparent'}>
                  <View>
                     <TextContainer>
                        <TextAutenticator>Autenticação de dois fatores</TextAutenticator>
                        <ToggleSwitch value={authorized}  setValue={() => setAuthorized(!authorized)}/>
                     </TextContainer>
                     <TextDetails>
                        Vamos solicitar um código para login, quando acessar de um novo dispositivo.
                     </TextDetails>
                  </View>
               </SectionContainer>
               <OptionsContainer>
                  <View>
                     <TextContainer>
                        <Text>Aplicativo autenticador (recomendado)</Text>
                        <ToggleSwitch value={authorized ? authenticationType == "app" : false}  setValue={() => authorized && setAuthenticationType("app")}/>
                     </TextContainer>
                     <TextDetails>
                        Receba seu código pelo aplicativo.
                     </TextDetails>
                  </View>
               </OptionsContainer>
               {/* <OptionsContainer>
                  <View>
                     <TextContainer>
                        <Text>WhatsApp</Text>
                        <ToggleSwitch value={true} />
                     </TextContainer>
                     <TextDetails>
                        Receba o código por WhatsApp no número de celular cadastrado.
                     </TextDetails>
                  </View>
               </OptionsContainer> */}
               <OptionsContainer>
                  <View>
                     <TextContainer>
                        <Text>SMS</Text>
                        <ToggleSwitch value={authorized ? authenticationType == "sms" : false}  setValue={() => authorized && setAuthenticationType("sms")} />
                     </TextContainer>
                     <TextDetails>
                        Receba o código por SMS pelo número de celular cadastrado.
                     </TextDetails>
                  </View>
               </OptionsContainer>
               <OptionsContainer >
                  <View>
                     <TextContainer>
                        <Text>E-mail</Text>
                        <ToggleSwitch value={authorized ? authenticationType == "email" : false}  setValue={() => authorized && setAuthenticationType("email")} />
                     </TextContainer>
                     <TextDetails>
                        Receba o código pelo e-mail cadastrado.
                     </TextDetails>
                  </View>
               </OptionsContainer>
            </Container>
         </ScrollView>
      </SafeAreaViewContainer>
   );
};
