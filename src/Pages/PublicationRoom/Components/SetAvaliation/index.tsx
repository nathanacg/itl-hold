import { Image, Text, View } from "react-native";
import {
    AddAvaliationContainer,
    AddAvaliationList,
    FaceCard,
    AvaliationText,
    AvaliationMediaText,
    RowDirection,
} from "./style";
import { emojiFace } from "../../../../Utils/emojiFaceAvaliation";
import { TextLightGray, TextRegular11, TextRegular12, TextRegular16 } from "../../../../Components/configurationsElemetsStyle";

interface SetAvaliationProps {
    selectedEmoji: { name: string, imageUrl: any, selectedImage: any } | undefined
    setSelectedEmoji: React.Dispatch<React.SetStateAction<{ name: string, imageUrl: any, selectedImage: any } | undefined>>
}

export default function SetAvaliation(props: SetAvaliationProps) {



    const handleAvaliation = (item: { name: string, imageUrl: any, selectedImage: any }) => {
        props.selectedEmoji?.name == item.name ?
            props.setSelectedEmoji(undefined) :
            props.setSelectedEmoji(item)
    }

    const randomMultiplier = Math.random() * 1;
    const randomPercentage = (randomMultiplier * 13).toFixed(1);

    const randomMultiplier2 = Math.random() * 1;
    const randomPercentage2 = (randomMultiplier2 * 20).toFixed(1);

    return (
        <AddAvaliationContainer>
            <AvaliationText>Como você avalia esse filme?</AvaliationText>
            <AddAvaliationList>
                {emojiFace.map(item => (
                    <FaceCard key={item.imageUrl} onPress={() => handleAvaliation(item)}>
                        <Image style={{ width: 43, height: 43, resizeMode: "contain" }} source={props.selectedEmoji && props.selectedEmoji.name === item.name ? item.selectedImage : item.imageUrl} />
                        <AvaliationText>{item.name}</AvaliationText>
                    </FaceCard>
                ))}
            </AddAvaliationList>
            <View style={{ flexDirection: 'column', gap: 2, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextRegular11>Média geral:</TextRegular11><TextLightGray> {randomPercentage}% - Bom <Image source={require('../../../../Assets/Icons/lightGreenFaceFill.png')} style={{ width: 13, height: 13, resizeMode: 'contain' }} /> </TextLightGray>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextRegular11>Média seus seguidores:</TextRegular11><TextLightGray> {randomPercentage2}% - Nada mal <Image source={require('../../../../Assets/Icons/yellowFaceFill.png')} style={{ width: 13, height: 13, resizeMode: 'contain' }} /> </TextLightGray>
                </View>

            </View>
        </AddAvaliationContainer>
    )
}