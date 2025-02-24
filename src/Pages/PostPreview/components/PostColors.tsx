import { TouchableOpacity, View } from "react-native"
import { ColorsBg } from "../interface"

interface PropsSelectedColor {
    handleColor: ({ color, select, text, id }: ColorsBg) => void
    colorSelect?: string
}

export function PostColors({ handleColor }: PropsSelectedColor) {
    const COLORS_SELECT: ColorsBg[] = [
        {
            color: '#ffffff',
            select: false,
            text: true,
            id: 1
        },
        {
            color: '#000',
            select: false,
            text: false,
            id: 2
        },
        {
            color: '#6c757d',
            select: false,
            text: false,
            id: 3
        },
        {
            color: '#009b36',
            select: false,
            text: false,
            id: 4
        },
        {
            color: "#dc3545",
            select: false,
            text: false,
            id: 5
        },
        {
            color: "#ffdd00",
            select: false,
            text: true,
            id: 6
        },
        {
            color: "#004690",
            select: false,
            text: false,
            id: 7
        },
        {
            color: "#c60094",
            select: false,
            text: false,
            id: 8
        }

    ]

    return (
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 12 }}>
            {COLORS_SELECT.map(({ color, select, id, text }: ColorsBg) => {

                return (
                    <TouchableOpacity
                        key={color}
                        onPress={() => {
                            handleColor({ color: color, text: text, select: !select, id: id })
                        }}
                        style={{
                            marginHorizontal: 9,
                            width: 20,
                            height: 20,
                            zIndex: 10,
                            borderWidth: 10,
                            backgroundColor: color,
                            borderRadius: 10,
                            borderColor: color + '90'
                        }} />
                )
            })}
        </View>
    )
}
