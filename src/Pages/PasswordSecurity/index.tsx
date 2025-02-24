import React, { SetStateAction, useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'

import {
   Content,
   UndelineText,
   RepeatePasswordContainer,
   ContainerForgotPassword,
} from './style'

import {
   Container,
   SafeAreaViewContainer
} from '../../Components/elementsComponents'

import ModalElement from '../../Components/Modal'
import Button from '../../Components/Button'
import Header from '../../Components/Header'
import Input from '../../Components/Input'

import { updatePassword } from '../../Service/Login'
import { TextOrientationPassword } from '../CreateAccount/style'
import useUserProfile from '../../GlobalState/userProfile.zustand'

import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'
import MeasureSecurityPassword from '../../Components/MeasureSecurityPassword'
import { calculatePasswordStrength } from '../../Utils/CalculatePasswordStrength'
import { User } from '../../Types/User'
import { getActualPass } from '../../Service/Profile'

interface PasswordProps {
   setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function PasswordSecurity({ setvisibleBottonModal }: PasswordProps) {

   const { user: userProfile } = useUserProfile()

   const [securityLevelPassword, setSecurityLevelPassword] = useState<number>(0)

   const [actualPassword, setActualPassord] = useState<string>('')
   const [newPassword, setNewPassword] = useState<string>('')
   const [confirmNewPassword, setConfirmNewPassord] = useState<string>('')

   const [error1, setError1] = useState<boolean>(false)
   const [error2, setError2] = useState<boolean>(false)
   const [error3, setError3] = useState<boolean>(false)

   const [message1, setMessage1] = useState<string>('')
   const [message2, setMessage2] = useState<string>('')
   const [message3, setMessage3] = useState<string>('')
   const [message4, setMessage4] = useState<string>('')

   const [passwordSaved, setPasswordSaved] = useState<User>()

   const [userPasswordError, setUserPasswordError] = useState<boolean>(false)

   const [isModalVisible, setModalVisible] = useState<boolean>(false)

   const navigation = useNavigation<StackRoutes>()

   const getActualPassword = async () => {
      try {
         const response = await getActualPass(actualPassword)
         setPasswordSaved(response.data)
      } catch (error) {
         console.log('Deu ruim ao buscar a senha atual no banco.', error)
      }
   }

   async function handleUpdatePassword() {

      try {
         if (actualPassword == '') {
            setError1(true)
            setMessage1('Digite sua senha atual')
            return
         }

         if (actualPassword !== passwordSaved?.userPassword) {
            setError1(true)
            setMessage1('Senha incorreta')
            return
         }

         if (newPassword == '' && confirmNewPassword == '') {
            setError1(false)
            setError2(true)
            setError3(true)
            setMessage2('Campo obrigatório')
            setMessage3('Campo obrigatório')
            return
         }

         if (newPassword == '') {
            setError1(false)
            setError2(false)
            setError3(true)
            setMessage3('Campo obrigatório')
            return

         }
         if (newPassword == confirmNewPassword) {
            await updatePassword(userProfile.userEmail, newPassword)
            setModalVisible(true)
         } else if (passwordSaved.userPassword !== actualPassword) {
            setMessage4('A senha nova não pode ser igual a senha anterior')
         } else {
            setMessage3('Senha inválida')
         }
      } catch (error) {
         console.log('deu ruim ao alterar a senha.', error)
      }

   }

   useEffect(() => {
      setSecurityLevelPassword(calculatePasswordStrength(newPassword))
      if (securityLevelPassword === 4 && newPassword) {
         setUserPasswordError(false)
      }
   }, [newPassword, securityLevelPassword])

   useEffect(() => {
      if (isModalVisible) {
         setTimeout(() => {
            setModalVisible(false)
            navigation.pop()
         }, 2000)
      }
   }, [isModalVisible])

   return (
      <>
         <SafeAreaViewContainer>
            <Container>
               <Header titleHeader='Senha' />
               <Content>
                  <Input
                     label="Senha atual"
                     onSetText={setActualPassord}
                     type="password"
                     textError={message1 ? message1 : message4}
                     error={error1}
                     value={actualPassword}
                     checkSucess={actualPassword.length > 5 && !userPasswordError && securityLevelPassword == 3}
                  />

                  <ContainerForgotPassword>
                     <TouchableOpacity onPress={() => navigation.push("ForgotPasswordSendEmail")}>
                        <UndelineText>Esqueci minha senha</UndelineText>
                     </TouchableOpacity>
                  </ContainerForgotPassword>
                  <Input
                     label="Nova senha"
                     onSetText={setNewPassword}
                     type="password"
                     textError={message2}
                     error={error2}
                     value={newPassword}
                     checkSucess={newPassword.length > 5 && !userPasswordError && securityLevelPassword == 3}

                  />
                  <TextOrientationPassword>
                     Use seis ou mais caracteres, letras maiúsculas e minúsculas, números e símbolos.
                  </TextOrientationPassword>

                  <MeasureSecurityPassword securityLevel={securityLevelPassword} />

                  <RepeatePasswordContainer>
                     <Input
                        label="Repita a nova senha"
                        onSetText={setConfirmNewPassord}
                        type="password"
                        textError={message3}
                        error={error3}
                        value={confirmNewPassword}
                        checkError={confirmNewPassword.length > 0 && confirmNewPassword !== newPassword}
                        checkSucess={confirmNewPassword.length > 5 && newPassword === confirmNewPassword}
                     />

                  </RepeatePasswordContainer>
               </Content>

            </Container>
            <Button
               textButton='Salvar'
               typebutton='blue'
               pressFunction={handleUpdatePassword}
            />
         </SafeAreaViewContainer>
         <ModalElement
            setvisibleBottonModal={setvisibleBottonModal}
            isModalVisible={isModalVisible}
            iconModal={<Icon
               name='check-circle'
               type='feather'
               color={"#049908"}
               size={50}
            />}
            textModal="Senha atualizada."
            textAlign='center'
         />

      </>
   )
}