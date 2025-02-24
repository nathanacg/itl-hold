import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image } from "react-native"
import { Icon } from 'react-native-elements'

import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../../Routes/StackTypes";

import { theme } from "../../../Theme/theme"
import { Container } from "../../../Components/Header/style";
import { ActionHeaderContainer, CentralizeLogo, Title } from "../../../Components/Header/style";

interface headerProps {
     actionHeaderElement?: React.ReactNode
     titleHeader?: string
     plusHandleOption?: any
     letOrNot?: any
     isFromDestack?: boolean
     backClearImage: any
}

export default function HeaderEditListOfPubli(props: headerProps) {
     const navigation = useNavigation<StackRoutes>();
     const [letOrNot, setLetOrNot] = useState<any>();

     const functionPrincipal = () => {
          navigation.pop(),
          props.backClearImage()
     }

     useEffect(() => {
          setLetOrNot(props.letOrNot);
     })

     return (
          <Container>
               <>
                    <TouchableOpacity onPress={() => { functionPrincipal() }}>
                         <Icon
                              name='chevron-small-left'
                              type='entypo'
                              color={theme.primarycolor}
                              size={40}
                         />
                    </TouchableOpacity>
               </>

               <CentralizeLogo>
                    {props.titleHeader ? (
                         <Title>
                              {props.titleHeader}
                         </Title>
                    ) : (
                         <Image style={{ width: 220, resizeMode: 'contain' }} source={require("../../../Assets/Image/logo-intellectus.png")} />
                    )}
               </CentralizeLogo>

               <ActionHeaderContainer>
                    {props.actionHeaderElement}
               </ActionHeaderContainer>

               {
                    letOrNot == true ? (
                         <TouchableOpacity onPress={props.plusHandleOption}>
                              <Image style={{ width: 34, resizeMode: 'contain', marginLeft: -50 }} source={require('../../../Assets/Icons/add.png')} />
                         </TouchableOpacity>
                    ) : (
                         <></>
                    )
               }
          </Container >
     )
}