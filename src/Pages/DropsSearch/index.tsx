import { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import BottomModal from '../../Components/BottomModal';
import ComentsList from '../Feed/components/ComentsList';
import LikesList from '../Feed/components/LikesList';


import DropContent from './DropContent';


import { useRoute } from '@react-navigation/native';
import useDropsStore, { reels } from '../../GlobalState/drops.zustand';

import useUserProfile from '../../GlobalState/userProfile.zustand';

import { getUserFolders, saveDrops, unsaveDrops } from '../../Service/Profile';
import PostersBottom from '../../Components/PostersBottom';
import DropsOptions from '../../Components/DropsOptions';
import { AddText } from '../../Components/AlbumCard/style';
import { Drops } from '../../Components/DropsAndPostSearch/interfaces/drops';

interface Folder {
    cover_url: {
        mediaUrl: string;
    };
    foldersName: string;
    idFolders: number;
    post_saved: any
    reels_saved: any
    story_saved: any
    userId: number;
}



export default function DropsSearch() {

    const route = useRoute()
    const { dropsList } = useDropsStore()
    const params = route.params as { item: reels }
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [autoplay, setAutoplay] = useState<boolean>(false)

    const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)

    const [dropOptionsModal, setDropOptionsModal] = useState<boolean>(false)
    const [savedModal, setSavedModal] = useState(false)

    const [folders, setFolders] = useState<Folder[]>([]);
    const [requestCount, setRequestCount] = useState(0);
    const [saved, setSaved] = useState(false)
    const [titleBottomModal, setTitleBottomModal] = useState<string>('')
    const [typeBottonModal, setTypeButtonModal] = useState<'comments' | 'likes'>('comments')
    const [isSaved, setIsSaved] = useState(false);
    const { user } = useUserProfile()
    const [userAdmin, setUserAdmin] = useState(false)


    const handleAutoplay = () => {
        setAutoplay(!autoplay)
    }

    const handleOptionsModal = (userIdParam: number) => {
        if (userIdParam == user.userId) {
            setUserAdmin(true);
        } else {
            setUserAdmin(false);
        }
        setDropOptionsModal(!dropOptionsModal)
    }

    const handleBottonModal = useCallback((type: 'comments' | 'likes') => {
        setvisibleBottonModal(!visibleBottonModal)
        if (type === "comments") {
            setTitleBottomModal('Comentários')
        } else if (type === "likes") {
            setTitleBottomModal('Curtidas')
        }
        setTypeButtonModal(type)
    }, [])

    const saveItems = async (idFolders: number) => {
        setSaved(!saved)
        setSavedModal(!savedModal)
        const postHexId = (dropsList[currentIndex].postHexId);
        const userId = (user.userId);

        if (saved == false) {
            try {
                await saveDrops(userId, idFolders, postHexId);
            } catch (error) {
                console.error('Error saving item:', error);
            }
        } else {
            await unsaveDrops(userId, idFolders, postHexId)
        }
    }

    useEffect(() => {
        const fetchUsersFolder = async () => {
            try {
                const response = await getUserFolders(user.userId)
                setFolders(response.data.folders)
                setRequestCount(requestCount + 1)
            } catch (error) {
                console.error('Error fetching user folders: ', error)
            }
        }
        fetchUsersFolder()

    }, [dropOptionsModal])

    return (
        <View style={{ flex: 1 }}>

            <DropContent
                id={1}
                userNickname={params.item.userNickname}
                userId={params.item.userId}
                play={currentIndex == params.item.index}
                viewsCount={params.item.viewsCount}
                isNext={params.item.index > currentIndex - 3 && params.item.index < currentIndex + 3 && params.item.index != currentIndex}
                commentsCount={params.item.commentsCount}
                likesCount={params.item.likesCount}
                usersLiked={params.item.usersLiked}
                Iliked={params.item.Iliked}
                isSaved={isSaved}
                adminDrops={params.item.userId == user.userId}
                saveDrops={() => setSavedModal(!savedModal)}
                userImage={params.item.profileImage}
                userName={params.item.username}
                postHexId={params.item.postHexId}
                video={params.item.principalMedia.url}
                handleAutoplay={handleAutoplay}
                handleBottonModal={handleBottonModal}
                handleOptionsModal={() => handleOptionsModal(params.item.userId)}



            />

            <BottomModal
                visibleBottonModal={visibleBottonModal}
                setvisibleBottonModal={setvisibleBottonModal}
                title={titleBottomModal}
                marginLeftRight='0'
                children={
                    <View>
                        {typeBottonModal === "comments" && (
                            <>
                                <ComentsList
                                    darkLike={true}
                                />
                            </>
                        )}
                        {typeBottonModal === "likes" && (
                            <>
                                <LikesList
                                />
                            </>
                        )}
                    </View>
                }
            />

            <DropsOptions
                dropsUrl={`reels.intellectus.app.br/${dropsList[currentIndex]?.postHexId}`}
                onClose={handleAutoplay}
                postHexId={dropsList[currentIndex].postHexId}
                userNickname={dropsList[currentIndex].userNickname}
                followingUser={user.isFollowing ? 1 : 0}
                setvisibleBottonModal={() => setDropOptionsModal(!dropOptionsModal)}
                visibleBottonModal={dropOptionsModal}
                dropsUserId={dropsList[currentIndex]?.userId}
                admin={userAdmin}
                followEnable={true}
            />


            <BottomModal
                children={
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FlatList
                            data={folders}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => "folder" + item.idFolders}
                            ListEmptyComponent={

                                <AddText style={{ marginBottom: 30, marginTop: 30 }}>Não tem nenhuma pasta</AddText>

                            }

                            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                            numColumns={3}
                            renderItem={({ item }) => {
                                return (
                                    <PostersBottom
                                        imageUrl={item.cover_url.mediaUrl}
                                        title={item.foldersName}
                                        navigation={() => {
                                            {
                                                saveItems(item.idFolders)
                                            }
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>
                }
                title='Salvar na pasta'
                visibleBottonModal={savedModal}
                setvisibleBottonModal={() => { setSavedModal(!savedModal) }}
            />

        </View>
    )
}