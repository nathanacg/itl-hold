import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

import {
    Container,
    ProfileName,
    TimerPublicationContent,
    ProfilePublicationContent,
    TimerPublication,
    SpoilerIcon,
} from './style'


import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { theme } from '../../Theme/theme'

import DarkButton from '../DarkButton'
import { Verified } from '../Verified'
import UserImageRounded from '../UserImageProfile'
import NavigateToProfile from '../NavigatetoProfile'

import { getVerfication } from '../../Service/Profile'

import { handleTimePost } from '../../Utils/handleTimePost'

import { headerPublicationProps } from '../../Types/postProps'

interface TypeCategory {
    [key: string]: string
}

export default function HeaderPublication(props: headerPublicationProps) {

    const [verified, setVerified] = useState<number>(0)

    const time = handleTimePost(props.postDate)

    const type: TypeCategory = {
        "Música": require('../../Assets/Image/music.png'),
        "Filme": require('../../Assets/Image/movie.png'),
        "Série": require('../../Assets/Image/serie.png'),
        "Livro": require('../../Assets/Image/book.png'),
        "Artigo": require('../../Assets/Image/paper.png'),
        "Podcast": require('../../Assets/Image/podcast.png')
    }


    const verification = async () => {
        await getVerfication(props.userId)
            .then((response) => {
                const verified = response.data.result[0].user_verified
                setVerified(verified)
            })
            .catch((e) => {
                console.warn('GetVerfication - HeaderPublication')
                console.log(e)
            })
    }

    useEffect(() => {
        verification()
    }, [])

    return (
        <Container index={props.index}>
            <ProfilePublicationContent>
                <UserImageRounded photoSquare url={props.profileImage} size={44} />
                <View>
                    <NavigateToProfile userNickName={props.userNickname}>
                        <ProfileName>{props.userNickname}</ProfileName>
                        {verified === 1 && <Verified width={12} height={12} />}
                    </NavigateToProfile>
                    <TimerPublicationContent>
                        <Image source={require('../../Assets/Icons/timer.png')}
                            style={{
                                width: 6,
                                height: 8,
                                marginTop: -1,
                            }}
                        />
                        <TimerPublication>{time}</TimerPublication>
                    </TimerPublicationContent>
                </View>
            </ProfilePublicationContent>

            {!props.onEdit && props.postCategorie && !props.onEdit && (
                <Image
                    alt=""
                    defaultSource={type[props.postCategorie]}
                    style={{ marginRight: props.postSpoiler === "1" ? 10 : 0, width: 22, height: 22, resizeMode: 'contain' }}
                />
            )}

            {props.postSpoiler === "1" && <SpoilerIcon source={require("../../Assets/Icons/spoilerIcon.png")} />}

            {props.onEdit ? (
                <DarkButton size='sm' title='Salvar' onPress={props.onSave} />
            ) : (
                <>
                    {props.Actions && (
                        <TouchableOpacity onPress={() => props.action()}>
                            <SimpleLineIcons
                                name='options-vertical'
                                color={theme.primarycolor}
                                size={20}
                                style={{ paddingLeft: 12, paddingRight: 4 }}
                            />
                        </TouchableOpacity>
                    )}
                </>
            )}
        </Container>
    )
}