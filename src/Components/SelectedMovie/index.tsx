/* eslint-disable react-native/no-inline-styles */
import React, { ScrollView, View } from 'react-native';

import { theme } from '../../Theme/theme';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  RemoveMovie,
  SelectedMovieCard,
  SelectedMovieImage,
  SelectedMovieText,
  SelectedMovieTitle,
} from './style';

import { MovieLoadingFooter } from '../MovieLoadingFooter';

import { SelectedMovieProps } from '../../Types/postProps';

interface TypeCategory {
  [key: string]: string;
}

export default function SelectedMovie(props: SelectedMovieProps) {
  const navigation = useNavigation<StackRoutes>();

  const type: TypeCategory = {
    Música: require('../../Assets/Image/musicCover.png'),
    Filme: require('../../Assets/Image/movieCover.png'),
    Série: require('../../Assets/Image/serieCover.png'),
    Livro: require('../../Assets/Image/bookCover.png'),
    undefined: '',
  };

  if (props.loading) {
    return <MovieLoadingFooter />;
  }

  return (
    <SelectedMovieCard
      onPress={
        props.ImageUrl
          ? () => {
              if (props.category === 'Filme' || props.category === 'Série') {
                navigation.push('MoreDetails', {
                  id: props.id,
                  category: props.category,
                });
              } else if (props.category === 'Música') {
                navigation.push('MoreDetailsMusic', {
                  id: props.id,
                  category: props.category,
                });
              } else if (props.category === 'Livro') {
                navigation.push('MoreDetailsBooks', {
                  id: props.id,
                  category: props.category,
                });
              }
            }
          : () => {}
      }
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
      style={{ width: props.width }}>
      {props.onRemove && (
        <RemoveMovie onPress={props.onRemove}>
          <Ionicons name="close-outline" color={theme.lightGray} size={30} />
        </RemoveMovie>
      )}
      {props.ImageUrl ? (
        <SelectedMovieImage
          source={{ uri: props.ImageUrl }}
          resizeMode={'cover'}
        />
      ) : (
        <>
          <SelectedMovieImage
            source={type[props.category]}
            resizeMode={'cover'}
          />
        </>
      )}
      <View
        style={{
          flexDirection: 'column',
          gap: 1,
          width: props.preview ? 240 : 265,
          height: 65,
        }}>
        <SelectedMovieTitle numberOfLines={1}>
          {props.name ? props.name : 'Indisponível'}
        </SelectedMovieTitle>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SelectedMovieText numberOfLines={3}>
            {props.description
              ? props.description
              : 'Os detalhes não foram fornecidos.'}
          </SelectedMovieText>
        </ScrollView>
      </View>
    </SelectedMovieCard>
  );
}
