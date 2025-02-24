import { Image, TouchableOpacity, View } from "react-native";
import { GrayText } from "../Informationsform";
import { BorderBottom, ContainerBottom, OptionContainer, TimeOptionText } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../Theme/theme";
import { SetStateAction, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface DateInputProps {
    disable?: boolean
    startDate: { data: string, hora: string } | undefined
    endDate?: { data: string, hora: string } | undefined
    setStartDate: React.Dispatch<SetStateAction<{ data: string, hora: string } | undefined>>
    setEndDate?: React.Dispatch<SetStateAction<{ data: string, hora: string } | undefined>>
    alignRight?: boolean
}

export default function DateInput(props: DateInputProps) {
    const [startDatePikerModal, setStartDatePikerModal] = useState(false)
    const [endDatePikerModal, setEndDatePikerModal] = useState(false)
    const [startDatePikerModalTime, setStartDatePikerModalTime] = useState(false)
    const [endDatePikerModalTime, setEndDatePikerModalTime] = useState(false)
    const [startDate, setStartDate] = useState(props.startDate)
    const [endDate, setEndDate] = useState(props.endDate)

    function parseDate(datetime: { data: string, hora: string }) {
        const splitDate = datetime.data.split('/')
        const year = splitDate[2].slice(2, 5)
        const parsedDate = `${splitDate[0]}/${splitDate[1]}/${year}`
        return parsedDate
    }


    return (
        <>
            <OptionContainer>
                <TimeOptionText style={props.alignRight ? { width: 150 } : { width: 40 }}>Início</TimeOptionText>
                <ContainerBottom>
                    <TouchableOpacity onPress={() => !props.disable && setStartDatePikerModal(true)} style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable && <Image source={require("../../Assets/Icons/calenderGray.png")} />
                            < MaterialCommunityIcons
                                name="calendar-month-outline"
                                color={theme.lightGray}
                                size={25}
                            />
                        }
                        <GrayText>{parseDate(startDate)}</GrayText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => !props.disable && setStartDatePikerModalTime(true)} style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable &&
                            < Ionicons
                                name="time-outline"
                                color={theme.lightGray}
                                size={25}
                                style={{ marginBottom: -2 }}
                            />
                        }
                        <GrayText>{startDate?.hora}</GrayText>
                    </TouchableOpacity>
                </ContainerBottom>
            </OptionContainer>


            <OptionContainer>
                <TimeOptionText style={props.alignRight ? { width: 150 } : { width: 40 }}>Fim</TimeOptionText>
                <ContainerBottom>
                    <TouchableOpacity onPress={() => !props.disable && setEndDatePikerModal(true)} style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable && <Image source={require("../../Assets/Icons/calenderGray.png")} />
                            < MaterialCommunityIcons
                                name="calendar-month-outline"
                                color={theme.lightGray}
                                size={25}
                            />
                        }
                        <GrayText>{parseDate(endDate)}</GrayText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => !props.disable && setEndDatePikerModalTime(true)} style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable &&
                            < Ionicons
                                name="time-outline"
                                color={theme.lightGray}
                                size={25}
                                style={{ marginBottom: -2 }}
                            />
                        }

                        <GrayText>{endDate?.hora}</GrayText>
                    </TouchableOpacity>

                </ContainerBottom>
            </OptionContainer>



            <DateTimePickerModal
                timePickerModeAndroid="default"
                isVisible={startDatePikerModal}
                mode="date"
                display="inline"
                onCancel={() => setStartDatePikerModal(false)}
                onConfirm={(data) => {
                    const month = `${data.getMonth() + 1}`
                    const year = `${data.getFullYear()}`
                    props.setStartDate({
                        ...props.startDate,
                        data: `${data.getDate()}/${month.length == 1 ? `0${month}` : month}/${year}`,
                    })
                    setStartDate({
                        ...startDate,
                        data: `${data.getDate()}/${month.length == 1 ? `0${month}` : month}/${year}`,
                    })
                    setStartDatePikerModal(false)
                }}
            />
            <DateTimePickerModal
                timePickerModeAndroid="default"
                isVisible={startDatePikerModalTime}
                mode="time"
                display="spinner"
                onCancel={() => setStartDatePikerModalTime(false)}
                onConfirm={(data) => {
                    const month = `${data.getMonth() + 1}`
                    const year = `${data.getFullYear()}`
                    props.setStartDate({
                        ...props.startDate,
                        hora: `${data.getHours()}:${data.getMinutes()}`
                    })
                    setStartDate({
                        ...startDate,
                        hora: `${data.getHours()}:${data.getMinutes()}`
                    })
                    setStartDatePikerModalTime(false)
                }}
            />

            <DateTimePickerModal
                timePickerModeAndroid="default"
                isVisible={endDatePikerModalTime}
                display="spinner"
                mode="time"
                onCancel={() => setEndDatePikerModalTime(false)}
                onConfirm={(data) => {
                    const month = `${data.getMonth() + 1}`
                    const year = `${data.getFullYear()}`
                    props.setEndDate({
                        ...props.endDate,
                        hora: `${data.getHours()}h${data.getMinutes()}`
                    })
                    setEndDate({
                        ...endDate,
                        hora: `${data.getHours()}h${data.getMinutes()}`
                    })
                    setEndDatePikerModalTime(false)
                }}
            />

            <DateTimePickerModal
                timePickerModeAndroid="default"
                isVisible={endDatePikerModal}
                display="inline"
                mode="date"
                onCancel={() => setEndDatePikerModal(false)}
                onConfirm={(data) => {
                    const month = `${data.getMonth() + 1}`
                    const year = `${data.getFullYear()}`
                    props.setEndDate({
                        ...props.endDate,
                        data: `${data.getDate()}/${month.length == 1 ? `0${month}` : month}/${year}`
                    })
                    setEndDate({
                        ...endDate,
                        data: `${data.getDate()}/${month.length == 1 ? `0${month}` : month}/${year}`,
                    })
                    setEndDatePikerModal(false)
                }}
            />
        </>
    )
}