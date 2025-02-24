import { useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'

import { HeaderPost } from './components/HeaderPost'
import { FooterActions, ImageFake, MovieDescription, MovieDescriptionShort, MovieDetails, MovieImage, MovieTitle, PostMessage, PostMessageShort } from './components/style'




export function PostLoading() {

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
      style={{ marginTop: 20, opacity: fadeAnim }}
    >
      <HeaderPost />
      <PostMessage />
      <PostMessage />
      <PostMessageShort />
      <ImageFake />
      <MovieDetails>
        <MovieImage />
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <MovieTitle />
          <MovieDescription />
          <MovieDescription />
          <MovieDescriptionShort />
        </View>
      </MovieDetails>
      <FooterActions />
    </Animated.View>
  )
}