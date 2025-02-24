import ToAcceptCard from '../../../Feed/components/ToAcceptCard';

import useUserProfile from '../../../../GlobalState/userProfile.zustand';
import {
  getFollowers,
  getFollowing,
  getRequestFollowers,
  acceptFriend,
} from '../../../../Service/Followers';
import useScreenName from '../../../../GlobalState/screenFollowers.zustand';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import {
  ContentContainer,
  ListContainer,
  SeeMoreContainer,
  SmallText,
} from './style';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../../Routes/StackTypes';
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

export function Following() {
  const navigation = useNavigation<StackRoutes>();
  const { user: userProfile } = useUserProfile();

  const [inputValue, setInputValue] = useState('');

  const [followingList, setFollowingList] = useState<ListFollowers[]>([]);
  const [filterUsers, setFilterUsers] = useState<ListFollowers[]>([]);

  const [followRequests, setFollowRequests] = useState<ListFollowers[]>([]);

  const [listPriv, setListPriv] = useState<UserAccept[]>([]);

  const fetchFollowing = () => {
    getFollowing(userProfile.userId)
      .then(res => {
        setFollowingList(res.data.result);

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
        console.log('GetFollowing - Following Component');
        console.log(e);
      });
  };

  function removeItem(userId: number) {
    acceptFriend(userId, false)
      .then()
      .catch(e => {
        console.log('AcceptFriend - Following Component');
        console.log(e);
      });

    const newData = followRequests.filter(item => item.userId !== userId);
    setFollowRequests(newData);
  }

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
    }, []),
  );

  useEffect(() => {
    fetchFollowing();
  }, [listPriv]);

  useEffect(() => {
    const newUsers = followingList.filter(
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
        <ListContainer>
          {filterUsers.map(user => (
            <ListUsersCard
              limitNick={22}
              key={user.userId}
              userNickname={user.userNickname}
              userId={user.userId}
              profileImage={user.profileImage}
              userName={user.userName}
              rightButton
              following
            />
          ))}
        </ListContainer>
      </ScrollView>
    </>
  );
}
