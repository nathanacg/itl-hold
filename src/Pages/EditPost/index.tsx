
import Header from "../../Components/Header";
import { SafeAreaViewContainer } from "../../Components/elementsComponents";
import { useEffect, useState } from "react";
import { ButtonText, Container, ContainerAlign, ContainerBottom, HeaderButton, PrincipalImage } from "./style";
import PostOptions from "../../Components/PostOptions";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StackRoutes } from "../../Routes/StackTypes";



export default function EditPost() {
    const navigation = useNavigation<StackRoutes>();
    const route = useRoute();
    const capturedImage = route.params?.capturedImage || null;

    const [rotation, setRotation] = useState(0);

    const handleRotateButtonClick = () => {
        setRotation(rotation + 90);
    };

    const handleRotateBackButtonClick = () => {
        setRotation(rotation - 90);
    };



    return (
        <SafeAreaViewContainer>
            <Container>
                <Header
                    titleHeader="Editar"
                    actionHeaderElement={
                        <HeaderButton onPress={() => { navigation.navigate('Publication') }}>
                            <ButtonText>Salvar</ButtonText>
                        </HeaderButton>
                    }
                />
            </Container>
            <ContainerAlign>
                <PrincipalImage
                    source={{ uri: capturedImage?.uri }}
                />
            </ContainerAlign>
            <ContainerBottom>
                <TouchableOpacity style={{ marginRight: 20, backgroundColor: '#0002', padding: 5, borderRadius: 5 }} onPress={() => { handleRotateBackButtonClick() }}>
                    <FontAwesome
                        name="repeat"
                        size={30}
                        color={'white'}
                        style={{ transform: [{ scaleX: -1 }] }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 20, backgroundColor: '#0002', padding: 5, borderRadius: 5 }} onPress={() => { handleRotateButtonClick() }}>
                    <FontAwesome
                        name="repeat"
                        size={30}
                        color={'white'}
                    />
                </TouchableOpacity>
            </ContainerBottom>
        </SafeAreaViewContainer>
    )
}