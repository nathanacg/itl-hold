import React, { useState, useEffect, SetStateAction } from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import Header from '../../Components/Header';

import {
    SafeAreaViewContainer,
    TextInputBox
} from '../../Components/elementsComponents';

import { ContentainerConfigurations, Text } from '../../Components/configurationsElemetsStyle';
import { fontStyle, theme } from '../../Theme/theme';
import { ContianerRecaptcha, TextLight, TextLimitCaracters } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalElement from '../../Components/Modal';
import { Icon } from 'react-native-elements';
import Button from '../../Components/Button';
import { typeTheme } from '../../Config/enumTheme';

import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker'

import { sendContact } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import useCreatePost from '../../GlobalState/createPost.zustand';
import mime from 'mime';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import ImageCropPicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentSelected from '../../Components/DocumentSelected';

interface ContactProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

interface documentProps {
    mime: string,
    uri: string,
    name: string | null
}

export default function ContactUs(props: ContactProps) {

    const [result, setResult] = useState<DocumentPickerResponse[]>([]);
    const [photo, setPhoto] = useState<documentProps[]>([]);

    const [iamBot, setIamBot] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [inputValue, setInputValue] = useState<string>('')

    const navigation = useNavigation<StackRoutes>()

    const { user: userProfile } = useUserProfile()

    useEffect(() => {
        setTimeout(() => {
            if (showModal) {
                setShowModal(false)
                navigation.push("Help")
            }
        }, 1200)
    }, [showModal])

    const pickDocument = async () => {
        try {
            const pickedResult = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                allowMultiSelection: true
            });

            setResult(pickedResult)

            if (pickedResult.length === 0) {
                console.log('Nenhum documento selecionado');
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Usuário cancelou a seleção');
            } else {
                console.log('Erro ao selecionar o documento: ' + err);
            }
        }
    };

    async function handleSubmit() {

        const form = new FormData()
        form.append('file', {
            uri: result[0].uri,
            type: mime.getType(result[0].uri),
            name: result[0].name + ".jpg",
        })
        form.append('description', inputValue)
        form.append('userId', userProfile.userId)
        try {
            await sendContact(form)
                .then(res => setShowModal(!showModal))

        } catch (error) {
            console.log('Error ao enviar os parametros: ', error)
        }
    }

    const takePhotoFromGalery = async () => {
        await ImagePicker.openPicker({
            width: 200,
            cropperCircleOverlay: false,
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


    return (
        <SafeAreaViewContainer>
            {iamBot ? (
                <ModalElement
                    setvisibleBottonModal={props.setvisibleBottonModal}
                    isModalVisible={showModal}
                    iconModal={<Icon
                        name='check-circle'
                        type='feather'
                        color={"#049908"}
                        size={50}
                    />}
                    textModal="Mensagem enviada com sucesso."
                    textAlign='center'
                />
            ) : (
                <ModalElement
                    setvisibleBottonModal={props.setvisibleBottonModal}
                    isModalVisible={showModal}
                    iconModal={<Icon
                        name='x-circle'
                        type='feather'
                        color={"#FF0000"}
                        size={50}
                    />}
                    textModal="Ops, algo deu errado."
                    textAlign='center'
                />
            )}
            <ScrollView>
                <Header titleHeader='Entrar em contato' />
                <ContentainerConfigurations>
                    <View>
                        <TextLight>
                            Escreva a sua mensagem, dúvida, relato do que aconteceu
                            ou o que não está funcionando e o que precisamos fazer
                            para ajudar.
                        </TextLight>
                        <TextInputBox
                            style={styles.input}
                            multiline={true}
                            maxLength={300}
                            value={inputValue}
                            onChangeText={setInputValue}
                        />
                        <TextLimitCaracters>{300 - inputValue.length}</TextLimitCaracters>
                    </View>


                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 15 }}>
                        <TextLight>
                            Selecionar arquivo
                        </TextLight>
                        <View style={{ flexDirection: 'row', gap: 20 }}>

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
                            <TouchableOpacity onPress={() => pickDocument()}
                                style={{}}>
                                <MaterialCommunityIcons
                                    name='paperclip'
                                    size={18}
                                    color={'#5D5D5D'}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* {result && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', color: theme.primarycolor }}>{result[0]?.name}</Text>
                        </View>
                    )} */}

                    <DocumentSelected
                        resultLength={result.length}
                        result={result}
                        setResult={(setValue) => setResult(setValue)}
                    />

                    <ContianerRecaptcha>
                        <TouchableOpacity onPress={() => setIamBot(!iamBot)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <MaterialCommunityIcons
                                name={iamBot ? 'radiobox-marked' : 'radiobox-blank'}
                                size={16}
                                color={"#a3a3a3"}
                            />
                        </TouchableOpacity>
                        <TextLight>Não sou um robô</TextLight>
                        <Image source={require('../../Assets/Icons/iconReCaptcha.png')} />
                    </ContianerRecaptcha>
                </ContentainerConfigurations>
            </ScrollView>
            <Button
                pressFunction={handleSubmit}
                textButton="Enviar"
                typebutton={typeTheme.default}
            />
            <View style={{ marginBottom: 30 }} />
        </SafeAreaViewContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        textAlignVertical: 'top',
        color: theme.textligthGray,
        fontSize: 14,
        fontFamily: fontStyle.regular
    },
});
