import React, { useEffect, useState } from 'react';

import { Text, TouchableOpacity, View } from "react-native"
import { Image } from 'react-native-elements';
import { CardImage, CardImageCreate, Container, TitleCard, TitleCardCreate, TitleCardList } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DestaksType {
     source?: string
     textTitle?: string
     onPress?: () => void
     isCreate?: boolean
}

export default function DestaksComponents(props: DestaksType) {

     return (
          <>
               <Container>
                    <TouchableOpacity onPress={props.onPress}>
                         {props.isCreate == false ? (
                              <>
                                   <CardImageCreate>
                                        <Ionicons
                                             name='add-circle'
                                             size={32}
                                             color={"#0245F4"}
                                        />
                                   </CardImageCreate>
                              </>
                         ) : (
                              <CardImage
                                   source={{ uri: props.source }}
                              />
                         )}
                         {props.isCreate == false ? (
                              <TitleCardCreate>{props.textTitle}</TitleCardCreate>
                         ) : (
                              <TitleCard>{props.textTitle}</TitleCard>
                         )}
                    </TouchableOpacity>
               </Container>

          </>
     );
}