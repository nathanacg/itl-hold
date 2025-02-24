import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native"
import {
    TextActionHeader,
    ImageFolderContainer,
    Image,
    TextInput
} from "./style"

import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, SafeAreaViewContainer } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import imageFolder from "../../Assets/Image/Billie.png"
import { StackRoutes } from '../../Routes/StackTypes';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { ImageAlbum } from '../Album/style';
import { updateFolder } from '../../Service/Profile';


export default function CreateAndEditFolderSavedItens() {
    const route = useRoute()
    const navigation = useNavigation<StackRoutes>();
    const [foldersName, setFoldersName] = useState('');
    const [idFolder, setIdFolder] = useState('');
    const [showSelectOppenMedia, setShowSelectOppenMedia] = useState<boolean>(false)
    const [result, setResult] = useState<DocumentPickerResponse[]>([]);



    const { foldersname, idfolder, photoFolder } = route.params || {};


    const pickDocument = async () => {
        try {
            const pickedResult = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
                allowMultiSelection: true
            });

            setResult(pickedResult);

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

    const inSearch = async () => {
        const fistObject = (result[0]);
        const idFolders = (idfolder);
        const foldersNames = (foldersName);


        try {
            updateFolder(idFolders, foldersNames, fistObject);
            return;
        } catch (error) {
            console.log('Error on push the form to backend: ', error)
        }
    };

    const params = route.params as { name: string }
    return (
        <SafeAreaViewContainer>
            <Container>
                <Header
                    titleHeader={'Editar pasta'}
                    actionHeaderElement={
                        <TouchableOpacity onPress={() => { inSearch(), navigation.navigate("ProfileMenu") }}>
                            <TextActionHeader>
                                {'Salvar'}
                            </TextActionHeader>
                        </TouchableOpacity>
                    }
                />
                <TouchableOpacity onPress={() => pickDocument()}>
                    {result.length > 0 ? (
                        <>
                            {result.map((res, index) => (
                                <ImageFolderContainer>
                                    <Image style={{ width: 200, height: 200 }} source={{ uri: res.uri }} />
                                </ImageFolderContainer>
                            ))}
                        </>
                    ) : (
                        <ImageFolderContainer>
                            <Image style={{ width: 200, height: 200 }} source={{ uri: photoFolder }} />
                        </ImageFolderContainer>
                    )}
                </TouchableOpacity>
                <TextInput
                    onChangeText={(text: string) => setFoldersName(text)}
                    placeholder={foldersname}
                />
            </Container>
        </SafeAreaViewContainer>
    );
};
