import React, { useCallback, useEffect, useState } from 'react'

import { SafeAreaViewContainer, Container } from '../../Components/elementsComponents'

import { Content, LocalizationName, TextDescription } from './style'

import useUserProfile from '../../GlobalState/userProfile.zustand'
import { handleTime } from '../../Utils/handleTime'
import { getLoginLog } from '../../Service/Login'
import { LoginLog } from '../../Types/User'

import LocalizationContent from './LocalizationContent'
import Header from '../../Components/Header'
import axios from 'axios'
import { Platform } from 'react-native'
import { View } from 'react-native'

const TOKEN_JULIO = 'AIzaSyAATeM1qTG2efgg2Nh3mxp7HKE-wcAOraE'

function capitalize(text: string) {
   return text.toLowerCase().replace(/(?:^|\s)\S/g, function (a: string) {
      return a.toUpperCase();
   })
}

export default function ActivityLogin() {

   const { user: userProfile } = useUserProfile()

   const [historicLocalization, setHistoricLocalization] = useState<LoginLog[]>([])

   const getLogs = useCallback(async () => {
      try {
         const { data } = await getLoginLog(userProfile.userId)
         let tempCords = []

         if (data.innerResult)
            data.innerResult.map(async (cords: { coordinate: { x: any; y: any }; os: string; device: string; createdAt: any; id: any }) => {
               const { data: coord } = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${cords.coordinate.x}&lon=${cords.coordinate.y}&format=json`)

               const address = coord.address
               const sigla = address['ISO3166-2-lvl4'].split('-')[1]

               let text = capitalize(cords.os)

               let device = capitalize(cords.device)

               const object = {
                  location: `${address.city} - ${sigla} | ${address.country}`,
                  loginTime: cords.createdAt,
                  deviceInfo: `${device} - ${text == 'Ios' ? 'IOS' : text}`,
                  id: cords.id
               }

               setHistoricLocalization(old => [...old, object])

            })
         // 

      } catch (error) {
         console.log('deu ruim ao buscar atividades de login', error)
         console.warn('Get Activity Login Failed')
      }
   }, [])
   useEffect(() => {
      getLogs()
   }, [])

   return (
      <SafeAreaViewContainer>
         <Container>
            <Header titleHeader='Atividade de login' />
            <Content>
               <TextDescription>
                  Caso não reconheça algum local de login, por segurança, recomendamos alterar a sua senha.
               </TextDescription>
               <View style={{
                  paddingTop: 20,
               }}>
                  {historicLocalization.sort((a, b) => b.id - a.id).map((item, index) => (
                     <LocalizationContent
                        key={index}
                        status={0 == index ? 'Online' : handleTime(item.loginTime)}
                        city={item.location}
                        device={item.deviceInfo}
                     // status={handleTime(item.loginTime)}
                     />
                  ))}
               </View>

            </Content>
         </Container>
      </SafeAreaViewContainer>
   );
};
