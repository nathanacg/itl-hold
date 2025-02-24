import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AssetType, PhotoIdentifier, CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Header, Image, ImageContainer } from './style';
import { SafeAreaViewContainer4 } from '../../Components/elementsComponents';
import { StackRoutes } from '../../Routes/StackTypes';
import { Icon } from 'react-native-elements';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { generateSequence } from '../Camera/script';
import { theme } from '../../Theme/theme';


export default function Galery() {

    const { captureImage, setCaptureImage } = useCaptureImageStore()

    const navigation = useNavigation<StackRoutes>()
    const route = useRoute()

    const params = route.params as { nextRouteName: 'EditProfilePhoto'; routeParams: any; assetType?: AssetType }
    const [medias, setMedias] = useState<PhotoIdentifier[]>([])

    const openMedias = async () => {
        CameraRoll.getAlbums().then((res) => console.log(res))
        CameraRoll.getPhotos({
            assetType: params.assetType,
            first: 100,
        }).then((res) => {
            console.log(res.edges)
            setMedias(res.edges)
        }).catch((err) => {
            console.log("Deu erro ao buscar galeria.", err)
            console.warn("Deu erro ao buscar galeria as midias.")
        })
    }

    useEffect(() => {
        openMedias()
    }, [])

    const handleImagePress = (item: PhotoIdentifier) => {
        var assetURI: string

        if (Platform.OS === 'ios' && item.node.type === 'video') {

            const phURI = item.node.image.uri
            const uriId = phURI.split('/')[2]

            assetURI = `assets-library://asset/asset.mp4?id=${uriId}&ext=mp4`
        } else {

            assetURI = item.node.image.uri
        }

        setCaptureImage([
            ...captureImage,
            {
                height: item.node.image.height,
                uri: assetURI,
                width: item.node.image.width,
                extension: item.node.image.extension,
                filename: generateSequence(),
            },
        ]);

        navigation.push(params.nextRouteName, params.routeParams);
    };



    return (
        <SafeAreaViewContainer4>
            <FlatList
                style={{ backgroundColor: theme.textDark }}
                ListHeaderComponent={
                    <Header>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="close" type="EvilIcons" color="#fff" size={30} />
                        </TouchableOpacity>
                    </Header>
                }
                data={medias}
                numColumns={4}
                keyExtractor={(item) => 'image' + item.node.timestamp}
                renderItem={({ item, index }) => (
                    <ImageContainer onPress={() => handleImagePress(item)}>
                        <Image source={{ uri: item.node.image.uri }} />
                    </ImageContainer>
                )}
            />
        </SafeAreaViewContainer4>
    );
}
