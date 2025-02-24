import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { UserInfo, UserName, CardContainer, UserFollowers } from './style';


import UserImageRounded from '../UserImageProfile';
import { ProfileUser } from '../../Types/User';
import { SemiBold } from '../elementsComponents';

import NavigateToProfile from '../NavigatetoProfile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { getFollowers, getSameFollowers } from '../../Service/Followers';
import { getOtherProfile, getVerfication } from '../../Service/Profile';
import { Verified } from '../Verified';

interface LikeCardProps {
    userName: string;
    userId: number;
    rigthButton?: React.ReactNode;
    userHasCartaz?: boolean;
    inverted?: boolean;
    borderBottom?: boolean;
    profileImage: any;
    onPress?: () => void;
    userProfile: ProfileUser
    userNickname: string
}

interface ListFollowers {
    userId: number
    userName: string
    userNickname: string
    profileImage: string
}

export default function FindFriendCardExplore({ userProfile, ...props }: LikeCardProps) {

    const [sameUsers, setFilterSameUsers] = useState<ListFollowers[]>([])
    const [followers, setUsersFollowers] = useState<number>(0)

    const [verified, setVerified] = useState()

    const { user } = useUserProfile()

    const fetchSameFollowings = async () => {
        try {
            const response = await getSameFollowers(userProfile.userId, user.userId)
            setFilterSameUsers(response.data.result)
        } catch (error) {
            console.error(error)
        }
    }


    const fetchFollowers = async () => {
        try {
            const response = await getOtherProfile(userProfile.userNickname)
            setUsersFollowers(response.data.numSeguindo)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchFollowers()
        fetchSameFollowings()
    }, [props.userId])


    function formatFollowers(numFollowers: number) {
        if (numFollowers >= 1000 && numFollowers <= 1000000) {
            const formattedNumber = (numFollowers / 1000).toFixed(1).replace('.', ',') + ' mil';
            return formattedNumber
        } else if (numFollowers >= 1000000) {
            const formattedNumber = (numFollowers / 1000000).toFixed(1).replace('.', ',') + ' milhões';
            return formattedNumber
        } else {
            return numFollowers
        }
    }

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }
    return (
        <CardContainer onPress={props.onPress} border={props.borderBottom}>
            <UserInfo>
                <NavigateToProfile userNickName={props.userNickname}>
                    <UserImageRounded
                        size={45}
                        hasCartaz={props.userHasCartaz}
                        url={props.profileImage}
                    />
                    <View style={{ width: '91%', justifyContent: 'flex-start' }}>

                        <UserName>{props.userNickname} {userProfile.user_verified === 1 && <Verified width={10} height={10} />}</UserName>

                        {sameUsers.length === 0 ? (
                            <UserFollowers>
                                {props.userNickname == user.userNickname ? 'Você' : limitNicknameLength(props.userName, 21)} - {formatFollowers(followers)} {followers > 1 ? 'seguidores' : 'seguidor'}
                            </UserFollowers>
                        ) : (
                            <UserFollowers>
                                {props.userNickname === user.userNickname ? 'Você' : limitNicknameLength(props.userName, 15)} {props.userNickname === user.userNickname ? '' : ` - Seguido por ${sameUsers.length > 1 ? `${sameUsers.length} amigos` : '1 amigo'} em comum`}

                            </UserFollowers>
                            /*   <UserFollowers>
                                  {limitNicknameLength(props.userName, 11)} - Seguido por <SemiBold>{sameUsers[0].userNickname}</SemiBold> {sameUsers.length > 1 && `+ ${sameUsers.length - 1} em comum`}
                              </UserFollowers> */
                        )}


                    </View>
                </NavigateToProfile>
            </UserInfo>

        </CardContainer>
    );
}
