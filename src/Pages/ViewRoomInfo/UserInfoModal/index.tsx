import { SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";

import { RowDirection, UserInfo } from "./style";
import BottomModal from "../../../Components/BottomModal";
import { OptionsContainer, TextOption, UserImage, UserName } from "../../../Components/Story/components/UserInfoModal/style";
import { TextRegular12 } from "../../../Components/configurationsElemetsStyle";
import LigthButton from "../../../Components/LigthButton";


interface UserInfoModalProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    user: {
        profileImage: string
        userId: number
        userNickname: string
        userName: string
    }
}

export default function UserInfoModal(props: UserInfoModalProps) {

    return (
        <BottomModal
            title=""
            visibleBottonModal={props.visibleBottonModal}
            setvisibleBottonModal={props.setvisibleBottonModal}
            children={
                <>
                    <UserInfo style={{ alignItems: "center" }}>
                        <RowDirection>
                            <UserImage source={{ uri: props.user.profileImage }} />
                            <View>
                                <UserName>
                                    {props.user.userName}
                                </UserName>
                                <TextRegular12>
                                    {props.user.userNickname}
                                </TextRegular12>
                            </View>
                        </RowDirection>

                        <LigthButton
                            size="sm"
                            title="seguindo"
                        />
                    </UserInfo>
                    <OptionsContainer>
                        <TouchableOpacity>
                            <TextOption>Ver perfil</TextOption>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TextOption>Enviar mensagem</TextOption>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TextOption>Denunciar</TextOption>
                        </TouchableOpacity>

                    </OptionsContainer>
                </>
            }
        />
    )
}