import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import {
    ContainerProfile,
    ImageProfile,
    Button,
    TextButton,
    ProfileUserName,
    Name
} from './style'
import { Verified } from '../Verified';
import { getVerfication } from '../../Service/Profile';

interface accountActionResultProps {
    profilePhoto: string,
    userId: number,
    username: string,
    name: string,
    textButton: string,
    handlePress?: () => void
    borderBottom: boolean
}

export default function AccountActionResult(props: accountActionResultProps) {

    const [verified, setVerified] = useState<number>()

    const getUserVerify = async () => {
        await getVerfication(props.userId)
            .then((response) => {
                const verified = response.data.result[0].user_verified
                setVerified(verified)
            })
            .catch((e) => {
                console.warn('GetVerification - DropFeed')
                console.log(e)
            })
    }

    useEffect(() => {
        getUserVerify()
    }, [])


    return (
        <ContainerProfile border={props.borderBottom}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                <ImageProfile source={{ uri: props.profilePhoto }} />

                <View>
                    <ProfileUserName>{props.username} {verified === 1 && <Verified width={12} height={12} />}</ProfileUserName>
                    <Name>{props.name}</Name>
                </View>
            </View>
            <Button onPress={props.handlePress}>
                <TextButton>{props.textButton}</TextButton>
            </Button>
        </ContainerProfile>
    );
};
