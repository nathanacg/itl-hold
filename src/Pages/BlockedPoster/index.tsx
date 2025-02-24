import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';

import {
   Container,
   ContentPage,
   SafeAreaViewContainer
} from '../../Components/elementsComponents';
import SearchInput from '../../Components/SearchInput';
import { FlatList, TouchableOpacity } from 'react-native';
import AccountActionResult from '../../Components/AccountActionResult';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../Theme/theme';
import { ContainerResultSeacrh, SeeMoreContainer, SeeMoreText, TextResultTotal, UndelineText } from './style';
import { findFriends, findProfiles } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { deleteDanyStoryAcess, getReturnDaniedAcess, saveDanyStoryAcess } from '../../Service/Story';
import { getFollowers, getFollowing } from '../../Service/Followers';

interface BlockedUser {
   userId: number;
   userName: string;
   userEmail: string;
   userPhone: string;
   userBirthday: string;
   userNickname: string;
   userPassword: string;
   userBio: string;
   userPrivate: string;
   token: string;
   profileImage: string;
   site: string;
   gender: string;
   post_archived: string[];
   reels_archived: string[];
   story_archived: string[];
   private_account: number;
   twofa_sms: number;
   twofa_email: number;
   blocked_users: number[];
   silent_users: number[];
   user_verified: number;
   show_likes: number;
   show_visualizations: number;
   allow_marcations: number;
   manual_approval: number;
   denystory_users: null;
   allow_responses: number;
   savestory_gallery: number;
   savestory_archive: number;
   story_reshare: number;
   story_share: number;
}

export default function BlockedPoster() {
   const [seacrhValue, setSearchValue] = useState<string>('')
   const { user } = useUserProfile();
   const [inputValue, setInputValue] = useState<string>("");

   const [showAllUsers, setShowAllUsers] = useState(false)
   const [allSelected, setAllSelected] = useState<BlockedUser[]>([])
   const [searchResults, setSearchResults] = useState<BlockedUser[]>([]);

   useEffect(() => {
      if (inputValue.length > 0) {
         findFriends(inputValue)
            .then((response) => {
               var temp: BlockedUser[] = response.data
               if (allSelected.length > 0) {
                  allSelected.map((item) => {
                     const index = temp.findIndex((itemTemp) => item.userId == itemTemp.userId)
                     if (index > -1) {
                        temp.splice(index, 1);
                     }
                     setSearchResults(temp);
                  })
               } else {
                  setSearchResults(response.data);
               }
            })
            .catch((error) => {
               console.warn('findFriends - BlockedPoster')
               console.log(error);
            });
      } else {
         setSearchResults([]);
      }
   }, [inputValue]);

   useEffect(() => {
      const callDaniedAcess = async () => {
         try {
            const returnDaniedAcess = await getReturnDaniedAcess(user.userId);
            setAllSelected(returnDaniedAcess.data.blockedUsers)
         } catch (error) {
            console.warn('getReturnDaniedAcess - BlockedPoster')
            console.log(error);
         }

      }
      callDaniedAcess();
   }, [])

   const letSaveDanyStoryAcess = async (blockedUserId: number) => {
      try {
         await saveDanyStoryAcess(blockedUserId);
         setInputValue("")
         const returnDaniedAcess = await getReturnDaniedAcess(user.userId);
         setAllSelected(returnDaniedAcess.data.blockedUsers)
      } catch (e) {
         console.warn('saveDanyStoryAcess/getReturnDaniedAcess - BlockedPoster')
         console.log(e);
      }
   }

   const letDeleteDanyStoryAcess = async (unblockedUserId: number) => {
      try {
         await deleteDanyStoryAcess(unblockedUserId);
         const returnDaniedAcess = await getReturnDaniedAcess(user.userId);
         setAllSelected(returnDaniedAcess.data.blockedUsers)

      } catch (e) {
         console.warn('deleteDanyStoryAcess/getReturnDaniedAcess - BlockedPoster')
         console.log(e);
      }
   }

   return (
      <SafeAreaViewContainer>
         <Header
            titleHeader='Bloqueados do Cartaz'
         />
         <ContentPage>
            <SearchInput
               value={inputValue}
               onSetText={setInputValue}
               marginTop='20px'
            />
         </ContentPage>
         <Container showsVerticalScrollIndicator={false}>
            {searchResults.length > 0 ? (
               <>
                  <FlatList
                     data={searchResults}
                     scrollEnabled={false}
                     keyExtractor={(item, index) => "userRes" + item.userNickname + index}
                     ListHeaderComponent={
                        <>{allSelected?.length > 0 &&
                           <FlatList
                              data={allSelected}
                              scrollEnabled={false}
                              keyExtractor={(item, index) => `userRes${item.userNickname + index}`}
                              renderItem={({ item }) => {
                                 return (
                                    <AccountActionResult
                                       name={item.userName}
                                       profilePhoto={item.profileImage}
                                       username={item.userNickname}
                                       textButton='Desbloquear'
                                       handlePress={() => letDeleteDanyStoryAcess(item.userId)}
                                    />
                                 )
                              }
                              }
                           />
                        }</>
                     }
                     renderItem={({ item }) => (
                        <AccountActionResult
                           name={item.userName}
                           profilePhoto={item.profileImage}
                           username={item.userNickname}
                           textButton='Bloquear'
                           handlePress={() => letSaveDanyStoryAcess(item.userId)}
                        />
                     )}
                  />
               </>
            ) : (
               <>
                  <FlatList
                     data={allSelected}
                     scrollEnabled={false}
                     keyExtractor={(item, index) => `userRes${item.userNickname + index}`}
                     renderItem={({ item }) => {
                        return (
                           <AccountActionResult
                              name={item.userName}
                              profilePhoto={item.profileImage}
                              username={item.userNickname}
                              textButton='Desbloquear'
                              handlePress={() => letDeleteDanyStoryAcess(item.userId)}
                           />
                        )
                     }
                     }
                  />
               </>
            )}
         </Container>
      </SafeAreaViewContainer>
   );
};