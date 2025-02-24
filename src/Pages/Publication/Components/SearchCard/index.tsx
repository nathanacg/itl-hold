import { ActivityIndicator, ImageBackground, ImageProps, View } from "react-native";
import { SeachCardContainer, CardImage, CardTitle, CardText } from "./style";
import { useRef, useState } from "react";
import { theme } from "../../../../Theme/theme";

interface SearchCardProps {
    name: string
    id?: string
    description: string
    image?: string
    category: string
    onPressFunction: () => void
}

interface TypeCategory {
    [key: string]: string
}

export default function SearchCard(props: SearchCardProps) {


    const type: TypeCategory = {
        "Música": require('../../../../Assets/Image/musicCover.png'),
        "Filme": require('../../../../Assets/Image/movieCover.png'),
        "Série": require('../../../../Assets/Image/serieCover.png'),
        "Livro": require('../../../../Assets/Image/bookCover.png'),
        undefined: ""
    }

    return (
        <SeachCardContainer onPress={props.onPressFunction}>
            {props.category == "Livro" ? (
                <CardImage source={{ uri: `https://books.google.com/books/content?id=${props.id}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api` }} />
            ) : (
                <CardImage source={props.image ? { uri: props.image } : type[props.category]} />
            )}

            <View>
                <CardTitle numberOfLines={1}>
                    {props.name}
                </CardTitle>
                <CardText
                    numberOfLines={4}>
                    {props.description}
                </CardText>
            </View>
        </SeachCardContainer>
    )
}
