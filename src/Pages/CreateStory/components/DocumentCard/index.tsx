import Ionicons from "react-native-vector-icons/Ionicons";
import { CardContainer, InfoText, Title } from "./style";
import { SetStateAction, useState, useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { theme } from "../../../../Theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Pdf from 'react-native-pdf';
import { View, Dimensions } from 'react-native';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload, State } from 'react-native-gesture-handler';

interface DocumentCardProps {
    storyDocument: { name: string, left: any, top: any, scale: number, fileCopyUri: string, uri: string, type: any, size: number }
    setStoryDocument: React.Dispatch<SetStateAction<any>>
    handleMove: () => void
    handleDelete: (item: React.RefObject<any>, setItem: React.Dispatch<SetStateAction<any>>) => void
}

export default function DocumentCard(props: DocumentCardProps) {

    const [text, setText] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [pages, setPages] = useState<any>()
    const [imageArquive, setImageArquive] = useState<any>()

    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    const format = props.storyDocument

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

            props.storyDocument.left = positionX.toFixed(0);
            props.storyDocument.top = positionY.toFixed(0);
        }
    };


    const size = parseFloat((format.size / 1048576).toFixed(2))


    useEffect(() => {
        setPositionX(screenWidth / 2.5);
        setPositionY(screenHeight / 2)
    }, [])

    return (
        <>
            <PanGestureHandler onGestureEvent={handleMove} onHandlerStateChange={handleGestureStateChange}>
                <View style={{
                    flexDirection: 'row',
                    left: positionX,
                    top: positionY,
                }}>
                    <CardContainer>
                        {format.type === 'application/pdf' ? (
                            <Pdf
                                source={{ uri: format.fileCopyUri }}
                                onLoadComplete={(numberOfPages) => {
                                    setPages(numberOfPages)
                                }}
                                page={0}
                                style={{ minWidth: 25, height: 37, borderWidth: 0.3, backgroundColor: "transparent", borderColor: "#5e5e5e", alignItems: "center" }}
                            />
                        ) : (format.type === "application/vnd.ms-excel" || format.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || format.type === "text/csv") ? (
                            <MaterialCommunityIcons
                                name="file-excel-outline"
                                size={45}
                                color={"#ACACAC"}
                            />
                        ) : (format.type === "application/vnd.ms-powerpoint" || format.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || format.type === "application/vnd.oasis.opendocument.presentation") ? (
                            <Ionicons
                                name="file-powerpoint-outline"
                                size={45}
                                color={"#ACACAC"}
                            />
                        ) : (format.type === "application/msword" || format.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || format.type === "application/vnd.ms-word.document.macroEnabled.12") ? (
                            <Ionicons
                                name="file-word-outline"
                                size={45}
                                color={"#ACACAC"}
                            />
                        ) : (
                            <Ionicons
                                name="document-text-outline"
                                size={45}
                                color={"#ACACAC"}
                            />
                        )}
                        <View>
                            <Title>{format.name}</Title>
                            <InfoText>
                                {pages != undefined ? (
                                    <>
                                        {pages} páginas
                                    </>
                                ) : (
                                    <>
                                        1 página
                                    </>
                                )}
                                <Entypo
                                    name="dot-single"
                                    size={10}
                                    color={theme.textDark}
                                />
                                {size} mb
                                <Entypo
                                    name="dot-single"
                                    size={10}
                                    color={theme.textDark}
                                />
                                {format.type}
                            </InfoText>
                        </View>
                    </CardContainer>
                </View>
            </PanGestureHandler>

        </>
    )
}