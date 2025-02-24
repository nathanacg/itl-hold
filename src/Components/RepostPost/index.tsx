import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { TextLightGray } from "../configurationsElemetsStyle";
import { ProfilePhoto, RowDirection, TextSimple } from "../elementsComponents";
import { PostContainer, PostHeader, PostImageContainer, ProfileName, TimerPublication, TimerPublicationContent } from "./style";

import PostImage from "../PostImage";
import UserImageRounded from "../UserImageProfile";
import { getPostProfile } from "../../Service/Profile";
import { getPost } from "../../Service/Publications";
interface RepostProps {
    userId: number
    userName?: string,
    legend?: string,
    profileImage?: string,
    postColor?: string,
    postTime?: string
    postHexId: string
    mediaImage?: string
    medias?: [
        mediaUrl: string
    ]
}

export default function RespostPost(props: RepostProps) {

    const [showFullText, setShowFullText] = useState(false)

    const textoCompleto = props.legend || '';
    const quantidadeLetras = 15;

    const textoExibido = textoCompleto.length > quantidadeLetras
        ? textoCompleto.substring(0, quantidadeLetras) + "..."
        : textoCompleto;

    return (
        <PostContainer >
            <PostHeader>
                <RowDirection>
                    <UserImageRounded url={props.profileImage} size={35} />
                    <View style={{ marginLeft: 12 }}>
                        <ProfileName>{props.userName}</ProfileName>
                        <TimerPublicationContent>
                            <Image source={require('../../Assets/Icons/timer.png')}
                                style={{
                                    width: 6,
                                    height: 8,
                                }}

                            />
                            <TimerPublication>{props.postTime}</TimerPublication>
                        </TimerPublicationContent>
                    </View>
                </RowDirection>
                <View>
                    {showFullText ? (
                        <TextSimple>
                            {props.legend}
                        </TextSimple>
                    ) : (
                        <TextSimple numberOfLines={3}>
                            {textoExibido}
                        </TextSimple>
                    )}
                    <TouchableOpacity onPress={() => setShowFullText(true)}>
                        {!showFullText && (
                            <TextLightGray>Ver mais</TextLightGray>
                        )}
                    </TouchableOpacity>
                </View>
            </PostHeader>
            {
                props.postColor && (
                    <PostImageContainer source={{ uri: require('../../Assets/Image/background_app.png') }} style={{ backgroundColor: props.postColor.split('&')[0] }}>
                        {showFullText ? (
                            <TextSimple>
                                {props.legend}
                            </TextSimple>
                        ) : (
                            <TextSimple numberOfLines={3}>
                                {textoExibido}
                            </TextSimple>
                        )}
                    </PostImageContainer>
                )
            }
            {
                props.medias && !props.postColor && (
                    <PostImage
                        medias={[{
                            mediaUrl: props.mediaImage,
                            markedUsers: null
                        }]}
                        handleLike={() => { }}
                    />
                )
            }

        </PostContainer>
    )
}