import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

import {
    SafeAreaViewContainer,
    TextSimple
} from '../../Components/elementsComponents'

import { useNavigation, useRoute } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { BottomContain, GaleryContainer, Header, TextBold } from './style'


import useCaptureImageStore from '../../GlobalState/zustand.store'
import useGaleryData from '../../GlobalState/galeryData.zustand'

import CardGalery from '../../Components/CardGalery'
import { theme } from '../../Theme/theme'
import Info from '../../Components/Info'

export default function PubliGalery() {

    const route = useRoute()
    const params = route.params as { nextGaleryRouteName: StackRoutes, routeParams: any }

    const { setCaptureImage, captureImage } = useCaptureImageStore()

    const navigation = useNavigation<StackRoutes>()



    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [popoutText, setPopoutText] = useState('')

    const handlePopout = (text: string) => {
        setPopoutText(text)
        setshowSmallPopup(true)
    }

    const { imagesList } = useGaleryData()

    const handleCancel = () => {

        setCaptureImage([])

        navigation.pop()
    }

    useEffect(() => {

        if (captureImage.length > 10) {
            handlePopout('Limite de 10 arquivos para selecionar')
            setCaptureImage([])
        }


    }, [captureImage])

    const toggleSelection = (index: number) => {
        let newNumbers: number[] = [...selectedNumbers];
        if (newNumbers.includes(index)) {
            newNumbers = newNumbers.filter((num) => num !== index);
        } else {
            newNumbers.push(index);
        }
        setSelectedNumbers(newNumbers);
    };

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const getNumberForItem = (index: number) => {
        const selectedIndex = selectedNumbers.indexOf(index);
        return selectedIndex !== -1 ? selectedIndex + 1 : 0;
    };

    return (
        <>
            <SafeAreaViewContainer>
                <GaleryContainer>
                    <Header>
                    </Header>
                    <FlatList
                        data={imagesList}
                        extraData={imagesList}
                        keyExtractor={(item) => "image" + item.node.image.uri}
                        numColumns={4}
                        renderItem={({ item, index }) =>

                            <CardGalery
                                type={item.node.type}
                                index={index}
                                image={item.node.image}
                                fileurl={item.node.image.uri}
                                markCard={captureImage.length <= 10}
                                marcados={getNumberForItem(index)}
                                onPress={() => { toggleSelection(index) }}
                            />
                        }
                    />
                </GaleryContainer>
            </SafeAreaViewContainer>
            <BottomContain>
                <TouchableOpacity onPress={handleCancel}>
                    <CountSeletedCancel />
                </TouchableOpacity>
                <View style={{ width: 1, height: 20, backgroundColor: theme.lightGray }} />
                <TouchableOpacity disabled={captureImage.length > 10} onPress={() => navigation.navigate(params.nextGaleryRouteName, params.routeParams)}>
                    <CountSeletedImages />
                </TouchableOpacity>
                <Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={popoutText} />

            </BottomContain>
        </>
    )
}

const CountSeletedCancel = () => {
    return (
        <TextSimple>
            <TextBold>
                Cancelar
            </TextBold>
        </TextSimple>
    )
}


const CountSeletedImages = () => {
    const { captureImage } = useCaptureImageStore()
    return (
        <TextSimple>
            <TextBold>
                Adicionar{' '}
            </TextBold>
            ({captureImage.length})
        </TextSimple>
    )
}