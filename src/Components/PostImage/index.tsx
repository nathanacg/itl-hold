/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';

import {
  PostContainer,
  IndexContainer,
  CarouselIndex,
  PostImageContainer,
  MarkedContainer,
  MarkedUserName,
  MarkedUserNameContainer,
} from './style';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../Theme/theme';
import NavigateToProfile from '../NavigatetoProfile';
import { medias } from '../../Types/feedProps';

interface postImageProps {
  medias: medias[] | null;
  handleLike: (notUnLiked?: boolean) => void;
}

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

// Memoize the component to prevent unnecessary re-renders
const PostImage = function PostImage(props: postImageProps) {
  const ImageWidth = Dimensions.get('screen').width - 0;
  const flatListRef = useRef(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const [activeMarks, setActiveMarks] = useState<boolean>(false);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentItemIndex(viewableItems[0].index);
    }
  });

  const handlePress = () => {
    const currentTime = new Date().getTime();
    if (clicks === 1 && currentTime - lastClickTime < 300) {
      setClicks(0);
      setLastClickTime(0);
    } else {
      setClicks(clicks + 1);
      setLastClickTime(currentTime);
    }
  };

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  function transform() {
    return props.handleLike(true);
  }

  const onDoubleTap = () => {
    scale.value = withSpring(0.7, { duration: 400 }, isFinished => {
      if (isFinished) {
        scale.value = withDelay(0, withSpring(0));
        runOnJS(transform)();
      }
    });
  };

  return (
    <PostContainer onTouchEnd={handlePress}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        numberOfTaps={2}
        onActivated={onDoubleTap}>
        <FlatList
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => 'image' + index}
          style={styles.flatList}
          onViewableItemsChanged={onViewableItemsChanged.current}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          data={props.medias}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          // initialNumToRender={7} // Render only a few items initially, but will breake repoist with many medias
          getItemLayout={(data, index) => ({
            length: ImageWidth,
            offset: ImageWidth * index,
            index,
          })}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.imageContainer}>
                <Animated.View>
                  {props.medias && props.medias.length > 1 && (
                    <IndexContainer>
                      <CarouselIndex>
                        {currentItemIndex + 1}/{props.medias.length}
                      </CarouselIndex>
                    </IndexContainer>
                  )}
                  <PostImageContainer
                    defaultSource={require('../../Assets/Image/background_app.png')}>
                    {item.mediaType?.includes('video') ? (
                      <Video
                        source={{ uri: item.mediaUrl }}
                        style={styles.media}
                        resizeMode="cover"
                        muted={true}
                        controls
                        paused={currentItemIndex !== index}
                      />
                    ) : (
                      <FastImage
                        source={{
                          uri: item.mediaUrl,
                          priority: FastImage.priority.normal,
                          cache: FastImage.cacheControl.immutable,
                        }}
                        style={styles.media}
                        // resizeMode={FastImage.resizeMode.contain}
                      />
                    )}
                    <AnimatedImage
                      defaultSource={require('../../Assets/Image/heart.png')}
                      source={require('../../Assets/Image/heart.png')}
                      style={[styles.heartIcon, rStyle]}
                      resizeMode={'contain'}
                    />
                    <View style={styles.markedUsersContainer}>
                      {activeMarks && (
                        <View style={styles.markedUsersRow}>
                          {!!item.markedUsers &&
                            item.markedUsers.map((userMarked: any, index: number) => {
                                return (
                                  <MarkedContainer
                                    key={`${userMarked.username}-${index}`}>
                                    <NavigateToProfile
                                      userNickName={userMarked.userNickname}>
                                      <MarkedUserNameContainer>
                                        <MarkedUserName>
                                          {userMarked.userNickname}
                                        </MarkedUserName>
                                      </MarkedUserNameContainer>
                                    </NavigateToProfile>
                                  </MarkedContainer>
                                );
                              },
                            )}
                        </View>
                      )}
                    </View>
                  </PostImageContainer>
                </Animated.View>
              </View>
            );
          }}
        />
      </TapGestureHandler>

      {props.medias &&
        props.medias[0]?.markedUsers &&
        props.medias[0].markedUsers[0]?.username?.length > 0 && (
          <TouchableOpacity
            onPress={() => setActiveMarks(!activeMarks)}
            style={styles.toggleButton}>
            <Icon name="person" size={12} color={theme.textDark} />
          </TouchableOpacity>
        )}
    </PostContainer>
  );
};

const styles = StyleSheet.create({
  flatList: {
    alignSelf: 'center',
    width: '100%',
  },
  imageContainer: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width,
    height: 450,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 150,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  markedUsersContainer: {
    flex: 1,
    alignItems: 'flex-start',
    bottom: 15,
    justifyContent: 'flex-end',
  },
  markedUsersRow: {
    flexDirection: 'row',
  },
  toggleButton: {
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 20,
    bottom: 32,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostImage;
