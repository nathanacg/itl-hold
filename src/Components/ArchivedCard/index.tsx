import React, { SetStateAction, memo, useEffect, useState } from 'react';
import {
    Container,
    Photo,
    TicketDate,
    TextTicket,
    Mask,
    RadioUnchedButton,
    ImageRadioChecked,
    ContentLikes,
    CountLikes,
    VideoIcon
} from './style'

import AntDesign from "react-native-vector-icons/AntDesign"
import useCaptureImageStore from '../../GlobalState/zustand.store';
import { generateSequence } from '../../Pages/Camera/script';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getLikes } from '../../Service/Like';

interface ArchivedCardprops {
    fileurl?: string,
    image?: any;
    period?: string,
    markCard?: boolean
    showLikes?: boolean
    navigate?: () => void
    type?: string
    itemId?: string,
    index?: number,
}


export const ArchivedCard = memo((props: ArchivedCardprops) => {

    const [checked, setCkecked] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(() => {
        if (props.itemId) {
            getLikes(props.itemId)
                .then(res => {
                    setLikeCount(res.data.users.length)
                })
                .catch((e) => {
                    console.warn('GetLikes - ArchivedCard')
                    console.log(e)
                })
        }
    }, [])

    return (
        <Container onPress={
            props.markCard ? (
                () => {
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
            {props.period && (
                <TicketDate markedCard={props.markCard}>
                    <TextTicket>
                        {props.period}
                    </TextTicket>
                </TicketDate>
            )}

            {props.showLikes && (
                <ContentLikes>
                    <CountLikes>{likeCount}</CountLikes>
                    <AntDesign
                        name='heart'
                        size={18}
                        color={"#fff"}
                    />
                </ContentLikes>
            )}

            {props.type?.includes("video") && (
                <VideoIcon>
                    <Ionicons
                        name='play-outline'
                        color={"#fff"}
                        size={15}
                    />
                </VideoIcon>
            )}

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
            {props.checked ? (
                <ImageRadioChecked source={require('../../Assets/Icons/radio_button_checked.png')} />
            ) : (
                <RadioUnchedButton />
            )}
        </Mask>
    )
}

export default ArchivedCard