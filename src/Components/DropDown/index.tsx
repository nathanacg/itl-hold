import React, { useState } from "react";
import { TouchableOpacity } from "react-native"
import { Icon } from 'react-native-elements';

import { theme } from "../../Theme/theme"

import {
    ContainerDropDown,
    ButtonText,
    DropDownItem,
    SelectedValue
} from "./style"

interface dropDownProps {
    width?: string
    list: string[] | React.ReactNode[]
}

export default function DropDown(props: dropDownProps) {
    const [visible, setVisible] = useState(false);

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    return (
        <ContainerDropDown width={props.width}>
            <SelectedValue onPress={toggleDropdown}>
                <ButtonText>{props.list[0]}</ButtonText>

            </SelectedValue>
            {visible && (
                props.list.length > 1 && props.list.map((item, index) => (
                    <TouchableOpacity key={index}>
                        <DropDownItem>
                            <ButtonText>{item}</ButtonText>
                        </DropDownItem>
                    </TouchableOpacity>
                ))
            )}
        </ContainerDropDown>
    )
}