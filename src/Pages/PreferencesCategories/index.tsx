import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { typeTheme } from '../../Config/enumTheme';
import { getPreferencesProfile, updatePreferencesProfile } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { Container2, ContentPage, SafeAreaViewContainer, SafeAreaViewContainer2 } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import CardOptionCategory from '../../Components/CardOptionCategory';
import { TextRegular16, TextRegular16Prefer } from '../../Components/configurationsElemetsStyle';
import { theme } from '../../Theme/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

interface CategoryData {
    movies: number;
    series: number;
    books: number;
    musics: number;
    articles: number;
    podcasts: number;
}

export default function PreferencesCategories() {

    const { user: userProfile } = useUserProfile()

    const navigation = useNavigation<StackRoutes>()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categoriesData, setCategoriesData] = useState<CategoryData>({
        movies: 0,
        series: 0,
        books: 0,
        musics: 0,
        articles: 0,
        podcasts: 0,
    })

    useEffect(() => {
        const getPreferences = async () => {
            setIsLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 500))
                const response = await getPreferencesProfile(userProfile.userId)
                const preferences = response?.data[0]
                setCategoriesData(preferences)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }

        getPreferences()

    }, [])

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

    const [selectedItems, setSelectedItems] = useState<boolean[]>([
        dataCardsOptions[0].checked,
        dataCardsOptions[1].checked,
        dataCardsOptions[2].checked,
        dataCardsOptions[3].checked,
        dataCardsOptions[4].checked,
        dataCardsOptions[5].checked,
    ])

    const [updatedSelections, setUpdatedSelections] = useState<Record<string, boolean>>({});

    const handleSelectionChange = (index: number, item: { id?: number; icon?: any; cardName?: string; name: any; checked?: boolean; }, isChecked: boolean) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = isChecked;
        setSelectedItems(updatedSelectedItems);

        const newValue = isChecked ? 1 : 0;

        setUpdatedSelections({ ...updatedSelections, [item.name]: newValue });
    }


    const handleSave = async () => {

        const updatedCategoriesData = { ...categoriesData, ...updatedSelections }
        navigation.pop()
        try {
            await updatePreferencesProfile(userProfile.userId, updatedCategoriesData)
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <SafeAreaViewContainer2>
            {isLoading ? (
                <View style={{ marginTop: 350 }}>
                    <ActivityIndicator size={'small'} color={theme.primarycolor} />
                </View>
            ) : (
                <>
                    <Header titleHeader='Preferência de categorias' />
                    <ContentPage>
                        <TextRegular16Prefer>Atualize as categorias de seu interesse.</TextRegular16Prefer>
                        <FlatList
                            keyExtractor={(item) => "card" + item.id}
                            data={dataCardsOptions}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            style={{ marginTop: 27, marginBottom: 140 }}
                            renderItem={({ item, index }) => (
                                <CardOptionCategory
                                    checked={item.checked}
                                    imageCard={item.icon}
                                    cardName={item.cardName}
                                    onSelectionChange={(isChecked) => handleSelectionChange(index, item, isChecked)}
                                />
                            )}
                        />
                    </ContentPage>
                    <Button pressFunction={handleSave} textButton="Salvar" typebutton={typeTheme.default} />
                </>
            )}
        </SafeAreaViewContainer2>
    )
}
