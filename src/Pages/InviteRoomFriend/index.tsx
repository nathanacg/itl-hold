import { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../Routes/StackTypes"

import useUserProfile from "../../GlobalState/userProfile.zustand"

import { AllContainer, AllText } from "./style"
import { ListFollowers } from "../MyFollowers"

import Header from "../../Components/Header"
import SearchInput from "../../Components/SearchInput"
import RadioButton from "../../Components/RadioButton"
import ListUsersCard from "../../Components/ListUsersCard"
import { ContentPage } from "../../Components/Informationsform"
import SelectPageButtons from "../../Components/SelectFollowerPage"
import { TextRegular16 } from "../../Components/configurationsElemetsStyle"
import { Container, SafeAreaViewContainer } from "../../Components/elementsComponents"

import { getFollowers, getFollowing } from "../../Service/Followers";

export default function InviteRoomFriend() {

    const navigation = useNavigation<StackRoutes>()

    const { user: userProfile } = useUserProfile()

    const [selectedPage, setSelectedPage] = useState("Seguidores")

    const [allSelected, setAllselected] = useState(false)

    const [filterUsers, setFilterUsers] = useState<ListFollowers[]>([])

    const fetchFollowings = async () => {
        try {
            await getFollowers(userProfile.userId)
                .then(res => setFilterUsers(res.data.result))
        } catch (error) {
            console.error(error)
        }
    }

    const fetchFollowers = async () => {
        try {
            await getFollowing(userProfile.userId)
                .then(res => {
                    setFilterUsers(res.data.result)
                })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchFollowers()
        fetchFollowings()
    }, [])

    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <Header
                    titleHeader="Convidar"
                    actionHeaderElement={
                        <TouchableOpacity
                            style={{ paddingTop: 5, position: "absolute", right: 0 }}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <TextRegular16>
                                Concluir
                            </TextRegular16>
                        </TouchableOpacity>
                    }
                />
                <View style={{ paddingTop: 35 }}>
                    <SelectPageButtons
                        button1="Seguindo"
                        button2="Seguidores"
                        button3="Outros"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage}
                    />
                </View>
                <ContentPage>
                    <SearchInput
                        marginBottom="10px"
                        marginTop="5px"
                        value=""
                        onSetText={() => { }}
                    />
                </ContentPage>
                {selectedPage != "Outros" && (
                    <AllContainer>
                        <AllText>
                            Todos
                        </AllText>
                        <RadioButton
                            value={allSelected}
                            setValue={() => setAllselected(!allSelected)}
                        />
                    </AllContainer>
                )}
                {filterUsers.map(item => (
                    <ListUsersCard
                        key={item.userId}
                        userId={item.userId}
                        userNickname={item.userNickname}
                        profileImage={item.profileImage}
                        userAddress={item.userName}
                        userName={item.userName}
                        borderBottom
                    />
                ))}
            </Container>
        </SafeAreaViewContainer>
    )
}