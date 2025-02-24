import { Image, TouchableOpacity, View } from 'react-native'
import { HeaderApp, Logo, IconsContainer, Notification, NotificationsInfo } from './style'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { useSocket } from '../../context/socket'
import { useState } from 'react'

interface HeaderSecondaryProps {
    onPress?: () => void
    feedScreen?: boolean
}

export default function HeaderSecondary(props: HeaderSecondaryProps) {

    const navigation = useNavigation<StackRoutes>()

    const { unrendedChats, clearUnreadMessages } = useSocket()

    const [times, setTimes] = useState(false)

    return (
        <HeaderApp>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity disabled={times} onPress={() => {
                    setTimes(true)
                    setTimeout(() => {
                        setTimes(false)
                        navigation.push("ProfileMenu")
                    }, 500)

                }}>
                    <Logo>
                        <Image style={{ width: 40, height: 28, resizeMode: "contain" }} source={require("../../Assets/Image/face-logo.png")} />
                    </Logo>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onPress}>
                    <Logo>
                        <Image style={{ width: 115, height: 30, resizeMode: "contain" }} source={require("../../Assets/Image/name-logo.png")} />
                    </Logo>
                </TouchableOpacity>
            </View>
            <IconsContainer>
                {props.feedScreen && (
                    <>
                        <TouchableOpacity
                            style={{ overflow: 'visible' }}
                            onPress={() => {
                                clearUnreadMessages()
                                navigation.push("Messages")
                            }}>
                            <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require('../../Assets/Icons/conversation.png')} />
                            {unrendedChats > 0 && (
                                <NotificationsInfo>
                                    <Notification>
                                        {unrendedChats}
                                    </Notification>
                                </NotificationsInfo>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.push("NotificationsScreen")
                        }}>
                            <Image style={{ width: 28, height: 35, resizeMode: "contain", marginBottom: -4 }} source={require('../../Assets/Icons/notifications.png')} />
                            {/*  <NotificationsInfo>

                            </NotificationsInfo> */}
                        </TouchableOpacity>
                    </>
                )}

            </IconsContainer>

        </HeaderApp>
    )
}