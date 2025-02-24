import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import { typeTheme } from '../../Config/enumTheme';

import { BoldDarkBlue, Container2, ContentPage, ContentPage2, SafeAreaViewContainer2, TitlePagelight, UndelineText } from '../../Components/elementsComponents';

import Button from '../../Components/Button';
import Header from '../../Components/Header';
import CardOptionCategory from '../../Components/CardOptionCategory';

import { useToast } from 'react-native-toast-notifications';

import { setPreferencesProfile } from '../../Service/Profile';
interface CategoryData {
    movies: number;
    series: number;
    books: number;
    musics: number;
    articles: number;
    podcasts: number;
}

export default function PreferencesCategories() {

    const toast = useToast()

    const navigation = useNavigation<StackRoutes>()

    const [categoriesData, setCategoriesData] = useState<CategoryData>({
        movies: 0,
        series: 0,
        books: 0,
        musics: 0,
        articles: 0,
        podcasts: 0,
    })

    const dataCardsOptions = [
        {
            id: 1,
            icon: require("../../Assets/Image/movie.png"),
            cardName: 'Filme',
            name: 'movies',
            checked: categoriesData.movies === 1,
        },

        {
            id: 2,
            icon: require("../../Assets/Image/serie.png"),
            cardName: 'Série',
            name: 'series',
            checked: categoriesData.series === 1,
        },

        {
            id: 3,
            icon: require("../../Assets/Image/book.png"),
            cardName: 'Livro',
            name: 'books',
            checked: categoriesData.books === 1,
        },

        {
            id: 4,
            icon: require("../../Assets/Image/music.png"),
            cardName: 'Música',
            name: 'musics',
            checked: categoriesData.musics === 1,
        },

        {
            id: 5,
            icon: require("../../Assets/Image/paper.png"),
            cardName: 'Artigo',
            name: 'articles',
            checked: categoriesData.articles === 1,
        },

        {
            id: 6,
            icon: require("../../Assets/Image/podcast.png"),
            cardName: 'Podcast',
            name: 'podcasts',
            checked: categoriesData.podcasts === 1,
        },
    ]
    const [selectedItems, setSelectedItems] = useState<CategoryData>({
        movies: 0,
        series: 0,
        books: 0,
        musics: 0,
        articles: 0,
        podcasts: 0,
    });

    const handleSelectionChange = (index: number) => {
        const newData = [...dataCardsOptions];
        newData[index].checked = !newData[index].checked

        setCategoriesData({
            ...categoriesData,
            [newData[index].name]: newData[index].checked ? 1 : 0,
        })

        setSelectedItems({
            ...selectedItems,
            [newData[index].name]: newData[index].checked ? 1 : 0,
        })
    }

    const handleSave = async () => {
        try {
            const selectedItemsToSend = {
                movies: categoriesData.movies,
                series: categoriesData.series,
                books: categoriesData.books,
                musics: categoriesData.musics,
                articles: categoriesData.articles,
                podcasts: categoriesData.podcasts,
            };

            setPreferencesProfile(selectedItemsToSend).then((res) => {
                console.log(res?.data)
            }).catch((err) => {
                console.warn('setPreferencesProfile')
                console.log(err)
            })

        } catch (error) {
            console.log(error);
            toast.show("Erro ao inserir as preferências.", { type: "error" });
        }
    }


    return (
        <SafeAreaViewContainer2>
            <Container2>
                <Header />
                <ContentPage2>
                    <TitlePagelight><BoldDarkBlue>Busque</BoldDarkBlue> pelos seus assuntos favoritos</TitlePagelight>
                    <FlatList
                        keyExtractor={(item) => "card" + item.id}
                        data={dataCardsOptions}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        style={{ marginTop: 27, marginBottom: 60 }}
                        renderItem={({ item, index }) => (
                            <CardOptionCategory
                                checked={item.checked}
                                imageCard={item.icon}
                                cardName={item.cardName}
                                onSelectionChange={() => handleSelectionChange(index)}
                            />
                        )}
                    />
                </ContentPage2>
                <View style={{ marginTop: -10 }} />
                <Button pressFunction={() => {
                    handleSave()
                    navigation.navigate('InviteFriend')
                }}
                    textButton="Confirmar"
                    typebutton={typeTheme.default}
                />

                <TouchableOpacity style={{ marginTop: -20 }} onPress={() => {
                    handleSave()
                    navigation.navigate('InviteFriend')
                }}>
                    <UndelineText>Pular</UndelineText>
                </TouchableOpacity>

            </Container2>

        </SafeAreaViewContainer2>
    )
}


