import React, { SetStateAction, memo, useEffect, useState } from 'react'
import {
    Container,
    Photo,
    Mask,
    RadioUnchedButton,
    ImageRadioChecked
} from './style'

import useCaptureImageStore from '../../GlobalState/zustand.store'
import { generateSequence } from '../../Pages/Camera/script'
import { IconViewSelect } from '../ArquivedListSelect/style';
import { Text } from 'react-native';
import { theme } from '../../Theme/theme';
import Feather from 'react-native-vector-icons/Feather';

interface ArchivedCardprops {
    fileurl?: string,
    image?: any;
    markCard?: boolean
    navigate?: () => void
    type?: string
    itemId?: string,
    index?: number,
    marcados: number
    onPress: () => void
}

export const CardGalery = memo((props: ArchivedCardprops) => {

    const [checked, setCkecked] = useState<boolean>(false)

    return (
        <Container onPress={
            props.markCard ? (
                () => {
                    props.onPress()
                    if (checked) {
                        setCkecked(false)

                    } else {
                        setCkecked(true)

                    }
                }
            ) : (
                () => props.navigate && props.navigate()
            )
        }>
            <Photo source={{ uri: props.fileurl }} />
            {props.markCard && (
                <CheckSelectedImage imageProps={props} setCheck={setCkecked} checked={checked} />
            )}
        </Container>
    );
})

interface CheckSelectedImageProps {
    setCheck: React.Dispatch<SetStateAction<boolean>>,
    checked: boolean
    imageProps: ArchivedCardprops
}

const CheckSelectedImage = (props: CheckSelectedImageProps) => {
    const { addCaptureImage, removeImage, verifyImage } = useCaptureImageStore()

    useEffect(() => {
        verifyImage(props.imageProps.image, (value) => {
            props.setCheck(value)
        })

    }, [])

    useEffect(() => {
        if (!props.checked) {
            removeImage(props.imageProps.image)
        } else {
            addCaptureImage({
                height: props.imageProps.image.height,
                uri: props.imageProps.image.uri,
                width: props.imageProps.image.width,
                extension: props.imageProps.image.extension,
                filename: generateSequence(),
                itemId: props.imageProps.itemId
            })
        }
    }, [props.checked])

    return (
        <Mask>
            {props.imageProps.marcados > 0 ? (
                // <ImageRadioChecked source={require('../../Assets/Icons/radio_button_checked.png')} />
                <>
                    <IconViewSelect>
                        <Text style={{ fontSize: 14, color: theme.primarycolor }}>
                            {props.imageProps.marcados}
                        </Text>
                    </IconViewSelect>
                </>
            ) : (
                // <RadioUnchedButton />
                <>
                    <Feather
                        name={'circle'}
                        size={24}
                        color={'white'}
                        style={{ zIndex: 4, position: 'absolute', left: '73%', top: '3%' }}
                    />
                </>
            )}
        </Mask>
    )
}

export default CardGalery