import React, { useCallback, useEffect, useState } from 'react';

import { TouchableOpacity, Image, View, Linking } from 'react-native';

import {
  Container,
  ProfileImageContainer,
  SeparatedBorder,
  ProfileName,
  BioText,
  ContainerProfileInfo,
  ContentInfo,
  CounterInfo,
  TextInfo,
  EditProfileContainer,
  CreateRoomContainer,
  ViewRoomContainer,
  EditText,
  ContainerSiteLinkProfile,
  SiteLinkProfile,
  ActionsOtherProfileContainer,
  ButtonContent,
  TextButton,
  ProfileStoryActive,
  TextFollowingInfo,
} from './style';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { typeTheme } from '../../Config/enumTheme';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import {
  delReqFollowingProfile,
  postFollowingProfile,
  deltFollowingProfile,
  postReqFollowingProfile,
  getPostProfile,
  getProfileOuther,
  getVerfication,
  listMyRequestFollowers,
  getOtherProfile,
} from '../../Service/Profile';

import useStories from '../../GlobalState/stories.zustand';
import { getUserStories } from '../../Service/Story';
import { DropUsersList } from '../../Types/drop.type';

import {
  getFollowers,
  getFollowing,
  getRequestFollowStatus,
  getSameFollowers,
} from '../../Service/Followers';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { ProfileUser } from '../../Types/User';
import { getStoreItem, setStoreItem } from '../../Lib/asyncStorage';
import { useSocket } from '../../context/socket';
import useScreenName from '../../GlobalState/screenFollowers.zustand';
import { useNotification } from '../../context/notification';

import { Verified } from '../Verified';
import { UserImage } from '../UserImageStories/style';
import { ListFollowers } from '../../Pages/MyFollowers/Components/Followers';
import { theme } from '../../Theme/theme';
import { UserAccept } from '../../Pages/Notifications';
interface props {
  ProfileName: string;
  profileImage: string;
  private_account?: number;
  user_verified?: number;
  linkSite?: string;
  otherProfile?: boolean;
  followersInCommon?: string[];
  oppenBottonModal?: () => any;
  userProfile: ProfileUser;
  userId: number;
  userNickname: string;
  numSeguidores?: number;
}

export default function ProfileInfo({ userProfile, ...props }: props) {
  const { user, populateFollowingProfilesNickname } = useUserProfile();

  const { setScreenName, setUser } = useScreenName();

  const navigation = useNavigation<StackRoutes>();
  const { viewStories, setHasStory, hasStory } = useStories();

  const [isFollowing, setIsFollowing] = useState<'Seguindo' | 'Seguir'>(
    userProfile.userFollowing == 1 ? 'Seguindo' : 'Seguir',
  );
  const [statusReq, setStatusReq] = useState<
    'Seguir' | 'Seguindo' | 'Aguardando'
  >(userProfile.userFollowing == 1 ? 'Seguindo' : 'Seguir');

  const [ListRequestFollow, setListRequestFollow] = useState<number[]>([]);

  const [contactInfo, setContactInfo] = useState(true);
  const [isLoadingStories, setIsLoadingStories] = useState(false);
  const [_userStories, _setUserStories] = useState<DropUsersList[]>([]);
  const [countPosts, setCountPosts] = useState<number>(0);
  const [countFollowers, setCountFollowers] = useState<number>(0);
  const [countFollowings, setCountFollowings] = useState<number>(0);
  const [verified, setVerified] = useState<number>(0);
  const [followers, setFollowers] = useState<ListFollowers[]>([]);
  const [sameUsers, setFilterSameUsers] = useState<any[]>([]);

  const { sendNotificationFollower } = useNotification();

  const { handleParticipantId } = useSocket();

  async function infoProfile() {
    let numPost,
      numFollowers,
      numFollowings = 0;

    if (userProfile.userId == user.userId) {
      numPost = user.numPublicacoes;
      numFollowers = user.numSeguindo;
      numFollowings = user.numSeguidores;
    } else {
      const { data } = await getOtherProfile(userProfile.userNickname);

      numPost = data.numPublicacoes;
      numFollowers = data.numSeguindo;
      numFollowings = data.numSeguidores;
    }

    setCountPosts(numPost);
    setCountFollowers(numFollowers);
    setCountFollowings(numFollowings);
  }

  const getUserVerify = async () => {
    await getVerfication(props.userId)
      .then(response => {
        const verified = response.data.result[0].user_verified;
        setVerified(verified);
      })
      .catch(e => {
        console.warn('GetVerification - DropFeed');
        console.log(e);
      });
  };

  const fetchSameFollowings = async () => {
    try {
      const response = await getSameFollowers(userProfile.userId, user.userId);

      setFilterSameUsers(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getPostProfile(userProfile.userId)
    //    .then((response) => {
    //       setCountPosts(response?.data.post.length)
    //    })
    getFollowing(userProfile.userId).then(response => {
      const followings = response.data;
      setFollowers(followings.result);
    });
    // getFollowers(userProfile.userId)
    //    .then((response) => {
    //       const followers = response.data
    //       setCountFollowers(followers.result.length)
    //    })
    infoProfile();
    fetchSameFollowings();
    getUserVerify();
  }, [user]);

  // const viewStories = (userId: number) => {
  //   // let stories: any = [];

  //   try {
  //     setIsLoadingStories(true);
  //     //   if (_userStories.length > 0) {
  //     //     stories = _userStories;
  //     //   } else {
  //     //     stories = getUserStories(userId)
  //     //       .then(res => res.data)
  //     //       .catch(e => {
  //     //         console.warn('GetUserStories - ProfileInfo');
  //     //         console.log(e);
  //     //       });
  //     //   }

  //     // setCurrentStory(stories);
  //     toggleModalStories();
  //   } catch (error) {
  //     console.warn('ViewStories - ProfileInfo');
  //     console.log(error);
  //   } finally {
  //     setIsLoadingStories(false);
  //   }
  // };

  const handleFollowButton = async () => {
    if (isFollowing == 'Seguir') {
      setIsFollowing('Seguindo');
      sendNotificationFollower(props.userId);
      await postFollowingProfile(props.userId);
    } else {
      setIsFollowing('Seguir');
      await deltFollowingProfile(props.userId);
    }
    populateFollowingProfilesNickname();
  };

  const { sendNotificationaskedToFollow } = useNotification();

  const handleFollowButtonRequest = async () => {
    let list = ListRequestFollow;
    // console.log('userProfile.userFollowing', userProfile.userFollowing);
    if (statusReq === 'Seguir') {
      await sendNotificationaskedToFollow(props.userId, user.userId);

      // console.log('O USER', user.userId, 'PEDIU PRA SEGUIR O', props.userId);
      await postReqFollowingProfile(props.userId);
      list.push(props.userId);
      // await setStoreItem("@intellectus:RequestFollowUser", JSON.stringify(list))
      setStatusReq('Aguardando');
    } else {
      await delReqFollowingProfile(props.userId);
      // list = list.filter((item) => item !== props.userId)
      // await setStoreItem("@intellectus:RequestFollowUser", JSON.stringify(list))
      setStatusReq('Seguir');
    }
    setListRequestFollow(list);
    populateFollowingProfilesNickname();
  };

  useEffect(() => {
    getUserStories(props.userId)
      .then(res => {
        _setUserStories(res.data);
      })
      .catch(e => {
        console.warn('GetUserStories - ProfileInfo');
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getStoreItem('@intellectus:RequestFollowUser')
      .then(storage => {
        if (storage) {
          const listParsed: number[] = JSON.parse(storage);
          setListRequestFollow(listParsed);
          const res = listParsed.findIndex(item => item == props.userId);
          if (res > -1) {
            setStatusReq('Aguardando');
          }
        }
      })
      .catch(e => {
        console.warn('GetStoreItem - ProfileInfo');
        console.log(e);
      });
  }, [setListRequestFollow]);

  function limitBio(biograph: string, maxLength: number) {
    if (biograph.length > maxLength) {
      return biograph.slice(0, maxLength) + '...';
    }
    return biograph;
  }

  async function RequestFollow() {
    listMyRequestFollowers()
      .then(({ data }) => {
        const userInRequest = data.find(
          (item: UserAccept) => item.userId == userProfile.userId,
        );

        if (userInRequest) {
          setStatusReq('Aguardando');
        }
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

  const myFollowers = (type: string) => {
    if (userProfile.private_account == 0 || userProfile.private_account == 1) {
      if (props.userId === user.userId) {
        setScreenName(type);
        navigation.push('TabNavigation', {
          screen: 'MyFollowersScreen',
          params: { from: 'FOLLOWERS_FOLLOWING', props: type },
        });
      } else {
        setUser(props);
        setScreenName(type);
        navigation.push('TabNavigation', {
          screen: 'OtherProfileFollowers',
          params: { from: 'FOLLOWERS_FOLLOWING', props, type },
        });
      }
    }
  };

  function formatFollowers(numFollowers: number) {
    if (numFollowers >= 1000 && numFollowers <= 1000000) {
      const formattedNumber = (numFollowers / 1000).toFixed(1) + 'k';
      return formattedNumber;
    } else if (numFollowers >= 1000000) {
      const formattedNumber = (numFollowers / 1000000).toFixed(1) + 'M';
      return formattedNumber;
    } else {
      return numFollowers;
    }
  }

  function limitTextLength(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <Container>
      <ProfileImageContainer>
        <ProfileStoryActive
          active={hasStory}
          disabled={isLoadingStories}
          onPress={() => {
            viewStories(userProfile.userId);
            setHasStory(false);
          }}>
          <UserImage
            source={{ uri: props.profileImage, cache: 'reload' }}
            style={{ width: 130, height: 130, borderRadius: 100 }}
          />
        </ProfileStoryActive>
      </ProfileImageContainer>
      <View
        style={{
          marginTop: -14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}>
        <ProfileName>{limitTextLength(props.ProfileName, 24)}</ProfileName>
        {verified === 1 && <Verified width={13} height={13} />}
      </View>
      {userProfile?.userBio && (
        <BioText>{limitBio(userProfile.userBio, 300)}</BioText>
      )}

      {props.linkSite && (
        <ContainerSiteLinkProfile>
          <TouchableOpacity
            onPress={() => Linking.openURL(props.linkSite || '')}>
            <SiteLinkProfile>
              www.
              {limitTextLength(
                props.linkSite.replace('https://', '').replace('www.', ''),
                15,
              )}
            </SiteLinkProfile>
          </TouchableOpacity>
        </ContainerSiteLinkProfile>
      )}

      <ContainerProfileInfo>
        <ContentInfo>
          <CounterInfo>{countPosts}</CounterInfo>
          <TextInfo>Publicações</TextInfo>
        </ContentInfo>
        <SeparatedBorder />
        <TouchableOpacity onPress={() => myFollowers('Seguidores')}>
          <CounterInfo>{formatFollowers(countFollowers)}</CounterInfo>
          <TextInfo>{countFollowers == 1 ? 'Seguidor' : 'Seguidores'}</TextInfo>
        </TouchableOpacity>
        <SeparatedBorder />
        <TouchableOpacity onPress={() => myFollowers('Seguindo')}>
          <CounterInfo>{formatFollowers(countFollowings)}</CounterInfo>
          <TextInfo>Seguindo</TextInfo>
        </TouchableOpacity>
      </ContainerProfileInfo>

      {props.otherProfile && sameUsers?.length > 0 && (
        <View
          style={{
            marginTop: 14,
            marginBottom: 0,
            flexDirection: 'row',
            gap: 3,
            alignItems: 'center',
          }}>
          {sameUsers.length > 1 ? (
            <TouchableOpacity onPress={() => myFollowers('Em comum')}>
              <TextFollowingInfo>
                Seguido por {sameUsers[0].userNickname} e outros{' '}
                {sameUsers.length - 1} em comum
              </TextFollowingInfo>
            </TouchableOpacity>
          ) : sameUsers.length === 1 ? (
            <TouchableOpacity onPress={() => myFollowers('Em comum')}>
              <TextFollowingInfo>
                Seguido por {sameUsers[0].userNickname}
              </TextFollowingInfo>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      )}

      {props.otherProfile && (
        <ActionsOtherProfileContainer>
          {props.private_account === 1 ? (
            <ButtonContent
              optionButton={
                statusReq == 'Seguir'
                  ? typeTheme.default
                  : statusReq == 'Seguindo'
                  ? typeTheme.light
                  : statusReq == 'Aguardando'
                  ? typeTheme.light
                  : typeTheme.default
              }
              contact={!contactInfo}
              onPress={handleFollowButtonRequest}>
              <TextButton
                optionButton={
                  statusReq === 'Seguir'
                    ? typeTheme.default
                    : statusReq === 'Aguardando'
                    ? typeTheme.light
                    : statusReq === 'Seguindo'
                    ? typeTheme.light
                    : typeTheme.default
                }>
                {statusReq == 'Aguardando' ? 'Solicitado' : statusReq}
              </TextButton>
              {isFollowing == 'Seguindo' && (
                <Ionicons
                  name="checkmark"
                  size={19}
                  color={theme.inputTextColor}
                />
              )}
              {isFollowing == 'Seguir' && (
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require('../../Assets/Icons/inviteFriends.png')}
                />
              )}
              {statusReq == 'Aguardando' && (
                <Image
                  style={{ width: 16, height: 16, tintColor: theme.textLight }}
                  source={require('../../Assets/Icons/less.png')}
                />
              )}
            </ButtonContent>
          ) : (
            <ButtonContent
              optionButton={
                isFollowing === 'Seguir'
                  ? typeTheme.default
                  : isFollowing === 'Seguindo'
                  ? typeTheme.light
                  : typeTheme.default
              }
              contact={!contactInfo}
              onPress={handleFollowButton}>
              <TextButton
                optionButton={
                  isFollowing === 'Seguir'
                    ? typeTheme.default
                    : isFollowing === 'Seguindo'
                    ? typeTheme.light
                    : typeTheme.default
                }>
                {isFollowing}
              </TextButton>
              {isFollowing == 'Seguindo' && (
                <Ionicons
                  name="checkmark"
                  size={19}
                  color={theme.inputTextColor}
                />
              )}
              {isFollowing == 'Seguir' && (
                <Image
                  style={{ width: 16, height: 16 }}
                  source={require('../../Assets/Icons/inviteFriends.png')}
                />
              )}
            </ButtonContent>
          )}

          <ButtonContent
            optionButton={typeTheme.light}
            contact={!contactInfo}
            onPress={() => {
              handleParticipantId(props.userId);
              navigation.push('Chat');
            }}>
            <TextButton optionButton={typeTheme.light}>Mensagem</TextButton>
            <Image
              style={{ width: 16, height: 16, resizeMode: 'contain' }}
              source={require('../../Assets/Icons/sender.png')}
            />
          </ButtonContent>
          {contactInfo && (
            <ButtonContent
              optionButton={typeTheme.light}
              onPress={() =>
                props.oppenBottonModal ? props.oppenBottonModal() : () => {}
              }>
              <TextButton optionButton={typeTheme.light}>Contatos</TextButton>
              <Image
                style={{ width: 16, height: 16, resizeMode: 'contain' }}
                source={require('../../Assets/Icons/contacts.png')}
              />
            </ButtonContent>
          )}
        </ActionsOtherProfileContainer>
      )}

      {!props.otherProfile && (
        <View style={{ flexDirection: 'row' }}>
          <EditProfileContainer onPress={() => navigation.push('EditProfile')}>
            <Feather name="edit" size={15} color={'#5E5E5E'} />
            <EditText>Editar</EditText>
          </EditProfileContainer>
          {/* <AlterateProfile onPress={showBottomModal}>
                  <Image style={{ resizeMode: 'contain', width: 18, height: 18 }} source={require('../../Assets/Icons/addPerson.png')} />
               </AlterateProfile> */}
        </View>
      )}

      {/*  {!props.otherProfile && (
            <View style={{ flexDirection: 'row' }}>
               <CreateRoomContainer onPress={() => navigation.navigate('CreateRoom')}>
                  <Feather
                     name='plus'
                     size={15}
                     color={'#5E5E5E'}
                  />
                  <EditText>Criar Sala</EditText>
               </CreateRoomContainer>
               <ViewRoomContainer onPress={() => navigation.navigate('Rooms')}>
                  <Feather
                     name='users'
                     size={15}
                     color={'#5E5E5E'}
                  />
                  <EditText>Ver Salas</EditText>
               </ViewRoomContainer>

            </View>

         )} */}

      {/* <AlterateProfile onPress={showBottomModal}>
               <Image style={{ resizeMode: 'contain', width: 18, height: 18 }} source={require('../../Assets/Icons/addPerson.png')} />
            </AlterateProfile> */}

      {/*
         <BottomModalOtherAccount
            title="Acessar outra conta"
            visibleBottonModal={isBottomModalVisible}
            setvisibleBottonModal={setIsBottomModalVisible}
            marginLeftRight="10px"
            children={undefined} image={props.profileImage} name={props.userNickname}
         />*/}
    </Container>
  );
}
