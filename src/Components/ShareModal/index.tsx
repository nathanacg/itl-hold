import { Dispatch, SetStateAction } from "react";
import BottomModal from "../BottomModal";
import { TextContainer } from "../configurationsElemetsStyle";
import { TextMedium, TextSimple } from "../elementsComponents";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Image } from "react-native-elements";
import { Linking, View } from "react-native";
import { Container, OptionContainer, ShareImage } from "./style";
import useOtherProfilePost from "../../GlobalState/otherProfilePosts.zustand";

interface DenunciaModalProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    visibleBottonModal: boolean
    postUrl: string
}

export default function ShareModal(props: DenunciaModalProps) {

    const handleWhatsappLink = () => {
        Linking.openURL(`whatsapp://send?text=${props.postUrl}`)
        props.setvisibleBottonModal(false)
    }

    const handleEmailLink = () => {
        Linking.openURL(`mailto:?body=${props.postUrl}`)
        props.setvisibleBottonModal(false)
    }
    const handleSmsLink = () => {
        Linking.openURL(`sms:?body=${props.postUrl}`)
        props.setvisibleBottonModal(false)
    }

    const handleMenssager = () => {
        Linking.openURL(`http://m.me?text=${props.postUrl}`)
        props.setvisibleBottonModal(false)
    }

    const handleInstagramLink = () => {
        Linking.openURL(`instagram://share?text=${props.postUrl}`)
    }
    return (
        <BottomModal
            title="Teste"
            setvisibleBottonModal={props.setvisibleBottonModal}
            visibleBottonModal={props.visibleBottonModal}
            children={
                <Container>
                    <OptionContainer onPress={handleSmsLink} style={{ gap: 5, justifyContent: 'space-between', height: 80, }}>
                        <ShareImage source={require("../../Assets/Image/smsLogo.png")} />
                        <TextMedium fontSize={"14px"}>SMS</TextMedium>
                    </OptionContainer>

                    <OptionContainer onPress={handleEmailLink} style={{ gap: 16, justifyContent: "space-between", height: 80 }}>
                        <ShareImage style={{ width: 63 }} source={require("../../Assets/Image/mail.png")} />
                        <TextMedium fontSize={"14px"} >E-mail</TextMedium>
                    </OptionContainer>

                    <OptionContainer onPress={handleWhatsappLink} style={{ gap: 5, height: 100, justifyContent: 'flex-start' }}>
                        <ShareImage style={{ width: 54 }} source={require("../../Assets/Image/whatsappLogo.png")} />
                        <TextMedium fontSize={"14px"} >WhatsApp</TextMedium>
                    </OptionContainer>

                    <OptionContainer>
                        <ShareImage
                            style={{ width: 56 }}
                            resizeMode="contain"
                            source={require("../../Assets/Image/instagramLogo.png")} />
                        <TextMedium fontSize={"14px"} >Instagram</TextMedium>
                    </OptionContainer>

                    <OptionContainer onPress={handleMenssager}>
                        <ShareImage
                            style={{ width: 60 }}
                            resizeMode="contain"
                            source={require("../../Assets/Image/facebookLogo.png")} />
                        <TextMedium fontSize={"14px"} >Facebook</TextMedium>
                    </OptionContainer>

                    <OptionContainer>
                        <ShareImage
                            style={{ width: 60 }}
                            source={require("../../Assets/Image/twiterrLogo.png")} />
                        <TextMedium fontSize={"14px"} >Twitter</TextMedium>
                    </OptionContainer>
                </Container>
            }
        />
    )
}