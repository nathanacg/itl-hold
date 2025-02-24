import { SetStateAction, useEffect, useState } from "react"
import { FlatList, Image, KeyboardAvoidingView, Platform, TouchableOpacity, View } from "react-native"

import { MessageInput } from "./style"

import Button from "../Button"
import RadioButton from "../RadioButton"
import BottomModal from "../BottomModal"
import SearchInput from "../SearchInput"

import { theme } from "../../Theme/theme"

import useUserProfile from "../../GlobalState/userProfile.zustand"
import { getFollowers, getFollowing } from "../../Service/Followers"
import ListUsersShare from "../ListUsersShare"
import { InfoCard, InfoText } from "../../Pages/Feed/components/DropCard/style"
import { InputComment } from "../AddComment/style"
import InputcommentChat from "../InputCommentChat"
import Inputcomment from "../InputComment"

interface SelectUsersModal {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    onSend?: (text?: string) => void
    markedUsers: { name: string, address: string, userId: number }[]
    setMarkedUsers: React.Dispatch<SetStateAction<{ name: string, address: string, userId: number }[]>>
    messageOption?: boolean
    setMessageText?: React.Dispatch<SetStateAction<string>>
    mediaImage?: any
}
interface UserData {
    userId: number;
    userName: string;
    userNickname: string;
    profileImage: string;
    chatParticipantUserId: number
}

export default function SelectUsesrModal(props: SelectUsersModal) {

    const [inputValue, setInputValue] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    const [users, setUsers] = useState<UserData[]>([])

    const { user } = useUserProfile()

    const getUserFollow = async () => {
        const res = await getFollowing(user.userId)
        const filteredUsers = res.data.result.filter(
            (item: { userName: string; userNickname: string }) =>
                item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.userNickname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setUsers(filteredUsers)
    }

    useEffect(() => {
        getUserFollow()
    }, [searchTerm, user.userId])

    return (
        <BottomModal
            visibleBottonModal={props.visibleBottonModal}
            setvisibleBottonModal={props.setvisibleBottonModal}
            marginLeftRight='0'
            title=""
            children={
                <View style={{ marginBottom: -25 }}>
                    <View style={{ paddingLeft: 24, paddingRight: 24 }}>
                        <SearchInput
                            marginTop={'5px'}
                            placeholder="Pequisar amigos..."

                            value={searchTerm}
                            onSetText={(text) => setSearchTerm(text)}
                        />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={users}
                        style={{ height: 300 }}
                        extraData={users}
                        renderItem={({ item }) => (
                            <ListUsersShare
                                onPress={() => {
                                    props.markedUsers.find(user => user.address === item.userNickname)
                                        ? props.setMarkedUsers(
                                            props.markedUsers.filter(user => user.address !== item.userNickname)
                                        )
                                        : props.setMarkedUsers([
                                            ...props.markedUsers,
                                            {
                                                address: item.userNickname,
                                                name: item.userName,
                                                userId: item.userId,
                                            },
                                        ]);
                                }}
                                isShare={true}
                                userId={item.userId}
                                profileImage={item.profileImage}
                                userName={item.userName}
                                userNickname={item.userNickname}
                                rightButton={
                                    <RadioButton
                                        value={props.markedUsers.find(user => user.address == item.userNickname) ? true : false}
                                        setValue={() => {
                                            props.markedUsers.find(user => user.address == item.userNickname) ?
                                                props.setMarkedUsers(props.markedUsers.filter(user => (
                                                    user.address !== item.userNickname)
                                                )) :
                                                props.setMarkedUsers([...props.markedUsers, {
                                                    address: item.userNickname,
                                                    name: item.userName,
                                                    userId: item.userId
                                                }])
                                        }}
                                    />
                                }
                            />

                        )
                        }
                    />

                    <Inputcomment
                        placeholder="Escreva sua mensagem..."
                        onSend={() => {
                            props.onSend && props.onSend(inputValue)
                            props.setvisibleBottonModal(false)
                            setInputValue('')
                            props.setMarkedUsers([])
                        }}
                    />

                    {/*  <MessageInput
                        placeholder="Escreva uma mensagem..."
                        placeholderTextColor={theme.textligthGray}
                        value={inputValue}
                        onChangeText={(text: string) => { setInputValue(text) }}
                    />

                    <Button typebutton="blue" textButton="Enviar" pressFunction={() => {
                        props.onSend && props.onSend(inputValue)
                        props.setvisibleBottonModal(false)
                        setInputValue('')
                    }} /> */}
                </View>
            }
        />
    )
}