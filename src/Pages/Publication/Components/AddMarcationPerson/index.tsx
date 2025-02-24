import React from 'react';
import { View, Text } from 'react-native';
import {
     AlignItems,
     AlignItemsRow,
     ButtonContent,
     ContainerProfilesList,
     ImageProfile, ProfileName, ProfileNickname
} from './style';
import UserImageRounded from '../../../../Components/UserImageProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface MarcationPerson {
     userImage: string,
     userNickname: string,
     userName: string,
     marker?: string,
     closeButton?: () => void
}

export default function AddMarcationPerson(props: MarcationPerson) {

     return (
          <AlignItemsRow >

               <ContainerProfilesList>
                    <UserImageRounded url={props.userImage} size={40} />
                    <AlignItems>
                         <ProfileNickname>{props.userNickname}</ProfileNickname>
                         <ProfileName>{props.userName}</ProfileName>
                         {
                              !!props.marker && (
                                   <ProfileName>foto {props.marker}</ProfileName>
                              )
                         }

                    </AlignItems>
                    <ButtonContent onPress={props.closeButton}>
                         <AntDesign
                              name='close'
                              size={32}
                              color={'#EEEEEE'}
                         />
                    </ButtonContent>
               </ContainerProfilesList>



          </AlignItemsRow>
     );
};