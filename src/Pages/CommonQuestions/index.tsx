import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header';

import {
    AwnserQuestion,
    ContainerPage, TitleQuestion
} from "./style"

import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import { ContentainerConfigurations, TextRegular12 } from '../../Components/configurationsElemetsStyle';
import SearchInput from '../../Components/SearchInput';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

export default function CommonQuestions() {

    const navigation = useNavigation<StackRoutes>()

    const [searchTerm, setSearchTerm] = useState<string>('')
    
    return (
        <SafeAreaViewContainer>
            <ScrollView>
                <Header titleHeader='Perguntas frequentes' />
                <ContainerPage>
                    <SearchInput
                        onSetText={setSearchTerm}
                        value={searchTerm}
                        marginTop='35px'
                    />
                   
                        <TouchableOpacity style={[styles.card, styles.shadowProp]} onPress={() => navigation.navigate('TermsOfUse')}>
                             <View style={{ paddingLeft: 10 }}>
                                <TitleQuestion>
                                    Lorem ipsum dolor sit amet
                                </TitleQuestion>
                                <AwnserQuestion>
                                    consectetur adipiscing elit
                                </AwnserQuestion>
                            </View>
                            <Entypo
                                name='chevron-small-right'
                                size={25}
                                color={"#231F20"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, styles.shadowProp]} onPress={() => navigation.navigate('TermsOfUse')}>
                        <View style={{ paddingLeft: 10 }}>
                                <TitleQuestion>
                                    Lorem ipsum dolor sit amet
                                </TitleQuestion>
                                <AwnserQuestion>
                                    consectetur adipiscing elit
                                </AwnserQuestion>
                            </View>
                            <Entypo
                                name='chevron-small-right'
                                size={25}
                                color={"#231F20"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.card, styles.shadowProp]} onPress={() => navigation.navigate('TermsOfUse')}>
                            <View style={{ paddingLeft: 10 }}>
                                <TitleQuestion>
                                    Lorem ipsum dolor sit amet
                                </TitleQuestion>
                                <AwnserQuestion>
                                    consectetur adipiscing elit
                                </AwnserQuestion>
                            </View>
                            <Entypo
                                name='chevron-small-right'
                                size={25}
                                color={"#231F20"}
                            />
                    </TouchableOpacity>
                </ContainerPage>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        marginBottom: 12,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7
    },
    shadowProp: {
        shadowColor: '#00000035',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3
    },
});


