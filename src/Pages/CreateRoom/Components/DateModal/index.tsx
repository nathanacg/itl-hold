import { Image, View } from "react-native";
import { TextSimple } from "../../../../Components/elementsComponents";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../../../Theme/theme";
import { WhiteText } from "../../../CreateStory/style";

import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
    BorderBottom,
    ModalButton,
    ModalContent,
    OptionContainer
} from "./style";
import { SetStateAction, useState } from "react";
import { GrayText } from "../../../../Components/Informationsform";
import DateInput from "../../../../Components/DateInput";


interface DateModalProps {
    title: string
    isVisible: boolean
    setVisible: React.Dispatch<SetStateAction<boolean>>
    startDate: { data: string, hora: string } | undefined
    endDate?: { data: string, hora: string } | undefined
    setStartDate: React.Dispatch<SetStateAction<{ data: string, hora: string } | undefined>>
    setEndDate?: React.Dispatch<SetStateAction<{ data: string, hora: string } | undefined>>
}

export default function DateModal(props: DateModalProps) {

    const [startDatePikerModal, setStartDatePikerModal] = useState(false)
    const [endDatePikerModal, setEndDatePikerModal] = useState(false)
    const [startDate, setStartDate] = useState<{ date: string, time: string }>()
    const [endDate, setEndDate] = useState<{ date: string, time: string }>()

    return (
        <>
            <Modal
                isVisible={props.isVisible}
                onBackdropPress={() => props.setVisible(false)}
                children={
                    <ModalContent>
                        <TextSimple>{props.title}</TextSimple>
                        <DateInput
                            startDate={props.startDate}
                            endDate={props.endDate}
                            setStartDate={props.setStartDate}
                            setEndDate={props.setEndDate}
                        />
                        <ModalButton onPress={() => props.setVisible(false)}>
                            <WhiteText>
                                Salvar
                            </WhiteText>
                        </ModalButton>
                    </ModalContent>
                }
            />

            <DateTimePickerModal
                isVisible={startDatePikerModal}
                mode="datetime"
                onCancel={() => setStartDatePikerModal(false)}
                onConfirm={(data) => {
                    setStartDate({
                        date: `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`,
                        time: `${data.getHours()}:${data.getMinutes()}`
                    })
                    setStartDatePikerModal(false)
                }}

            />

            <DateTimePickerModal
                isVisible={endDatePikerModal}
                mode="datetime"
                onCancel={() => setEndDatePikerModal(false)}
                onConfirm={(data) => {
                    setEndDate({
                        date: `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`,
                        time: `${data.getHours()}:${data.getMinutes()}`
                    })
                    setEndDatePikerModal(false)
                }}

            />
        </>

    )
}