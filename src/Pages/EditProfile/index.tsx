import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

import {
    ActionsEditProfilePhotoContainer,
    ImageProfile,
    ProfilePhotoContainer,
    IconEditProfilePhoto,
    Label,
    TextInputBox,
    SectionDescription,
    SectionName,
    ContactInfoContainer,
    LabelBio,
    ShowContactText,
    ShowContactoInfoContainer,
} from './style'

import {
    Container,
    ContentPage,
    SafeAreaViewContainer
} from '../../Components/elementsComponents'
import Button from '../../Components/Button'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'
import { TextContainer } from '../../Components/configurationsElemetsStyle'
import { fontStyle, theme } from '../../Theme/theme'

import { findProfiles, getProfile, updateProfile } from '../../Service/Profile'
import useCaptureImageStore from '../../GlobalState/zustand.store'
import mime from 'mime';
import { registerProfilePhoto } from '../../Service/UserRegister'
import { typeTheme } from '../../Config/enumTheme'
import useUserProfile from '../../GlobalState/userProfile.zustand'

import { InputCount } from '../Publication/style'
import HeaderEdit from './HeaderEdit'
import Info from '../../Components/Info'

import ImagePicker from 'react-native-image-crop-picker'
import ToggleSwitch from '../../Components/ToggleSwitch'

export interface profile {
    userName: string,
    userEmail: string,
    userPhone: string,
    userNickname: string,
    userBio: string,
    userBirthday: string,
    site: string,
    gender: string
    profileImage?: string
    alternativePhone: string
    alternativeMail: string
    showAlternativeContact: number
    notifications: number
    allow_spoiler: number
}

interface documentProps {
    mime: string | null,
    path: string,
    fileName: string
}

export default function EditProfile() {

    const navigation = useNavigation<StackRoutes>()
    const [userProfile, setUserProfile] = useState<profile | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userNameProfile, setuserNameProfile] = useState<string>("")
    const [userEmail, setuserEmail] = useState<string>("")
    const [userPhone, setuserPhone] = useState<string>("")
    const [userNicknameProfile, setuserNicknameProfile] = useState<string>("")
    const [userBio, setuserBio] = useState<string>("")

    const [alternativeMail, setAlternativeMail] = useState("")
    const [alternativePhone, setAlternativePhone] = useState("")

    const [userBirthday, setuserBirthday] = useState<string>("")
    const [site, setsite] = useState<string>("")
    const [gender, setgender] = useState<string>("")
    const [showSmallPopup, setshowSmallPopup] = useState(false)

    const [dayBirthday, setdayBirthday] = useState<string>('')
    const [monthBirthday, setmonthBirthday] = useState<string>('')
    const [yearBirthday, setyearBirthday] = useState<string>('')
    const [infoBirthday, setInfoBirthday] = useState<{
        dia: string,
        mes: string,
        ano: string
    }>()

    const [imageProfileSelected, setImageProfileSelected] = useState<documentProps | null>(null)
    const { user, initializeProfile } = useUserProfile()
    const [imageProfileShowing, setimageProfileShowing] = useState<string>('')
    const { captureImage, setCaptureImage } = useCaptureImageStore()

    const [showInfoOnProfile, setShowInfoOnProfile] = useState<boolean>(false)


    const backClearImage = () => {
        setCaptureImage([])
        setimageProfileShowing('')

    }

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true)
            try {
                const response = await getProfile()
                setUserProfile(response.data)
            } catch (error) {
                console.error('Erro ao obter o perfil:', error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [])

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
            mediaType: 'photo',
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            cropperTintColor: 'blue',
            height: 200,
            cropping: true,
        }).then((image) => {
            setImageProfileSelected({
                path: image.path,
                fileName: image.filename || '',
                mime: image.mime
            })
        })
            .catch((e) => {
                console.warn('ImagePicker OpenPicker - EditProfile')
                console.log(e)
            })
    }

    useEffect(() => {
        setuserNameProfile(user?.userName || "")
        setuserEmail(user?.userEmail || "")
        setuserPhone(user?.userPhone || "")
        setuserNicknameProfile(user?.userNickname || "")
        setuserBio(user?.userBio || "")
        setuserBirthday(user?.userBirthday || "")
        setsite(user?.site || "")
        setgender(user?.gender || "")
        setAlternativeMail(user?.alternativeMail || "")
        setAlternativePhone(user?.alternativePhone || "")
        setShowInfoOnProfile(user?.showAlternativeContact == 1 ? true : false)
        setimageProfileShowing(user?.profileImage || "")
    }, [])

    useEffect(() => {
        if (captureImage.length > 0) {
            setImageProfileSelected({
                path: captureImage[captureImage.length - 1].uri,
                fileName: captureImage[captureImage.length - 1].filename,
                mime: mime.getType(captureImage[captureImage.length - 1].uri)
            })
            setimageProfileShowing(captureImage[captureImage.length - 1]?.uri)
        } else {
            setimageProfileShowing(user?.profileImage)
        }
    }, [captureImage])

    useEffect(() => {
        setuserBirthday(`${dayBirthday}/${monthBirthday}/${yearBirthday}`)
    }, [yearBirthday, monthBirthday, dayBirthday])

    useEffect(() => {
        if (user.userBirthday) {
            setInfoBirthday({
                dia: partesDaData[0],
                mes: partesDaData[1],
                ano: partesDaData[2]
            })
        }
    }, [user.userBirthday])


    const dataString = user.userBirthday

    const partesDaData = dataString.split('/')



    let numericMonth = ''
    const monthMap: { [key: string]: string } = {
        'Jan': '01',
        'Fev': '02',
        'Mar': '03',
        'Abr': '04',
        'Mai': '05',
        'Jun': '06',
        'Jul': '07',
        'Ago': '08',
        'Set': '09',
        'Out': '10',
        'Nov': '11',
        'Dez': '12',
    }

    if (monthBirthday in monthMap) {
        numericMonth = monthMap[monthBirthday]
    }

    async function updateThisProflie() {
        var userName = ''
        var userNickname = ''

        if (imageProfileSelected) {
            const data = new FormData();
            data.append('file', {
                uri: imageProfileSelected.path,
                type: imageProfileSelected.mime,
                name: imageProfileSelected.fileName + `${mime.getType(imageProfileSelected.path)?.split("/").pop()}`,
            });

            await registerProfilePhoto(data).then((response) => {
                console.log("enviando foto", response)
                initializeProfile()
            })
                .catch(err => {
                    console.log("erro no upload de imagem", err, err.response.data)
                })
        }

        if (userNameProfile == '') {
            userName = (user?.userName || "")
        } else {
            userName = (userNameProfile);
        }

        if (userNicknameProfile == '') {
            userNickname = (user?.userNickname || "")
        } else {
            userNickname = (userNicknameProfile);
        }

        await updateProfile({
            userName,
            userEmail: userEmail.toLowerCase(),
            userPhone,
            userNickname,
            alternativeMail,
            alternativePhone,
            showAlternativeContact: showInfoOnProfile ? 1 : 0,
            userBio,
            userBirthday: `${infoBirthday?.dia}/${infoBirthday?.mes}/${infoBirthday?.ano}`,
            site,
            gender
        }).then((response) => {
            console.log(response?.data)
            if (response?.data.code == "ER_DUP_ENTRY") {
                setshowSmallPopup(!showSmallPopup);
            } else {
                navigation.push("MyProfileScreen")
            }
            setCaptureImage([])
        }).catch((err) => {
            console.log("erro ao enviar dados", err)
        })
    }


    if (isLoading) {
        return <ActivityIndicator size={20} shouldRasterizeIOS style={{ marginTop: '100%' }} />
    }


    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <HeaderEdit
                    titleHeader='Editar perfil'
                    isFromDestack={true}
                    backClearImage={() => backClearImage()}
                />

                <ContentPage>
                    <ProfilePhotoContainer>
                        <ImageProfile defaultSource={require('../../Assets/Image/profile.png')} source={{ uri: imageProfileSelected ? imageProfileSelected.path : imageProfileShowing }} />

                        <ActionsEditProfilePhotoContainer>
                            <TouchableOpacity onPress={takePhotoFromCamera}>
                                <IconEditProfilePhoto style={{ width: 45, height: 45 }} source={require('../../Assets/Icons/CameraIconRounded.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={takePhotoFromGalery}>
                                <IconEditProfilePhoto style={{ width: 45, height: 45 }} source={require('../../Assets/Icons/galeryIconRounded.png')} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <IconEditProfilePhoto source={require('../../Assets/Icons/blockIconRounded.png')} />
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => backClearImage()}>
                                        <IconEditProfilePhoto style={{ width: 45, height: 45 }} source={require('../../Assets/Icons/deleteIconRounded.png')} />
                                    </TouchableOpacity> */}
                        </ActionsEditProfilePhotoContainer>
                    </ProfilePhotoContainer>

                    <View style={{ gap: 7, paddingTop: 10 }}>
                        <TextContainer>
                            <Label>Nome</Label>
                            <TextInput
                                keyboardType={'default'}
                                style={[styles.input]}
                                onChangeText={setuserNameProfile}
                                value={userNameProfile}
                                placeholder={userProfile?.userName || 'Carregando...'}
                                placeholderTextColor={theme.textligthGray}
                            />
                        </TextContainer>
                        <TextContainer>
                            <Label>Nome de usuário</Label>
                            <TextInput
                                keyboardType={'default'}
                                style={[styles.input]}
                                maxLength={16}
                                onChangeText={setuserNicknameProfile}
                                value={userNicknameProfile.replace(' ', '').toLocaleLowerCase()}
                                placeholder={userProfile?.userNickname || 'Carregando...'}
                                placeholderTextColor={theme.textligthGray}
                            />
                        </TextContainer>
                        <TextContainer>
                            <Label>Website</Label>
                            <TextInput
                                keyboardType={'default'}
                                style={[styles.input]}
                                onChangeText={setsite}
                                value={site.replace(' ', '').toLocaleLowerCase()}
                                placeholder={site}
                                placeholderTextColor={theme.inputTextColor}
                            />
                        </TextContainer>
                        <TextContainer>
                            <LabelBio>Bio</LabelBio>
                            <TextInputBox style={styles.textInputBox}
                                keyboardType={'default'}
                                onChangeText={setuserBio}
                                placeholder={userProfile?.userBio || ''}
                                placeholderTextColor={theme.textligthGray}
                                multiline={true}
                                value={userBio}
                                maxLength={300}
                            />
                        </TextContainer>
                    </View>
                    <InputCount style={{ alignSelf: "flex-end", color: "#c6c6c6" }}>
                        {300 - userBio.length}
                    </InputCount>


                    <ContactInfoContainer>
                        <View>
                            <SectionName>
                                Informações de contato
                            </SectionName>

                            <ShowContactoInfoContainer>
                                <ShowContactText>
                                    Autorizo mostrar no meu perfil
                                </ShowContactText>
                                <ToggleSwitch
                                    value={showInfoOnProfile}
                                    setValue={() => setShowInfoOnProfile(!showInfoOnProfile)}
                                />
                            </ShowContactoInfoContainer>
                            <SectionDescription>
                                Estas informações são de preenchimento opcional para aparecer no seu perfil.
                            </SectionDescription>
                        </View>
                        <TextContainer>
                            <Label>E-mail</Label>
                            <TextInput
                                keyboardType={'default'}
                                style={[styles.input]}
                                value={alternativeMail}
                                onChangeText={setAlternativeMail}
                                placeholder={userProfile?.alternativeMail || 'Não definido'}
                                placeholderTextColor={theme.textligthGray}
                            />
                        </TextContainer>
                        <TextContainer>
                            <Label>Telefone</Label>
                            <TextInput
                                keyboardType={'default'}
                                style={[styles.input]}
                                value={alternativePhone}
                                onChangeText={setAlternativePhone}
                                placeholder={userProfile?.alternativePhone || 'Não definido'}
                                placeholderTextColor={theme.textligthGray}
                            />
                        </TextContainer>
                    </ContactInfoContainer>

                    {/*
                         <PersonalInformationsContainer>
                                <View>
                                    <SectionName>
                                        Informações pessoais
                                    </SectionName>
                                    <SectionDescription>
                                        Estas informações são privadas e não aparecem
                                        no seu perfil.
                                    </SectionDescription>
                                </View>

                                <TextContainer>
                                    <Label>E-mail</Label>
                                    <TextInput
                                        keyboardType={'default'}
                                        style={[styles.input]}
                                        onChangeText={setuserEmail}
                                        value={userEmail}
                                        placeholder={userProfile?.userEmail || 'Carregando...'}
                                        placeholderTextColor={theme.textligthGray}
                                    />
                                </TextContainer>
                                <TextContainer>
                                    <Label>Telefone</Label>
                                    <TextInput
                                        keyboardType={'default'}
                                        style={[styles.input]}
                                        onChangeText={setuserPhone}
                                        value={userPhone}
                                        placeholder={userProfile?.userPhone || 'Carregando...'}
                                        placeholderTextColor={theme.textligthGray}
                                    />
                                </TextContainer>

                                <InputIconProfile
                                    label='Gênero'
                                    placeholder={user.gender}
                                    placeholderTextColor={theme.textligthGray}
                                    stylesInput={{ width: '79%', marginTop: -6, paddingBottom: 5 }}
                                    onPress={() => navigation.navigate("Gender")}
                                    icon={
                                        <Ionicons
                                            name='chevron-forward'
                                            size={20}
                                            color={'#5e5e5e'}
                                        />
                                    }
                                />
                                {infoBirthday && (
                                    <FlexContentDateBirthday>
                                        <LabelBirth>Data de nascimento</LabelBirth>
                                        <SelectDropdown
                                            renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                                            buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 30 }]}
                                            buttonStyle={styles.selctDropDownButtonStyle}
                                            data={days}
                                            rowTextStyle={{ color: theme.inputTextColor, fontSize: 14 }}
                                            defaultButtonText={infoBirthday.dia}
                                            onSelect={(selectedItem) => {

                                                setInfoBirthday({ dia: selectedItem, mes: infoBirthday.mes, ano: infoBirthday.ano })

                                            }}
                                        />
                                        <SelectDropdown
                                            renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                                            buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 30 }]}
                                            buttonStyle={styles.selctDropDownButtonStyle}
                                            data={monthsName}
                                            rowTextStyle={{ color: theme.inputTextColor, fontSize: 14 }}
                                            defaultButtonText={infoBirthday.mes}
                                            onSelect={(selectedItem) => setInfoBirthday({ dia: infoBirthday.dia, mes: selectedItem, ano: infoBirthday.ano })}
                                        />
                                        <SelectDropdown
                                            renderDropdownIcon={() => <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />}
                                            dropdownStyle={{ width: "19%", backgroundColor: "#FFF" }}
                                            buttonTextStyle={[styles.selectDropDownButtonTextStyle, { left: 28 }]}
                                            buttonStyle={styles.selctDropDownButtonStyle}
                                            data={yearsArray()}
                                            rowTextStyle={{ color: theme.inputTextColor, fontSize: 14 }}
                                            defaultButtonText={infoBirthday.ano}
                                            onSelect={(selectedItem) => setInfoBirthday({ dia: infoBirthday.dia, mes: infoBirthday.mes, ano: selectedItem })}
                                        />
                                    </FlexContentDateBirthday>
                                )}

                            </PersonalInformationsContainer>
                            */}
                </ContentPage>

                <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={'Nome de usuário já em uso.'} />

                <Button
                    pressFunction={() => updateThisProflie()}
                    textButton="Salvar"
                    typebutton={typeTheme.default}
                />
            </Container>

        </SafeAreaViewContainer>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 270,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 6,
        paddingBottom: 4,
        position: "relative",
        color: theme.textligthGray,
        fontSize: 13,
        fontFamily: fontStyle.regular,
        borderColor: '#ababab',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 12
    },

    input2: {
        width: 270,
        paddingRight: 10,
        paddingLeft: 4,
        paddingTop: 6,
        paddingBottom: 3,
        position: "relative",
        color: theme.textligthGray,
        fontSize: 13,
        fontFamily: fontStyle.regular,
        borderColor: '#ababab',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    textInputBox: {
        paddingLeft: 13,
        textAlignVertical: 'top',
        color: theme.textligthGray,
        fontSize: 13,
        fontFamily: fontStyle.regular
    },
    selctDropDownButtonStyle: {
        width: '22%',
        height: 32,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "#fff",
    },
    selctDropDownButtonStyleSexo: {
        width: '40%',
        height: 32,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "#ffff",
    },
    selectDropDownButtonTextStyle: {
        color: theme.textligthGray,
        fontSize: 13,
        fontFamily: fontStyle.regular,
        position: 'absolute',
    },
});