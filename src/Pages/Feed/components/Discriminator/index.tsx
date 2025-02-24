/* eslint-disable react/react-in-jsx-scope */
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../../Routes/StackTypes';

import { listMyRequestFollowers } from '../../../../Service/Profile';

import { ProfileUser } from '../../../../Types/User';
import { AllTypesPostsFeed } from '../../../../Types/discriminator';

import RoomCard from '../RoomCard';
import DropCard from '../DropCard';
import ToFollowCard from '../ToFollowCard';
import ContainerPattern from '../ContainerPattern';
import { UserAccept } from '../../../Notifications';

import Post from '../../../../Components/Post';
import Repost from '../../../../Components/Repost';
import DropLoading from '../../../../Components/DropLoading';
import { IRoom } from '../../../../Types/rooms.type';

import { getRoomsList } from '../../../../Service/Rooms';
import { getNonFollowing } from '../../../../Service/Followers';

import useDropsStore from '../../../../GlobalState/drops.zustand';
import useUserProfile from '../../../../GlobalState/userProfile.zustand';
import DropFeed from '../../../../Components/DropFeed';
import React from 'react';

interface discriminatorProps {
  objectPost: AllTypesPostsFeed;
  index: number;
  setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>;
  activeIndex?: number;
}

export default function Discriminator(props: discriminatorProps) {
  const { user: userProfile } = useUserProfile();

  const { loadingDrops, dropsList } = useDropsStore();

  const navigation = useNavigation<StackRoutes>();
  const [isNotFollower, setIsNotFollowers] = useState<ProfileUser[]>([]);
  const [index, setIndex] = useState(0);
  const [listPriv, setListPriv] = useState<UserAccept[]>([]);
  const [roomsList, setRoomsList] = useState<IRoom[]>([]);

  const getRooms = async () => {
    try {
      const response = await getRoomsList();
      setRoomsList(response.data.result.reverse());
    } catch (error) {
      console.log('deu ruim ao pegar as salas', error);
    }
  };

  const removeItem = (userId: number) => {
    const newData = isNotFollower.filter(item => item.userId !== userId);
    setIsNotFollowers(newData);
  };
  async function RequestFollow() {
    listMyRequestFollowers()
      .then(({ data }) => {
        setListPriv(data);
      })
      .catch(e => {
        console.log('listMyRequestFollowers - Followers Component');
        console.log(e);
      });
  }

  useFocusEffect(
    useCallback(() => {
      RequestFollow();
      getRooms();
    }, []),
  );

  // useEffect(() => {
  //   if (
  //     dropsList.findIndex(
  //       (drop: { postHexId: string }) =>
  //         drop.postHexId === props.objectPost.postHexId,
  //     ) >= 0
  //   ) {
  //     setIndex(
  //       dropsList.findIndex(
  //         (drop: { postHexId: string }) =>
  //           drop.postHexId === props.objectPost.postHexId,
  //       ),
  //     );
  //   }
  // }, [props.index]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getNonFollowing(userProfile.userId);
        const res = response.data.result;
        const usersId = res.map((usuario: ProfileUser) => usuario.userId);
        const usuariosFilters = res.filter((usuario: ProfileUser) =>
          usersId.includes(usuario.userId),
        );

        let temp: ProfileUser[] = [];

        usuariosFilters.map((item: ProfileUser) => {
          if (listPriv.find(follow => follow.userId == item.userId)?.userId) {
            temp.push({ ...item, status: 'Solicitado' });
          } else {
            temp.push({ ...item, status: undefined });
          }
        });
        setIsNotFollowers(temp);
      } catch (e) {
        console.warn('GetNonFollowing - Discriminator');
        console.log(e);
      }
    };

    fetchFollowers();
  }, [userProfile.userId]);
  // console.log('props', props.objectPost);
  return (
    <>
      {props.objectPost.publicationType === 'roomsSuggestions' && (
        <ContainerPattern
          marginBottom={40}
          title="Salas"
          rigthButton="Ver todas"
          OnButtonPress={() => navigation.push('RoomsList')}>
          <FlatList
            horizontal
            data={roomsList.slice(0, 5)}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => 'room' + item.room_id}
            renderItem={({ item }) => <RoomCard dataRoom={item} />}
          />
        </ContainerPattern>
      )}

      {props.objectPost.publicationType === 'dropsSuggestions' && (
        <ContainerPattern title="Drops" marginBottom={20}>
          <FlatList
            horizontal
            keyExtractor={(_item, index) => 'drops' + index}
            showsHorizontalScrollIndicator={false}
            data={dropsList}
            renderItem={({ item, index }) => (
              <>
                {loadingDrops ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}>
                    <DropLoading />
                  </View>
                ) : (
                  <DropCard
                    index={index}
                    viewCount={item.viewsCount}
                    commentsCount={item.commentsCount}
                    likesCount={item.likesCount}
                    profileImage={item.profileImage}
                    userNickname={item.userNickname}
                    postHexId={item.postHexId}
                    url={item.principalMedia.url}
                  />
                )}
              </>
            )}
          />
        </ContainerPattern>
      )}

      {isNotFollower.length > 0 &&
        props.objectPost.publicationType === 'suggestionsUsersToFollower' && (
          <ContainerPattern
            marginBottom={20}
            title="Quem seguir"
            rigthButton="Ver todos"
            OnButtonPress={() => navigation.navigate('Sugestions')}>
            <FlatList
              horizontal
              keyExtractor={item => 'user' + item.userId}
              showsHorizontalScrollIndicator={false}
              data={isNotFollower}
              style={{ marginTop: -5 }}
              renderItem={({ item }) => (
                <ToFollowCard
                  user_verified={item.user_verified}
                  private_account={item.private_account}
                  userNickname={item.userNickname}
                  profileImage={item.profileImage}
                  userName={item.userName}
                  userId={item.userId}
                  buttonText={item.status}
                  buttonAction={() => removeItem(item.userId)}
                />
              )}
            />
          </ContainerPattern>
        )}

      {props.objectPost.publicationType == 'repost' && (
        <Repost
          isSaved={false}
          repostData={props.objectPost}
          hasSpoiler={props.objectPost.originalPost.post.postSpoiler === '1'}
          profileImageRepost={props.objectPost.repostOwner?.profileImage}
          userIdRepost={props.objectPost.repostOwner?.userId}
          userNicknameRepost={props.objectPost.repostOwner?.userNickname}
          postDateRepost={props.objectPost.repostOwner.postDate}
          audio={props.objectPost.repostOwner.audio}
          postLegendRepost={props.objectPost.repostOwner.repostLegend || ''}
          Actions
          showLikes={!!props.objectPost.show_likes}
          isClosed={props.objectPost.originalPost.post.isClosed}
          userNickname={props.objectPost.originalPost.postOwner?.userNickname}
          profileImage={props.objectPost.originalPost.postOwner?.profileImage}
          postActions
          index={props.index}
          postColor={props.objectPost.originalPost.post.postColor}
          postDate={props.objectPost.originalPost.post.postDate}
          medias={props.objectPost.originalPost.medias}
          postLegend={props.objectPost.originalPost.post.postLegend || ''}
          avaliationPost={props.objectPost.originalPost.post.postEvaluation}
          paddingTop={'0px'}
          repostHexId={props.objectPost.repostOwner.repostHexId}
          postHexId={props.objectPost.originalPost.post.postHexId}
          userId={props.objectPost.repostOwner?.userId}
          followingUser={props.objectPost.followingUser}
          tmdbMovieId={props.objectPost.originalPost.post.tmdbMovieId}
          postId={props.objectPost.originalPost.post.postId}
          mediaSecundary={props.objectPost.originalPost}
          postCategorie={props.objectPost.originalPost.post.postCategorie}
          link={props.objectPost.originalPost.post.link}
        />
      )}

      {props.objectPost.publicationType === 'post' && (
        <Post
          Actions
          postActions
          repostEnabled
          index={props.index}
          link={props.objectPost.link}
          postColor={props.objectPost.postColor}
          isSaved={props.objectPost.isSaved}
          hiddenPostLegend={!!props.objectPost.postColor}
          mediaImage={
            props.objectPost.medias && props.objectPost.medias[0]?.mediaUrl
          }
          postCategorie={props.objectPost.postCategorie}
          isClosed={props.objectPost.isClosed}
          userNickname={props.objectPost.userNickname}
          profileImage={props.objectPost.profileImage}
          postSpoiler={props.objectPost.postSpoiler}
          showLikes={!!props.objectPost.show_likes}
          markedUsers={props.objectPost.markedUsers}
          postDate={props.objectPost.postDate}
          hasSpoiler={props.objectPost.postSpoiler === 1}
          medias={props.objectPost.medias}
          postLegend={props.objectPost.postLegend || ''}
          avaliationPost={props.objectPost.postEvaluation}
          paddingTop={props.objectPost.postColor ? '10px' : '0px'}
          postHexId={props.objectPost.postHexId}
          userId={props.objectPost.userId}
          followingUser={props.objectPost.followingUser}
          tmdbMovieId={props.objectPost.tmdbMovieId}
          postId={props.objectPost.postId}
          isArquivaded={props.objectPost.isArquived}
        />
      )}

      {props.objectPost.publicationType === 'drops' && (
        <>
          <DropFeed
            id={props.index}
            saveDrops={() => props.objectPost.postHexId}
            isSaved={props.objectPost.isSaved}
            showInFeed={true}
            indexPositionFeed={props.index}
            play={false}
            isNext={true}
            paddingTop={props.index == 0 ? 8 : 0}
            userId={props.objectPost.userId}
            commentsCount={props.objectPost.commentsCount}
            likesCount={props.objectPost.likesCount}
            createdAt={props.objectPost.postDate}
            viewsCount={props.objectPost.likesCount}
            usersLiked={props.objectPost.usersLiked}
            Iliked={props.objectPost.Iliked}
            userNickname={props.objectPost.userNickname}
            userImage={props.objectPost.profileImage}
            postId={props.objectPost.postId}
            userName={props.objectPost.username}
            postHexId={props.objectPost.postHexId}
            video={props.objectPost.principalMedia.url}
            setvisibleBottonModal={() => props.setvisibleBottonModal}
          />
        </>
      )}
    </>
  );
}
