import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextNotPublicationsArchiveds } from "../ArchivedPublications/style";
import { useEffect, useState } from "react";
import { getArquiveStorys } from "../../Service/Profile";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { Container, SafeAreaViewContainer } from "../../Components/elementsComponents";
import ArquivedCardPostSelect from "../../Components/ArchivedCardPostSelect";
import HeaderEditListOfPubli from "./HeaderEditListOfStory";
import { fontStyle, theme } from "../../Theme/theme";
import useDestackInfoStore from "../../GlobalState/destacksInfo.zustand";
import mime from "mime";
import { storyHighlight, createHighlight } from "../../Service/Destack";
import { LoagingContainer } from "./style";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import { Post } from "../ArchivedPoster/postStoryType";
import { DocumentPickerResponse } from "react-native-document-picker";
import ArquivedListSelect from "../../Components/ArquivedListSelect";

export default function ListOfStory() {
    const [publicationsArchiveds, setpublicationsArchiveds] = useState<Post[]>([]);
    const navigation = useNavigation<StackRoutes>()
    const [arrayPostHexIds, setSrrayPostHexIds] = useState<number[]>([])
    const [selectPostPress, setSelectPostPress] = useState<boolean>()
    const { destackImage, setDestackImage, destackName, setDestackName } = useDestackInfoStore()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<DocumentPickerResponse[]>([]);

    const { user } = useUserProfile()

    const readPostHexIdsArrayFunc = (storyId: number) => {
        if (!arrayPostHexIds.includes(storyId)) {
            setSrrayPostHexIds((prevNumbers) => [...prevNumbers, storyId])
        } else {
            setSrrayPostHexIds((prevNumbers) => prevNumbers.filter((num) => num !== storyId))
        }
    }

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
                for (let i = 0; i < arrayPostHexIds.length; i++) {
                    storyHighlight(arrayPostHexIds[i], response.data.highlightId)
                        .then((res) => {
                            console.log(arrayPostHexIds[i], ' - ', i)
                        })
                        .catch((e) => {
                            console.warn('ListOdStory -- erro ao inserir storyId')
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
                console.error("Error on push params-information:", err, err.response.data)
            })
    }

    const getItemsArquived = () => {
        setLoading(true)
        getArquiveStorys(user.userId)
            .then((response) => {
                const posts = response.data.response.data.posts;
                const flattenedPosts = posts.reduce((acc: string | any[], curr: any) => acc.concat(curr), []);
                setpublicationsArchiveds(flattenedPosts);
            })
            .catch((error) => {
                console.error('Erro ao buscar itens arquivados', error);
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const toggleSelection = (index: number, storyId: number) => {
        let newNumbers = [...selectedNumbers];
        if (newNumbers.includes(index)) {
            newNumbers = newNumbers.filter((num) => num !== index);
        } else {
            newNumbers.push(index);
        }
        setSelectedNumbers(newNumbers);

        if (arrayPostHexIds.includes(storyId)) {
            setSrrayPostHexIds((prevNumbers) => prevNumbers.filter((num) => num !== storyId))
        } else {
            setSrrayPostHexIds((prevNumbers) => [...prevNumbers, storyId])
        }
    };

    useEffect(() => console.log('--> ', arrayPostHexIds), [arrayPostHexIds])

    const getNumberForItem = (index: number) => {
        const selectedIndex = selectedNumbers.indexOf(index);
        return selectedIndex !== -1 ? selectedIndex + 1 : 0;
    };

    useEffect(() => {
        const callItems = navigation.addListener('focus', () => {
            getItemsArquived()
        })
        callItems()
    })

    useEffect(() => {
        getItemsArquived();
    }, []);

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
                            data={publicationsArchiveds}
                            numColumns={3}
                            scrollEnabled={false}
                            ListEmptyComponent={<TextNotPublicationsArchiveds>Não há nenhum Cartaz arquivado</TextNotPublicationsArchiveds>}
                            keyExtractor={(item) => item.postHexId}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <ArquivedListSelect
                                            source={{
                                                uri: item?.principalMedia?.url
                                            }}
                                            onPress={() =>
                                                toggleSelection(index, item.storyId)
                                            }
                                            marcados={getNumberForItem(index)}
                                            isPost={false}
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
            {arrayPostHexIds.length > 0 && loading == false &&
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
    },
})