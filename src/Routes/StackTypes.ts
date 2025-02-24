import { AssetType } from '@react-native-camera-roll/camera-roll';
import { StackNavigationProp } from '@react-navigation/stack';
import { IRoom } from '../Types/rooms.type';
import { AllTypesPostsFeed } from '../Types/discriminator';
import { UserAccept } from '../Pages/Notifications';
import { StoryAndPost } from '../Service/StoryDestackType';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Drops } from '../Components/DropsAndPostSearch/interfaces/drops';

export type RootStackRoutes = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
  EmailValidateCode: undefined;
  EmailRevalidateCode: undefined;
  PhoneValidateCode: undefined;
  CompletAccount: undefined;
  MyFollowersScreen: undefined | { props: string };
  EmailSuccessfullySent: undefined;
  ResetPassword: undefined;
  ForgotPasswordSendEmail: undefined;
  ArchivedPosterForDestacks: undefined;
  Mural: undefined;
  InviteFriend: undefined;
  ProfileMenu: undefined;
  ArchivedItems: undefined;
  ArchivedPoster: {
    markCard?: boolean;
    showLikes?: boolean;
    destackId: number;
    isFromDestack: boolean;
  };
  SelectItemsSaved: {
    nameFolder: string;
    folderId: number;
    folderPublic: number;
    folderPhoto: string;
  };
  SelectedItemFromAlbum: undefined;
  ArchivedDrops: undefined;
  ArchivedPublications: undefined;
  VoiceCall: { userId: number; channelToken?: string; channel?: string };
  ReceiveCall: {
    userId: number;
    channelToken?: string;
    channel?: string;
    uuid?: string;
  };
  SavedItensGroups: undefined;
  SavedItens: { name: string };
  ListArquivedSelect: { isPost: boolean };

  NotificationsScreen: undefined;
  Messages: undefined;
  MessageSolicitation: undefined;
  Chat: undefined | { userId: number };
  CreateAndEditFolderSavedItens: { name: string; forldersName: string };
  CloseFriends: undefined;
  CloseFriendsLocked: undefined;
  FindFriendsScreen: undefined;
  Configurations: undefined;
  ConfigNotifications: undefined;
  PreferencesCategories: undefined;
  Comentary: undefined;
  Privacy: undefined;
  BlockedAccounts: undefined;
  CommentsBlocked: undefined;
  Marcations: undefined;
  MarcationsPending: undefined;
  MarcationsRequest: undefined;
  MutedAccounts: undefined;
  PosterConfiguration: undefined;
  BlockedPoster: undefined;
  Security: undefined;
  FactorAutenticator: undefined;
  ActivityLogin: undefined;
  PasswordSecurity: undefined;
  Account: undefined;
  PersonalInformation: undefined | { selectedGender: string };
  Gender: undefined;
  Language: undefined;
  RequestVerification: undefined;
  DeleteAccount: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  TermsOfCookies: undefined;
  Help: undefined;
  ContactUs: undefined;
  CommonQuestions: undefined;
  FeedScreen: undefined;
  TabNavigation: {
    screen: string;
    params?: any;
  };
  Search: undefined;
  StoryDestackComponent: { idProfile: number; profileImage: string };
  AddPublication: undefined;
  AlbumCreateAndEdit: {
    buttonRightName: string;
    titleHeader: string;
    newAlbum: boolean;
    isEditAlbum: boolean;
  };
  AlbumCreateSaveditems: undefined;
  AlbumScreen: { titleAlbum: string; imagealbum: string };
  Album: {
    titleAlbum: string;
    imagealbum: string;
    albumId: number;
    userId: number;
  };
  AlbumOther: {
    titleAlbum: string;
    imagealbum: string;
    albumId: number;
    userId: number;
  };
  AlbumOtherProfile: {
    titleAlbum: string;
    imagealbum: string;
    albumId: number;
    userId: number;
  };
  NewDestack: { IdDestack: number | string };
  ListOfPubli: undefined;
  ListOfStory: undefined;
  Galery: { nextRouteName: string; routeParams: any; assetType?: AssetType };
  Camera: {
    nextGaleryRouteName: string;
    routeParams: any;
    galerytAsset?: 'All' | 'Photos' | 'Videos';
  };
  CameraPub: {
    nextGaleryRouteName: string;
    routeParams: any;
    galerytAsset?: 'All' | 'Photos' | 'Videos';
  };
  EditProfile: undefined;
  EditAlbum: { albumId?: number; albumTitle?: string; albumImage?: string };
  AlbumSelect: {
    folderName: string;
    idFolders: number;
    photoImage: string;
    albumId: number;
    titleAlbum: string;
    imageAlbum: string;
  };
  Publication: undefined | { idRoom: number };
  MoreDetails:
    | undefined
    | { id: number | string | undefined; category: string };
  MoreDetailsMusic:
    | undefined
    | { id: number | string | undefined; category: string };
  MoreDetailsBooks:
    | undefined
    | { id: number | string | undefined; category: string };
  PubliGalery: {
    nextGaleryRouteName: string;
    routeParams: any;
    imageInformation?: any;
  };
  PostPreview:
    | undefined
    | {
        audioPath?: string;
        metrics?: string;
        link?: string;
        attachmentFile?: DocumentPickerResponse[];
      };
  PostPreviewRoom:
    | undefined
    | { audioPath?: string; attachmentFile?: any; Room: IRoom };
  Repost: {
    postHexId: string;
    userId: number;
    mediaImage: string;
    userImage: string;
    userNickname: string;
    time: string;
    legend: string;
    postId: number;
    audioPath?: string;
  };
  RepostPreview: {
    post: AllTypesPostsFeed;
    repostLegend: string;
  };
  RepostPageScreen: undefined;
  EditPost: undefined;
  EditHighlight: { imagesStoryPost: StoryAndPost[] };
  Story: { type: 'drops' | 'story' | 'saveDrops' };
  CreateMyFollowersScreen: undefined | { props: string };
  OtherProfileFollowers: undefined | { props: {} };
  DropsScreen: {
    postHexId: string;
    index?: number;
    userId?: number;
    archived?: boolean;
  };
  DropsSearch: { item: Drops };
  SimpleGalery: { nextRouteName: string; routeParams: {} };
  NavigateToProfile: undefined;
  Sugestions: undefined;
  Solicitations: undefined;
  MyProfileScreen: {
    from?: string;
    fromTabBottom?: boolean;
    dropId?: number;
    postHexId?: string;
    userId?: number;
    nickName?: string;
  };
  OtherProfileScreen: {
    fromTabBottom?: boolean;
    from?: string;
    dropId?: number;
    postHexId?: string;
    userId?: number;
    nickName?: string;
  };
  CreateStory: undefined | { type: string };

  RoomChat: undefined;
  RoomsList: undefined;
  RoomDetails: { roomId: string };
  RoomCommunity: {
    from?: string;
    Room: IRoom | null;
    RoomId?: number;
    UserType: 'user' | 'admin';
  };

  CreateRoom: undefined;
  ConfigRoom: undefined;
  ConfigNewRoom: {
    RoomImage?: string;
    RoomType: 'Pública' | 'Privada';
    RoomName: string;
    duration: string;
    category: string;
    startDate?: { data: string; hora: string };
    endDate?: { data: string; hora: string };
  };
  AddParticipant: undefined;
  RoomInfo: undefined;

  AddAdmin: undefined;
  RoomParticipants: undefined;
  RoomSolicitation: undefined;
  MidiaScreen: undefined;
  EditRoomImage:
    | undefined
    | {
        RoomType: 'Pública' | 'Privada';
        RoomName: string;
        duration: string;
        category: string;
      };
  EditRoomImageConfig: undefined;
  ViewRoom: { Room: IRoom };
  ViewRoomInfo: { Room: IRoom };
  InviteRoomFriend: undefined;
  RoomLive: { Room: IRoom };

  RepostScreen: undefined;
  PostScreen: { postHexId: string; postId: number; isAquivaded: boolean };
  PostScreenSearch: {
    postHexId: string;
    postId: number;
    isArquivaded: boolean;
  };
  VizualizatedArquiveStory: { uri: string };
  RequestFollower: { followers: UserAccept[] };
};

export type StackRoutes = StackNavigationProp<RootStackRoutes>;
