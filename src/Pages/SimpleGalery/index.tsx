import React, { useEffect, useState } from 'react';

import { TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"

import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";


import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import { StackRoutes } from '../../Routes/StackTypes';
import { Icon } from 'react-native-elements';
import { getPhotosDevice } from '../../Utils/React-native-camera-row';
import { Container, Image } from '../Galery/style';
import { Header } from './style';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { generateSequence } from '../Camera/script';

export default function SimpleGalery() {
    const navigation = useNavigation<StackRoutes>();
    const route = useRoute()
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([])
    const params = route.params as {nextRouteName:'EditProfilePhoto', routeParams: any}

    const {captureImage, setCaptureImage } = useCaptureImageStore()
    
    useEffect(() => {
        getPhotosDevice({ setPhotos })
    }, [])

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                       <Icon
                            name='close-outline'
                            type='ionicon'
                            color={"#fff"}
                            size={40}
                       />
                    </TouchableOpacity>
                </Header>

                <FlatList
                    data={photos}
                    numColumns={4}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            setCaptureImage([...captureImage, {
                                height: item.node.image.height,
                                uri: item.node.image.uri,
                                width: item.node.image.width,
                                extension: item.node.image.extension,
                                filename: generateSequence()
                            }])
                            navigation.navigate(params.nextRouteName, params.routeParams)}}>
                            <Image
                                key={index}
                                source={{ uri: item.node.image.uri }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </Container>
        </SafeAreaViewContainer>
    );
};
