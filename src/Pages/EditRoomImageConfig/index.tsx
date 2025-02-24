import React, { useEffect, useState } from 'react';

import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { getPhotosDevice } from '../../Utils/React-native-camera-row';
import { Container, Header, Image, ImageSelected, TextHeader, TitleHeader } from './style';

export default function EditRoomImageConfig() {

    const route = useRoute()
    const params = route.params as {
        RoomType: "Pública" | "Privada",
        RoomName: string,
        duration: string,
        category: string,
        startDate?: { date: string, time: string },
        endDate?: { date: string, time: string }
    }

    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<StackRoutes>();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([])
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        getPhotosDevice({
            setPhotos: (loadedPhotos: React.SetStateAction<PhotoIdentifier[]>) => {
                setPhotos(loadedPhotos);
                setLoading(false);
            }
        });
    }, []);

    const handleImageSelect = (uri: string) => {
        setSelectedImage(uri);
    };


    return (
        <SafeAreaViewContainer>
            <Container ShowVerticalScrollIndicator={false}>

                <Header>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <TextHeader color="#231F20">
                            Cancelar
                        </TextHeader>
                    </TouchableOpacity>
                    <TitleHeader>
                        Selecionar imagem
                    </TitleHeader>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <TextHeader color="#0245F4">
                            Salvar
                        </TextHeader>
                    </TouchableOpacity>
                </Header>


                {selectedImage && (
                    <ImageSelected defaultSource={require('../../Assets/Image/background_app.png')} source={{ uri: selectedImage }} />
                )}

                {loading ? (
                    <ActivityIndicator style={{ marginTop: 320 }} size="large" color="#0000ff" />
                ) : (

                    <FlatList
                        data={photos}
                        numColumns={4}
                        scrollEnabled={false}
                        keyExtractor={(item) => "photo" + item.node.timestamp}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => {
                                handleImageSelect(item.node.image.uri)
                            }}>
                                <Image
                                    key={index}
                                    source={{ uri: item.node.image.uri }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}
            </Container>
        </SafeAreaViewContainer>
    );
};
