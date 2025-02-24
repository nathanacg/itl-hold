import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import RNCallKeep from 'react-native-callkeep';
import { reOpenApp } from './src/Utils/Linking';

notifee.createChannel({
  id: 'messages',
  name: 'Messages',
  lights: true,
  sound: 'default',
  vibration: true,
  importance: AndroidImportance.HIGH,
  visibility: AndroidVisibility.PUBLIC,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!');
  if (remoteMessage?.data?.type === 'CALLING') {
    const data =
      remoteMessage.data.channelToken +
      '}-{' +
      remoteMessage.data.channel +
      '}-{' +
      remoteMessage.data.user +
      '}-{' +
      remoteMessage.notification?.title;
    RNCallKeep.displayIncomingCall(
      data,
      remoteMessage.notification?.title,
      (localizedCallerName = ''),
      (handleType = 'number'),
      (hasVideo = false),
      (options = null),
    );
  }
});
AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () =>
    ({ name, callUUID, handle }) => {
      // Make your call here
      return Promise.resolve();
    },
);

AppRegistry.registerHeadlessTask('reopen app', reOpenApp);

AppRegistry.registerComponent(appName, () => App);
