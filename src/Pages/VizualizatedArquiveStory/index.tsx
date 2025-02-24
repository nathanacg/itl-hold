import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native"
import { CardImage, OptionText, StoryOptions, StoryOptionsPoints, TextUserName, UserImage } from './style';
import UserImageRounded from '../../Components/UserImageProfile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { Icon } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
// import StoryOptionsComponent from '../StoryOptionsComponent';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackRoutes } from '../../Routes/StackTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';

interface Post {
     userId: number;
     profileImage: string;
     username: string;
     text: Text;
     postHexId: string;
     text_url: TextUrl;
     users_marcations: any; // Você pode substituir 'any' por um tipo específico, se aplicável.
     principalMedia: Media;
     secondaryMedia: Media;
     docMedia: Media;
     music: any; // Novamente, substitua 'any' por um tipo apropriado se necessário.
     emojis: any; // Substitua 'any' por um tipo específico, se aplicável.
}

interface Text {
     font: string | null;
     text: string | null;
     scale: number | null;
     position: { x: number; y: number } | null;
     text_align: string | null;
     text_color: string | null;
     background_color: string | null;
}

interface TextUrl {
     url: string | null;
     scale: number | null;
     position: { x: number; y: number } | null;
     style_type: string | null;
}

interface Media {
     url: string | null;
     scale: string | null;
     fileName: string | null;
     position: { x: number; y: number } | null;
     usage_media: string | null;
}



export default function VizualizatedArquiveStory() {
     const route = useRoute();
     const params = route.params as { uri: string }
     const navigation = useNavigation<StackRoutes>()
     const [imagesStory, setImagesStory] = useState<Post[]>([]);
     const [currentIndex, setCurrentIndex] = useState<any>(0);
     const { user: userProfile, initializeProfile } = useUserProfile()
     const [isMenuModalVisible, setMenuModalVisible] = useState(false);
     const [timerPaused, setTimerPaused] = useState(false);
     const [nullIndex, setNullIndex] = useState<any>()
     const isMp4 = params.uri.endsWith('.mp4');
     const isJpeg = params.uri.endsWith('.jpeg');
     const isjpg = params.uri.endsWith('.jpg');
     const array: any[] = []

     const avancarFoto = () => {
          const nextIndex = (currentIndex + 1) % imagesStory.length;
          setCurrentIndex(nextIndex);
     }

     const retrocederFoto = () => {
          const previousIndex = (currentIndex - 1 + imagesStory.length) % imagesStory.length;
          setCurrentIndex(previousIndex);
     }

     const handleStopStory = () => {
          const newValue = !timerPaused;
          setTimerPaused(newValue);
     };

     useEffect(() => {
          const avancarAutomaticamente = () => {
               if (!timerPaused) {
                    const nextIndex = (currentIndex + 1) % array.length;
                    setCurrentIndex(nextIndex);
               }
          };
          const timer = setTimeout(avancarAutomaticamente, 10000);
          return () => {
               clearTimeout(timer);
          };
     }, [currentIndex, timerPaused]);


     return (
          <>
               <SafeAreaView style={styles.container}>
                    <StatusBar barStyle={'light-content'}
                         backgroundColor={'transparent'}
                         translucent />

                    {timerPaused == false ? (
                         <View style={{ left: '5%', top: '5%', width: '70%', position: 'absolute', zIndex: 2, flexDirection: 'row', alignItems: 'center', gap: 15, }}>
                              <UserImageRounded url={userProfile.profileImage} size={45} />
                         </View>
                    ) : (<></>)}
                    {timerPaused == false ? (
                         <>
                              <View style={{ zIndex: 2, width: 50, height: 50, top: 45, right: 30, position: 'absolute' }}>
                                   <TouchableOpacity onPress={() => { setMenuModalVisible(!isMenuModalVisible) }}>
                                        <Entypo
                                             name='dots-three-vertical'
                                             color={'#ffffff'}
                                             size={20}
                                             style={{ marginTop: 15 }}
                                        />
                                   </TouchableOpacity>
                              </View>
                         </>
                    ) : (
                         <></>
                    )}
                    {timerPaused == false ? (
                         <View style={{ zIndex: 2, width: 50, height: 50, top: 40, right: 10, position: 'absolute' }}>
                              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                   <AntDesign
                                        name='close'
                                        color={'#ffffff'}
                                        size={29}
                                        style={{ marginLeft: 10, marginTop: 15 }}
                                   />
                              </TouchableOpacity>
                         </View>
                    ) : (
                         <></>
                    )}

                    {timerPaused == false ? (

                         <View style={styles.timelineContainer}>
                              {imagesStory.map((data, index) =>
                                   <View
                                        key={index}
                                        style={[
                                             styles.timeline,
                                             {
                                                  width: `${100 / imagesStory.length}%`,
                                                  backgroundColor: index === currentIndex ? 'white' : 'gray',
                                             },
                                        ]}
                                   />
                              )}
                         </View>
                    ) : (
                         <></>
                    )}
                    <View style={styles.navigationButtons}>
                         <TouchableOpacity style={styles.leftTouch} onPress={retrocederFoto}>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.centralTouch} onPressIn={() => handleStopStory()} onPressOut={() => handleStopStory()}>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.rightTouch} onPress={() => { avancarFoto() }}>
                         </TouchableOpacity>
                    </View>
                    {isMp4 ? (
                         <Video
                              paused={false}
                              resizeMode='contain'
                              repeat={true}
                              style={{ width: '100%', height: '80%', top: '12%' }}
                              source={{ uri: params.uri }}
                         />
                    ) : isJpeg ? (
                         <CardImage source={{ uri: params.uri }} />
                    ) : isjpg ? (
                         <CardImage source={{ uri: params.uri }} />
                    ) : (
                         <></>
                    )}
               </SafeAreaView >
          </>

     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: 'black',
     },
     rightTouch: {
          height: '100%',
          width: '30%',
          marginLeft: 5,
          // backgroundColor: 'white'
     },
     leftTouch: {
          height: '100%',
          width: '30%',
          marginRight: 5,
          // backgroundColor: '#CECECE'
     },
     centralTouch: {
          height: '100%',
          width: '35%',
          marginRight: 5,
          // backgroundColor: '#ff9292'
     },
     navigationButtons: {
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          height: '80%',
          zIndex: 2,
          top: 110,

     },
     timeLine: {
          top: 100,
          width: '100%',
          height: 3,
          backgroundColor: 'white',
          zIndex: 1,
     },
     timelineContainer: {
          top: 100,
          width: '100%',
          height: 2,
          zIndex: 1,
          flexDirection: 'row',
     },
     timeline: {
          height: '100%',
          backgroundColor: 'white',
          marginRight: 1,
          marginLeft: 1
     },
     timelineWrapper: {
          width: '100%',
          height: 3,
          backgroundColor: 'white',
          zIndex: 1,
     },
     timelineFill: {
          height: '100%',
          backgroundColor: 'white',
     },
     menu: {
          // marginTop: 30,
          // width: 25,
          // height: 25,
          resizeMode: 'contain',
          tintColor: 'white',
     },

});

function goBack(): any {
     throw new Error('Function not implemented.');
}
