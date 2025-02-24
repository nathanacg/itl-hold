import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../Components/Header";
import { SafeAreaViewContainer } from "../../Components/elementsComponents";
import InputConfiguration from "../../Components/InputConfiguration";
import { useState } from "react";
import { TextRegular16 } from "../../Components/configurationsElemetsStyle";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import { ConfigRoomContainer, PublicImage } from "./style";
import InputDesc from "../../Components/InputDesc";
import { ActionsEditProfilePhotoContainer, ContentPage, ProfilePhotoContainer } from "../../Components/Informationsform";
import RoomNameInput from "../../Components/RoomNameInput";


export default function ConfigRoom() {


    const navigation = useNavigation<StackRoutes>()

    const [roomName, setRoomName] = useState("")

    return (
        <SafeAreaViewContainer>
            <ConfigRoomContainer>
                <Header
                    titleHeader="Criar sala"
                    actionHeaderElement={
                        <TouchableOpacity
                            style={{ alignItems: "center", paddingTop: 3, position: 'absolute', right: 0 }}
                            onPress={() => navigation.push("CreateRoom")}>
                            <TextRegular16>
                                Avançar
                            </TextRegular16>
                        </TouchableOpacity>
                    }
                />
                {/* { */}
                <PublicImage
                    source={require("../../Assets/Image/homebg2.png")} />
                {/* } */}
                <ContentPage>
                    <ProfilePhotoContainer>

                        <ActionsEditProfilePhotoContainer>
                            <TouchableOpacity onPress={() => navigation.navigate('Camera', { nextGaleryRouteName: "EditRoomImage", routeParams: {} })}>
                                <Image
                                    source={require('../../Assets/Icons/CameraIconRounded.png')}
                                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Galery', { nextRouteName: "EditRoomImage", routeParams: {} })}>
                                <Image source={require('../../Assets/Icons/galeryIconRounded.png')}
                                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                                />
                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <Image source={ require('../../Assets/Icons/blockIconRounded.png')} />
                            </TouchableOpacity> */}
                            <TouchableOpacity>
                                <Image source={require('../../Assets/Icons/deleteIconRounded.png')}
                                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                                />
                            </TouchableOpacity>
                        </ActionsEditProfilePhotoContainer>
                    </ProfilePhotoContainer>

                    <RoomNameInput setText={setRoomName} textValue={roomName} />


                </ContentPage>
            </ConfigRoomContainer>
        </SafeAreaViewContainer >
    )
}