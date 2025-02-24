/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import {
  RefreshControl,
  View,
  ImageBackground,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { theme } from '../../Theme/theme';

import {
  EndFeedText,
  EndFeedTitle,
  EndFeedcontainer,
  NewPublication,
  TextNew,
} from './style';

import {
  ContentPageLoading,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import Info from '../../Components/Info';
import StoryList from './components/Cartaz';
import Discriminator from './components/Discriminator';
import { PostLoading } from '../../Components/PostLoading';
import HeaderSecondary from '../../Components/HeaderSecondary';

import { getAccessTokenSpotfy } from '../../Service/Publications';

import useFeedData from '../../GlobalState/feed.zustand';
import useStories from '../../GlobalState/stories.zustand';
import useDropsStore from '../../GlobalState/drops.zustand';
import tokenMusicApi from '../../GlobalState/tokenMusicAPI.zustand';
import useFeedPostion from '../../GlobalState/useFeedPosition.zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import React from 'react';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 100,
  waitForInteraction: false,
};

const Feed = () => {
  const listRef = useRef<KeyboardAwareFlatList>(null);
  const isFocused = useIsFocused();

  const { setToken } = tokenMusicApi();
  const { getAllDrops } = useDropsStore();
  const { setIsOnFeed, goToTop, setGoToTop } = useFeedPostion();
  const {
    initializeFeed,
    feedList,
    loadingFeed,
    setCurrentContentInViewHexId,
  } = useFeedData();
  const { populateAllStories } = useStories();
  const { user } = useUserProfile();

  const [modalError, setModalError] = useState<boolean>(false);
  const [newPublications, setNewPublications] = useState(true);

  const [visibleIndex, setVisibleIndex] = useState(0);

  const [postHexId, setPostHexId] = useState<string>('');

  const getItemLayout = useCallback((_data: any, index: number) => ({
      length: Dimensions.get('window').height * 0.8,
      offset: Dimensions.get('window').height * 0.8 * index,
      index,
    }),
    [],
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const mostVisibleItem = viewableItems[0];
      if (mostVisibleItem.isViewable) {
        setCurrentContentInViewHexId(
          mostVisibleItem.item?.postHexId ||
            mostVisibleItem.item?.reportHexId ||
            mostVisibleItem.item?.roomId ||
            mostVisibleItem.item?.dropHexId ||
            mostVisibleItem.item?.userId,
        );
        setVisibleIndex(mostVisibleItem.index);
      }
    }
  }).current;

  const handleRefresh = async () => {
    initializeFeed(true);
    getAllDrops();
    populateAllStories(user.userId);
    setNewPublications(false);
  };

  const getGlobalToken = useCallback(async () => {
    const response = await getAccessTokenSpotfy().catch(err => {
      console.warn('error ao puxar token spot', err);
    });
    setToken(response);
  }, []);

  useEffect(() => {
    if (isFocused && goToTop) {
      listRef.current?.scrollToPosition(0, 0);
      setGoToTop(false);
    }
  }, [goToTop]);

  useEffect(() => {
    initializeFeed();
    getAllDrops();
    getGlobalToken();
    setIsOnFeed(isFocused);
    populateAllStories(user.userId);
  }, []);

  return (
    <SafeAreaViewContainer>
      <View style={{ flex: 1 }}>
        <HeaderSecondary feedScreen onPress={() => setGoToTop(true)} />
        <KeyboardAwareFlatList
          ref={listRef}
          keyboardShouldPersistTaps="handled"
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListHeaderComponent={
            <>
              <StoryList />
              {!loadingFeed && newPublications && (
                <NewPublication onPress={handleRefresh}>
                  <TextNew>
                    <Icon
                      name="arrow-up"
                      size={13}
                      color={theme.secondaryColor}
                    />{' '}
                    Novas publicações
                  </TextNew>
                </NewPublication>
              )}
            </>
          }
          refreshControl={
            <RefreshControl
              progressViewOffset={15}
              refreshing={loadingFeed}
              onRefresh={handleRefresh}
            />
          }
          data={feedList}
          keyExtractor={(_item, index) => 'Discriminator ' + index}
          showsVerticalScrollIndicator={false}
          // getItemLayout={getItemLayout}
          renderItem={({ item, index }) => (
            <Discriminator
              key={item.postHexId}
              objectPost={item}
              activeIndex={visibleIndex}
              index={index}
            />
          )}
          ListEmptyComponent={
            <ContentPageLoading>
              <PostLoading />
              <PostLoading />
              <PostLoading />
            </ContentPageLoading>
          }
          ListFooterComponent={
            <>
              {!loadingFeed && (
                <ImageBackground
                  style={{ marginTop: 20 }}
                  source={require('../../Assets/Image/background_app.png')}>
                  <EndFeedcontainer>
                    <EndFeedTitle>Isso é tudo!</EndFeedTitle>
                    <EndFeedText>
                      Você viu todas as novas publicações.
                    </EndFeedText>
                  </EndFeedcontainer>
                </ImageBackground>
              )}
            </>
          }
          windowSize={7}
          maxToRenderPerBatch={7}
          updateCellsBatchingPeriod={100}
          removeClippedSubviews={true}
          initialNumToRender={7}
        />
      </View>

      <Info
        serverError
        text="Não foi possível se conectar ao servidor"
        isVisible={modalError}
        setVissible={setModalError}
      />
    </SafeAreaViewContainer>
  );
};

export default memo(Feed);
