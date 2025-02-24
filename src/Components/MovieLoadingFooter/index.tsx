import { useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'

import { MovieDescription, MovieDescriptionShort, MovieDetails, MovieImage, MovieTitle, PostMessage, PostMessageShort } from './components/style'




export function MovieLoadingFooter() {

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
      <MovieDetails>
        <MovieImage />
        <View style={{ flexDirection: 'column' }}>
          <MovieTitle />
          <MovieDescription />
          <MovieDescription />
          <MovieDescription />
          <MovieDescriptionShort />
        </View>
      </MovieDetails>
    </Animated.View>
  )
}