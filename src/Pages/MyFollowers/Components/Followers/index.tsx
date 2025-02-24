import ToAcceptCard from '../../../Feed/components/ToAcceptCard';

import useUserProfile from '../../../../GlobalState/userProfile.zustand';
import {
  getFollowers,
  getRequestFollowers,
  acceptFriend,
} from '../../../../Service/Followers';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { ContentContainer, SeeMoreContainer, SmallText } from './style';
import { useFocusEffect } from '@react-navigation/native';
import ListUsersCard from '../../../../Components/ListUsersCard';
import SearchInput from '../../../../Components/SearchInput';
import { listMyRequestFollowers } from '../../../../Service/Profile';
import { UserAccept } from '../../../Notifications';

export interface ListFollowers {
  userId: number;
  userName: string;
  userNickname: string;
  profileImage: string;
  status?: string;
}

export function Followers() {
  const { user: userProfile } = useUserProfile();

  const [inputValue, setInputValue] = useState('');

  const [followersList, setFollowersList] = useState<ListFollowers[]>([]);
  const [filterUsers, setFilterUsers] = useState<ListFollowers[]>([]);
  const [listPriv, setListPriv] = useState<UserAccept[]>([]);

  const [followRequests, setFollowRequests] = useState<ListFollowers[]>([]);

  const fetchFollowers = async () => {
    getFollowers(userProfile.userId)
      .then(res => {
        setFollowersList(res.data.result);

        let temp: ListFollowers[] = [];

        res.data.result.map((item: ListFollowers) => {
          if (listPriv.find(follow => follow.userId == item.userId)?.userId) {
            temp.push({ ...item, status: 'Solicitado' });
          } else {
            temp.push({ ...item, status: undefined });
          }
        });

        setFilterUsers(temp);
      })
      .catch(e => {
        console.log('GetFollowers - Followers Component');
        console.log(e);
      });
  };

  const fetchFollowRequest = async () => {
    getRequestFollowers()
      .then(res => {
        setFollowRequests(res.data);
      })
      .catch(e => {
        console.log('GetRequestFollowers - Followers Component');
        console.log(e);
      });
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
  function removeItem(userId: number) {
    acceptFriend(userId, 0);

    const newData = followRequests.filter(item => item.userId !== userId);
    setFollowRequests(newData);
  }
  useFocusEffect(
    useCallback(() => {
      RequestFollow();
    }, []),
  );

  useEffect(() => {
    fetchFollowers();
    fetchFollowRequest();
  }, [listPriv]);

  useEffect(() => {
    const newUsers = followersList.filter(
      user =>
        user.userNickname.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.userName.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilterUsers(newUsers);
  }, [inputValue]);

  return (
    <>
      <ContentContainer>
        <SearchInput
          marginTop="18px"
          marginBottom="14px"
          value={inputValue}
          onSetText={setInputValue}
        />
      </ContentContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        {userProfile.private_account == 1 && (
          <>
            {followRequests.length > 0 && (
              <SeeMoreContainer>
                <SmallText>Solicitações para seguir</SmallText>
              </SeeMoreContainer>
            )}
            <View style={{ paddingLeft: 20, paddingBottom: 10 }}>
              <FlatList
                style={{ paddingRight: 18 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={item => 'user' + item.userId}
                data={followRequests}
                renderItem={({ item }) => (
                  <ToAcceptCard
                    userId={item.userId}
                    userName={item.userName}
                    profileImage={item.profileImage}
                    userNickname={item.userNickname}
                    btnDelete={() => removeItem(item.userId)}
                  />
                )}
              />
            </View>
          </>
        )}

        {filterUsers.map(user => (
          <ListUsersCard
            limitNick={22}
            key={user.userId}
            inverted={true}
            btnText={user.status}
            userNickname={user.userNickname}
            userId={user.userId}
            profileImage={user.profileImage}
            userName={user.userName}
          />
        ))}
      </ScrollView>
    </>
  );
}
