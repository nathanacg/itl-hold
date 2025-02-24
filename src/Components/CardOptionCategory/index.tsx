import { useEffect, useState } from "react"

import { Image, StyleSheet, View } from "react-native"

import { CheckBoxUnselected } from "../elementsComponents"

import { CardContainer, CardName, CenterImage, RightCheckBox } from "./style"
interface cardOptionsProps {
    imageCard: any
    cardName: string
    checked: boolean
    onSelectionChange: (isChecked: boolean) => void;
}

export default function CardOptionCategory(props: cardOptionsProps) {

    const { checked, onSelectionChange } = props
    const [check, setCheck] = useState<boolean>(checked)
    const [prevChecked, setPrevChecked] = useState<boolean>(checked)

    const handleSelectionChange = () => {
        setPrevChecked(check)
        setCheck(!check)
    }

    useEffect(() => {
        if (prevChecked !== check) {
            onSelectionChange(check)
        }
    }, [prevChecked, check])

    return (
        <View style={[styles.card, styles.shadowProp, { borderRadius: 5, borderColor: check ? ("#0245F4") : ("transparent") }]}>
            <CardContainer onPress={handleSelectionChange}>
                <RightCheckBox>
                    {check ? (
                        <Image source={require("../../Assets/Icons/icon-check.png")} />
                    ) : (
                        <CheckBoxUnselected />
                    )}
                </RightCheckBox>
                <CenterImage>
                    <Image source={props.imageCard} />
                </CenterImage>
                <CardName>{props.cardName}</CardName>
            </CardContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 4,
        width: '32%',
        height: 175,
        marginBottom: 12,
        marginRight: 7,
        borderWidth: 1
    },
    shadowProp: {
        shadowColor: '#cccccc7f',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 4,
    }
})