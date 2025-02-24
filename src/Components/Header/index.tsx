import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'

import {
    Container,
    CentralizeLogo,
    ActionHeaderContainer,
    Title
} from './style'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { theme } from '../../Theme/theme'

interface headerProps {
    actionHeaderElement?: React.ReactNode
    titleHeader?: string
    plusHandleOption?: any
    letOrNot?: any
    isFromRooms?: boolean
    isFromDestack?: boolean
    setFunction?: () => void
}

export default function Header(props: headerProps) {

    const navigation = useNavigation<StackRoutes>()
    const [letOrNot, setLetOrNot] = useState<boolean>(false)

    useEffect(() => {
        setLetOrNot(props.letOrNot)
    }, [])

    return (
        <Container>
            {props.isFromDestack ? (
                <>
                    <TouchableOpacity onPress={() => navigation.push('MyProfileScreen')}>
                        <Icon
                            name='chevron-small-left'
                            type='entypo'
                            color={theme.primarycolor}
                            size={40}
                        />
                    </TouchableOpacity>
                </>
            ) : (

                <>

                    <TouchableOpacity onPress={() => { props.setFunction ? props.setFunction() : navigation.pop() }}>
                        {!props.isFromRooms && (
                            <Icon
                                name='chevron-small-left'
                                type='entypo'
                                color={theme.primarycolor}
                                size={40}
                            />
                        )}
                    </TouchableOpacity>

                </>
            )}

            <CentralizeLogo>
                {props.titleHeader ? (
                    <Title>
                        {props.titleHeader}
                    </Title>
                ) : (
                    <Image style={{ width: 220, resizeMode: 'contain' }} source={require("../../Assets/Image/logo-intellectus.png")} />
                )}
            </CentralizeLogo>

            <ActionHeaderContainer>
                {props.actionHeaderElement}
            </ActionHeaderContainer>

            {letOrNot &&
                <TouchableOpacity onPress={props.plusHandleOption}>
                    <Image style={{ width: 34, resizeMode: 'contain', marginLeft: -50 }} source={require('../../Assets/Icons/add.png')} />
                </TouchableOpacity>
            }
        </Container>
    )
}