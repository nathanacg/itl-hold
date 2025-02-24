import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Video, { VideoProperties } from "react-native-video";
import { DropList } from "../../../../Types/drop.type";
import useDropsStore from "../../../../GlobalState/drops.zustand";
interface Props {
  drop: DropList
  onLongPress: () => void
}
export const DropSavedCard = ({ drop, onLongPress }: Props) => {
  const navigation = useNavigation<StackRoutes>()
  const videoRef = useRef<VideoProperties>();
  const { setDropsList } = useDropsStore()

  const onLoad = ({ duration }) => {
    videoRef.current?.seek(0)
  }

  const handleNavigateToDropScreen = () => {
    setDropsList([drop])
    navigation.push("DropsScreen", { postHexId: drop.postHexId, userId: drop.userId })
  }


  return (
    <TouchableOpacity
      onPress={handleNavigateToDropScreen}
      onLongPress={onLongPress}
      style={
        { width: '33%', height: 231, backgroundColor: "#CECECE", marginRight: 2, marginBottom: 2 }
      }>
      <Video
        ref={videoRef}
        source={{ uri: drop.principalMedia.url }}
        style={{ zIndex: 0, width: '100%', height: 231 }}
        paused
        resizeMode="cover"
        onLoad={onLoad}
      />

    </TouchableOpacity>
  )
}