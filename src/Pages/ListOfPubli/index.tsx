import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextNotPublicationsArchiveds } from "../ArchivedPublications/style";
import { useEffect, useState } from "react";
import { getPostProfile } from "../../Service/Profile";
import { PublicationType } from "../../Types/myPublications.types";
import { IUserInfoConfig } from "../../Types/feedProps";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { Container, SafeAreaViewContainer } from "../../Components/elementsComponents";
import ArquivedCardPostSelect from "../../Components/ArchivedCardPostSelect";
import HeaderEditListOfPubli from "./HeaderEditListOfPubli";
import { fontStyle, theme } from "../../Theme/theme";
import useDestackInfoStore from "../../GlobalState/destacksInfo.zustand";
import mime from "mime";
import { createHighlight, postHighlight } from "../../Service/Destack";
import { LoagingContainer } from "./style";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import { DocumentPickerResponse } from "react-native-document-picker";
import ArquivedListSelect from "../../Components/ArquivedListSelect";
import { TextHeader } from "../AlbumCreateAndEdit/style";

export default function ListOfPubli() {
    const [userPost, setUserPost] = useState<PublicationType[]>();
    const navigation = useNavigation<StackRoutes>()
    const [arrayIds, setArrayIds] = useState<number[]>([])
    const [selectPostPress, setSelectPostPress] = useState<boolean>()
    const { destackImage, setDestackImage, destackName, setDestackName } = useDestackInfoStore()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<DocumentPickerResponse[]>([]);

    const { user } = useUserProfile()

    const removeRepostDuplicates = (listRepost: PublicationType[]) => {
        const uniqueRepost = listRepost.filter((obj, index) => {
            if (obj.publicationType == 'repost') {
                return index === listRepost.findIndex(o => {
                    if (o.publicationType == 'repost') {
                        return obj.repostOwner.repostHexId === o.repostOwner.repostHexId
                    }
                    return 1 == 1
                });
            }
            return 1 == 1

        });
        return uniqueRepost
    }

    const getPosts = () => {
        setLoading(true)
        getPostProfile(user.userId)
            .then((response) => {
                const uniqueRepost = removeRepostDuplicates(response?.data.post)
                setUserPost(uniqueRepost)
                const infoOther: IUserInfoConfig = {
                    showLikes: response?.data.userPostConfig.show_likes,
                    showVisualizations: response?.data.userPostConfig.show_visualizations
                }
            })
            .catch((e) => {
                console.warn('GetPostProfile - PostProfileGroupsMyProfile');
                console.log(e);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    function createDestackInfo() {
        const form = new FormData();
        form.append('title', destackName);
        form.append('file', {
            uri: destackImage?.uri,
            type: destackImage.mime,
            name: destackImage.name + `${mime.getType(destackImage.uri)?.split("/").pop()}` + ".jpg",
        });

        createHighlight(form)
            .then((response) => {
                for (let i = 0; i < arrayIds.length; i++) {
                    let postId = arrayIds[i]
                    console.log(response.data.highlightId)
                    console.log('i = ', i)
                    postHighlight(postId, response.data.highlightId)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((e) => {
                            console.warn('ListOfPost -- erro ao inserir postId')
                            console.error('Error ', e)
                        })
                }
                setDestackName('')
                setDestackImage({
                    name: '',
                    uri: '',
                    mime: ''
                })
                setResult([])
                navigation.push('MyProfileScreen');
                return
            })
            .catch(err => {
                console.error("Error on push params-information:", err)
            })
    }

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const toggleSelection = (index: number, postId: number) => {
        let newNumbers = [...selectedNumbers];
        if (newNumbers.includes(index)) {
            newNumbers = newNumbers.filter((num) => num !== index);
        } else {
            newNumbers.push(index);
        }
        setSelectedNumbers(newNumbers);

        if (arrayIds.includes(postId)) {
            setArrayIds((prevNumbers) => prevNumbers.filter((num) => num !== postId))
        } else {
            setArrayIds((prevNumbers) => [...prevNumbers, postId])
        }
    };

    const getNumberForItem = (index: number) => {
        const selectedIndex = selectedNumbers.indexOf(index);
        return selectedIndex !== -1 ? selectedIndex + 1 : 0;
    };

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <>
            <SafeAreaViewContainer>
                <Container>
                    <HeaderEditListOfPubli
                        titleHeader='Selecionar Publicação'
                        isFromDestack={true}
                        backClearImage={() => { }}
                    />
                    {loading == false &&
                        <FlatList
                            data={userPost}
                            numColumns={3}
                            scrollEnabled={false}
                            ListEmptyComponent={<TextNotPublicationsArchiveds>Não há nenhuma Publicação</TextNotPublicationsArchiveds>}
                            keyExtractor={(item, index) => "post" + item.postHexId + (item.repostOwner && item.repostOwner.repostHexId)}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <ArquivedListSelect
                                            source={{
                                                uri: item.medias?.[0].mediaUrl
                                            }}
                                            onPress={() =>
                                                toggleSelection(index, item.postId)
                                            }
                                            marcados={getNumberForItem(index)}
                                            isPost={true}
                                            valueId={false}
                                            colorPost={item.postColor}
                                            postLegend={item.postLegend}
                                            index={index}
                                        />
                                    </>
                                )
                            }}
                        />
                    }
                </Container>
            </SafeAreaViewContainer>

            {loading == true &&
                <LoagingContainer>
                    <ActivityIndicator size="large" color={theme.primarycolor} />
                </LoagingContainer>
            }
            {arrayIds.length > 0 && loading == false &&
                <TouchableOpacity style={styles.ButtonSaave} onPress={() => { createDestackInfo() }}>
                    <Text style={styles.textWhite}>Salvar</Text>
                </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    ButtonSaave: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        backgroundColor: theme.primarycolor,
        bottom: 50,
        width: '80%',
        left: 40,
        height: 55,
        borderRadius: 10
    },
    textWhite: {
        color: 'white',
        fontSize: 20,
        fontFamily: fontStyle.semiBold
    }
})