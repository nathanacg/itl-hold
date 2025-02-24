import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { StyleSheet, View, TouchableOpacity, BackHandler } from 'react-native'
import Header from '../../Components/HeaderCrateAccount'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import BottomModal from '../../Components/BottomModal'

import { typeTheme } from '../../Config/enumTheme'
import { theme, fontStyle } from '../../Theme/theme'

import { registerProfilePhoto, registerProfile, activateUser, registerUser } from '../../Service/UserRegister'

import ImagePicker from 'react-native-image-crop-picker'

import profileIcon from '../../Assets/Image/profile.png'
import cameraIcon from '../../Assets/Image/cameraIcon.png'


import {
    Container,
    ContentPage,
    BoldDarkBlue,
    TitlePagelight,
    SafeAreaViewContainer,
    TextOptionSelectedBottom,
    TextInputBox,
    TextCountLimitCaractersBio
} from '../../Components/elementsComponents'

import {
    ProfileImageContent,
    ProfileIcon,
    TextLabel,
    TextLabelBold,
    PrivateProfileContent,
    CameraIcon,
} from './style'

import useCaptureImageStore from '../../GlobalState/zustand.store'

import mime from 'mime'

import { getStoreObject, setStoreItem } from '../../Lib/asyncStorage'
import useUserProfile from '../../GlobalState/userProfile.zustand'

import ToggleSwitch from '../../Components/ToggleSwitch'
import { TextErrorPhoto } from '../../Components/Input/style'
import userToken from '../../GlobalState/userToken.zustand'
interface documentProps {
    mime: string | null,
    path: string,
    fileName: string
}
interface IUser {
    userName: string
    userEmail: string
    userPhone: string
    userBirthday: string
    userPassword: string
}

export default function CompletAccount() {
    const navigation = useNavigation<StackRoutes>()

    const [bio, setBio] = useState<string>("")
    const [username, setusername] = useState<string>('')
    const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
    const [newUser, setNewUser] = useState<IUser>()

    const [errNickName, setErrNickName] = useState<boolean>(false)
    const [photoExists, setPhotoExists] = useState<boolean>(false)


    const [imageProfileSelected, setImageProfileSelected] = useState<documentProps>()

    const { captureImage, setCaptureImage } = useCaptureImageStore()

    const { initializeProfile } = useUserProfile()

    const { token } = userToken()

    const [privateAccount, setPrivateAccount] = useState<boolean>()


    const validateUsername = (username: string): boolean => {
        return username.trim() !== '' && username.charAt(0) === '@'
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 200,
            cropperCircleOverlay: true,
            maxFiles: 1,
            writeTempFile: true,
            compressImageQuality: 0.8,
            useFrontCamera: true,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            height: 200,
            forceJpg: true,
            cropping: true,
        }).then((image) => {
            setImageProfileSelected({
                path: image.path,
                fileName: image.filename || '',
                mime: image.mime
            })
            setvisibleBottonModal(false)
        })
            .catch((e) => {
                console.warn('ImagePicker - EditProfile')
                console.log(e)
            })
    }

    const takePhotoFromGalery = async () => {
        await ImagePicker.openPicker({
            width: 200,
            cropperCircleOverlay: true,
            maxFiles: 1,
            smartAlbums: ['UserLibrary'],
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
            setImageProfileSelected({
                path: image.path,
                fileName: image.filename || '',
                mime: image.mime
            })

            setvisibleBottonModal(false)
        })
            .catch((e) => {
                console.warn('ImagePicker OpenPicker - EditProfile')
                console.log(e)
            })
    }

    async function senProflie() {

        if (imageProfileSelected) {
            const data = new FormData()
            data.append('file', {
                uri: imageProfileSelected.path,
                type: imageProfileSelected.mime,
                name: imageProfileSelected.fileName + `.${mime.getType(imageProfileSelected.path)?.split("/").pop()}`,
            })

            registerProfilePhoto(data).then((response) => { console.log("enviando foto", response) }).catch(err => {
                console.log("erro no upload de imagem", err, err.response.data)
            })
        } else {
            setPhotoExists(true)
            return
        }

        if (!validateUsername(username)) {
            setErrNickName(true)
            return
        }

        await registerProfile({
            userNickname: username.replace("@", ""),
            userBio: bio,
            userPrivate: privateAccount ? true : false,
            private_account: privateAccount ? 1 : 0
        }).then(async () => {
            setErrNickName(false)
            initializeProfile()
            await setStoreItem("@intellectus:stayConnected", `${true}`)
            await setStoreItem("@intellectus:tokenNewUser", token)
            await setStoreItem("@intellectus:tokenUser", token)
            activateUser(1).then((response) => {
                console.log("Usuário ativado.", response.data.userId)
            }).catch((err) => {
                console.log("Erro ao ativar o usuário", err.response.data)
            })

            navigation.navigate("Mural")

            setCaptureImage([])

        }).catch((err) => {
            console.log("erro ao enviar dados", err.response.data)
            setErrNickName(true)
        })

    }

    useEffect(() => {
        const backAction = () => {
            return true
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )
        return () => backHandler.remove()
    }, [])

    useEffect(() => {
        if (captureImage.length > 0) {
            setImageProfileSelected({
                path: captureImage[captureImage.length - 1].uri,
                fileName: captureImage[captureImage.length - 1].filename,
                mime: mime.getType(captureImage[captureImage.length - 1].uri)
            })
        }
    }, [captureImage])

    useEffect(() => {
        (async () => {
            const userStorage = await getStoreObject("@intellectus:User")
            setNewUser(userStorage)
        })()
    }, [])

    return (
        <SafeAreaViewContainer>
            <BottomModal
                visibleBottonModal={visibleBottonModal}
                setvisibleBottonModal={setvisibleBottonModal}
                title="Foto do perfil"
                children={
                    <>
                        <TouchableOpacity onPress={takePhotoFromCamera}>
                            <TextOptionSelectedBottom>Câmera</TextOptionSelectedBottom>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePhotoFromGalery}>
                            <TextOptionSelectedBottom>Galeria</TextOptionSelectedBottom>
                        </TouchableOpacity>
                    </>
                }
            />
            <Container
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraHeight={250}
                scrollEnabled={true}
            >
                <Header />
                <ContentPage>
                    <TitlePagelight><BoldDarkBlue>Completar</BoldDarkBlue> conta</TitlePagelight>
                    <ProfileImageContent>
                        <View>
                            <TouchableOpacity onPress={() => setvisibleBottonModal(true)}>
                                {imageProfileSelected ? (
                                    <ProfileIcon rounded={true} source={{ uri: imageProfileSelected.path }} />
                                ) : (
                                    <ProfileIcon rounded={true} source={profileIcon} />
                                )}
                            </TouchableOpacity>
                            <View style={{ marginTop: -30, right: -100, position: 'relative' }}>
                                <CameraIcon resizeMode="contain" source={cameraIcon} />
                            </View>
                        </View>

                    </ProfileImageContent>
                    {photoExists && <TextErrorPhoto>Colocar foto para o perfil.</TextErrorPhoto>}
                    <Input
                        label=""
                        labelComponent={<TextLabel>
                            <TextLabelBold>Nome de usuário </TextLabelBold>- escolha um nome para o seu perfil
                        </TextLabel>}
                        onSetText={setusername}
                        type="username"
                        placeholder="@"
                        value={username.charAt(0) !== '@' ? ('@' + username.substr(1)) : (username)}
                        error={errNickName}
                        textError={!username ? "Insira seu nome de usuário" : "Nome de usuário já em uso"}
                    />

                    <TextLabelBold>Sua bio</TextLabelBold>
                    <TextInputBox
                        style={styles.input}
                        multiline={true}
                        maxLength={300}
                        value={bio}
                        onChangeText={setBio}
                    />
                    <TextCountLimitCaractersBio>{300 - bio.length}</TextCountLimitCaractersBio>

                    <PrivateProfileContent>
                        <View style={{ maxWidth: '90%' }}>
                            <TextLabelBold>Perfil privado</TextLabelBold>
                            <TextLabel>
                                As pessoas precisam pedir autorização para seguir seu perfil.
                            </TextLabel>
                        </View>
                        <ToggleSwitch
                            value={privateAccount}
                            setValue={() => {
                                setPrivateAccount(!privateAccount)
                            }}
                        />
                    </PrivateProfileContent>
                </ContentPage>
                <Button
                    pressFunction={() => senProflie()}
                    textButton="Avançar"
                    typebutton={typeTheme.default}
                />
            </Container>
        </SafeAreaViewContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        textAlignVertical: 'top',
        color: theme.inputTextColor,
        fontSize: 13,
        fontFamily: fontStyle.regular
    },
})