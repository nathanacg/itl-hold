import { TouchableOpacity, View } from "react-native"
import { ColorsBg } from "../interface"
import React from 'react'

interface PropsSelectedColor {
    handleColor: ({ color, select, id }: ColorsBg) => void
    colorSelect?: string
}

export function PostColors({ handleColor, colorSelect }: PropsSelectedColor) {
    const COLORS_SELECT: ColorsBg[] = [
        {
            color: '#007bff',
            select: false,
            id: 1
        },
        {
            color: '#dc3545',
            select: false,
            id: 2
        },
        {
            color: '#000000',
            select: false,
            id: 3
        },
        {
            color: '#17a2b8',
            select: false,
            id: 4
        },
        {
            color: "#343a40",
            select: false,
            id: 5
        },
        {
            color: "#6c757d",
            select: false,
            id: 6
        }
    ]

    return (
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10 }}>
            {COLORS_SELECT.map(({ color, select, id }: ColorsBg) => {

                return (
                    <TouchableOpacity
                        key={color}
                        onPress={() => {
                            handleColor({ color: color, select: !select, id: id })
                        }}
                        style={{
                            marginHorizontal: 10,
                            width: 35,
                            height: 35,
                            borderWidth: 2,
                            backgroundColor: color,
                            borderRadius: 50,
                            borderColor: id.toString() == colorSelect ? "white" : color
                        }} />
                )
            })}
        </View>
    )
}
