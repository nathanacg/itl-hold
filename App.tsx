import React, { useEffect, useState } from 'react';
import {
  AppState,
  Linking,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';

import Navigation from './src/Routes/Navigation';
import { NavigationContainer } from '@react-navigation/native';

import { SocketProvider } from './src/context/socket';
import { NotificationProvider } from './src/context/notification';

import { getDrop } from './src/Service/Drop';
import { getPost } from './src/Service/Publications';
import { getUserStories } from './src/Service/Story';

import useStories from './src/GlobalState/stories.zustand';
import useDropsStore from './src/GlobalState/drops.zustand';
import useOtherProfilePost from './src/GlobalState/otherProfilePosts.zustand';
import { StorageProvider } from './src/context/storage';

export default function App() {
  const { setPost } = useOtherProfilePost();
  const { setDropsList } = useDropsStore();
  const { setCurrentStory, setModalVisible, setInitialStoryIndex } =
    useStories();

  /*   const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        Linking.getInitialURL().then(res => {
          Linking.openURL(res)
        })
        //START_FULL_APP()
      } else if (nextAppState === 'background') {
      }
    }; */

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }
    })();
    /* const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    }; */
  }, []);

  /*  useEffect(() => {
     Linking.addEventListener('url', (res) => {
       if (res) {
         Linking.openURL(res.url)
       }
     })
     return () => Linking.removeAllListeners('url')
   }, []) */

  const prefix =
    Platform.OS === 'ios' ? 'mychat://' : 'intelectusapp://intelectusapp/';

  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  /*   useEffect(() => {
      const getUrlAsync = async () => {
        // Get the deep link used to open the app
        const initialUrl = await Linking.getInitialURL();

        // The setTimeout is just for testing purpose
        setTimeout(() => {
          setUrl(initialUrl);
          setProcessing(false);
          console.log('Initial')
          console.log(initialUrl)
        }, 1000);
      };

      getUrlAsync();
    }, []); */

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Chat: {
          path: 'chat/',
        },
      },
    },
  };

  /*  const linking = {
     prefixes: ['https://'],
     config: {
       screens: {
         PostScreen: {
           path: 'post.intellectus.app.br/:postId',
           parse: {
             postId: (postId: string) => {
               getPost(postId)
                 .then(res => {
                   setPost(res.data.post[0])
                 })
                 .catch((e) => {
                   console.warn('GetPost - App')
                   console.log(e)
                 })
             },
           },
         },
         CallScreen: {
           path: 'call.intellectus.app.br/:postId',
           parse: {
             postId: (postId: string) => {
               getPost(postId)
                 .then(res => {
                   setPost(res.data.post[0])
                 })
                 .catch((e) => {
                   console.warn('GetPost - App')
                   console.log(e)
                 })
             },
           },
         },
         OtherProfileScreen: {
           path: 'profile.intellectus.app.br/:profileid',
           parse: {
             profileId: (profileId: string) => profileId,
           },
         },
         DropsScreen: {
           path: 'reels.intellectus.app.br/:postId',
           parse: {
             postId: (postId: string) => {
               getDrop(postId)
                 .then(res => {
                   setDropsList(res.data)
                 })
                 .catch((e) => {
                   console.warn('GetDrop - App')
                   console.log(e)
                 })
             },
           },
         },
         FeedScreen: {
           path: 'stories.intellectus.app.br/:userId/:index',
           parse: {
             userId: (userId: number) => {
               getUserStories(userId)
                 .then(res => {
                   setCurrentStory(res.data)
                 })
                 .catch((e) => {
                   console.warn('GetUserStories - App')
                   console.log(e)
                 })
             },
             index: (index: number) => {
               setInitialStoryIndex(index)
               setModalVisible(true)
             }
           },
         }
       },
     },
   }; */

  return (
    <ToastProvider>
      <StorageProvider>
        <NavigationContainer>
          <NotificationProvider>
            <SocketProvider>
              <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
                translucent
              />
              <Navigation />
            </SocketProvider>
          </NotificationProvider>
        </NavigationContainer>
      </StorageProvider>
    </ToastProvider>
  );
}
