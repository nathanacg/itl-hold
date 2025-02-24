import React, { useRef, useState } from 'react';

import { Dimensions, FlatList, ImageProps, View } from 'react-native';
import Video from 'react-native-video';

import {
  PostContainer,
  IndexContainer,
  CarouselIndex,
  IndexIndicator,
  Indicator,
  PostImageContainer,
} from './style';

interface postImageProps {
  medias?: {
    mediaUrl: string;
    markedUsers: {
      userId: number;
      name: string;
      profileImage: string;
    }[];
    type: string;
  }[];
}

export default function PostImagePreview(props: postImageProps) {
  const ImageWidth = Dimensions.get('screen').width - 0;
  const imageRef = useRef<ImageProps>(null);
  const flatListRef = useRef(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  // console.log('props.medias', props.medias);

  const renderMedia = (item: any) => {
    return (
      <View style={{ alignSelf: 'center', width: ImageWidth, height: 450 }}>
        {item.type === 'video' ? (
          <Video
            source={{ uri: item.mediaUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            muted={true}
            controls
          />
        ) : (
          <PostImageContainer ref={imageRef} source={{ uri: item.mediaUrl }} />
        )}
      </View>
    );
  };

  return (
    <PostContainer>
      <FlatList
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => item.mediaUrl + index}
        style={{ alignSelf: 'center', width: '100%' }}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={props.medias}
        renderItem={({ item }) => renderMedia(item)}
      />
      {props.medias && props.medias.length > 1 && (
        <IndexIndicator>
          {props.medias.map((item, index) => (
            <Indicator key={index} active={index === currentItemIndex} />
          ))}
        </IndexIndicator>
      )}
      {props.medias && props.medias.length > 1 && (
        <IndexContainer>
          <CarouselIndex>
            {currentItemIndex + 1}/{props.medias.length}
          </CarouselIndex>
        </IndexContainer>
      )}
    </PostContainer>
  );
}
