import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import {
    Container,
    SectionContainer,
    SemiBoldText,
    Text,
    TextMin,
    TextContainer,
    TextMarkPending
} from '../../Components/configurationsElemetsStyle'

import Entypo from 'react-native-vector-icons/Entypo'

import Header from '../../Components/Header'
import RadioButton from '../../Components/RadioButton'
import ToggleSwitch from '../../Components/ToggleSwitch'
import { SafeAreaViewContainer } from '../../Components/elementsComponents'

import useUserProfile from '../../GlobalState/userProfile.zustand'

import { getListMarcations, getStatusAllMarcations, getStatusManualApproval, getStatusShowLikes, getStatusShowVizualizations, showAllowMarcations, showLikesFunc, showManualApproval, showVizualizationsFunc } from '../../Service/Profile'

export default function Marcations() {

    const navigation = useNavigation<StackRoutes>()
    const { user } = useUserProfile()

    const [marcationsSelected, setMarcationsSelected] = useState(2)

    const [likesOn, setLikesOn] = useState(false)

    const [vizualizationOn, setVizualizationOn] = useState(false)

    const [totalMarcations, setTotalMarcations] = useState<number>(0)

    const [manualAprovation, setManualAprovation] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const likesRes = await getStatusShowLikes(user.userId)
                if (likesRes.data.result.showLikes === 1) {
                    setLikesOn(true)
                } else {
                    setLikesOn(false)
                }

                const vizualizationRes = await getStatusShowVizualizations(user.userId)
                if (vizualizationRes.data.result.showVisualizations === 1) {
                    setVizualizationOn(true)
                } else {
                    setVizualizationOn(false)
                }

                const marcationsRes = await getStatusAllMarcations(user.userId)
                setMarcationsSelected(marcationsRes.data.result.allowMarcations)

                const res = await getListMarcations(user.userId)
                setTotalMarcations(res.data.data.length)

                const manualApp = await getStatusManualApproval(user.userId)

                setManualAprovation(manualApp.data.result.manualApproval)

            } catch (e) {
                console.log('Erro ao buscar os dados:', e)
            }
        };

        fetchData();
    }, []);



    const letShowLikes = (showLikes: number | boolean) => {
        setLikesOn(!likesOn)
        try {
            showLikesFunc(showLikes)
        } catch (e) {
            console.log('Error when passing params: ', e)
        }
    }

    const letShowVizualizations = (showVisualizations: number | boolean) => {
        setVizualizationOn(!vizualizationOn)
        try {
            showVizualizationsFunc(showVisualizations)
        } catch (e) {
            console.log('Error when passing params: ', e)
        }
    }

    const letManualApproval = (manualApproval: number | boolean) => {
        setManualAprovation(!manualAprovation)
        try {
            showManualApproval(manualApproval)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <SafeAreaViewContainer>
            <ScrollView>
                <Header titleHeader='Marcações' />
                <Container>
                    <SectionContainer >
                        <TextContainer style={{ marginBottom: -10 }}>
                            <Text>Mostrar número de curtidas</Text>
                            <ToggleSwitch setValue={() => { letShowLikes(!likesOn) }} value={likesOn} />
                        </TextContainer>
                        <TextContainer>
                            <Text>Mostrar número de visualizações</Text>
                            <ToggleSwitch setValue={() => { letShowVizualizations(!vizualizationOn) }} value={vizualizationOn} />
                        </TextContainer>
                    </SectionContainer>
                    <SectionContainer>
                        <SemiBoldText>Permitir marcações</SemiBoldText>
                        <TextContainer>
                            <Text>Todos</Text>
                            <RadioButton value={marcationsSelected == 2} setValue={() => { setMarcationsSelected(2), showAllowMarcations(2) }} />
                        </TextContainer>
                        <TextContainer>
                            <Text>Pessoas que você segue</Text>
                            <RadioButton value={marcationsSelected == 1} setValue={() => { setMarcationsSelected(1), showAllowMarcations(1) }} />
                        </TextContainer>
                        <TextContainer>
                            <Text>Ninguém</Text>
                            <RadioButton value={marcationsSelected == 0} setValue={() => { setMarcationsSelected(0), showAllowMarcations(0) }} />
                        </TextContainer>
                    </SectionContainer>
                    <SectionContainer borderColor={'transparent'}>
                        <SemiBoldText>Publicações marcadas</SemiBoldText>
                        <View>
                            <TextContainer>
                                <Text>Aprovar marcações manualmente</Text>
                                <ToggleSwitch setValue={() => { letManualApproval(!manualAprovation) }} value={manualAprovation} />
                            </TextContainer>
                            <TextMin>
                                Escolha quem pode marcar você na postagem. {'\n'}A pessoa que tentar marcá-lo irá ver se você{'\n'}não autoriza marcação de todos.
                            </TextMin>
                        </View>
                        <View>
                            <TextContainer>
                                <Text>Marcações pendentes</Text>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.push('MarcationsRequest')}
                                >
                                    <TextMarkPending>{totalMarcations}</TextMarkPending>
                                    <Entypo
                                        name='chevron-small-right'
                                        size={25}
                                        color={"#979797"}
                                    />
                                </TouchableOpacity>
                            </TextContainer>
                            <TextMin>
                                Selecione as imagens para definir a marcação pendente de cada uma.
                            </TextMin>
                        </View>
                    </SectionContainer>
                </Container>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
