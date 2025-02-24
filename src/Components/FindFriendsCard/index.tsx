import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { UserInfo, UserName, CardContainer, UserFollowers } from './style';

import { deltFollowingProfile, getOtherProfile, getVerfication, postFollowingProfile } from "../../Service/Profile";

import UserImageRounded from '../UserImageProfile';
import { ProfileUser } from '../../Types/User';
import { SemiBold } from '../elementsComponents';

import NavigateToProfile from '../NavigatetoProfile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { getFollowers, getSameFollowers } from '../../Service/Followers';
import { useNotification } from '../../context/notification';
import DarkButton from '../DarkButton';
import LigthButton from '../LigthButton';
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

export default function FindFriendCard({ userProfile, ...props }: LikeCardProps) {

    const { sendNotificationFollower } = useNotification()
    const [sameUsers, setFilterSameUsers] = useState<ProfileUser[]>([])
    const [followers, setUsersFollowers] = useState<number>(0)
    const [isFollowing, setIsFollowing] = useState<number>(0)

    const [verified, setVerified] = useState<number>(0)

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
            setUsersFollowers(response.data.numSeguidores)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchFollowersOther = async () => {
        getOtherProfile(props.userNickname)
            .then(res => {
                setIsFollowing(res.data.userFollowing)
            })
            .catch((e) => {
                console.warn('IsUserFollowingMe - ListUsersFind')
                console.log(e)
            })
    }

    const addFriend = () => {
        setIsFollowing(1)
        sendNotificationFollower(props.userId)
        postFollowingProfile(props.userId)
    }

    const removeFriend = () => {
        setIsFollowing(0)
        deltFollowingProfile(props.userId)
    }


    useEffect(() => {
        fetchFollowersOther()
        fetchFollowers()
        fetchSameFollowings()
    }, [])


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
        <CardContainer onPress={props.onPress} border={props.borderBottom}>
            <UserInfo>
                <NavigateToProfile userNickName={props.userNickname}>
                    <UserImageRounded
                        size={45}
                        hasCartaz={props.userHasCartaz}
                        url={props.profileImage}
                    />
                    <View style={{ width: '90%', justifyContent: 'flex-start' }}>

                        <UserName>{props.userNickname} {verified == 1 && <Verified width={10} height={10} />}</UserName>

                        {sameUsers.length === 0 ? (
                            <UserFollowers>
                                {props.userName}{'\n'}{formatFollowers(followers)} {followers > 1 ? 'seguidores' : 'seguidor'}
                            </UserFollowers>
                        ) : (
                            <UserFollowers>
                                {props.userName} {'\n'}Seguido por <SemiBold>{sameUsers[0].userNickname}</SemiBold> + {sameUsers.length}
                            </UserFollowers>

                        )}
                    </View>
                </NavigateToProfile>
                {
                    isFollowing === 0 ? (
                        <DarkButton onPress={addFriend} title={"Seguir"} size="sm" />
                    ) : (
                        <LigthButton onPress={removeFriend} title={'Seguindo'} size="sm" />
                    )
                }

            </UserInfo>

        </CardContainer>
    );
}
