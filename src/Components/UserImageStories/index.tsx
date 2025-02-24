import React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { theme } from '../../Theme/theme';
import { UserImage, UserImageContainer } from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSocket } from '../../context/socket';

interface UserImageRoundedProps {
  url?: string;
  hasCartaz?: boolean;
  userId?: number;
  onOpenCartaz?: () => void;
  size?: number;
}

export default function UserImageStories(props: UserImageRoundedProps) {
  const [isOnline, setIsOnline] = useState(false);

  /*  const { getUserOnline } = useSocket()

     useEffect(() => {
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
      style={[
        props.hasCartaz
          ? { borderColor: theme.primarycolor }
          : { borderColor: 'transparent' },
        props.size
          ? {
              width: props.size,
              height: props.size,
            }
          : {
              width: 55,
              height: 55,
            },
      ]}>
      {props.url ? (
        <UserImage
          source={{ uri: props.url }}
          style={[
            props.size
              ? {
                  width: props.size,
                  height: props.size,
                }
              : { width: 55, height: 55 },
          ]}
        />
      ) : (
        <View
          style={{
            backgroundColor: '#c4c4c4',
            width: 70,
            height: 70,
            borderRadius: 6,
          }}
        />
      )}

      {isOnline && (
        <View
          style={{
            backgroundColor: '#00C305',
            width: 12,
            height: 12,
            position: 'absolute',
            zIndex: 2,
            borderRadius: 13,
            borderWidth: 2,
            borderColor: 'white',
            top: 2,
            left: 2,
          }}
        />
      )}
    </UserImageContainer>
  );
}
