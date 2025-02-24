import { FlatList, Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BlueText, RowDirection, TopOptions, WhiteText, WhiteTextMarcation } from "../../style";
import { MarkedUsersContainer, MarkedUsersContainerOther } from "./style";
import { SetStateAction, useEffect, useState } from "react";
import { theme } from "../../../../Theme/theme";
import { findProfiles } from "../../../../Service/Profile";


interface AddMarkedUsersProps {
    markedUsers: { userName: string, top: number, left: number, scale: number }[]
    handleMarkedUsersMode: () => void
    confirmMarked?: (inputValue: { userName: string, top: number, left: number, scale: number }) => void;
}

interface UserSearch {
    userNickname: string,
    profileImage: string,
    userBio: string,
    userName: string,

}

export default function AddMarkedUsers(props: AddMarkedUsersProps) {

    const [inputValue, setInputValue] = useState("")
    const [secondText, setSecondText] = useState('');
    const [isTexting, setIsTexting] = useState(true);
    const [leftText, setLeftText] = useState(160);
    const [bottomSearch, setBottomSearch] = useState(false)
    const [searchResults, setSearchResults] = useState([] as any[]);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);


    const insideProperts = () => {
        const input = {
            userName: inputValue,
            top: 0,
            left: 0,
            scale: 1
        }
        if (props.confirmMarked) {
            props.confirmMarked(input);
        } else {
            console.log('Error')
        }
    }

    useEffect(() => {
        setSecondText(inputValue)
        if (inputValue?.length > secondText?.length) {
            setLeftText(leftText - 5)
        } else {
            setLeftText(leftText + 5)
        }
    }, [inputValue])

    const onKeyboardDidShow = () => {
        setIsKeyboardActive(true);
    };

    const onKeyboardDidHide = () => {
        setIsKeyboardActive(false);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (inputValue?.length > 0) {
            findProfiles(inputValue)
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.log("DEU ERRO AQUI");
                });
        } else {
            setSearchResults([]);
        }
    }, [inputValue]);

    const completeInput = (userNickName: string) => {
        setIsTexting(!isTexting)
        setInputValue(userNickName);
    }

    return (
        <>
            <TopOptions bgColor={"#5f5f5f55"}>
                <TouchableOpacity style={{ top: 60, left: 30 }} onPress={props.handleMarkedUsersMode}>
                    <WhiteText style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Cancelar</WhiteText>
                </TouchableOpacity>
                <TouchableOpacity style={{ top: 60, left: 180 }} onPress={() => insideProperts()}>
                    <WhiteText style={{ textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Concluir</WhiteText>
                </TouchableOpacity>
            </TopOptions>
            <View style={{
                flexDirection: 'row',
                top: 200,
                left: leftText,
                zIndex: 3
            }}>
                <RowDirection style={{ justifyContent: "center" }}>
                    <MarkedUsersContainerOther>
                        <WhiteTextMarcation>
                            @
                        </WhiteTextMarcation>
                        <TextInput
                            cursorColor={theme.primarycolor}
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                            style={{ color: theme.secondaryColor, fontSize: 17 }}
                        />
                    </MarkedUsersContainerOther>
                </RowDirection>
            </View>
            {inputValue?.length > 0 ? (
                <View style={{
                    position: 'absolute',
                    top: 160,
                    zIndex: 4,
                    paddingLeft: 10
                }}>
                    <FlatList
                        scrollEnabled={false}
                        data={searchResults}
                        horizontal={true}
                        keyExtractor={(item) => "user" + item.userId}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => { completeInput(item.userNickname) }} style={{
                                    height: 90,
                                    width: 90,
                                    backgroundColor: '#0004',
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {isTexting == true ? (
                                        <Image style={{ width: 70, height: 70, borderRadius: 50, }} source={{ uri: item.profileImage }} />
                                    ) : (<></>)}
                                </TouchableOpacity>
                            )
                        }
                        }
                    />
                </View>
            ) : (
                <></>
            )}
        </>
    )
}