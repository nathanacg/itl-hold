import React, { useEffect, useState } from 'react';

import { TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native"

import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

import {
    ButtonNav,
    ButtonText,
    ButtonsContainer,
    Container,
    Count,
    Header,
    Image,
    YearLine
} from './style'

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import { StackRoutes } from '../../Routes/StackTypes';
import { Icon } from 'react-native-elements';
import { getPhotosDevice } from '../../Utils/React-native-camera-row';
import { theme } from '../../Theme/theme';
import LinkCard from './Components/LinkCard';
import DocCard from './Components/DocCard';
import ArchivedCard from '../../Components/ArchivedCard';

export default function MidiasScreen() {
    const navigation = useNavigation<StackRoutes>();

    const [selectedPage, setSelectedPage] = useState("Midias")

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header>
                    <Icon
                        name='chevron-small-left'
                        type='entypo'
                        color={theme.primarycolor}
                        size={40}
                        onPress={() => navigation.goBack()}
                    />
                    <ButtonsContainer style={{ marginTop: 18 }}>
                        <ButtonNav
                            onPress={() => setSelectedPage("Midias")}
                            style={selectedPage == "Midias" ? { backgroundColor: theme.primarycolor } : {}}>
                            <ButtonText style={selectedPage == "Midias" ? { color: theme.secondaryColor } : {}}>
                                Midias
                            </ButtonText>
                        </ButtonNav>
                        <ButtonNav
                            onPress={() => setSelectedPage("Links")}
                            style={selectedPage == "Links" ? { backgroundColor: theme.primarycolor } : {}}>
                            <ButtonText style={selectedPage == "Links" ? { color: theme.secondaryColor } : {}}>
                                Links
                            </ButtonText>
                        </ButtonNav>
                        <ButtonNav
                            onPress={() => setSelectedPage("Documentos")}
                            style={selectedPage == "Documentos" ? { backgroundColor: theme.primarycolor } : {}}>
                            <ButtonText style={selectedPage == "Documentos" ? { color: theme.secondaryColor } : {}}>
                                Documentos
                            </ButtonText>
                        </ButtonNav>
                    </ButtonsContainer>
                </Header>

                {selectedPage == "Midias" ? (
                    <>
                        <FlatList
                            data={[1, 2, 3]}
                            scrollEnabled={false}
                            numColumns={4}
                            renderItem={({ item }) =>
                                <ArchivedCard
                                    fileurl={item.icon}
                                    period={item.period}
                                    navigate={() => { }}
                                />}
                        />
                        <YearLine>
                            2021
                        </YearLine>
                        <FlatList
                            data={[1, 2, 3]}
                            numColumns={4}
                            renderItem={({ item }) =>
                                <ArchivedCard
                                    markCard
                                    image={1}
                                    fileurl={item.icon}
                                    period={item.period}
                                    navigate={() => { }}
                                />}
                        />
                    </>

                ) : selectedPage == "Links" ? (
                    <FlatList
                        key={"links"}
                        data={[1, 2, 3, 4]}
                        renderItem={({ item, index }) => (
                            <LinkCard
                                title="Intellectus"
                                link="https://intellectus.app.br"
                                date="14/06/1993"
                                darken={index % 2 == 0 ? true : false}
                            />
                        )}
                    />
                ) : (
                    <FlatList
                        key={"Documentos"}
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                        renderItem={({ item, index }) => (
                            <DocCard
                                title='Exemplo.pdf'
                                pages='1 página'
                                size='6 kb'
                                type='pdf'
                                darken={index % 2 == 0 ? true : false}
                            />
                        )}
                    />)}
            </Container>
            <Count>
                Total: 205 {selectedPage.toLocaleLowerCase()}
            </Count>
        </SafeAreaViewContainer>
    );
};
