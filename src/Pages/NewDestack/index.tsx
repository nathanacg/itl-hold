import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import {
    TextHeader,
    TextOptionSelectedBottom,
    CameraIcon,
    ImageAlbum,
    ImageAlbumContainer,
    StoryOptions,
    OptionText,
    ImageAlbumContainerNoValue,
    TextOptionSelected,
    TextInputTitle,
    ImageCameraIcon,
    ImageGaleryIcon,
    PaddingBottoms
} from "./style"

import {
    SafeAreaViewContainer,
    Container
} from '../../Components/elementsComponents';

import mime from 'mime';
import ImagePicker from 'react-native-image-crop-picker'

import {
    ContentainerConfigurations,
    TextContainer,
    TextSelection
} from '../../Components/configurationsElemetsStyle';

import Header from '../../Components/Header';

import { fontStyle, theme } from '../../Theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import useCreateDesctack from '../../GlobalState/createDesctack.zustand';
import BottomModal from '../../Components/BottomModal';
import RadioButton from '../../Components/RadioButton';
import useDestackInfoStore from '../../GlobalState/destacksInfo.zustand';
import Info from '../../Components/Info';
import { DocumentPickerResponse } from 'react-native-document-picker';

export default function NewDestack() {
    const navigation = useNavigation<StackRoutes>();
    const { destackImage, setDestackImage, setDestackName, verificationDetack, setDestackId } = useDestackInfoStore()
    const [showSmallPopup, setshowSmallPopup] = useState<boolean>(false)
    const route = useRoute();
    const params = route.params as { IdDestack: number }
    const [inputValue, setInputValue] = useState("")
    const { captureImage, setCaptureImage } = useCaptureImageStore()
    const [selectCameraGalery, setSelectCameraGalery] = useState<boolean>(false)
    const [typeOfDistack, setTypeOfDistack] = useState<'Story' | 'Post' | string>('any')
    const [result, setResult] = useState<DocumentPickerResponse[]>([]);
    const [textPopup, setTextPopup] = useState<string>('')

    const takePhotoFromGalery = async () => {
        await ImagePicker.openPicker({
            width: 200,
            cropperCircleOverlay: false,
            maxFiles: 1,
            writeTempFile: true,
            compressImageQuality: 0.8,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            cropperTintColor: 'blue',
            height: 200,
            forceJpg: true,
            cropping: true,
        }).then((image) => {
            const timestamp = new Date().getTime();

            const uniqueName = `image_${timestamp}.jpg`;
            return (
                setResult([{
                    uri: image.path,
                    name: uniqueName,
                    type: image.mime,
                    fileCopyUri: "",
                    size: 0
                }])
            )

        })
            .catch((e) => {
                console.warn('ImagePicker OpenPicker - EditProfile')
                console.log(e)
            })
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            cropperCircleOverlay: false,
            maxFiles: 1,
            writeTempFile: true,
            compressImageQuality: 0.8,
            useFrontCamera: false,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            height: 200,
            forceJpg: true,
            cropping: true,
        }).then((image) => {
            const timestamp = new Date().getTime();

            const uniqueName = `image_${timestamp}.jpg`;
            return (
                setResult([{
                    uri: image.path,
                    name: uniqueName,
                    type: image.mime,
                    fileCopyUri: "",
                    size: 0
                }])
            )

        })
            .catch((e) => {
                console.warn('ImagePicker - EditProfile')
                console.log(e)
            })
    }

    const handleAdvance = () => {
        if (inputValue && destackImage) {
            makeDestack();
        }
    }

    const makeDestack = () => {
        const title = inputValue;
        if (inputValue == '') {
            setTextPopup('É preciso escolher o nome do destaque')
            setshowSmallPopup(true)
            return
        }

        if (result.length < 1) {
            setTextPopup('É necessário escolher uma imagem')
            setshowSmallPopup(true)
            return
        }

        if (typeOfDistack == 'any') {
            setTextPopup('É necessário escolher o tipo do destaque')
            setshowSmallPopup(true)
            return
        }

        if (destackImage && typeOfDistack == 'Post') {
            setDestackName(title)
            setDestackImage({
                name: result[0].name + `${mime.getType(destackImage.uri)?.split("/").pop()}` + ".jpg",
                uri: result[0].uri,
                mime: result[0].type,
            })
            navigation.push('ListOfPubli');
        } else {
            setDestackName(title)
            setDestackImage({
                name: result[0].name + `${mime.getType(destackImage.uri)?.split("/").pop()}` + ".jpg",
                uri: result[0].uri,
                mime: result[0].type,
            })
            navigation.push('ListOfStory');
        }
    };

    const funcnavigationBack = () => {
        setResult([])
        navigation.pop()
    }

    return (
        <>
            <SafeAreaViewContainer>
                <Container>
                    {verificationDetack == true ? (
                        <Header
                            titleHeader='Novo destaque'
                            actionHeaderElement={
                                <TouchableOpacity onPress={handleAdvance}>
                                    <TextHeader>Avançar</TextHeader>
                                </TouchableOpacity>
                            }
                            setFunction={() => { funcnavigationBack() }}
                        />
                    ) : (
                        <Header
                            titleHeader='Editar destaque'
                            actionHeaderElement={
                                <TouchableOpacity onPress={() => { }}>
                                    <TextHeader>Avançar</TextHeader>
                                </TouchableOpacity>
                            }
                        />
                    )}

                    <ContentainerConfigurations>
                        <View>
                            <TextContainer>
                                <TextOptionSelectedBottom>
                                    Título do Destaque
                                </TextOptionSelectedBottom>
                                <TextInputTitle
                                    keyboardType={'default'}
                                    onChangeText={(newText: string) => {
                                        if (newText.length <= 10) {
                                            setInputValue(newText);
                                        }
                                    }}
                                    placeholder={''}
                                    placeholderTextColor="#c6c6c6"
                                    value={inputValue}
                                />
                            </TextContainer>
                        </View>

                        {verificationDetack &&
                            <PaddingBottoms>
                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setTypeOfDistack('Post') }}>
                                    <RadioButton
                                        value={typeOfDistack === 'Post' && true}
                                        setValue={() => setTypeOfDistack("Post")}
                                    />
                                    <TextOptionSelected>Publicação</TextOptionSelected>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 2 }} onPress={() => { setTypeOfDistack('Story') }}>
                                    <RadioButton
                                        value={typeOfDistack === 'Story' && true}
                                        setValue={() => setTypeOfDistack("Story")}
                                    />
                                    <TextOptionSelected>Cartaz</TextOptionSelected>
                                </TouchableOpacity>
                            </PaddingBottoms>
                        }

                        {result[0]?.uri != '' && (
                            <View>
                                <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center', gap: 16, marginTop: -4 }}>
                                    <TextOptionSelectedBottom>Selecione a capa</TextOptionSelectedBottom>
                                    <TouchableOpacity onPress={() => {
                                        setResult([]),
                                            takePhotoFromGalery()
                                    }}>
                                        <Image source={require('../../Assets/Icons/galeryGrey.png')} style={{ width: 20, height: 20, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        setResult([]),
                                            takePhotoFromCamera()
                                    }}>
                                        <Image source={require('../../Assets/Icons/camera.png')} style={{ width: 19.5, height: 19.5, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                </View>

                                <ImageAlbumContainer>
                                    <ImageAlbum source={{ uri: result && result[0]?.uri }} />
                                </ImageAlbumContainer>
                            </View>
                        )}

                    </ContentainerConfigurations>
                </Container>
            </SafeAreaViewContainer>

            <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={textPopup} />
        </>
    );
};
