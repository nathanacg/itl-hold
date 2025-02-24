import { View, TouchableOpacity, Image, Platform } from "react-native"

import {
    Container,
    ProfileName,
    TimerPublicationContent,
    ProfilePublicationContent,
    TimerPublication,
    SpoilerIcon,
} from './style'


import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { theme } from "../../Theme/theme"

import DarkButton from '../DarkButton';

import NavigateToProfile from '../NavigatetoProfile';
import { handleTimePost } from '../../Utils/handleTimePost';
import UserImageRounded from '../UserImageProfile';
import { useEffect, useState } from "react";
import { getVerfication } from "../../Service/Profile";
import { Verified } from "../Verified";



interface headerPublicationProps {
    userNickname: string
    user_verified: number
    userId: number
    profileImage: string
    action: () => void
    hasSpoiler?: boolean
    showSpoiler?: boolean
    onEdit: boolean
    onSave: () => void
    postDate: string
}

export default function HeaderPublicationRepost(props: headerPublicationProps) {


    const time = handleTimePost(props.postDate)
    const spoiler = props.hasSpoiler && props.showSpoiler

    return (
        <Container>
            <ProfilePublicationContent>
                <UserImageRounded url={props.profileImage} size={40} />
                <View>
                    <NavigateToProfile userNickName={props.userNickname}>
                        <ProfileName>{props.userNickname}</ProfileName>
                        {props.user_verified === 1 && <Verified width={12} height={12} />}
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
            {spoiler && <SpoilerIcon source={require("../../Assets/Icons/spoilerIcon.png")} />}

            {/*  {props.onEdit ? (
                <DarkButton size='sm' title='Salvar' onPress={props.onSave} />
            ) : (
                <TouchableOpacity onPress={() => props.action()}>
                    <SimpleLineIcons
                        name='options-vertical'
                        color={theme.primarycolor}
                        size={20}
                        style={{ paddingLeft: 12, paddingRight: 4 }}
                    />
                </TouchableOpacity>
            )} */}

        </Container>
    );
};