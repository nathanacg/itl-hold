import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from "react-native"

import {
    Container,
    SectionContainer,
    SemiBoldText,
    Text,
    TextMin,
    TextContainer,
    TextMarkPending
} from "../../Components/configurationsElemetsStyle"

import {
    SafeAreaViewContainer,
    ContentPage
} from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import ToggleSwitch from '../../Components/ToggleSwitch';
import RadioButton from '../../Components/RadioButton';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { theme } from '../../Theme/theme';
import { getAllowResponses, getClosedFriend, saveAllowResponses } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { getReturnDaniedAcess, getStatusArquive, getStatusReshare, getStatusResponseGalery, getStatusShare, saveStoryArchiveFunction, saveStoryInGalery, saveStoryReshare, saveStoryShare } from '../../Service/Story';

export default function PosterConfiguration() {
    const navigation = useNavigation<StackRoutes>();
    const { user } = useUserProfile();
    const [saveStoryGaleryState, setSaveStoryGaleryState] = useState(false)
    const [saveStorySavedItensState, setSaveStorySavedItensState] = useState(false)
    const [saveStoryReshareState, setSaveStoryReshareState] = useState(false)
    const [saveStoryShareState, setSaveStoryShareState] = useState(false)
    const [blockedUsersCount, setBlockedUsersCount] = useState(0)
    const [closeFriendsCount, setCloseFriendsCount] = useState(0)

    const [answerOption, setAnswerOption] = useState<any>()
    const fetchData = async () => {
        try {
            const returnDaniedAcess = await getReturnDaniedAcess(user.userId);
            setBlockedUsersCount(returnDaniedAcess.data.blockedUsers.length)

            const returnCloseFriends = await getClosedFriend(user.userId)
            setCloseFriendsCount(returnCloseFriends.length)

            const allowResponses = await getAllowResponses(user.userId);
            setAnswerOption(allowResponses.data.result.allowResponses);

            const galeryState = await getStatusResponseGalery(user.userId)
            const galeryStateValue = (galeryState.data.result.saveStoryGallery);
            if (galeryStateValue == 1) {
                setSaveStoryGaleryState(true);
            } else {
                setSaveStoryGaleryState(false);
            }

            const arquiveState = await getStatusArquive(user.userId);
            const arquiveStateValue = (arquiveState.data.result.saveStoryArchive);
            if (arquiveStateValue == 1) {
                setSaveStorySavedItensState(true);
            } else {
                setSaveStorySavedItensState(false);
            }

            const reshareState = await getStatusReshare(user.userId);
            const reshareStateValue = (reshareState.data.result.storyReshare)
            if (reshareStateValue == 1) {
                setSaveStoryReshareState(true);
            } else {
                setSaveStoryReshareState(false);
            }

            const shareState = await getStatusShare(user.userId);
            const shareStateValue = (shareState.data.result.storyShare)
            if (shareStateValue == 1) {
                setSaveStoryShareState(true)
            } else {
                setSaveStoryShareState(false)
            }

        } catch (e) {
            console.log('error ', e)
        }
    };

    useEffect(() => {

        fetchData();

        return () => {
            setBlockedUsersCount(0)
            setCloseFriendsCount(0)
        }
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            fetchData()
        })

        return () => {
            navigation.removeListener('focus', () => { })
        }
    }, [])

    //Salvar na galeria
    const letSaveStoryGalery = async (saveStoryGallery: number | boolean) => {
        setSaveStoryGaleryState(!saveStoryGaleryState);
        try {
            await saveStoryInGalery(saveStoryGallery);
        } catch (e) {
            console.log('Error when passing params: ', e);
        }
    }

    const letSaveStoryArchive = async (saveStoryArchive: number | boolean) => {
        setSaveStorySavedItensState(!saveStorySavedItensState);
        try {
            await saveStoryArchiveFunction(saveStoryArchive);
        } catch (e) {
            console.log('Error when passing params: ', e);
        }
    }

    const letStoryReshare = async (storyReshare: number | boolean) => {
        setSaveStoryReshareState(!saveStoryReshareState);
        try {
            await saveStoryReshare(storyReshare);
        } catch (e) {
            console.log('Error when passing params: ', e);
        }
    }

    const letStoryShare = async (storyShare: number | boolean) => {
        setSaveStoryShareState(!saveStoryShareState);
        try {
            await saveStoryShare(storyShare);
        } catch (e) {
            console.log('Error when passing params: ', e);
        }
    }

    const letAllowResponses = async (allowResponses: number) => {
        try {
            await saveAllowResponses(allowResponses);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaViewContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header titleHeader='Cartaz' />
                <Container>
                    <SectionContainer>
                        <View style={{ width: "100%" }}>
                            <TextContainer>
                                <Text>Ocultar Cartaz</Text>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                    onPress={() => { navigation.navigate("BlockedPoster") }}
                                >
                                    <TextMarkPending>{blockedUsersCount} {blockedUsersCount > 1 ? 'pessoas' : 'pessoa'}</TextMarkPending>
                                    <Entypo
                                        name='chevron-small-right'
                                        size={25}
                                        color={theme.textDark}
                                    />
                                </TouchableOpacity>
                            </TextContainer>
                            <TextMin>Defina quem não pode ver o seu Cartaz.</TextMin>
                        </View>
                        {/*     <View>
                            <TextContainer>
                                <Text>Amigos próximos</Text>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('CloseFriends')}
                                >
                                    <TextMarkPending>{closeFriendsCount} {closeFriendsCount > 1 ? 'pessoas' : 'pessoa'}</TextMarkPending>
                                    <Entypo
                                        name='chevron-small-right'
                                        size={25}
                                        color={theme.textDark}
                                    />
                                </TouchableOpacity>
                            </TextContainer>

                            <TextMin>Defina pessoas específicas que podem ver o seu Cartaz.</TextMin>
                        </View> */}
                    </SectionContainer>
                    <SectionContainer>
                        <View>
                            <SemiBoldText>Permitir respostas e reações</SemiBoldText>
                            <TextMin>Defina quem pode responder e reagir ao seu Cartaz.</TextMin>
                        </View>
                        <TextContainer>
                            <Text>Seus seguidores</Text>
                            <RadioButton value={answerOption == 1} setValue={() => { letAllowResponses(1), setAnswerOption(1) }} />
                        </TextContainer>
                        <TextContainer>
                            <Text>Seguidores que você também segue</Text>
                            <RadioButton value={answerOption == 2} setValue={() => { letAllowResponses(2), setAnswerOption(2) }} />
                        </TextContainer>
                        <TextContainer>
                            <Text>Desativado</Text>
                            <RadioButton value={answerOption == 0} setValue={() => { letAllowResponses(3), setAnswerOption(0) }} />
                        </TextContainer>
                    </SectionContainer>
                    <SectionContainer>
                        <SemiBoldText>Salvar</SemiBoldText>
                        <View style={{ marginTop: -15 }}>
                            <TextContainer>
                                <Text>Salvar na galeria</Text>
                                <ToggleSwitch setValue={() => { letSaveStoryGalery(!saveStoryGaleryState) }} value={saveStoryGaleryState} />
                            </TextContainer>
                            <TextMin>
                                Salve fotos e vídeos do Cartaz automaticamente na galeria do seu celular.
                            </TextMin>
                        </View>
                        <View>
                            <TextContainer>
                                <Text>Salvar Cartaz em itens arquivados</Text>
                                <ToggleSwitch setValue={() => { letSaveStoryArchive(!saveStorySavedItensState) }} value={saveStorySavedItensState} />
                            </TextContainer>
                            <TextMin>
                                Salve fotos e vídeos do Cartaz automaticamente na pasta de Arquivos salvos.
                                Após expirar o prazo da publicação no Cartaz, somente você poderá vê-lo.
                            </TextMin>
                        </View>
                    </SectionContainer>
                    <SectionContainer borderColor={'transparent'}>
                        <SemiBoldText>Compartilhamento</SemiBoldText>
                        <View style={{ marginTop: -15 }}>
                            <TextContainer>
                                <Text>Permitir recompartilhamento no Cartaz</Text>
                                <ToggleSwitch setValue={() => { letStoryReshare(!saveStoryReshareState) }} value={saveStoryReshareState} />
                            </TextContainer>
                            <TextMin>
                                Suas publicações podem ser adicionadas no Cartaz de outras pessoas e seu nome de usuário irá aparecer junto na postagem.
                            </TextMin>
                        </View>
                        <View>
                            <TextContainer>
                                <Text>Permitir compartilhamento</Text>
                                <ToggleSwitch setValue={() => { letStoryShare(!saveStoryShareState) }} value={saveStoryShareState} />
                            </TextContainer>
                            <TextMin>
                                Suas publicações podem ser compartilhadas com outras pessoas como mensagem
                                e somente seus seguidores podem visualizar.
                            </TextMin>
                        </View>

                    </SectionContainer>
                </Container>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
