import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload, State } from "react-native-gesture-handler";
import { theme } from "../../Theme/theme";
import { LinkText, Linkcontainer, ViewLink } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

interface LinkProps {
    storyLink: { link: string, top: any, left: any, scale: number, type: string }
}

export default function Link(props: LinkProps) {

    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [numberOfWidth, setNumberOfWidth] = useState(0)

    const handleMove = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        const { nativeEvent: { translationX, translationY } } = event;
        const scale = 0.2;
        setPositionX(positionX + translationX * scale);
        setPositionY(positionY + translationY * scale);
    };

    const handleGestureStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            setPositionX(positionX + event.nativeEvent.translationX);
            setPositionY(positionY + event.nativeEvent.translationY);

            props.storyLink.left = positionX.toFixed(0);
            props.storyLink.top = positionY.toFixed(0);
            props.storyLink.scale = 1;
        }
    };

    useEffect(() => {
        setPositionX(118)
        setPositionY(400)
        if(props.storyLink.link.length < 27){
            setNumberOfWidth(280)
        } else if (props.storyLink.link.length == 35){
            setNumberOfWidth(390)
        }else if (props.storyLink.link.length < 10){
            setNumberOfWidth(100)
        }else {
            setNumberOfWidth(230)
        }
    }, [])

    return (
        <PanGestureHandler onGestureEvent={handleMove} onHandlerStateChange={handleGestureStateChange}>
            <ViewLink style={{ 
                zIndex: 3,
                left: positionX,
                top: positionY,
                borderRadius: 15,
                width: numberOfWidth
            }}>
                <Ionicons
                    name='link'
                    size={25}
                    style={{marginRight: 5, bottom: 2, paddingLeft: 10}}
                    color={ 'white' /* theme.primarycolor */}
                />
                <LinkText style={{color: '#fff'}}>
                    {props.storyLink.link}
                </LinkText>
            </ViewLink>
        </PanGestureHandler>
    )
}