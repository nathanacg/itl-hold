import React, { useState, useEffect, SetStateAction } from "react"
import { Alert, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from "react-native"

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
import { Image } from "react-native-elements"
import UserImageRounded from "../../UserImageProfile"
import Button from "../../Button"
import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../../Routes/StackTypes"

export interface bottonModalProps {
    children: React.ReactNode
    title: string
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    marginLeftRight?: string
    image: string
    name: string
    onOpenOtherAccountModal: () => void;
}

export default function BottomModalOtherAccountCreate(props: bottonModalProps) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const navigation = useNavigation<StackRoutes>()

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        props.setvisibleBottonModal(!isModalVisible)
    };

    useEffect(() => {
        setIsModalVisible(props.visibleBottonModal)
    }, [props.visibleBottonModal])


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
        >
            <View onTouchEnd={toggleModal} style={{ backgroundColor: '#000000aa', flex: 4 }}></View>

            <BackgroundModal onPress={toggleModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <BottomContainer marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer marginBottom={props.title ? "10px" : "20px"}>
                        <TopSpace onPress={toggleModal} />
                    </TopSpaceContainer>
                    {props.title && (<TitleModal>{props.title}</TitleModal>)}
                    <BottomElements>
                        {props.children}
                    </BottomElements>
                    <CentralContainer>
                        <RowContainer>
                            <TouchableOpacity onPress={() => navigation.push("CreateAccount")} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginRight: 20 }}>
                                <View style={{ width: 150, height: 50, backgroundColor: '#0245F4', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Criar nova conta</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.push("Login")} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginLeft: 50 }}>
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