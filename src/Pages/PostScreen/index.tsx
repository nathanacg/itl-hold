import { useState } from 'react'
import { View } from 'react-native'

import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand'

import { Container, ContainerView, SafeAreaViewContainer } from '../../Components/elementsComponents'
import ProfileHeader from '../../Components/ProfileHeader'
import ComentsList from '../Feed/components/ComentsList'
import BottomModal from '../../Components/BottomModal'
import SearchInput from '../../Components/SearchInput'
import LikesList from '../Feed/components/LikesList'
import Post from '../../Components/Post'
import { useRoute } from '@react-navigation/native'

export default function PostScreen() {
    const { post } = useOtherProfilePost()

    const route = useRoute()

    const params = route.params as { isArquivaded: boolean }

    const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
    const [titleBottomModal, setTitleBottomModal] = useState<string>('')
    const [typeBottonModal, setTypeButtonModal] = useState<'comments' | 'likes'>('comments')
    const [searchText, setSearchText] = useState<string>('')



    /*  const handleBottonModal = (type: 'comments' | 'likes') => {
         setvisibleBottonModal(!visibleBottonModal)
         if (type === "comments") {
             setTitleBottomModal('Comentários')
         } else if (type === "likes") {
             setTitleBottomModal('Curtidas')
         }
         setTypeButtonModal(type)
     } */

    // const handleDeepLink = async (event) => {
    //     // Manipule o link profundo aqui
    //     console.log('Link Profundo:', event.url);

    // };

    // useEffect(() => {
    //     // Adicione o manipulador de link profundo ao montar o componente
    //     Linking.addEventListener('url', handleDeepLink);

    //     // Não se esqueça de remover o manipulador ao desmontar o componente
    //     return () => {
    //         // Linking.removeEventListener('url', handleDeepLink);
    //     };
    // }, []);
    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <ProfileHeader
                />

                <ContainerView>
                    <Post
                        screen={true}
                        Actions
                        hiddenPostLegend={!!post.postColor}
                        postCategorie={post.postCategorie}
                        postColor={post.postColor}
                        userNickname={post.userNickname}
                        profileImage={post.profileImage}
                        postActions
                        isArquivaded={params.isArquivaded}
                        link={post.link}
                        repostEnabled
                        hasSpoiler={post.postSpoiler === 1}
                        medias={post.medias}
                        postLegend={post.postLegend || ''}
                        markedUsers={post.markedUsers}
                        avaliationPost={post.postEvaluation}
                        paddingTop={post.postColor ? "10px" : "0px"}
                        postHexId={post.postHexId}
                        userId={post.userId}
                        postSpoiler={post.postSpoiler}
                        followingUser={post.followingUser}
                        postDate={post.postDate}
                        isClosed={post.isClosed}
                        isSaved={post.isSaved}
                        tmdbMovieId={post.tmdbMovieId}
                        postId={post.postId}
                        myPost={true}
                    />

                </ContainerView>

            </Container>

            <BottomModal
                visibleBottonModal={visibleBottonModal}
                setvisibleBottonModal={setvisibleBottonModal}
                title={''}
                marginLeftRight='0'
                children={
                    <View>
                        {typeBottonModal === "comments" && (
                            <ComentsList setvisibleBottonModal={setvisibleBottonModal} postId={post.postHexId} />
                        )}
                        {typeBottonModal === "likes" && (
                            <>
                                <View style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                                    <SearchInput
                                        marginTop='12px'
                                        onSetText={setSearchText}
                                        value={searchText}
                                    />
                                </View>
                                <LikesList />
                            </>
                        )}
                    </View>
                }
            />
        </SafeAreaViewContainer>
    )
}