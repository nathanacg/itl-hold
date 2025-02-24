import { useRef } from 'react'
import { Dimensions } from 'react-native'
import { Animated, StyleSheet, TouchableOpacity } from 'react-native'


interface SearchCardProps {
  source: { uri: string }
  onPress: () => void
}

const dimension = Dimensions.get('screen').width

export function ExploreCardPost(props: SearchCardProps) {


  const lazyAnim = useRef(new Animated.Value(0)).current

  const lazyLoad = () => {
    Animated.timing(lazyAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  return (

    <TouchableOpacity
      onPress={props.onPress}>
      <Animated.Image
        style={[
          styles.ImageStyle,
          {
            opacity: lazyAnim.interpolate({
              inputRange: [0, 1], outputRange: [0, 1]
            })
          },
        ]}
        source={props.source}
        onLoad={lazyLoad}
      />
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  ImageStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    width: dimension > 394 ? 141 : 131,
    height: dimension > 394 ? 141 : 131,
  },

})