/* eslint-disable react-native/no-inline-styles */
import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
} from 'react-native';

import { getPostProfile } from '../../Service/Profile';

import {
  PublicationCard,
  PublicationContainer,
  Separator,
  CarouselIndex,
  IndexContainer,
} from './style';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { PublicationType } from '../../Types/myPublications.types';
import { fontStyle, theme } from '../../Theme/theme';
import { TextNotPublicationsArchiveds } from '../AlbumCard/style';
import { IUserInfoConfig } from '../../Types/feedProps';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PublicationProps {
  userId: number;
  filter?: string;
}

const Publications = ({ userId, filter }: PublicationProps) => {
  const navigation = useNavigation<StackRoutes>();
  const [userPost, setUserPost] = useState<PublicationType[]>();
  const [userSearchPost, setUserSearchPost] = useState<PublicationType[]>();
  const { setRepost, setPost } = useOtherProfilePost();
  const [account, setAccount] = useState<IUserInfoConfig>();

  const handleNavigationToPost = (post: PublicationType) => {
    const data = {
      ...post,
      accountConfig: {
        showLikes: !!account?.showLikes,
        showVisualizations: !!account?.showVisualizations,
      },
    };
    setPost(data);
    navigation.push('PostScreen', {
      postHexId: post.postHexId,
      postId: post.postId,
      isAquivaded: post.isArquivaded,
    });
  };

  const fetchProfile = () => {
    getPostProfile(userId)
      .then(response => {
        setUserPost(response?.data.post);
        setUserSearchPost(response?.data.post);
        const infoOther: IUserInfoConfig = {
          showLikes: response?.data.userPostConfig.show_likes,
          showVisualizations: response?.data.userPostConfig.show_visualizations,
        };
        setAccount(infoOther);
      })
      .catch(e => {
        console.warn('GetPostProfile - PostProfileGroupsMyProfile');
        console.log(e);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (filter == 'Outros' || filter == '' || filter == 'Mais curtidos') {
      setUserPost(userSearchPost);
    } else {
      const filtered = userSearchPost?.filter(
        item => item.postCategorie == filter,
      );
      setUserPost(filtered);
    }
  }, [filter]);

  if (!userPost) {
    return (
      <ActivityIndicator
        size={'small'}
        color={theme.primarycolor}
        style={{ marginTop: 40 }}
      />
    );
  }

  const dimensions = Dimensions.get('screen').width;

  return (
    <>
      <FlatList
        data={userPost}
        numColumns={3}
        scrollEnabled={false}
        ListEmptyComponent={
          <TextNotPublicationsArchiveds>
            Não há nenhuma Publicação
          </TextNotPublicationsArchiveds>
        }
        keyExtractor={item =>
          'post' +
          item.postHexId +
          (item.repostOwner && item.repostOwner.repostHexId)
        }
        renderItem={({ item }) => {
          const isPostSecondIndex =
            item.medias?.[1] && item.medias?.[1]?.mediaUrl.split('.')[4];
          return (
            <View>
              {item.publicationType === 'repost' && (
                <PublicationContainer
                  onPress={() => {
                    setRepost(item);
                    navigation.navigate('RepostScreen');
                  }}>
                  {item.originalPost.medias &&
                    !item.originalPost.post.postColor && (
                      <>
                        {item.originalPost.medias[0].mediaExtension == 'm4a' ? (
                          <ImageBackground
                            source={require('../../Assets/Image/background_app.png')}
                            resizeMode="cover"
                            style={{
                              width: '100%',
                              borderWidth: 1,
                              borderColor: '#fff',
                              height: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                padding: 10,
                                fontSize: 9,
                                color: '#000',
                                fontFamily: fontStyle.light,
                                textAlign: 'center',
                              }}>
                              {item.originalPost.post.postLegend}
                            </Text>
                          </ImageBackground>
                        ) : (
                          <>
                            <PublicationCard
                              style={{
                                width: '100%',
                                height: '100%',
                                borderWidth: 1,
                                borderColor: '#fff',
                              }}
                              source={{
                                uri: item.originalPost.medias[0].mediaUrl,
                              }}
                            />
                          </>
                        )}
                      </>
                    )}

                  {item.originalPost.post.postColor && (
                    <ImageBackground
                      source={require('../../Assets/Image/background_app.png')}
                      style={{
                        height: '100%',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#fff',
                        backgroundColor:
                          item.originalPost.post.postColor &&
                          item.originalPost.post.postColor.split('&')[0],
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.originalPost.post.postLegend.length == 0 ? (
                        <Ionicons
                          name={'mic'}
                          size={23}
                          color={
                            item.originalPost.post.postColor.split('&')[0] ==
                            '#ffffff'
                              ? '#000'
                              : '#fff'
                          }
                        />
                      ) : (
                        <Text
                          numberOfLines={3}
                          style={{
                            padding: 10,
                            fontSize: 10,
                            color:
                              item.originalPost.post.postColor.split('&')[1],
                            fontFamily: fontStyle.light,
                            textAlign: 'center',
                          }}>
                          {item.originalPost.post.postLegend}
                        </Text>
                      )}
                    </ImageBackground>
                  )}
                </PublicationContainer>
              )}
              {item.publicationType == 'post' && (
                <>
                  {item.medias &&
                    item.medias.filter(media => media.mediaExtension === 'jpg')
                      .length > 1 && (
                      <IndexContainer>
                        <CarouselIndex>
                          1/
                          {
                            item.medias.filter(
                              media => media.mediaExtension === 'jpg',
                            ).length
                          }
                        </CarouselIndex>
                      </IndexContainer>
                    )}

                  <PublicationContainer
                    onPress={() => handleNavigationToPost(item)}>
                    {item.medias && !item.postColor && (
                      <>
                        {item.postSpoiler == 1 ? (
                          <View
                            style={{
                              backgroundColor: '#000000',
                              borderWidth: 1,
                              borderColor: '#fff',
                              height: '100%',
                              width: '100%',
                            }}>
                            <PublicationCard
                              style={{
                                width: 25,
                                height: 25,
                                marginTop: Platform.OS == 'ios' ? 27 : 22,
                                marginLeft: dimensions <= 393 ? 52 : 60,
                                borderColor: '#fff',
                              }}
                              source={require('../../Assets/Icons/spoilerIcon.png')}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                bottom: Platform.OS == 'ios' ? 25 : 10,
                                left: 0,
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  paddingLeft: 30,
                                  paddingRight: 30,
                                  fontFamily: fontStyle.light,
                                  color: '#fff',
                                  fontSize: dimensions <= 393 ? 6 : 8,
                                  textAlign: 'center',
                                }}>
                                Publicação ocultada por conter spoiler.
                              </Text>
                              <Text
                                style={{
                                  paddingTop: 10,
                                  marginBottom:
                                    Platform.OS == 'android' ? 10 : 0,
                                  fontFamily: fontStyle.Bold,
                                  color: '#fff',
                                  fontSize: dimensions <= 393 ? 6 : 8,
                                  textAlign: 'center',
                                }}>
                                Ver spoiler
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <>
                            <PublicationCard
                              style={{
                                width: '100%',
                                height: '100%',
                                borderWidth: 1,
                                borderColor: '#fff',
                              }}
                              source={{
                                uri:
                                  isPostSecondIndex == 'jpg'
                                    ? item.medias[1].mediaUrl
                                    : item.medias[0].mediaUrl,
                              }}
                            />
                          </>
                        )}
                      </>
                    )}

                    {item.postColor && (
                      <>
                        {item.postSpoiler == 1 ? (
                          <View
                            style={{
                              backgroundColor: '#000000',
                              borderWidth: 1,
                              borderColor: '#fff',
                              height: '100%',
                              width: '100%',
                            }}>
                            <PublicationCard
                              style={{
                                width: 25,
                                height: 25,
                                marginTop: Platform.OS == 'ios' ? 30 : 20,
                                marginLeft: dimensions <= 393 ? 52 : 58,
                                borderColor: '#fff',
                              }}
                              source={require('../../Assets/Icons/spoilerIcon.png')}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                bottom: Platform.OS == 'ios' ? 25 : 10,
                                left: 0,
                                width: '100%',
                              }}>
                              <Text
                                style={{
                                  paddingLeft: 30,
                                  paddingRight: 30,
                                  fontFamily: fontStyle.light,
                                  color: '#fff',
                                  fontSize: dimensions <= 393 ? 6 : 8,
                                  textAlign: 'center',
                                }}>
                                Publicação ocultada por conter spoiler.
                              </Text>
                              <Text
                                style={{
                                  paddingTop: 12,
                                  marginBottom:
                                    Platform.OS == 'android' ? 10 : 0,
                                  fontFamily: fontStyle.Bold,
                                  color: '#fff',
                                  fontSize: dimensions <= 393 ? 6 : 8,
                                  textAlign: 'center',
                                }}>
                                Ver spoiler
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: '100%',
                              height: '100%',
                              borderWidth: 1,
                              borderColor: '#fff',
                              backgroundColor:
                                item.postSpoiler == 1
                                  ? '#000000'
                                  : item.postColor.split('&')[0],
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={require('../../Assets/Image/background_app.png')}
                              style={{
                                tintColor: '#2f2f2f',
                                resizeMode: 'cover',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                              }}
                            />
                            {item.postLegend.length == 0 ? (
                              <Ionicons
                                name={'mic'}
                                size={23}
                                color={
                                  item.postColor.split('&')[0] == '#ffffff'
                                    ? '#000'
                                    : '#fff'
                                }
                              />
                            ) : (
                              <Text
                                numberOfLines={3}
                                style={{
                                  padding: 10,
                                  fontSize: 10,
                                  color: item.postColor.split('&')[1],
                                  fontFamily: fontStyle.light,
                                  textAlign: 'center',
                                }}>
                                {item.postLegend}
                              </Text>
                            )}
                          </View>
                        )}
                      </>
                    )}
                  </PublicationContainer>
                </>
              )}
            </View>
          );
        }}
      />
      <Separator />
    </>
  );
};

export default memo(Publications);
