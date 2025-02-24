import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { UserImageContainer, UserImage } from './style'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../Theme/theme'

import { useSocket } from '../../context/socket'
import useUserProfile from '../../GlobalState/userProfile.zustand'
interface UserImageRoundedProps {
    url?: string
    hasCartaz?: boolean
    userId?: number
    onOpenCartaz?: () => void
    size?: number
}

export default function UserImageRoundedDrop(props: UserImageRoundedProps) {

    const [isOnline, setIsOnline] = useState(false)

    /* const { getUserOnline } = useSocket() */

    const { user } = useUserProfile()

    /*   useEffect(() => {
          if (!props.userId) {
              if (props.url) {
                  getUserOnline(Number(props?.url?.split("/")?.find(item => item.length == 1) || 0))
                      .then(res => setIsOnline(res.online))
                      .catch((e) => {
                          console.warn('GetUserOnline - UserImageProfile')
                          console.log(e)
                      })
              }
          }
          else {
              getUserOnline(props.userId)
                  .then(res => setIsOnline(res.online))
                  .catch((e) => {
                      console.warn('GetUserOnline (else) - UserImageProfile')
                      console.log(e)
                  })
          }
      }, []) */

    return (
        <UserImageContainer
            onPress={props.onOpenCartaz}
            style={[props.hasCartaz ? { borderWidth: 15, borderColor: theme.primarycolor, borderRadius: props.size } : {
                borderColor: "transparent"
            },
            props.size ? {
                width: props.size,
                height: props.size
            } : {
                width: 55,
                height: 55,

            }]}>
            {
                props.url && (
                    <View>
                        {
                            isOnline && props.userId !== user.userId && <View style={{
                                backgroundColor: "#00C305",
                                width: 13,
                                height: 13,
                                position: "absolute",
                                zIndex: 10,
                                borderRadius: 13,
                                borderWidth: 2,
                                borderColor: "white",
                                top: 0,
                                left: 0
                            }} />

                        }
                        <UserImage source={{ uri: props.url, cache: 'force-cache' }} style={[props.size ? {
                            width: props.size,
                            height: props.size,
                        } : {
                            width: 55,
                            height: 55,
                        }]} />

                    </View>
                )
            }
        </UserImageContainer >
    )
}