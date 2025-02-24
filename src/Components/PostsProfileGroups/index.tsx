import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Container,
  TabsContainer,
  TextTab,
  ImageIcon,
  PostContainer,
} from './style';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { theme } from '../../Theme/theme';

import Drops from './Drops';
import Publications from './Publications';
import Marcations from './Marcations';
import AlbunsList from './Albuns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoomOptionModal from '../RoomOptionsModal';
import RoomsList from '../RoomsList';
import Private from '../Private';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { getOtherProfile } from '../../Service/Profile';
import useCreatePost from '../../GlobalState/createPost.zustand';
import { Platform } from 'react-native';
import CategoriesFilterPublications from '../CategoriesFilterPublications';
import { useNavigation } from '@react-navigation/native';

interface postsProfileGroupsProps {
  private_account?: number;
  userId: number;
  filter: string;
}

export default function PostsProfileGroups(props: postsProfileGroupsProps) {
  const [tabSelected, setTabSelected] = useState<
    'Publicações' | 'Drops' | 'Marcações' | 'Álbuns' | 'Salas'
  >('Publicações');
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<number>();
  const { nickName } = useCreatePost();

  const getOtherProfilePosts = async () => {
    await getOtherProfile(nickName)
      .then(res => {
        setIsVisible(res.data.userFollowing);
      })
      .catch(e => {
        console.warn('GetOtherProfile - PostProfileGroupsMyProfile');
        console.log(e);
      });
  };

  useEffect(() => {
    getOtherProfilePosts();
  }, []);

  return (
    <Container>
      <TabsContainer>
        <View
          style={{
            width: 2,
            borderBottomColor: 'blue',
            borderBottomWidth: 1,
            alignSelf: 'stretch',
          }}
        />
        <TouchableOpacity
          style={
            tabSelected === 'Publicações'
              ? styles.SelectedTabButton
              : styles.TabButton
          }
          onPress={() => setTabSelected('Publicações')}>
          <AntDesign
            name="appstore-o"
            size={14}
            color={tabSelected === 'Publicações' ? theme.primarycolor : 'gray'}
          />
          <TextTab active={tabSelected === 'Publicações'}>Publicações</TextTab>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tabSelected === 'Drops'
              ? styles.SelectedTabButton
              : styles.TabButton
          }
          onPress={() => setTabSelected('Drops')}>
          <MaterialCommunityIcons
            name="movie-filter-outline"
            size={18}
            color={tabSelected === 'Drops' ? theme.primarycolor : 'gray'}
          />
          <TextTab active={tabSelected === 'Drops'}>Drops</TextTab>
        </TouchableOpacity>
        <View
          style={{
            width: 2,
            borderBottomColor: 'blue',
            borderBottomWidth: 1,
            alignSelf: 'stretch',
            flex: 1,
          }}
        />
        <TouchableOpacity
          style={
            tabSelected === 'Salas'
              ? styles.SelectedTabButton
              : styles.TabButton
          }
          onPress={() => setTabSelected('Salas')}>
          <ImageIcon
            style={{ tintColor: theme.inputTextColor }}
            source={
              tabSelected === 'Salas'
                ? require('../../Assets/Icons/usersGroup.png')
                : require('../../Assets/Icons/usersGroup.png')
            }
          />
          <TextTab active={tabSelected === 'Salas'}>Salas</TextTab>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tabSelected === 'Marcações'
              ? styles.SelectedTabButton
              : styles.TabButton
          }
          onPress={() => setTabSelected('Marcações')}>
          <Ionicons
            name="md-pricetag-outline"
            size={16}
            color={tabSelected === 'Marcações' ? theme.primarycolor : 'gray'}
          />
          <TextTab active={tabSelected === 'Marcações'}>Marcações</TextTab>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            tabSelected === 'Álbuns'
              ? styles.SelectedTabButton
              : styles.TabButton
          }
          onPress={() => setTabSelected('Álbuns')}>
          <EvilIcons
            name="image"
            size={22}
            color={tabSelected === 'Álbuns' ? theme.primarycolor : 'gray'}
          />
          <TextTab active={tabSelected === 'Álbuns'}>Álbuns</TextTab>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TabButton} />
      </TabsContainer>
      <PostContainer>
        {props.private_account === 1 && isVisible === 0 ? (
          <Private
            title="Conta privada"
            text="Solicite para seguir e"
            textSecond={'tenha acesso ao conteúdo.'}
          />
        ) : (
          <>
            {tabSelected === 'Publicações' && props.userId && (
              <Publications userId={props.userId} filter={props.filter} />
            )}
            {tabSelected === 'Drops' && props.userId && (
              <Drops userId={props.userId} />
            )}
            {tabSelected === 'Marcações' && (
              <Marcations userId={props.userId} />
            )}
            {tabSelected === 'Álbuns' && <AlbunsList userId={props.userId} />}
            {tabSelected === 'Salas' && (
              <RoomsList
                tarja="admin"
                openModal={() => setOptionsModalOpen(true)}
                paddingTop={0}
                userId={props.userId}
              />
            )}
          </>
        )}
      </PostContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  SelectedTabButton: {
    flex: 1,
    gap: 2,
    paddingVertical: 3,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: theme.primarycolor,
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingLeft: 7,
    paddingRight: 7,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
  },
  TabButton: {
    flex: 1,
    gap: 2,
    paddingVertical: 3,
    borderColor: theme.primarycolor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,

    paddingLeft: Platform.OS === 'ios' ? 15 : 7,
    paddingRight: Platform.OS === 'ios' ? 12 : 7,
  },
});
