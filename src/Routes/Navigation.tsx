import { createStackNavigator } from '@react-navigation/stack';
import { RootStackRoutes } from './StackTypes';

import TabNavigation from './TabNavigation';

import SplashScreen from '../Pages/SplashScreen';
import Welcome from '../Pages/Welcome';
import Login from '../Pages/Login';
import CreateAccount from '../Pages/CreateAccount';
import EmailValidateCode from '../Pages/EmailValidateCode';
import CompletAccount from '../Pages/CompleteAccount';
import PhoneValidateCode from '../Pages/PhoneValidateCode';
import EmailSuccessfullySent from '../Pages/EmailSuccessfullySent';
import ResetPassword from '../Pages/ResetPassword';
import ForgotPasswordSendEmail from '../Pages/ForgotPasswordSendEmail';
import Mural from '../Pages/Mural';
import InviteFriend from '../Pages/InviteFriend';
import ProfileMenu from '../Pages/ProfileMenu';
import ArchivedItems from '../Pages/ArchivedItems';
import ArchivedPoster from '../Pages/ArchivedPoster';
import ArchivedPublications from '../Pages/ArchivedPublications';
import SavedItensGroups from '../Pages/SavedItensGroups';
import SavedItens from '../Pages/SavedItens';
import CreateAndEditFolderSavedItens from '../Pages/CreateAndEditFolderSavedItens';
import CloseFriends from '../Pages/CloseFriends';
import CloseFriendsLocked from '../Pages/CloseFriends/CloseFriendsLocked';
import Configurations from '../Pages/Configurations';

import PreferencesCategories from '../Pages/PreferencesCategories';
import Comentary from '../Pages/Comentary';
import Privacy from '../Pages/Privacy';
import BlockedAccounts from '../Pages/BlockedAccounts';
import CommentsBlocked from '../Pages/CommentsBlocked';
import Marcations from '../Pages/Marcations';
import MarcationsPending from '../Pages/MarcationsPending';
import MutedAccounts from '../Pages/MutedAccounts';
import PosterConfiguration from '../Pages/PosterConfiguration';

import Security from '../Pages/Security';
import StoryDestackComponent from '../Components/StoryDestackComponent';
import PasswordSecurity from '../Pages/PasswordSecurity';
import FactorAutenticator from '../Pages/2FactorAutenticator';
import ActivityLogin from '../Pages/ActivityLogin';
import Account from '../Pages/Account';
import PersonalInformation from '../Pages/PersonalInformation';
import Gender from '../Pages/Gender';
import Language from '../Pages/Language';
import RequestVerification from '../Pages/RequestVerification';
import DeleteAccount from '../Pages/DeleteAccount';
import About from '../Pages/About';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermsOfUse from '../Pages/TermsOfUse';
import Help from '../Pages/Help';
import ContactUs from '../Pages/ContactUs';
import CommonQuestions from '../Pages/CommonQuestions';
import CameraApp from '../Pages/Camera';

import Messages from '../Pages/Messages';
import MessageSolicitation from '../Pages/MessageSolicitation';
import Chat from '../Pages/Chat';
import ConfigNotifications from '../Pages/ConfigNotifications';

import AlbumCreateAndEdit from '../Pages/AlbumCreateAndEdit';
import AlbumCreateSaveditems from '../Pages/AlbumCreateSaveditems';
import SelectItemsSaved from '../Pages/SelectItemsSaved';
import NewDestack from '../Pages/NewDestack';
import Galery from '../Pages/Galery';
import EditProfile from '../Pages/EditProfile';

import PostPreview from '../Pages/PostPreview';
import Repost from '../Pages/Repost';
import CreateStory from '../Pages/CreateStory';
import Drop from '../Pages/Drop';
import Publication from '../Pages/Publication';
import PubliGalery from '../Pages/PubliGalery';
import CreateRoom from '../Pages/CreateRoom';
import AddParticipant from '../Pages/AddParticipant';
import AddAdmin from '../Pages/AddAdmin';
import RoomParticipants from '../Pages/RoomParticipants';
import RoomSolicitation from '../Pages/RoomSolicitation';
import MidiaScreen from '../Pages/MidiaScreen';
import ViewRoom from '../Pages/ViewRoom';
import ConfigRoom from '../Pages/ConfigRoom';
import ConfigNewRoom from '../Pages/ConfigNewRoom';
import EditRoomImage from '../Pages/EditRoomImage';
import EditRoomImageConfig from '../Pages/EditRoomImageConfig';
import RoomChat from '../Pages/RoomChat';
import SimpleGalery from '../Pages/SimpleGalery';
import BlockedPoster from '../Pages/BlockedPoster';
import TermsOfCookies from '../Pages/TermsOfCookies';
import RoomInfo from '../Pages/RoomInfo';
import Sugestions from '../Pages/Sugestions';
import Solicitations from '../Pages/Solicitations';
import EditPost from '../Pages/EditPost';
import StoryModal from '../Components/Story';
import useStories from '../GlobalState/stories.zustand';
import PostScreen from '../Pages/PostScreen';
import ArchivedDrops from '../Pages/ArchivedDrops';
import { VoiceCall } from '../Pages/VoiceCall';
import { ReceiveCall } from '../Pages/ReceiveCall';
import RoomLive from '../Pages/RoomLive';
import VizualizatedArquiveStory from '../Pages/VizualizatedArquiveStory';
import EditAlbum from '../Pages/Album/EditAlbum';
import AlbumSelect from '../Pages/Album/AlbumSelect';
import EmailRevalidateCode from '../Pages/EmailRevalidateCode';
import SelectedItemFromAlbum from '../Pages/SelectedItemFromAlbum';
import AlbumOther from '../Pages/AlbumOther';
import ViewRoomInfo from '../Pages/ViewRoomInfo';
import RepostScreen from '../Pages/RepostScreen';
import RepostPreview from '../Pages/RepostPreview';
import CameraAppPublication from '../Pages/CameraPub';
import RequestFollower from '../Pages/RequestFollowers';
import EditHighlight from '../Pages/EditHighlight';
import ListArquivedSelect from '../Pages/ListArquivedSelected';
import ListOfPubli from '../Pages/ListOfPubli';
import ListOfStory from '../Pages/ListOfStory';
import PostScreenSearch from '../Pages/PostScreenSearch';
import MoreDetails from '../Pages/MoreDetails';
import DropsSearch from '../Pages/DropsSearch';
import MoreDetailsMusic from '../Pages/MoreDetailsMusic';
import MoreDetailsBooks from '../Pages/MoreDetailsBooks';
import Notifications from '../Pages/Notifications';
import Album from '../Pages/Album';
import MyFollowers from '../Pages/MyFollowers';
import OtherProfileFollowers from '../Pages/OtherProfileFollowers';
import InviteRoomFriend from '../Pages/InviteRoomFriend';
import MarcationsRequest from '../Pages/MarcationsRequest';

import RoomCommunity from '../Pages/RoomCommunity';
import React from 'react';

import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import NavigateToProfile from '../Components/NavigatetoProfile';
import OtherProfile from '../Pages/OtherProfile';
import Feed from '../Pages/Feed';
import MyProfile from '../Pages/MyProfile';

const NavigationDebug: React.FC = () => {
  const state = useNavigationState(state => state);

  // Get the current route name
  const getCurrentRouteName = () => {
    const route = state?.routes[state.index];
    return route?.name || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.debugBox}>
        <Text style={styles.debugText}>
          Current Route: {getCurrentRouteName()}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  debugBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    margin: 8,
    borderRadius: 4,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
  },
});

const Stack = createStackNavigator<RootStackRoutes>();

export default function Navigation() {
  const { isModalVisible } = useStories();
  // const toggleModalStories = () => setModalVisible(!isModalVisible);
  // console.log('isModalVisible', isModalVisible, currentStory.length);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          detachPreviousScreen: true,
          freezeOnBlur: true,
        }}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="EmailValidateCode" component={EmailValidateCode} />
        <Stack.Screen
          name="EmailRevalidateCode"
          component={EmailRevalidateCode}
        />
        <Stack.Screen name="PhoneValidateCode" component={PhoneValidateCode} />
        <Stack.Screen name="CompletAccount" component={CompletAccount} />
        <Stack.Screen
          name="EmailSuccessfullySent"
          component={EmailSuccessfullySent}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="ForgotPasswordSendEmail"
          component={ForgotPasswordSendEmail}
        />
        <Stack.Screen name="Mural" component={Mural} />
        <Stack.Screen name="InviteFriend" component={InviteFriend} />
        <Stack.Screen name="RequestFollower" component={RequestFollower} />
        <Stack.Screen
          name="ListArquivedSelect"
          component={ListArquivedSelect}
        />

        <Stack.Screen name="ProfileMenu" component={ProfileMenu} />
        <Stack.Screen
          name="StoryDestackComponent"
          component={StoryDestackComponent}
        />
        <Stack.Screen name="ArchivedItems" component={ArchivedItems} />
        <Stack.Screen name="ArchivedPoster" component={ArchivedPoster} />
        <Stack.Screen
          name="ArchivedPublications"
          component={ArchivedPublications}
        />
        <Stack.Screen name="ArchivedDrops" component={ArchivedDrops} />
        <Stack.Screen name="SavedItensGroups" component={SavedItensGroups} />
        <Stack.Screen name="SavedItens" component={SavedItens} />
        <Stack.Screen
          name="CreateAndEditFolderSavedItens"
          component={CreateAndEditFolderSavedItens}
        />
        <Stack.Screen name="CloseFriends" component={CloseFriends} />
        <Stack.Screen
          name="CloseFriendsLocked"
          component={CloseFriendsLocked}
        />
        <Stack.Screen name="Configurations" component={Configurations} />
        <Stack.Screen
          name="ConfigNotifications"
          component={ConfigNotifications}
        />
        <Stack.Screen
          name="PreferencesCategories"
          component={PreferencesCategories}
        />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Comentary" component={Comentary} />
        <Stack.Screen name="BlockedAccounts" component={BlockedAccounts} />
        <Stack.Screen name="CommentsBlocked" component={CommentsBlocked} />
        <Stack.Screen name="Marcations" component={Marcations} />
        <Stack.Screen name="MarcationsPending" component={MarcationsPending} />
        <Stack.Screen name="MarcationsRequest" component={MarcationsRequest} />
        <Stack.Screen name="MutedAccounts" component={MutedAccounts} />
        <Stack.Screen
          name="PosterConfiguration"
          component={PosterConfiguration}
        />
        <Stack.Screen name="BlockedPoster" component={BlockedPoster} />

        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen
          name="FactorAutenticator"
          component={FactorAutenticator}
        />
        <Stack.Screen name="ActivityLogin" component={ActivityLogin} />
        <Stack.Screen name="PasswordSecurity" component={PasswordSecurity} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
        />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen
          name="RequestVerification"
          component={RequestVerification}
        />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
        <Stack.Screen name="TermsOfCookies" component={TermsOfCookies} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="CommonQuestions" component={CommonQuestions} />

        <Stack.Screen name="MoreDetails" component={MoreDetails} />
        <Stack.Screen name="MoreDetailsMusic" component={MoreDetailsMusic} />
        <Stack.Screen name="MoreDetailsBooks" component={MoreDetailsBooks} />

        <Stack.Screen name="FeedScreen" component={Feed} />
        <Stack.Screen name="Messages" component={Messages} />
        {/* <Stack.Screen name="MyProfileScreen" component={MyProfile} /> */}

        <Stack.Screen name="NotificationsScreen" component={Notifications} />
        <Stack.Screen
          name="MessageSolicitation"
          component={MessageSolicitation}
        />
        <Stack.Screen name="Chat" component={Chat} />

        <Stack.Screen name="NewDestack" component={NewDestack} />
        <Stack.Screen name="ListOfPubli" component={ListOfPubli} />
        <Stack.Screen name="ListOfStory" component={ListOfStory} />
        <Stack.Screen name="Galery" component={Galery} />
        <Stack.Screen name="Camera" component={CameraApp} />
        <Stack.Screen name="CameraPub" component={CameraAppPublication} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditAlbum" component={EditAlbum} />
        <Stack.Screen name="AlbumSelect" component={AlbumSelect} />

        <Stack.Screen
          name="AlbumCreateAndEdit"
          component={AlbumCreateAndEdit}
        />
        <Stack.Screen
          name="AlbumCreateSaveditems"
          component={AlbumCreateSaveditems}
        />
        <Stack.Screen name="SelectItemsSaved" component={SelectItemsSaved} />
        <Stack.Screen
          name="SelectedItemFromAlbum"
          component={SelectedItemFromAlbum}
        />
        <Stack.Screen name="AlbumScreen" component={Album} />
        <Stack.Screen name="AlbumOther" component={AlbumOther} />

        <Stack.Screen name="PostPreview" component={PostPreview} />
        {/* <Stack.Screen
          name="OtherProfileFollowers"
          component={OtherProfileFollowers}
        /> */}
        <Stack.Screen name="Sugestions" component={Sugestions} />
        <Stack.Screen name="Solicitations" component={Solicitations} />

        <Stack.Screen name="Repost" component={Repost} />
        <Stack.Screen name="RepostPreview" component={RepostPreview} />
        <Stack.Screen name="CreateStory" component={CreateStory} />
        <Stack.Screen name="SimpleGalery" component={SimpleGalery} />

        <Stack.Screen name="DropsScreen" component={Drop} />
        <Stack.Screen name="DropsSearch" component={DropsSearch} />

        <Stack.Screen name="EditPost" component={EditPost} />
        <Stack.Screen name="EditHighlight" component={EditHighlight} />

        <Stack.Screen name="Publication" component={Publication} />
        <Stack.Screen name="PubliGalery" component={PubliGalery} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="PostScreenSearch" component={PostScreenSearch} />
        <Stack.Screen name="RepostScreen" component={RepostScreen} />
        {/* <Stack.Screen name="RoomsList" component={Rooms} /> */}
        <Stack.Screen name="RoomChat" component={RoomChat} />

        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="RoomInfo" component={RoomInfo} />
        <Stack.Screen name="RoomParticipants" component={RoomParticipants} />
        <Stack.Screen name="RoomSolicitation" component={RoomSolicitation} />

        <Stack.Screen name="AddAdmin" component={AddAdmin} />
        <Stack.Screen name="AddParticipant" component={AddParticipant} />

        <Stack.Screen name="MidiaScreen" component={MidiaScreen} />
        <Stack.Screen name="ViewRoom" component={ViewRoom} />
        <Stack.Screen name="ViewRoomInfo" component={ViewRoomInfo} />

        <Stack.Screen name="ConfigRoom" component={ConfigRoom} />
        <Stack.Screen name="ConfigNewRoom" component={ConfigNewRoom} />
        <Stack.Screen name="EditRoomImage" component={EditRoomImage} />
        <Stack.Screen
          name="EditRoomImageConfig"
          component={EditRoomImageConfig}
        />

        <Stack.Screen name="RoomCommunity" component={RoomCommunity} />
        <Stack.Screen name="RoomLive" component={RoomLive} />
        <Stack.Screen name="InviteRoomFriend" component={InviteRoomFriend} />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OtherProfileScreen" component={OtherProfile} />
        <Stack.Screen name="VoiceCall" component={VoiceCall} />
        <Stack.Screen name="ReceiveCall" component={ReceiveCall} />
        <Stack.Screen
          name="VizualizatedArquiveStory"
          component={VizualizatedArquiveStory}
        />
      </Stack.Navigator>
      {/* <NavigationDebug /> */}
      {isModalVisible && (
        <StoryModal
          isModalVisible={isModalVisible}
          // onClose={toggleModalStories}
          // stories={currentStory}
        />
      )}
    </>
  );
}

// const Rooms = () => TabNavigation('Rooms');
// const MyProfile = () => TabNavigation('MyProfile');
// const Feed = () => TabNavigation('Feed');
// const OtherProfile = () => TabNavigation('OtherProfile');
