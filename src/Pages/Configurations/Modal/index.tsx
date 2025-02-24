import React, { useState, useEffect, SetStateAction } from "react"
import { Modal, Platform, Text, View } from "react-native"

import {
    TopSpace,
    TitleModal,
    BottomElements,
    TopSpaceContainer,
    BackgroundModal,
    CentralContainer,
    BottomAddProfile,
    BottomContainerProfile
} from "./style"

import { Image } from "react-native-elements"
import UserImageRounded from "../../../Components/UserImageProfile"
import { getProfileOuther, getProfiles } from "../../../Service/Profile"
import { ProfileUser } from "../../../Types/User"
import { setStoreItem } from "../../../Lib/asyncStorage"
import { getUser } from "../../../Service/UserRegister"
import useUserProfile from "../../../GlobalState/userProfile.zustand"
import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../../Routes/StackTypes"
import { fontStyle, theme } from "../../../Theme/theme"
import { ScrollView } from "react-native-gesture-handler"
import userToken from "../../../GlobalState/userToken.zustand"

export interface bottonModalProps {
    title: string
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    marginLeftRight?: string
    image: string
    name: string
    setBottomModalOther: () => void
}

export default function BottomModalOtherAccount(props: bottonModalProps) {
    const navigation = useNavigation<StackRoutes>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [isBottomModalVisible, setIsBottomModalVisible] = useState(false)
    const [users, setUsers] = useState<{ token: string, profile: number }[]>([])
    const { user } = useUserProfile()
    const { setToken, token } = userToken()
    const { initializeProfile, setUser } = useUserProfile()
    const [valueIdsNumber, setValueIdsNumber] = useState<ProfileUser[] | undefined>([])

    async function getListAccounts() {
        const accounts = await getProfiles()

        setUsers(accounts)
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
        props.setvisibleBottonModal(!isModalVisible)
    }

    const showBottomModal = () => {
        props.setBottomModalOther()
        setIsBottomModalVisible(true)
    };
    const hideBottomModal = () => {
        setIsBottomModalVisible(false)
    };


    const loginAccountSelected = async (token: string) => {

        await setStoreItem("@intellectus:tokenUser", token)
        getUser(token)
            .then((response) => {
                toggleModal()
                setToken(token)
                initializeProfile()
                navigation.push("Splash")
            })
            .catch((e) => {
                console.warn('GetUser - Modal')
                console.log(e)
            })
    }

    const getProf = async (userId: number): Promise<ProfileUser | undefined> => {
        try {
            const getAccounts = await getProfileOuther(userId);
            if (getAccounts && getAccounts.data) {
                // setStateProfile(getAccounts.data)
                return getAccounts.data;
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            return undefined;
        }
    }

    useEffect(() => {
        getListAccounts()
        setIsModalVisible(props.visibleBottonModal)
    }, [props.visibleBottonModal])

    useEffect(() => {
        for (let i = 0; i < users.length; i++) {
            getProf(users[i].profile)
                .then((res) => {
                    setValueIdsNumber((value) => [...value, res])
                })
                .catch((e) => {
                    console.error('Error to put in array')
                })
        }
    }, [users])


    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
        >
            <View onTouchEnd={toggleModal} style={{ backgroundColor: '#000000aa', flex: 4 }}></View>

            <BackgroundModal onPress={hideBottomModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <BottomContainerProfile marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer marginBottom={props.title ? "10px" : "20px"}>
                        <TopSpace onPress={hideBottomModal} />
                    </TopSpaceContainer>
                    {props.title && (<TitleModal>{props.title}</TitleModal>)}

                    <CentralContainer>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                            <BottomAddProfile onPress={showBottomModal}>
                                <Image
                                    style={{ width: 60, height: 60, marginBottom: 10, borderRadius: 50 }}
                                    source={require('../../../Assets/Icons/addAccountCircle.png')} />
                                <Text style={{ fontFamily: fontStyle.medium, color: theme.primarycolor, fontSize: 13, marginTop: -4 }}>Adicionar</Text>
                            </BottomAddProfile>
                            {users.length > 0 &&
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    {users.map((item: { profile: number, token: string }, index) => (
                                        <View key={index} style={{
                                            alignItems: 'center'
                                        }}>
                                            <UserImageRounded url={valueIdsNumber?.[index]?.profileImage} size={60} onOpenCartaz={() => { loginAccountSelected(item.token) }} />
                                            <Text style={{ fontFamily: fontStyle.medium, color: theme.textDark, fontSize: 13, marginTop: 5 }}>{limitNicknameLength(valueIdsNumber?.[index]?.userNickname, 6)}</Text>

                                        </View>
                                    ))}
                                </View>
                            }
                        </ScrollView>
                    </CentralContainer>
                </BottomContainerProfile>
            </BackgroundModal>
        </Modal >
    )
}