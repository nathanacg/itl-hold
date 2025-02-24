import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Image, Alert, Platform, NativeModules, KeyboardAvoidingView } from 'react-native';
import Header from '../../Components/Header';
import OptionsModal from './Components/OptionsModal';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { verificationAccount } from '../../Service/Login';
import ImagePicker from 'react-native-image-crop-picker'



import {
   Container,
   ContainerRowOppen,
   ContainerElementsSections,
   TextLight,
   TextLimitCaracters,
   TitleModal
} from "./style"

import {
   SafeAreaViewContainer,
   TextInputBox
} from '../../Components/elementsComponents';

import {
   SectionContainer,
   Text,
   TextRegular12,
   TextRegular12Light,
   TextRegular12Light1,
   TextRegular16
} from '../../Components/configurationsElemetsStyle';
import InputConfiguration from '../../Components/InputConfiguration';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontStyle, theme } from '../../Theme/theme';
import { typeTheme } from '../../Config/enumTheme';
import Button from '../../Components/Button';
import BottomModal from '../../Components/BottomModal';
import axios from 'axios';
import SearchInput from '../../Components/SearchInput';
import { FlatList } from 'react-native-gesture-handler';

// Entrar nos documentos do celular
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { OptionModal } from '../ArchivedItems/style';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { categorias, countries, doc } from '../../Utils/Countrys';
import { StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import DocumentSelected from '../../Components/DocumentSelected';



export default function RequestVerification() {

   const navigation = useNavigation<StackRoutes>()
   //Modals
   const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
   const [visibleDocBottonModal, setvisibleDocBottonModal] = useState<boolean>(false)
   const [visibleCountryBottonModal, setvisibleCountryBottonModal] = useState<boolean>(false)
   const [titleModal, setTiteModal] = useState<string>('')
   const [listOptions, setListOptions] = useState<string[]>([''])
   const [listOptionsDoc, setListOptionsDoc] = useState<string[]>([''])

   // Variables to CRUD
   const [userNickName, setUserNickName] = useState<string>("")
   const [userName, setUserName] = useState<string>("")
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [selectedDocCategory, setSelectedDocCategory] = useState<string>("");
   const [selectedCountryCategory, setSelectedCountryCategory] = useState<string>("");
   const [audienceDescription, setAudienceDescription] = useState("")
   const [links, setLinks] = useState([]);
   const [result, setResult] = useState<DocumentPickerResponse[]>([]);

   const handleLinkChange = (index: number, newLink: any) => {
      const updatedLinks: any = [...links];
      updatedLinks[index] = newLink;
      setLinks(updatedLinks);
   };

   const handleCategorySelect = (category: any) => {
      setSelectedCategory(category);
      setvisibleBottonModal(false);
   };

   const handleCategoryDocSelect = (category: any) => {
      setSelectedDocCategory(category);
      setvisibleDocBottonModal(false);
   };

   const handleCategoryCountrySelect = (category: any) => {
      setSelectedCountryCategory(category);
      setvisibleCountryBottonModal(false);
   };

   const pickDocument = async () => {
      try {
         const pickedResult = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
            allowMultiSelection: true
         });
         console.log(pickedResult)

         setResult(pickedResult)

         if (pickedResult.length === 0) {
            console.log('Nenhum documento selecionado');
         }
      } catch (err) {
         if (DocumentPicker.isCancel(err)) {
            console.log('Usuário cancelou a seleção');
         } else {
            console.log('Erro ao selecionar o documento: ' + err);
         }
      }
   };

   const takePhotoFromGalery = async () => {
      await ImagePicker.openPicker({
         width: 200,
         cropperCircleOverlay: false,
         maxFiles: 1,
         writeTempFile: true,
         compressImageQuality: 0.8,
         cropperCancelText: 'Cancelar',
         cropperChooseText: 'Escolher',
         loadingLabelText: 'Carregando...',
         cropperTintColor: 'blue',
         height: 200,
         forceJpg: true,
         cropping: true,
      }).then((image) => {
         const timestamp = new Date().getTime();

         const uniqueName = `image_${timestamp}.jpg`;
         return (
            setResult([{
               uri: image.path,
               name: uniqueName,
               type: image.mime,
               fileCopyUri: "",
               size: 0
            }])
         )

      })
         .catch((e) => {
            console.warn('ImagePicker OpenPicker - EditProfile')
            console.log(e)
         })
   }

   const takePhotoFromCamera = () => {
      ImagePicker.openCamera({
         width: 200,
         cropperCircleOverlay: false,
         maxFiles: 1,
         writeTempFile: true,
         compressImageQuality: 0.8,
         useFrontCamera: false,
         cropperCancelText: 'Cancelar',
         cropperChooseText: 'Escolher',
         loadingLabelText: 'Carregando...',
         height: 200,
         forceJpg: true,
         cropping: true,
      }).then((image) => {
         const timestamp = new Date().getTime();

         const uniqueName = `image_${timestamp}.jpg`;
         return (
            setResult([{
               uri: image.path,
               name: uniqueName,
               type: image.mime,
               fileCopyUri: "",
               size: 0
            }])
         )

      })
         .catch((e) => {
            console.warn('ImagePicker - EditProfile')
            console.log(e)
         })
   }

   const chamarFuncao = async () => {
      const fistObject = (result[0]);
      const form = new FormData();
      form.append('file', {
         uri: fistObject.uri,
         name: fistObject.name,
         type: fistObject.type,
      });
      form.append('data', JSON.stringify({
         user: userNickName,
         fullName: userName,
         documentType: selectedDocCategory,
         fileName: fistObject.name,
         category: selectedCategory,
         country: selectedCountryCategory,
         audienceDescription: audienceDescription,
         links,
      }));

      try {
         verificationAccount(form)
         navigation.pop()
      } catch (error) {
         console.log('Error on push params-information: ', error)
      }
   };

   const scrollViewRef = useRef<ScrollView>(null)

   const handleFocus = () => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
   }

   return (
      <SafeAreaViewContainer>
         <Header titleHeader='Solicitar verificação' />
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10}
         >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
               <Container>
                  <SectionContainer>
                     <TextRegular12Light1>
                        Contas verificadas possuem um selo ao lado de seu nome mostrando que a Intellectus confirmou que são pessoas reais as figuras públicas, celebridades e marcas que representam.
                     </TextRegular12Light1>
                     <Text>Confirmar identidade</Text>
                     <ContainerElementsSections>
                        <InputConfiguration
                           stylesInput={{ style: { width: '62%' } }}
                           onSetText={(text) => { setUserNickName(text) }}
                           value={userNickName.toLowerCase()}
                           limit={200}
                           label='Usuário'
                           placeholder=''
                        />

                        <InputConfiguration
                           stylesInput={{ style: { marginTop: 18, width: '62%' } }}
                           width='35 %'
                           onSetText={(text) => { setUserName(text) }}
                           value={userName}
                           label='Nome completo'
                           placeholder=''
                        />

                        <ContainerRowOppen
                           style={{ marginBottom: 10 }}
                           onPress={() => {
                              setvisibleDocBottonModal(!visibleDocBottonModal),
                                 setTiteModal(''),
                                 setListOptionsDoc(doc)
                           }} >
                           <Text style={{ fontSize: 13 }}>Tipo de documento</Text>
                           <Text style={{ flex: 1, marginLeft: 16, textAlign: 'left', color: theme.textligthGray }}>{selectedDocCategory}</Text>
                           <Entypo
                              name='chevron-small-right'
                              size={22}
                              color={"#231F20"}
                           />
                        </ContainerRowOppen>
                        <TextRegular12Light1>
                           Adicione um documento do usuário a verificar.
                        </TextRegular12Light1>
                        <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center', gap: 8, marginTop: -4 }}>
                           <Text>Selecionar arquivo</Text>
                           <View style={{ flexDirection: 'row', gap: 16, left: -2 }}>

                              <TouchableOpacity onPress={() => pickDocument()}
                                 style={{}}>
                                 <MaterialCommunityIcons
                                    style={{ marginLeft: 14 }}
                                    name='paperclip'
                                    size={18}
                                    color={'#5D5D5D'}
                                 />
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {
                                 setResult([]),
                                    takePhotoFromGalery()
                              }}>
                                 <Image source={require('../../Assets/Icons/galeryGrey.png')} style={{ width: 20, height: 20, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => {
                                 setResult([]),
                                    takePhotoFromCamera()
                              }}>
                                 <Image source={require('../../Assets/Icons/camera.png')} style={{ width: 19.5, height: 19.5, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                              </TouchableOpacity>

                           </View>
                        </View>

                        <DocumentSelected
                           resultLength={result.length}
                           result={result}
                           setResult={(value) => setResult(value)}
                        />


                     </ContainerElementsSections>
                  </SectionContainer>

                  <SectionContainer borderColor={"transparent"} >
                     <View style={{ marginTop: 25 }}>
                        <ContainerElementsSections>
                           <View>
                              <Text>Confirmar notoriedade</Text>
                              <TextRegular12Light1>
                                 Preencha as informações para comprovar que a figura pública, celebridade
                                 ou marca que a sua conta representa, é de interesse público.
                              </TextRegular12Light1>
                           </View>
                           <ContainerRowOppen onPress={() => {
                              setvisibleBottonModal(!visibleBottonModal),
                                 setTiteModal('Selecione a categoria'),
                                 setListOptions(categorias)
                           }}>
                              <Text>Categoria</Text>
                              <Text style={{ flex: 1, marginLeft: 74, color: theme.textligthGray, textAlign: 'left' }}>{selectedCategory}</Text>
                              <Entypo
                                 name='chevron-small-right'
                                 size={22}
                                 color={"#231F20"}
                              />
                           </ContainerRowOppen>

                           <ContainerRowOppen onPress={() => {
                              setvisibleCountryBottonModal(!visibleCountryBottonModal),
                                 setTiteModal('Selecione o país'),
                                 setListOptions(countries);
                           }}>
                              <Text style={{ paddingRight: 10 }}>País</Text>
                              <Text style={{ flex: 1, marginLeft: 107, textAlign: 'left', color: theme.textligthGray }}>{selectedCountryCategory}</Text>
                              <Entypo
                                 name='chevron-small-right'
                                 size={22}
                                 color={"#231F20"}
                              />
                           </ContainerRowOppen>

                           <View style={{ marginTop: 14 }}>
                              <Text>Audiência</Text>
                              <TextRegular12Light1>
                                 Descreva o público que segue a sua conta, incluindo quem são,
                                 perfil, interesses e por que te seguem.
                              </TextRegular12Light1>
                           </View>

                           <View style={{ marginTop: -8, marginBottom: 14 }}>
                              <TextInputBox
                                 style={styles.input}
                                 multiline={true}
                                 maxLength={300}
                                 onFocus={handleFocus}
                                 value={audienceDescription}
                                 onChangeText={(text: string) => setAudienceDescription(text)}
                              />
                              <TextLimitCaracters>
                                 {300 - audienceDescription.length}
                              </TextLimitCaracters>
                           </View>
                           <View style={{ marginTop: -20 }} />
                           <Text style={{ marginBottom: -10 }}>Links</Text>
                           <TextRegular12Light1>
                              Insira link de matérias, vídeos e outros que mostrem o interesse público na sua conta.
                              Na análise, não serão considerados conteúdos pagos ou promocionais.
                           </TextRegular12Light1>


                           <InputConfiguration
                              stylesInput={{ style: { width: '82%', marginBottom: 5 } }}
                              onSetText={(texto) => { handleLinkChange(0, texto) }}
                              value={links[0]}
                              label='Link 1'
                              paddingBottom={5}
                              placeholder='Link'
                           />

                           <InputConfiguration
                              stylesInput={{ style: { width: '82%', marginBottom: 5 } }}
                              onSetText={(texto) => { handleLinkChange(1, texto) }}
                              value={links[1]}
                              paddingBottom={5}
                              label='Link 2'
                              placeholder='Link'
                           />

                           <InputConfiguration
                              stylesInput={{ style: { width: '82%', marginBottom: 5 } }}
                              onSetText={(texto) => { handleLinkChange(2, texto) }}
                              value={links[2]}
                              label='Link 3'
                              paddingBottom={5}
                              placeholder='Link'
                           />
                        </ContainerElementsSections>
                     </View>
                  </SectionContainer>
               </Container>
               <Button
                  pressFunction={() => chamarFuncao()}
                  textButton="Enviar"
                  typebutton={typeTheme.default}
               />

               <BottomModal
                  visibleBottonModal={visibleBottonModal}
                  setvisibleBottonModal={setvisibleBottonModal}
                  title={titleModal}
                  children={
                     <ScrollView showsVerticalScrollIndicator={false}>
                        <OptionsModal
                           options={listOptions}
                           onCategorySelect={handleCategorySelect}
                        />
                     </ScrollView>
                  }
               />
               <BottomModal
                  visibleBottonModal={visibleDocBottonModal}
                  setvisibleBottonModal={setvisibleDocBottonModal}
                  title={titleModal}
                  children={
                     <ScrollView showsVerticalScrollIndicator={false}>
                        <OptionsModal
                           options={listOptionsDoc}
                           onCategorySelect={handleCategoryDocSelect}
                        />
                     </ScrollView>
                  }
               />
               <BottomModal
                  visibleBottonModal={visibleCountryBottonModal}
                  setvisibleBottonModal={setvisibleCountryBottonModal}
                  title={titleModal}
                  children={
                     <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>
                        <OptionsModal
                           options={countries}
                           onCategorySelect={handleCategoryCountrySelect}
                        />
                     </ScrollView>
                  }
               />
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaViewContainer>

   )
}

const styles = StyleSheet.create({
   input: {
      textAlignVertical: 'top',
      color: theme.textligthGray,
      fontSize: 14,
      fontFamily: fontStyle.regular
   },
})