import { SetStateAction } from "react";
import BottomModal from "../BottomModal";
import { OptionText } from "../PostOptions/style";
import { RowDirection } from "../elementsComponents";
import Icon from "react-native-vector-icons/MaterialIcons"
import { TouchableOpacity } from "react-native";

interface SilentTimeModalProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    visibleBottonModal: boolean
    seletedOption: string
    setOption: React.Dispatch<SetStateAction<string>>
}

export default function SilenceTimeModal(props: SilentTimeModalProps) {

    const options = ["Sempre", "Nunca", "12h", "24h", "1 semana"]

    return (
        <BottomModal
            title=""
            setvisibleBottonModal={props.setvisibleBottonModal}
            visibleBottonModal={props.visibleBottonModal}
            children={
                <>
                    {options.map(option => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => props.setOption(option)}
                        >
                            <RowDirection
                                style={{ justifyContent: "space-between" }}>
                                <OptionText>{option}</OptionText>
                                <Icon
                                    // onPress={() => props.setOption(option)}
                                    name={props.seletedOption == option ? "radio-button-checked" : "radio-button-off"}
                                />
                            </RowDirection>
                        </TouchableOpacity>

                    ))}
                </>
            }
        />
    )
}