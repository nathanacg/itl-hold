import { useEffect, useState } from 'react'
import { Image, View, FlatList, TouchableOpacity, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface likesIndex {
     index: number
     onPress: () => void;
}

export default function Likecomponent(props: likesIndex) {
     const [liked, setLiked] = useState(false)

     useEffect(() => {
          setLiked(false)
     }, [props.index])

     const atualizeIndex = () => {
          props.onPress()
          setLiked(!liked)
     }
     return (
          <TouchableOpacity onPress={() => atualizeIndex()}>
               <Ionicons
                    name={liked ? 'ios-heart' : 'ios-heart-outline'}
                    size={Platform.OS === 'ios' ? 35 : 30}
                    color={'white'}
                    style={Platform.OS === 'ios' ? {
                         position: 'absolute',
                         bottom: 3,
                         right: 10,
                         zIndex: 4,
                         marginRight: 8,
                         marginBottom: 25
                    } : {
                         position: 'absolute',
                         bottom: 10,
                         right: 10,
                         zIndex: 4,
                         marginRight: 15,
                         marginBottom: 25
                    }}
               />
          </TouchableOpacity>
     )
}