import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import BottomModal from '../../Components/BottomModal';
import ComentsList from '../Feed/components/ComentsList';
import LikesList from '../Feed/components/LikesList';

import { StackRoutes } from '../../Routes/StackTypes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DropContent from './DropContent';

import { useNavigation, useRoute } from '@react-navigation/native';
import useDropsStore from '../../GlobalState/drops.zustand';

import useUserProfile from '../../GlobalState/userProfile.zustand';

import { getUserFolders, saveDrops, unsaveDrops } from '../../Service/Profile';
import PostersBottom from '../../Components/PostersBottom';
import DropsOptions from '../../Components/DropsOptions';
import { AddText } from '../../Components/AlbumCard/style';

interface Folder {
  cover_url: {
    mediaUrl: string;
  };
  foldersName: string;
  idFolders: number;
  post_saved: any;
  reels_saved: any;
  story_saved: any;
  userId: number;
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

export default function Drop() {
  const route = useRoute();
  const { dropsList } = useDropsStore();
  const keyRealsArquive = true;
  const params = route.params as {
    postHexId: string;
    index: number;
    archived?: boolean;
  };
  const navigation = useNavigation<StackRoutes>();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState<number>(params.index || 0);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);

  const [dropOptionsModal, setDropOptionsModal] = useState<boolean>(false);
  const [savedModal, setSavedModal] = useState(false);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [requestCount, setRequestCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [titleBottomModal, setTitleBottomModal] = useState<string>('');
  const [typeBottonModal, setTypeButtonModal] = useState<'comments' | 'likes'>(
    'comments',
  );
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useUserProfile();
  const [userAdmin, setUserAdmin] = useState(false);

  const handleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  const handleOptionsModal = (userIdParam: number) => {
    // console.log(userIdParam, user.userId, ' -- userIdParam');
    if (userIdParam == user.userId) {
      setUserAdmin(true);
    } else {
      setUserAdmin(false);
    }
    setDropOptionsModal(!dropOptionsModal);
  };

  const handleBottonModal = useCallback((type: 'comments' | 'likes') => {
    setvisibleBottonModal(!visibleBottonModal);
    if (type === 'comments') {
      setTitleBottomModal('Comentários');
    } else if (type === 'likes') {
      setTitleBottomModal('Curtidas');
    }
    setTypeButtonModal(type);
  }, []);

  const saveItems = async (idFolders: number) => {
    setSaved(!saved);
    setSavedModal(!savedModal);
    const postHexId = dropsList[currentIndex].postHexId;
    const userId = user.userId;

    if (saved == false) {
      try {
        const saveResponse = await saveDrops(userId, idFolders, postHexId);
      } catch (error) {
        console.error('Error saving item:', error);
      }
    } else {
      unsaveDrops(userId, idFolders, postHexId);
    }
  };

  function closeModal(value: boolean | undefined) {
    setDropOptionsModal(false);
  }

  useEffect(() => {
    const fetchUsersFolder = async () => {
      try {
        const response = await getUserFolders(user.userId);
        setFolders(response.data.folders);
        setRequestCount(requestCount + 1);
      } catch (error) {
        console.error('Error fetching user folders: ', error);
      }
    };
    fetchUsersFolder();
  }, [dropOptionsModal]);

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView>
        <Carousel
          ref={carouselRef}
          width={width}
          height={height}
          autoPlay={false}
          loop={false}
          vertical
          data={dropsList}
          scrollAnimationDuration={500}
          enabled={true}
          windowSize={3}
          defaultIndex={params.index}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({ item, index }) => (
            <DropContent
              id={index}
              userNickname={item.userNickname}
              userId={item.userId}
              play={currentIndex == index}
              viewsCount={item.viewsCount}
              isNext={
                index > currentIndex - 3 &&
                index < currentIndex + 3 &&
                index != currentIndex
              }
              commentsCount={item.commentsCount}
              likesCount={item.likesCount}
              usersLiked={item.usersLiked}
              Iliked={item.Iliked}
              isSaved={isSaved}
              adminDrops={item.userId == user.userId}
              saveDrops={() => setSavedModal(!savedModal)}
              userImage={item.profileImage}
              userName={item.username}
              postHexId={item.postHexId}
              video={item.principalMedia.url}
              handleAutoplay={handleAutoplay}
              handleBottonModal={handleBottonModal}
              handleOptionsModal={() => handleOptionsModal(item.userId)}
            />
          )}
        />

        <BottomModal
          visibleBottonModal={visibleBottonModal}
          setvisibleBottonModal={setvisibleBottonModal}
          title={titleBottomModal}
          marginLeftRight="0"
          children={
            <View>
              {typeBottonModal === 'comments' && (
                <>
                  <ComentsList darkLike={true} />
                </>
              )}
              {typeBottonModal === 'likes' && (
                <>
                  <LikesList />
                </>
              )}
            </View>
          }
        />

        <DropsOptions
          dropsUrl={`reels.intellectus.app.br/${dropsList[currentIndex]?.postHexId}`}
          onClose={handleAutoplay}
          followingUser={user.isFollowing ? 1 : 0}
          setvisibleBottonModal={route => closeModal(route)}
          visibleBottonModal={dropOptionsModal}
          dropsUserId={dropsList[currentIndex]?.userId}
          admin={userAdmin}
          keyRealsArquive={keyRealsArquive}
          postHexId={dropsList[currentIndex].postHexId}
          followEnable={true}
          archi={params.archived}
        />
      </GestureHandlerRootView>

      <BottomModal
        children={
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              data={folders}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => 'folder' + item.idFolders}
              ListEmptyComponent={
                <AddText style={{ marginBottom: 30, marginTop: 30 }}>
                  Não tem nenhuma pasta
                </AddText>
              }
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              numColumns={3}
              renderItem={({ item }) => {
                return (
                  <PostersBottom
                    imageUrl={item.cover_url.mediaUrl}
                    folderData={item.cover_url.mediaUrl}
                    title={item.foldersName}
                    navigation={() => {
                      {
                        saveItems(item.idFolders);
                      }
                    }}
                  />
                );
              }}
            />
          </View>
        }
        title="Salvar na pasta"
        visibleBottonModal={savedModal}
        setvisibleBottonModal={() => {
          setSavedModal(!savedModal);
        }}
      />
    </View>
  );
}
