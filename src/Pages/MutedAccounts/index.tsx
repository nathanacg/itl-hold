import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../Components/Header';

import {
   ContainerAccounts,
   ImageProfile,
   UserName,
   Text,
   ContainerResultSeacrh,
   TextResultTotal,
   UndelineText,
   SeeMoreContainer,
   SeeMoreText,
   StoryOptions,
   OptionText
} from "./style"

import {
   Container,
   ContentPage,
   SafeAreaViewContainer
} from '../../Components/elementsComponents';
import { theme } from '../../Theme/theme';
import SearchInput from '../../Components/SearchInput';
import ToggleSwitch from '../../Components/ToggleSwitch';
import MutedCard from './Components/MutedCard';
import { useRoute } from '@react-navigation/native';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { addSilentPerson, deleteSilentPerson, getSilentPerson } from '../../Service/Profile';
import BottomModal from '../../Components/BottomModal';
import { getFollowers } from '../../Service/Followers';
import { ProfileUser } from '../../Types/User';

interface SilentUser extends ProfileUser {
   publication: number;
   story: number;
};

export default function MutedAccounts() {
   const route = useRoute();
   // const { userNickname, profileImage, attribute, userUserId } = route.params || {};
   const { user } = useUserProfile();

   const [personSelected, setPersonSelected] = useState()
   const [publication, setPublication] = useState<boolean>(false);
   const [story, setStory] = useState<boolean>(false);
   // const [silentUserId, setsilentUserId] = useState(userUserId);

   const [silentUsers, setSilentUsers] = useState<SilentUser[]>([]);
   const [openModal, setOpenModal] = useState(false);
   const [passIdUser, setPassIdUser] = useState<any>();
   const [inputText, setInputText] = useState<string>('')
   const [follow, setFollow] = useState<SilentUser[]>([])
   const [teste, setTeste] = useState<SilentUser[]>([])


   useEffect(() => {
      getFollowers(user.userId)
         .then(res => {
            let list: SilentUser[] = []
            list = res.data.result.map(item => {
               const data: SilentUser = {
                  publication: false,
                  story: false,
                  ...item
               }
               return data
            })
            setFollow(list)

         })
         .catch((error) => {
            console.log('ERRO ao listar seguidores: ', error);
         });
   }, [])

   const fetchSilentPersons = async () => {
      try {
         let list: SilentUser[] = [...follow]
         const { data } = await getSilentPerson(user.userId);

         data.silentUsers.map((itemSelected: SilentUser) => {
            const userIndexPublication = list.findIndex((item) => item.userId === itemSelected.userId)


            if (userIndexPublication > -1) {
               list[userIndexPublication].publication = itemSelected.publication
               list[userIndexPublication].story = itemSelected.story

            }
         })
         setSilentUsers(list)

      } catch (error) {
         console.warn('Erro ao buscar usuários silenciados', error);
      }
   };

   useEffect(() => {
      if (follow)
         fetchSilentPersons();
   }, [follow]);

   // useEffect(() => {
   //    setPersonSelected(attribute);
   // }, [attribute])

   function filteredUsers() {
      const regex = new RegExp(inputText, 'i');
      return silentUsers.filter(function (pessoa) {
         return regex.test(pessoa.userName) || regex.test(pessoa.userNickname)
      });
   }
   const handlePublicationMutedChange = async (value: boolean) => {
      setPublication(value);
      let publication = value;

      // await addSilentPerson(userId, silentUserId, publication, story);
   };

   const handleStoryMutedChange = async (value: boolean) => {
      setStory(value);
      let story = value;

      // await addSilentPerson(userId, silentUserId, publication, story);
   };



   const handlePublicationMuted = async (value: boolean, silentUserId: number) => {
      setPublication(value);
      let publication = value;
      await addSilentPerson(user.userId, silentUserId, publication, story);
   };


   const handleStoryMuted = async (value: boolean, silentUserId: number) => {
      setStory(value);
      let story = value;
      await addSilentPerson(user.userId, silentUserId, publication, story);
   };


   const handleModal = (silentUserId: number) => {
      setOpenModal(!openModal);
      setPassIdUser(silentUserId);
   }


   // const delSilentUser = async (unsilentUserId: number) => {
   //    await deleteSilentPerson(user.userId, unsilentUserId);
   //    try {
   //       const response = await getSilentPerson(user.userId);
   //       setSilentUsers(response.data.silentUsers);
   //    } catch (error) {
   //       console.warn('Erro ao buscar usuários silenciados', error);
   //    }
   // }


   const silencieMemoList = useMemo(() => {
      return (
         <FlatList
            data={filteredUsers()}

            keyExtractor={(item) => item.userId.toString()}
            scrollEnabled={false}
            style={{
               height: 'auto',
               width: '100%'
            }}
            renderItem={({ item }) => {


               return (
                  <MutedCard
                     usernickName={item.userNickname}
                     userImage={item.profileImage}
                     userName={item.userName}
                     publicationMuted={!!item.publication}
                     storyMuted={!!item.story}
                     onPublicationMutedChange={(value) => handlePublicationMuted(value, item.userId)}
                     onStoryMutedChange={(value) => handleStoryMuted(value, item.userId)}
                     handleLongPress={() => handleModal(item.userId)}
                  />
               )
            }}
         />
      )
   }, [inputText, silentUsers])

   return (
      <SafeAreaViewContainer >
         <Header
            titleHeader='Contas silenciadas'
         />
         <Container
            showsVerticalScrollIndicator={false}
         >
            <ContentPage
            >
               <SearchInput
                  marginTop='12px'
                  marginBottom='40px'
                  onSetText={setInputText}
                  value={inputText}
               />


            </ContentPage>
            <View style={{
               width: '100%',
               marginTop: -30,
            }}>
               {silencieMemoList}
            </View>

            {/* {personSelected ? (
               <MutedCard
                  usernickName={userNickname}
                  userImage={profileImage}
                  publicationMuted={false}
                  storyMuted={false}
                  onPublicationMutedChange={handlePublicationMutedChange}
                  onStoryMutedChange={handleStoryMutedChange}
               />
            ) : ( */}

            {/* )} */}

         </Container>

         {/* <BottomModal
            title='Opções de seguidor silenciado:'
            setvisibleBottonModal={() => setOpenModal(!openModal)}
            children={
               <>
                  <StoryOptions onPress={() => { delSilentUser(passIdUser) }}>
                     <Ionicons
                        name="trash-outline"
                        color={"#231F20"}
                        size={22}
                        style={{ marginBottom: 5 }}
                     />
                     <OptionText>Retirar seguidor da lista</OptionText>
                  </StoryOptions>
               </>
            }
            visibleBottonModal={openModal}
         /> */}
      </SafeAreaViewContainer>
   );
};