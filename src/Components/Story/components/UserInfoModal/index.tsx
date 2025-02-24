import { SetStateAction, useState } from "react";
import BottomModal from "../../../BottomModal";
import { OptionsContainer, TextOption, UserImage, UserInfo } from "./style";
import { TouchableOpacity, View } from "react-native";
import { TextRegular12 } from "../../../configurationsElemetsStyle";
import { UserNameValid } from "../../../UserInfoModal/style";
import { Image } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Info from "../../../Info";

import verPerfil from '../../../../Assets/Icons/lupa-ver-perfil.png';


interface UserInfoModalProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function UserInfoModal(props: UserInfoModalProps) {
    const [silence, setSilence] = useState(false);

    const [block, setBlock] = useState(false);
    const handlePress = () => {
        setBlock(!block);
    };

    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [popoutText, setPopoutText] = useState("")



    return (
        <><BottomModal
            title=""
            setvisibleBottonModal={props.setvisibleBottonModal}
            visibleBottonModal={props.visibleBottonModal}
            children={<>
                <UserInfo>
                    <UserImage source={{ uri: "https://img.freepik.com/fotos-gratis/sorrindo-em-pe-na-vista-de-perfil-uma-jovem-linda-garota-vestindo-uma-camiseta-verde-oliva-segurando-a-mao-ao-lado-isolada-na-parede-amarela_141793-85863.jpg?w=740&t=st=1685141863~exp=1685142463~hmac=ed5b59d2bd21d8d6c03aa699280ddee7e44ffbea1368f0fed9d88083bbf10dd6" }} />
                    <View>
                        <TextRegular12>
                            @ele.santos
                        </TextRegular12>
                        <UserNameValid>
                            Elizabeth Santos
                        </UserNameValid>
                    </View>
                </UserInfo>
                <OptionsContainer>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                        !silence && setshowSmallPopup(true);
                        setSilence(!silence);
                    }}>
                        <FontAwesome
                            name={silence ? 'bell-slash' : 'bell-slash-o'}
                            color={"#231F20"}
                            size={18}
                            style={{ marginRight: 10.5, marginLeft: 0.5 }}
                        />
                        <TextOption>Silenciar</TextOption>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handlePress}>
                        <Entypo
                            name={'block'}
                            color={"#231F20"}
                            size={19}
                            style={{ marginRight: 12, marginLeft: 1 }}
                        />
                        <TextOption>{block ? 'Bloquear' : 'Desbloquear'}</TextOption>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <AntDesign
                            name="deleteuser"
                            size={23}
                            color={"#231F20"}
                            style={{ marginRight: 9.5 }}
                        />
                        <TextOption>Remover seguidor</TextOption>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Image source={verPerfil} style={{
                            width: 23,
                            height: 23,
                            tintColor: '#231F20',
                            marginRight: 13,
                            transform: [{ scaleX: -1 }],
                            marginLeft: -2.5,
                        }} />

                        <TextOption>Ver perfil</TextOption>
                    </TouchableOpacity>
                </OptionsContainer>
            </>} /><Info setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={'Usuário Silenciado'} /></>
    )
}