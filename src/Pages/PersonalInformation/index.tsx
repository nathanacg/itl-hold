import React, { SetStateAction, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import InputConfiguration from '../../Components/InputConfiguration'
import Header from '../../Components/Header'
import {
   SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import {
   TextRegular12,
   ContentainerConfigurations,
   TextRegular12Light2
} from '../../Components/configurationsElemetsStyle';

import { Text } from "./style"

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { FlexContentDateBirthday } from './style'
import SelectDropdown from 'react-native-select-dropdown'
import { days, months, yearsArray } from '../../Utils/Date'
import { Icon } from 'react-native-elements'
import { fontStyle, theme } from '../../Theme/theme'
import ModalElement from '../../Components/Modal'
import Button from '../../Components/Button'
import InputIcon from '../../Components/InputIcon'

import Ionicons from 'react-native-vector-icons/Ionicons'

import useUserProfile from '../../GlobalState/userProfile.zustand'

import { updatePersonalInformation } from '../../Service/Profile'
interface InfoProps {
   setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function PersonalInformation({ setvisibleBottonModal }: InfoProps) {

   const navigation = useNavigation<StackRoutes>()

   const [modalText, setModalText] = useState<string>('')

   const { user } = useUserProfile()

   const [userEmail, setuserEmail] = useState<string>('')
   const [userPhone, setuserPhone] = useState<string>('')

   const [gender, setgender] = useState<string>('')

   const [selectedDay, setSelectedDay] = useState<string>('')
   const [selectedMonth, setSelectedMonth] = useState<string>('')
   const [selectedYear, setSelectedYear] = useState<string>('')

   const [userBirthday, setuserBirthday] = useState<string>('')

   useEffect(() => {
      setuserBirthday(`${selectedDay}-${selectedMonth}-${selectedYear}`)
   }, [userBirthday])



   async function updatePersonalInformationProflie() {
      await updatePersonalInformation({
         userEmail,
         userPhone,
         userBirthday,
         gender,
      }).then((response) => {
         setModalText('Dados alterados.')
         navigation.navigate("Account")
      }).catch((err) => {
         console.log("Error when updating informations", err)
      })
   }

   const dataString = user.userBirthday

   const partesDaData = dataString.split('/')

   const dia = partesDaData[0]
   const mes = partesDaData[1]
   const ano = partesDaData[2]

   return (
      <SafeAreaViewContainer>
         <ScrollView showsVerticalScrollIndicator={false}>
            <Header titleHeader='Informações pessoais' />
            <ContentainerConfigurations style={{ gap: 15 }}>
               <TextRegular12Light2 style={{ marginBottom: -15 }}>
                  Estas informações são privadas e não aparecem
                  no seu perfil.
               </TextRegular12Light2>

               <InputConfiguration
                  stylesInput={{ style: { width: '75%', marginTop: 30 } }}
                  onSetText={setuserEmail}
                  disable
                  label='E-mail'
                  value={user.userEmail}
               />
               <InputConfiguration
                  disable
                  stylesInput={{ style: { width: '75%' } }}
                  onSetText={setuserPhone}
                  label='Telefone'
                  value={user.userPhone}
               />
               <InputIcon
                  marginTop='-10px'
                  label='Gênero'
                  placeholder={user.gender}
                  stylesInput={{ width: '74%' }}
                  onPress={() => navigation.navigate("Gender")}
                  icon={
                     <Ionicons
                        name='chevron-forward'
                        size={20}
                        color={'#5e5e5e'}
                     />
                  }
               />

               <FlexContentDateBirthday>
                  <Text style={{ fontSize: 13 }}>Data de
                     nascimento</Text>
                  <SelectDropdown
                     renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                     buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 33 }]}
                     buttonStyle={styles.selctDropDownButtonStyle}
                     data={days}
                     rowTextStyle={styles.rowTextStyle}
                     dropdownStyle={{ backgroundColor: "#FFF", }}
                     defaultButtonText={dia}
                     onSelect={(selectedItem) => { setSelectedDay(String(selectedItem)); }}
                  />
                  <SelectDropdown
                     renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                     buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 33 }]}
                     buttonStyle={styles.selctDropDownButtonStyle}
                     rowTextStyle={styles.rowTextStyle}
                     dropdownStyle={{ backgroundColor: "#FFF", }}
                     data={months}
                     defaultButtonText={mes}
                     onSelect={(selectedItem) => { setSelectedMonth(String(selectedItem)) }}
                  />
                  <SelectDropdown
                     renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                     dropdownStyle={{ backgroundColor: "#FFF", }}
                     rowTextStyle={styles.rowTextStyle}
                     buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 23 }]}
                     buttonStyle={styles.selctDropDownButtonStyle}
                     data={yearsArray()}
                     defaultButtonText={ano}
                     onSelect={(selectedItem) => { setSelectedYear(String(selectedItem)) }}
                  />
               </FlexContentDateBirthday>
            </ContentainerConfigurations>
         </ScrollView>
         <Button
            textButton='Salvar'
            typebutton='blue'
            pressFunction={() => updatePersonalInformationProflie()}
         />

         <ModalElement
            setvisibleBottonModal={setvisibleBottonModal}
            isModalVisible={false}
            iconModal={<Icon
               name='check-circle'
               type='feather'
               color={"#049908"}
               size={50}
            />}
            textModal={modalText}
            textAlign={'center'}
         />
      </SafeAreaViewContainer>
   )
}

const styles = StyleSheet.create({
   selctDropDownButtonStyle: {
      width: '22.5%',
      height: 32,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#C4C4C4",
      backgroundColor: "#ffff",
   },
   selectDropDownButtonTextStyle: {
      color: '#C4C4C4',
      fontSize: 14,
      fontFamily: fontStyle.regular,
      position: 'absolute',
      paddingTop: 0
   },
   rowTextStyle: {
      fontSize: 14
   }
});