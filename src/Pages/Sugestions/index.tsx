import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import Header from '../../Components/Header'
import SearchInput from '../../Components/SearchInput'
import { SafeAreaViewContainer } from '../../Components/elementsComponents'

import { ContentPage } from './style'

import { ProfileUser } from '../../Types/User'

import { getNonFollowing } from '../../Service/Followers'
import useUserProfile from '../../GlobalState/userProfile.zustand';
import ListUsersFind from '../../Components/ListUsersFind'


export default function Sugestions() {

    const [inputValue, setInputValue] = useState("")

    const { user: userProfile } = useUserProfile()

    const [isNotFollower, setIsNotFollowers] = useState<ProfileUser[]>([])

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                await getNonFollowing(userProfile.userId)
                    .then((response) => {
                        const res = response.data.result
                        const usuariosFilters = res.filter((usuario: ProfileUser) =>
                            usuario.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
                            usuario.userNickname.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        setIsNotFollowers(usuariosFilters)
                    })
            } catch (error) {
                console.log('erro ao buscar seguidores', error)
            }
        }

        fetchFollowers()
    }, [inputValue])


    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader="Sugestões"
            />

            <ContentPage>
                {/* <SearchInput
                    value={inputValue}
                    onSetText={setInputValue}
                /> */}
                <FlatList
                    keyExtractor={(item) => "user" + item.userId}
                    data={isNotFollower}
                    style={{ marginTop: 20 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ListUsersFind
                            userProfile={item}
                            profileImage={item.profileImage}
                            userId={item.userId}
                            userName={item.userName}
                            userNickname={item.userNickname}
                            borderBottom
                        />
                    )}
                />
            </ContentPage>
        </SafeAreaViewContainer>
    )
}
