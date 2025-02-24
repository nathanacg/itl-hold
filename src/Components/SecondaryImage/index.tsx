import { Image } from "react-native";

interface SecondaryImageProps{
    uri: string
    positionY: number
    posotionX: number
    scale: number
}

export function SecondaryImage(props: SecondaryImageProps){
    return(
        <Image style={{width: 120, height: 120, position: "absolute",  zIndex: -1, top: props.positionY, left: props.posotionX,transform: [{scale:Number(props.scale)}]} } source={{uri: props.uri}}/>
    )
}