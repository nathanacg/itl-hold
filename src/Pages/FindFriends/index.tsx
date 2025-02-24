import { useEffect, useState } from 'react'

import { Container, SafeAreaViewContainer, ContentPage } from '../../Components/elementsComponents'

import { ProfileUser } from '../../Types/User'

import Header from '../../Components/Header'
import SearchInput from '../../Components/SearchInput'
import FindFriendsCard from '../../Components/FindFriendsCard'

import useUserProfile from '../../GlobalState/userProfile.zustand'

import { searchUsers } from '../../Service/Profile'

export default function FindFriends() {

    const { user: userProfile } = useUserProfile()
    const [inputValue, setInputValue] = useState<string>("")
    const [searchResults, setSearchResults] = useState<ProfileUser[]>([])

    useEffect(() => {
        (async () => {
            try {
                const response = await searchUsers(inputValue)
                console.log(response.data.profiles)
                setSearchResults(response.data.profiles)
            } catch (error) {
                console.log(error)
            }
        })()

    }, [inputValue])

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header titleHeader='Encontrar amigos' />
                <ContentPage>
                    <SearchInput
                        marginTop="20px"
                        marginBottom="20px"
                        value={inputValue}
                        onSetText={setInputValue}
                    />
                    {
                        searchResults.map((item: ProfileUser) => (
                            <FindFriendsCard
                                userProfile={item}
                                key={item.userId}
                                userName={item.userName}
                                userId={item.userId}
                                borderBottom
                                profileImage={item.profileImage}
                                userNickname={item.userNickname}
                            />
                        ))
                    }
                </ContentPage>
            </Container>
        </SafeAreaViewContainer>
    )
}