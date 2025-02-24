import { SetStateAction, useState } from 'react'
import { SafeAreaViewContainer } from '../../Components/elementsComponents'

import { ScrollView, View, Image, TouchableOpacity } from 'react-native';

import Header from '../../Components/Header';

import { TextDescriptionPage, TextModal } from "./style"

import {
   Container,
   SectionContainer,
   Text,
   TextContainer,
   TextMin
} from '../../Components/configurationsElemetsStyle';

import { typeTheme } from '../../Config/enumTheme';

import ModalElement from '../../Components/Modal';
import { TitleModal } from '../../Components/Modal/style';

import { ButtonContent, ContentModalButtons, TextButton } from '../../Components/Modal/Components/style';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { deltAccount, disabledAccount } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import { clearStorage } from '../../Lib/asyncStorage';

import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from '../../Routes/StackTypes';
import ModalElementAction from '../../Components/ModalAction';

interface InfoProps {
   setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function DeleteAccount({ setvisibleBottonModal }: InfoProps) {

   const [deleteOption, setDeleteOption] = useState<string>('')
   const [showModal, setShowModal] = useState<boolean>(false)
   const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
   const [titleModal, setTitleModal] = useState<string>('')

   const navigation = useNavigation<StackRoutes>()

   const { user } = useUserProfile()


   const deletAccountFunction = async () => {
      try {
         await deltAccount()
         await clearStorage()
      } catch (error) {
         console.log("Erro ao deletar conta permanentemente.", error)
      } finally {
         console.log("CACHE REMOVIDO COM SUCESSO")
         navigation.navigate('Welcome')
      }
   }

   const disabledAccountFunction = async () => {

      try {
         await disabledAccount(1)
         await clearStorage()
      } catch (error) {
         console.log("Erro ao desabilitar conta.", error)
      } finally {
         console.log("CACHE REMOVIDO COM SUCESSO")
         navigation.navigate('Welcome')
      }
   }


   return (
      <SafeAreaViewContainer>
         <ModalElementAction
            setvisibleBottonModal={setvisibleBottonModal}
            isModalVisible={showModal}
            iconModal={''}
            titlemodal=''
            componentChildren={<View>
               <View style={{ gap: 15, alignItems: 'center' }}>
                  <Image source={require('../../Assets/Icons/deleteAlert.png')} />
                  <TitleModal>
                     {titleModal}
                  </TitleModal>
                  {/*  <TextModal>Você tem certeza?</TextModal> */}
                  <TextModal>
                     Desta forma, ninguém conseguirá ver as suas postagens e enviar mensagens.
                     Caso você não acessar a sua conta em até 30 dias, ela será excluída permanentemente e os
                     dados seráo perdidos.
                  </TextModal>
               </View>
               <ContentModalButtons>

                  <ButtonContent optionButton={typeTheme.light}>
                     <TextButton
                        optionButton={typeTheme.light}
                        onPress={() => { setShowModal(!showModal) }}
                     >
                        Não
                     </TextButton>
                  </ButtonContent>
                  <ButtonContent
                     optionButton={typeTheme.default}
                     onPress={() => {
                        setShowModal(false)
                        disabledAccountFunction()
                     }}
                  >
                     <TextButton optionButton={typeTheme.default}>
                        Sim
                     </TextButton>
                  </ButtonContent>
               </ContentModalButtons>
            </View>}
         />
         <ModalElement
            setvisibleBottonModal={setvisibleBottonModal}
            isModalVisible={showModalDelete}
            iconModal={''}
            titlemodal=''
            componentChildren={<View>
               <View style={{ gap: 15, alignItems: 'center' }}>
                  <Image source={require('../../Assets/Icons/deleteAlert.png')} />
                  <TitleModal>
                     {titleModal}
                  </TitleModal>
                  {/*  <TextModal>Você tem certeza?</TextModal> */}
                  <TextModal textAlign={"center"}>
                     Você deseja excluir sua conta permanentemente?
                  </TextModal>
               </View>
               <ContentModalButtons>


                  <ButtonContent optionButton={typeTheme.light}>
                     <TextButton
                        optionButton={typeTheme.light}
                        onPress={() => { setShowModalDelete(!showModalDelete) }}
                     >Não
                     </TextButton>
                  </ButtonContent>
                  <ButtonContent
                     optionButton={typeTheme.default}
                     onPress={() => {
                        setShowModalDelete(false)
                        deletAccountFunction()
                     }}
                  >
                     <TextButton optionButton={typeTheme.default}>
                        Sim
                     </TextButton>
                  </ButtonContent>
               </ContentModalButtons>
            </View>} />
         <ScrollView>
            <Header titleHeader='Excluir conta' />
            <Container>
               <SectionContainer borderColor={'transparent'}>

                  <View style={{ marginTop: 15 }}>
                     <TextContainer>
                        <Text>Desativar conta - modo temporário</Text>
                        <TouchableOpacity onPress={() => {
                           setShowModal(!showModal),
                              setTitleModal('Desativar conta')
                           setDeleteOption('Desativar conta')
                        }}>
                           <MaterialCommunityIcons
                              name={deleteOption === "Desativar conta" ? 'radiobox-marked' : 'radiobox-blank'}
                              size={24}
                              color={deleteOption === "Desativar conta" ? "#a3a3a3" : "#a3a3a3"}
                           />
                        </TouchableOpacity>
                     </TextContainer>
                     <TextMin>
                        Todo o conteúdo do seu perfil fica oculto durante 30 dias e, caso não faça login neste período, a conta será excluída permanentemente.
                     </TextMin>
                  </View>

                  <TextContainer>
                     <Text>Excluir conta - modo permanente</Text>
                     <TouchableOpacity onPress={() => {
                        setShowModalDelete(!showModalDelete),
                           setTitleModal('Excluir conta')
                        setDeleteOption('Excluir conta')
                     }}>
                        <MaterialCommunityIcons
                           name={deleteOption === "Excluir conta" ? 'radiobox-marked' : 'radiobox-blank'}
                           size={24}
                           color={deleteOption === "Excluir conta" ? "#a3a3a3" : "#a3a3a3"}
                        />
                     </TouchableOpacity>
                  </TextContainer>
                  <TextMin style={{ marginTop: -18 }}>
                     Todo o conteúdo do seu perfil será excluído e não{'\n'}será possível reverter.
                  </TextMin>

               </SectionContainer>
            </Container>
         </ScrollView>
      </SafeAreaViewContainer>
   );
};
