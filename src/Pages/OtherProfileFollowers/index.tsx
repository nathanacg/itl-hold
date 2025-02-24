import React, { useCallback, useEffect, useState } from 'react';
import ProfileHeader from '../../Components/ProfileHeader';
import SearchInput from '../../Components/SearchInput';

import {
  ContentContainer,
  ContentContainerComum,
  FollowersContent,
  ListContainer,
  SameSmallText,
  SeeAllFollow,
  SeeMoreContainer,
  SmallText,
} from './style';

import { FlatList, ScrollView, View } from 'react-native';
import ListUsersCard from '../../Components/ListUsersCard';

import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import SelectPageButtons from '../../Components/SelectFollowerPage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { ProfileUser, User } from '../../Types/User';
import {
  getFollowers,
  getFollowing,
  getNonFollowing,
  getSameFollowers,
} from '../../Service/Followers';
import useScreenName from '../../GlobalState/screenFollowers.zustand';
import { listMyRequestFollowers } from '../../Service/Profile';
import { UserAccept } from '../Notifications';
import { ListFollowers } from '../MyFollowers/Components/Followers';

export default function OtherProfileFollowers() {
  const navigation = useNavigation<StackRoutes>();
  const { screenName, user } = useScreenName();

  const { user: userProfile } = useUserProfile();

  const otherUserProfile = user;
  const [listPriv, setListPriv] = useState<UserAccept[]>([]);
  const [filterUsers, setFilterUsers] = useState<ProfileUser[]>([]);
  const [filterSameUsers, setFilterSameUsers] = useState<ProfileUser[]>([]);
  const [filterNoUsers, setFilterNoUsers] = useState<ProfileUser[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [seeAll, setSeeAll] = useState<boolean>(false);

  const [selectedPage, setSelectedPage] = useState(
    screenName !== '' ? screenName : 'Seguidores',
  );

  const fetchNoFollowers = async () => {
    try {
      await getNonFollowing(userProfile.userId).then(response => {
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

        setFilterNoUsers(temp);
      });
    } catch (error) {
      console.log('erro ao buscar seguidores', error);
    }
  };

  const fetchFollowings = async () => {
    if (otherUserProfile) {
      getFollowing(otherUserProfile.userId)
        .then(async res => {
          let temp: ProfileUser[] = [];
          res.data.result.map((item: ProfileUser) => {
            if (listPriv.find(follow => follow.userId == item.userId)?.userId) {
              temp.push({ ...item, status: 'Solicitado' });
            } else {
              temp.push({ ...item, status: undefined });
            }
          });
          setFilterUsers(temp);
        })
        .catch(e => {
          console.warn('GetFollowings - OtherUserProfileFollowers');
          console.log(e);
        });
    }
  };

  const fetchSameFollowings = async () => {
    try {
      const response = await getSameFollowers(
        userProfile.userId,
        otherUserProfile.userId,
      );

      let temp: ProfileUser[] = [];
      response.data.result.map((item: ProfileUser) => {
        if (listPriv.find(follow => follow.userId == item.userId)?.userId) {
          temp.push({ ...item, status: 'Solicitado' });
        } else {
          temp.push({ ...item, status: undefined });
        }
      });
      setFilterSameUsers(temp);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollowers = () => {
    getFollowers(otherUserProfile.userId)
      .then(res => {
        let temp: ProfileUser[] = [];

        res.data.result.map((item: ProfileUser) => {
          if (listPriv.find(follow => follow.userId == item.userId)?.userId) {
            temp.push({ ...item, status: 'Solicitado' });
          } else {
            temp.push({ ...item, status: undefined });
          }
        });

        setFilterUsers(temp);
      })
      .catch(e => {
        console.warn('GetFollowers - OtherUserProfileFollowers');
        console.log(e);
      });
  };

  useEffect(() => {
    if (inputValue === '') {
      fetchNoFollowers();
      if (selectedPage === 'Seguidores') {
        fetchFollowers();
      } else if (selectedPage === 'Em comum') {
        fetchSameFollowings();
      } else {
        fetchFollowings();
      }
    } else {
      const newUsers = filterUsers.filter(
        user =>
          user.userNickname.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.userName.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const newNoUsers = filterSameUsers.filter(
        user =>
          user.userNickname.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.userName.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilterUsers(newUsers);
      setFilterSameUsers(newNoUsers);
    }
  }, [inputValue, selectedPage]);

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

  return (
    <SafeAreaViewContainer>
      <ProfileHeader
        title={otherUserProfile?.userNickname}
        userImage={otherUserProfile?.profileImage}
      />
      <FollowersContent>
        <SelectPageButtons
          button1="Em comum"
          button2="Seguidores"
          button3="Seguindo"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <ContentContainer>
          <SearchInput
            marginTop="18px"
            marginBottom="0px"
            value={inputValue}
            onSetText={setInputValue}
          />
        </ContentContainer>

        {selectedPage == 'Seguidores' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ContentContainer>
              {filterUsers.length > 0 ? (
                <>
                  <SmallText>Seguidores</SmallText>
                  <SeeAllFollow onPress={() => setSeeAll(!seeAll)}>
                    {!seeAll ? 'Ver todos' : 'Ver menos'}
                  </SeeAllFollow>
                </>
              ) : (
                <SameSmallText>Nenhum resultado encontrado</SameSmallText>
              )}
            </ContentContainer>
            {/* </View> */}
            {filterUsers.length > 0 && seeAll
              ? filterUsers.map(user => (
                  <ListUsersCard
                    following
                    limitNick={22}
                    key={user.userId}
                    userId={user.userId}
                    inverted={true}
                    btnText={user.status}
                    userNickname={user.userNickname}
                    profileImage={user.profileImage}
                    userName={user.userName}
                    user_verified={user.user_verified}
                    private_account={user.private_account}
                  />
                ))
              : filterUsers
                  .slice(0, 5)
                  .map(user => (
                    <ListUsersCard
                      following
                      limitNick={22}
                      key={user.userId}
                      userId={user.userId}
                      inverted={true}
                      btnText={user.status}
                      userNickname={user.userNickname}
                      profileImage={user.profileImage}
                      userName={user.userName}
                      user_verified={user.user_verified}
                      private_account={user.private_account}
                    />
                  ))}

            {inputValue.length === 0 && (
              <>
                <SeeMoreContainer>
                  <SmallText>Sugestões para seguir</SmallText>
                  <SmallText onPress={() => navigation.push('Sugestions')}>
                    Ver todos
                  </SmallText>
                </SeeMoreContainer>
                <View>
                  <FlatList
                    keyExtractor={item => 'user' + item.userId}
                    data={filterNoUsers}
                    style={{ marginTop: 5 }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <ListUsersCard
                        limitNick={22}
                        btnText={item.status}
                        profileImage={item.profileImage}
                        userId={item.userId}
                        userName={item.userName}
                        userNickname={item.userNickname}
                      />
                    )}
                  />
                </View>
              </>
            )}
          </ScrollView>
        ) : selectedPage == 'Seguindo' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filterUsers.length > 0 ? (
              <ContentContainer>
                <SmallText>Seguindo</SmallText>
                <SeeAllFollow onPress={() => setSeeAll(!seeAll)}>
                  {!seeAll ? 'Ver todos' : 'Ver menos'}
                </SeeAllFollow>
              </ContentContainer>
            ) : (
              <SameSmallText> Nenhum resultado encontrado</SameSmallText>
            )}

            <ListContainer>
              <FlatList
                keyExtractor={item => 'user' + item.userId}
                data={seeAll ? filterUsers : filterUsers.slice(0, 5)}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ListUsersCard
                    limitNick={22}
                    btnText={item.status}
                    profileImage={item.profileImage}
                    userId={item.userId}
                    userName={item.userName}
                    userNickname={item.userNickname}
                  />
                )}
              />

              {inputValue.length === 0 && (
                <>
                  <SeeMoreContainer style={{ marginTop: -17 }}>
                    <SmallText>Sugestões para seguir</SmallText>
                    <SmallText onPress={() => navigation.push('Sugestions')}>
                      Ver todos
                    </SmallText>
                  </SeeMoreContainer>
                  <View>
                    <FlatList
                      keyExtractor={item => 'user' + item.userId}
                      data={filterNoUsers}
                      style={{ marginTop: 5 }}
                      scrollEnabled={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <ListUsersCard
                          btnText={item.status}
                          limitNick={22}
                          profileImage={item.profileImage}
                          userId={item.userId}
                          userName={item.userName}
                          userNickname={item.userNickname}
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </ListContainer>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <ContentContainerComum>
              {filterSameUsers.length > 0 ? (
                <>
                  <SameSmallText>Seguidores em comum</SameSmallText>
                  <SeeAllFollow onPress={() => setSeeAll(!seeAll)}>
                    {!seeAll ? 'Ver todos' : 'Ver menos'}
                  </SeeAllFollow>
                </>
              ) : (
                <SameSmallText>Nenhum seguidor em comum</SameSmallText>
              )}
            </ContentContainerComum>

            {filterSameUsers.length > 0 && seeAll
              ? filterSameUsers.map(user => (
                  <ListUsersCard
                    following
                    limitNick={22}
                    key={user.userId}
                    userId={user.userId}
                    inverted={true}
                    btnText={user.status}
                    userNickname={user.userNickname}
                    profileImage={user.profileImage}
                    userName={user.userName}
                    user_verified={user.user_verified}
                    private_account={user.private_account}
                  />
                ))
              : filterSameUsers
                  .slice(0, 5)
                  .map(user => (
                    <ListUsersCard
                      following
                      limitNick={22}
                      key={user.userId}
                      userId={user.userId}
                      inverted={true}
                      btnText={user.status}
                      userNickname={user.userNickname}
                      profileImage={user.profileImage}
                      userName={user.userName}
                      user_verified={user.user_verified}
                      private_account={user.private_account}
                    />
                  ))}

            {inputValue.length === 0 && (
              <>
                <SeeMoreContainer>
                  <SmallText>Sugestões para seguir</SmallText>
                  <SmallText onPress={() => navigation.push('Sugestions')}>
                    Ver todos
                  </SmallText>
                </SeeMoreContainer>
                <View>
                  <FlatList
                    keyExtractor={item => 'user' + item.userId}
                    data={filterNoUsers}
                    style={{ marginTop: 5 }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <ListUsersCard
                        limitNick={22}
                        profileImage={item.profileImage}
                        userId={item.userId}
                        userName={item.userName}
                        userNickname={item.userNickname}
                      />
                    )}
                  />
                </View>
              </>
            )}
          </ScrollView>
        )}
      </FollowersContent>
    </SafeAreaViewContainer>
  );
}
