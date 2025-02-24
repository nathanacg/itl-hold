import Ionicons from "react-native-vector-icons/Ionicons";
import { CardContainer, Container, InfoText, TextContainer, Title } from "./style";
import { PermissionsAndroid, Platform, View } from "react-native";
import { SetStateAction, useRef, useState, useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Pdf from 'react-native-pdf';
import { theme } from "../../Theme/theme";

interface DocumentCardProps {
    docInfos: { url: string, name: string, size: string }
    position: {
        x: number
        y: number
    }
    storyDocument: { url: string, name: string }
    scale: number
    absolute?: boolean
    size?: string
}



export default function DocumentCard(props: DocumentCardProps) {

    const docRef = useRef(null)

    const [pages, setPages] = useState<number>()

    const size = parseFloat((props.docInfos.size / 1048576).toFixed(2))

    const format = props.docInfos.name && props.docInfos.name.split('.').pop();

    const [permition, setPermition] = useState<any>('')

    const checkPermissions = async () => {
        if (Platform.OS == 'ios') return
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            setPermition(PermissionsAndroid.RESULTS.GRANTED)
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn('Error checking permissions: ', err);
            return false;
        }
    };


    return (
        <Container scale={props.scale} position={props.absolute ? "absolute" : "relative"} top={`${props.position.y}px`} left={`${props.position.x}px`}>
            <CardContainer size={props.size}>
                {format == 'pdf' && permition == 'granted' ? (
                    <Pdf
                        source={{ uri: props.docInfos.url }}
                        onLoadComplete={(numberOfPages) => {
                            setPages(numberOfPages)
                        }}
                        page={0}
                        style={{ minWidth: 25, height: 35, borderWidth: 0.3, backgroundColor: "transparent", borderColor: "#5e5e5e", alignItems: "center" }}
                    />
                ) : format == "xls" || format == "xlsx" || format == "csv" ? (
                    <MaterialCommunityIcons
                        name="file-excel-outline"
                        size={35}
                        color={"#ACACAC"}
                    />
                ) : format == "pptx" || format == "ppsx" || format == "odp" ? (
                    <Ionicons
                        name="file-powerpoint-outline"
                        size={35}
                        color={"#ACACAC"}
                    />
                ) : format == "doc" || format == "docx" || format == "docm" ? (
                    <Ionicons
                        name="file-word-outline"
                        size={35}
                        color={"#ACACAC"}
                    />
                ) : (
                    <Ionicons
                        name="document-text-outline"
                        size={35}
                        color={"#ACACAC"}
                    />)
                }

                <TextContainer >
                    <Title numberOfLines={1}>{props.docInfos.name}</Title>
                    <InfoText numberOfLines={1}>
                        {/* {pages && (
                            pages + "páginas" +
                            <Entypo
                                name="dot-single"
                                size={10}
                                color={theme.textDark}
                            />
                        )} */}

                        {size} mb

                        <Entypo
                            name="dot-single"
                            size={10}
                            color={theme.textDark}
                        />

                        {format}</InfoText>

                </TextContainer>
            </CardContainer>
        </Container>
    )
}