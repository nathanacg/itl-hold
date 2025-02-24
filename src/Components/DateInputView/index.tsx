import { Image, View } from "react-native";
import { GrayText } from "../Informationsform";
import { BorderBottom, OptionContainer, TimeOptionText } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../Theme/theme";
import { SetStateAction, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface DateInputProps {
    disable?: boolean
    startDate: { date: string, time: string } | undefined
    endDate?: { date: string, time: string } | undefined
    setStartDate: React.Dispatch<SetStateAction<{ date: string, time: string } | undefined>>
    setEndDate?: React.Dispatch<SetStateAction<{ date: string, time: string } | undefined>>
    alignRight?: boolean
}

export default function DateInputView(props: DateInputProps) {

    const [startDatePikerModal, setStartDatePikerModal] = useState(false)
    const [endDatePikerModal, setEndDatePikerModal] = useState(false)

    return (
        <>
            <OptionContainer>

                <BorderBottom>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable && <Image source={require("../../Assets/Icons/calenderGray.png")} />
                            < MaterialCommunityIcons
                                name="calendar-month-outline"
                                color={theme.lightGray}
                                size={25}
                            />
                        }
                        <GrayText>{props.startDate?.date ? props.startDate.date : "00/00/00"}</GrayText>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable &&
                            < Ionicons
                                name="time-outline"
                                color={theme.lightGray}
                                size={25}
                                style={{ marginBottom: -2 }}
                            />
                        }
                        <GrayText>{props.startDate?.time ? props.startDate.time : "00h00"}</GrayText>
                    </View>

                </BorderBottom>
            </OptionContainer>


            <OptionContainer>

                <BorderBottom>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable && <Image source={require("../../Assets/Icons/calenderGray.png")} />
                            < MaterialCommunityIcons
                                name="calendar-month-outline"
                                color={theme.lightGray}
                                size={25}
                            />
                        }
                        <GrayText>{props.endDate?.date ? props.endDate.date : "00/00/00"}</GrayText>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', gap: 6 }}>
                        {
                            // !props.disable &&
                            < Ionicons
                                name="time-outline"
                                color={theme.lightGray}
                                size={25}
                                style={{ marginBottom: -2 }}
                            />
                        }

                        <GrayText>{props.endDate?.time ? props.endDate.time : "00h00"}</GrayText>
                    </View>

                </BorderBottom>
            </OptionContainer>






        </>
    )
}