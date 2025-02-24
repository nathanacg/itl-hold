import React, { useState, useEffect, SetStateAction } from 'react'
import { Dimensions, Keyboard, Modal, Platform, View } from 'react-native'

import {
    TopSpace,
    BottomContainer,
    TitleModal,
    BottomElements,
    TopSpaceContainer,
    BackgroundModal
} from './style'
import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

export interface bottonModalProps {
    children: React.ReactNode
    title: string | boolean
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    marginLeftRight?: string
}


export default function BottomModal(props: bottonModalProps) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
        props.setvisibleBottonModal(!isModalVisible)
    };

    useEffect(() => {
        setIsModalVisible(props.visibleBottonModal)
    }, [props.visibleBottonModal])

    const [keyboardHeight, setKeyBoardHeight] = useState(0)

    const onKeyboardWillShow = (e: any) => {
        setKeyBoardHeight(e.endCoordinates.height - 20)
    }

    const onKeyboardDidHide = (e: any) => {
        setKeyBoardHeight(0)
    }

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
        const keyboardHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide)

        return () => {
            keyboardShowListener.remove()
            keyboardHideListener.remove()
        }

    }, [])

    return (
        <Modal
            animationType="none"
            visible={isModalVisible}
            transparent
        >
            <View onTouchEnd={toggleModal} style={{ backgroundColor: '#000000aa', flex: 1, minHeight: 300 }} />
            <BackgroundModal onPress={toggleModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={-25}>
                <BottomContainer marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer marginBottom={props.title ? "10px" : "20px"}>
                        <TopSpace onPress={toggleModal} />
                    </TopSpaceContainer>
                    {props.title && (<TitleModal>{props.title}</TitleModal>)}
                    <BottomElements>
                        {props.children}
                    </BottomElements>
                </BottomContainer>
            </BackgroundModal>
        </Modal>
    )
}

export function BottomModalArchived(props: bottonModalProps) {

    const [keyboardHeight, setKeyBoardHeight] = useState(0)

    const onKeyboardWillShow = (e: any) => {
        setKeyBoardHeight(e.endCoordinates.height - 20)
    }

    const onKeyboardDidHide = (e: any) => {
        setKeyBoardHeight(0)
    }


    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
        const keyboardHideListener = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide)
        return () => {
            keyboardShowListener.remove()
            keyboardHideListener.remove()
        }
    }, [])

    return (
        <Modal
            animationType="none"
            visible={true}
            transparent
        >
            <View style={{ backgroundColor: '#000000aa', flex: 1, minHeight: 300 }} />
            <BackgroundModal onPress={() => props.setvisibleBottonModal(true)} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={-45}>
                <BottomContainer marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer>
                        <TopSpace onPress={() => props.setvisibleBottonModal(true)} />
                    </TopSpaceContainer>
                    {/*     {props.title && (<TitleModal>{props.title}</TitleModal>)} */}
                    <BottomElements>
                        {props.children}
                    </BottomElements>
                </BottomContainer>
            </BackgroundModal>
        </Modal>
    )
}