import React, { useState } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';

import {
    CheckBox,
    ContainerProfilesList,
    GroupName,
    GroupedProfileDatail,
    ImageProfile,
    Name,
    ButtonContent,
    TextButton
} from './style'

import { typeTheme } from '../../Config/enumTheme';
import RadioButton from '../RadioButton';
import UserImageRounded from '../UserImageProfile';


interface friendListProps {
    profileImage: string;
    name: string;
    lastName?: string;
    typeAction: 'checkBox' | 'Button' | 'cheInFor';
    activeButton: boolean;
    textButtonPrimary?: string;
    textButtonSecondary?: string;
    check: boolean;
    onCheckBoxChange: (userId: number) => void;
    onCheckBoxChangePerson?: (profileImage: string, Id: number, userNickname: string, name: string) => void;
    id: number;
    verification?: number;
    userNickname: string;
}

export default function ProfileResultFinders(props: friendListProps) {
    const [check, setCheck] = useState<boolean>(props.check);
    const [activeButton, setActiveButton] = useState<boolean>(props.activeButton);

    const handleCheckBoxChange = () => {
        const updatedCheck = !check;
        setCheck(updatedCheck);
        props.onCheckBoxChange && props.onCheckBoxChange(props.id);
        props.onCheckBoxChangePerson && props.onCheckBoxChangePerson(props.profileImage, props.id, props.userNickname, props.name);
    };


    return (
        <ContainerProfilesList>
            <GroupedProfileDatail>
                <UserImageRounded url={props.profileImage} size={40} />
                <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    {props.lastName && (
                        <GroupName>
                            {props.lastName}
                        </GroupName>
                    )}
                    <Name>{props.name}</Name>
                </View>
            </GroupedProfileDatail>

            {props.typeAction === "checkBox" && (
                <RadioButton
                    value={check}
                    setValue={handleCheckBoxChange}
                />
            )}

            {props.typeAction === "cheInFor" && (
                <RadioButton
                    value={check}
                    setValue={handleCheckBoxChange}
                    icon={true}
                />
            )}

            {props.typeAction === "Button" && (
                <ButtonContent
                    optionButton={activeButton ? (typeTheme.default) : (typeTheme.light)}
                    onPress={() => setActiveButton(!activeButton)}
                >
                    <TextButton optionButton={activeButton ? (typeTheme.default) : (typeTheme.light)}>
                        {activeButton ? (props.textButtonSecondary) : (props.textButtonPrimary)}
                    </TextButton>
                </ButtonContent>
            )}
        </ContainerProfilesList>
    );
};
