import React, { useState } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabNavigationProps } from './TabNavigationPropsType';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { ProfilePhoto } from '../Components/elementsComponents';

const Tab = createBottomTabNavigator<TabNavigationProps>();

import Feed from '../Pages/Feed';
import Rooms from '../Pages/Rooms';
import Search from '../Pages/Search';
import MyProfile from '../Pages/MyProfile';
import Publication from '../Pages/Publication';
import AddPublicationModal from '../Components/AddPublicationModal';

import useUserProfile from '../GlobalState/userProfile.zustand';
import useFeedPostion from '../GlobalState/useFeedPosition.zustand';
import { theme } from '../Theme/theme';
import useNavigationParams from '../GlobalState/navigationParams.zustand';
import OtherProfile from '../Pages/OtherProfile';
import MyFollowers from '../Pages/MyFollowers';
import OtherProfileFollowers from '../Pages/OtherProfileFollowers';

export default function TabNavigation() {
  const { user } = useUserProfile();
  const { setGoToTop } = useFeedPostion();
  const { setNavigationParams } = useNavigationParams();
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <AddPublicationModal
        setvisibleBottonModal={setVisibleModal}
        visibleBottonModal={visibleModal}
      />
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 0,
            paddingBottom: Platform.OS === 'ios' ? 50 : 0,
            height: Platform.OS === 'ios' ? 55 : 80,
            justifyContent: 'center',
          },
        })}
        initialRouteName="FeedScreen">
        <Tab.Screen
          name="FeedScreen"
          component={Feed}
          listeners={{ tabPress: () => setGoToTop(true) }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  tintColor: focused ? theme.darkBlue : theme.lightGray,
                  padding: 15,
                  width: 34,
                  height: 34,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/Icons/feedIcon.png')}
              />
            ),

            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="ExploreMoreWatched"
          component={Rooms}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={{
                  tintColor: focused ? theme.darkBlue : theme.lightGray,
                  padding: 15,
                  marginRight: 15,
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  // opacity: 0.3,
                }}
                source={require('../Assets/Icons/usersGroup.png')}
              />
            ),
            tabBarHideOnKeyboard: true,
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                // disabled={true}
                style={[props.style, { opacity: 1 }]}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddPublication"
          component={Publication}
          options={{
            tabBarIcon: () => (
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal(!visibleModal);
                }}
                style={{
                  backgroundColor: '#0245F4',
                  borderRadius: 50,
                  width: 61,
                  height: 61,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000000',
                  shadowOpacity: 0.1,
                  shadowOffset: {
                    width: 5,
                    height: 5,
                  },
                }}>
                <Entypo name="plus" size={42} color="#fff" />
              </TouchableOpacity>
            ),
            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                size={40}
                style={
                  Platform.OS === 'ios'
                    ? { marginLeft: 10, paddingBottom: 40 }
                    : { paddingBottom: 2 }
                }
                color={focused ? theme.darkBlue : theme.lightGray}
              />
            ),

            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="MyProfileScreen"
          component={MyProfile}
          listeners={{
            tabPress: () => {
              setNavigationParams({ from: 'TabNavigation' });
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <ProfilePhoto
                style={{
                  marginRight: 10,
                  borderWidth: 3,
                  borderColor: focused ? theme.darkBlue : 'white',
                }}
                source={{ uri: user.profileImage, cache: 'force-cache' }}
              />
            ),
            tabBarHideOnKeyboard: true,
          }}
        />

        {/* <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        {/* <Tab.Screen
          name="MoreDetails"
          component={MoreDetails}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        {/* <Tab.Screen
          name="MoreDetailsMusic"
          component={MoreDetailsMusic}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        {/* <Tab.Screen
          name="MoreDetailsBooks"
          component={MoreDetailsBooks}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        {/* <Tab.Screen
          name="Album"
          component={Album}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        <Tab.Screen
          name="OtherProfileScreen"
          component={OtherProfile}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="MyFollowersScreen"
          component={MyFollowers}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        />

        <Tab.Screen
          name="OtherProfileFollowers"
          component={OtherProfileFollowers}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        />

        {/* <Tab.Screen
          name="Rooms"
          component={Rooms}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}

        {/* <Tab.Screen
          name="InviteRoomFriend"
          component={InviteRoomFriend}
          options={{
            tabBarItemStyle: { display: 'none' },
            tabBarHideOnKeyboard: true,
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
}
