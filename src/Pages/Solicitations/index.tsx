import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import Header from "../../Components/Header";
import SearchInput from "../../Components/SearchInput";
import ListUsersCard from "../../Components/ListUsersCard";
import { ContentPage, SafeAreaViewContainer } from "../../Components/elementsComponents";
import { ProfileUser, User } from "../../Types/User";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { getRequestFollowers } from "../../Service/Followers";


export default function Solicitations() {
    const [inputValue, setInputValue] = useState("")
    const [accept, setAccept] = useState(false)


    const [requestFollow, setRequestFollow] = useState<ProfileUser[]>([])

    useEffect(() => {
        const fetchRequests = async () => {
            getRequestFollowers()
                .then(res => setRequestFollow(res.data))
                .catch((e) => {
                    console.warn('GetRequestFollowers - Solicitations')
                    console.log(e)
                })
        }
        fetchRequests()

    }, [accept])



    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader="Solicitações"
            />
            <ContentPage>
                <SearchInput
                    marginBottom="0px"
                    marginTop="20px"
                    value={inputValue}
                    onSetText={setInputValue}
                />
            </ContentPage>

            <FlatList
                data={requestFollow}
                keyExtractor={(item) => "userReq" + item.userId}
                renderItem={({ item }) => (
                    <ListUsersCard
                        userId={item.userId}
                        userNickname={item.userNickname}
                        profileImage={item.profileImage}
                        userName={item.userName}
                        borderBottom
                        userRequest
                        onPress={() => setAccept(!accept)}
                    />
                )}
            />
        </SafeAreaViewContainer>
    )
}