import React, { useState } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { ScrollView } from 'react-native';
import Header from '../../Components/Header';

import {
   TextContainerMark
} from "./style"

import {
   ContentainerConfigurations,
   Text,
   TextContainer
} from '../../Components/configurationsElemetsStyle';
import {
   SafeAreaViewContainer
} from '../../Components/elementsComponents';
import RadioButton from '../../Components/RadioButton';
export default function Language() {
   const [selectedValue, setSelectedValue] = useState<string>('Português (Brasil)')
   return (
      <SafeAreaViewContainer>
         <ScrollView>
            <Header titleHeader='Idioma' />
            <ContentainerConfigurations>
               <TextContainerMark onPress={() => setSelectedValue('English')}>
                  <Text>English</Text>
                  <RadioButton
                     value={selectedValue === "English" }
                     setValue={() => setSelectedValue('English')}
                  />
                  {/* {selectedValue === "English" && (
                     <MaterialCommunityIcons
                        name='check'
                        size={18}
                        color={"#231F20"}
                     />
                  )} */}
               </TextContainerMark>
               <TextContainerMark onPress={() => setSelectedValue('Español')}>
                  <Text>Español</Text>
                  <RadioButton
                     value={selectedValue === "Español"}
                     setValue={() => setSelectedValue('Español')}
                  />
                  {/* {selectedValue === "Español" && (
                     <MaterialCommunityIcons
                        name='check'
                        size={18}
                        color={"#231F20"}
                     />
                  )} */}
               </TextContainerMark>
               <TextContainerMark onPress={() => setSelectedValue('Português (Brasil)')}>
                  <Text>Português (Brasil)</Text>
                  <RadioButton
                     value={selectedValue === "Português (Brasil)" }
                     setValue={() => setSelectedValue('Português (Brasil)')}
                  />
                  {/* {selectedValue === "Português (Brasil)" && (
                     <MaterialCommunityIcons
                        name='check'
                        size={18}
                        color={"#231F20"}
                     />
                  )} */}
               </TextContainerMark>
            </ContentainerConfigurations>
         </ScrollView>
      </SafeAreaViewContainer>
   );
};
