import React, { useState, useEffect, SetStateAction } from "react"
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native"

import {
    TopSpace,
    BottomContainer,
    TitleModal,
    BottomElements,
    TopSpaceContainer,
    BackgroundModal,
    CentralContainer,
    RowContainer
} from "./style"
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from "../../../Routes/StackTypes"

export interface bottonModalProps {
    title: string
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    marginLeftRight?: string
    image: string
    name: string
}

export default function BottomModalOtherAccountCreate(props: bottonModalProps) {

    const navigation = useNavigation<StackRoutes>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
        props.setvisibleBottonModal(!isModalVisible)
    };

    useEffect(() => {
        setIsModalVisible(props.visibleBottonModal)
    }, [props.visibleBottonModal])

    const createNewAccount = () => {
        toggleModal()
        navigation.navigate('CreateAccount');
    }

    const loginOtherAccount = () => {
        toggleModal()
        navigation.navigate('Login')
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}

        >
            <View onTouchEnd={toggleModal} style={{ backgroundColor: '#000000aa', flex: 4 }} />

            <BackgroundModal onPress={toggleModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <BottomContainer marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer marginBottom={props.title ? "10px" : "20px"}>
                        <TopSpace onPress={toggleModal} />
                    </TopSpaceContainer>
                    {props.title && (<TitleModal>{props.title}</TitleModal>)}

                    <CentralContainer>
                        <RowContainer>
                            <TouchableOpacity onPress={createNewAccount} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginRight: 20 }}>
                                <View style={{ width: 150, height: 50, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#0245F4' }}>
                                    <Text style={{ color: '#0245F4' }}>Criar nova conta</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={loginOtherAccount} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginLeft: 50 }}>
                                <View style={{ width: 150, height: 50, borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderColor: '#0245F4' }}>
                                    <Text style={{ color: '#0245F4' }}>Conta existente</Text>
                                </View>
                            </TouchableOpacity>
                        </RowContainer>
                    </CentralContainer>
                </BottomContainer>
            </BackgroundModal>
        </Modal>
    )
}