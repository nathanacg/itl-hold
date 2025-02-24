import React, { SetStateAction } from "react";
import { View, Modal } from "react-native"

import {
    BackgroundModal,
    ContentModal,
    TextModal,
    TitleModal
} from "./style"

interface modalProps {
    isModalVisible: boolean,
    iconModal?: React.ReactNode
    textModal?: string
    titlemodal?: string
    componentChildren?: React.ReactNode
    textAlign?: string
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function ModalElement(props: modalProps) {

    return (

        <Modal
            collapsable={false}
            visible={props.isModalVisible}
            transparent={true}
        >
            <BackgroundModal>
                <ContentModal>
                    {props.titlemodal && (
                        <TitleModal>
                            {props.titlemodal}
                        </TitleModal>)
                    }
                    {props.iconModal && (props.iconModal)}
                    {props.textModal && (<TextModal textAlign={props.textAlign}>{props.textModal}</TextModal>)}
                    {props.componentChildren}
                </ContentModal>
            </BackgroundModal>
        </Modal>

    )
}
