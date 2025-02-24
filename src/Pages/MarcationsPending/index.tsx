import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import {
    TitlePage,
    Text,
    HeaderTextButton
} from './style'

import {
    Container,
    ContentPage,
    SafeAreaViewContainer
} from '../../Components/elementsComponents'

import Header from '../../Components/Header'
import ButtonSelectedMedia from '../../Components/ButtonSelectedMedia'
import ArquivedCardPost from '../../Components/ArchivedCardPost'

import { getListMarcations } from '../../Service/Profile'

import useUserProfile from '../../GlobalState/userProfile.zustand'

interface ArchivedPublication {
    postId: number,
    postLegend: string,
    postHexId: string,
    postSpoiler: number,
    postEvaluation: string,
    postCategorie: string,
    postEnable: string,
    userId: number,
    postDate: number,
    tmdbMovieId: null,
    userName: string,
    userNickname: string,
    profileImage: string,
    medias: [
        {
            idmedias: number,
            mediaUrl: string,
            mediaName: string,
            mediaSize: string,
            mediaType: string,
            markedUsers: null,
            mediaExtension: string
        }
    ]
}

export default function MarcationsPending() {
    const [selectActive, setSelectActive] = useState<boolean>(true)
    const [marcationsList, setMarcationsList] = useState<ArchivedPublication[]>([])

    const { user } = useUserProfile()
    const publicationsInRows = []
    let row = []
    for (let i = 0; i < marcationsList.length; i++) {
        row.push(marcationsList[i])
        if (row.length === 3 || i === marcationsList.length - 1) {
            publicationsInRows.push(row)
            row = []
        }
    }

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await getListMarcations(user.userId)
                console.log(res.data.data[0])
                setMarcationsList(res.data)
            } catch (e) {
                console.log('Erro ao buscar marcações pendentes.', e)
            }
        }
        getList()
    }, [])

    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader='Marcações pendentes'
                actionHeaderElement={
                    marcationsList.length === 0 ? (
                        <TouchableOpacity
                            style={{ alignItems: "center", paddingTop: 5 }}
                            onPress={() => setSelectActive(!selectActive)}>
                            <HeaderTextButton>
                                {!selectActive ? ('Selecionar') : ('Cancelar')}
                            </HeaderTextButton>
                        </TouchableOpacity>
                    ) : (<></>)
                }
            />
            <Container>
                <ContentPage>
                    <TitlePage>Marcações feitas com você</TitlePage>
                    {marcationsList.length > 0 ? (
                        <Text>Selecione a imagem para definir a marcação.</Text>
                    ) : (
                        <Text>
                            Quando outras pessoas fizerem marcação sua em fotos e vídeos delas, estas postagens serão exibidas aqui.
                        </Text>
                    )}
                </ContentPage>

            </Container>
            <FlatList
                data={marcationsList}
                keyExtractor={(item) => "mark" + item.postId}
                numColumns={3}
                renderItem={({ item }) => (
                    <ArquivedCardPost
                        source={{ uri: item.medias[0].mediaUrl }}
                        onPress={() => { }}
                        styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
                    />
                )}
            />


            {selectActive && (
                <ButtonSelectedMedia
                    buttons={[
                        {
                            name: 'Adicionar',
                            count: 0,
                            onPress: () => { }
                        },

                        {
                            name: 'Remover',
                            count: 0,
                            onPress: () => { }
                        }
                    ]}
                />
            )}
        </SafeAreaViewContainer>
    )
}
