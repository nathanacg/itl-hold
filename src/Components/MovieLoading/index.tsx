import { useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'

import { HeaderPost } from './components/HeaderPost'
import { FooterActions, ImageFake, MovieDescription, MovieDescriptionShort, MovieDetails, MovieImage, MovieTitle, PostMessage, PostMessageShort } from './components/style'




export function MovieLoading() {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: true
          }
        )
      ]),
    ).start()
  }, [fadeAnim])


  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
    >

      <ImageFake />
      <FooterActions />

      <PostMessage />
      <PostMessage />
      <PostMessage />
      <PostMessageShort />
      <MovieDetails>
        <View style={{ flexDirection: 'column' }}>
          <MovieTitle />
          <MovieDescription />
          <MovieDescription />

          <MovieDescription />
          <MovieDescription />
          <MovieDescriptionShort />
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
            <MovieImage />
            <MovieImage />
            <MovieImage />
            <MovieImage />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}>
            <MovieImage />
            <MovieImage />
            <MovieImage />
            <MovieImage />
          </View>
        </View>
      </MovieDetails>
    </Animated.View>
  )
}