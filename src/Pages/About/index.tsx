import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header';

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import {
    ContentainerConfigurations,
    Text,
    TextContainer
} from '../../Components/configurationsElemetsStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

export default function About() {
    const navigation = useNavigation<StackRoutes>();

    return (
        <SafeAreaViewContainer>
            <ScrollView>
                <Header titleHeader='Sobre' />
                <ContentainerConfigurations>
                    <TouchableOpacity onPress={() => navigation.push('PrivacyPolicy')}>
                        <TextContainer>
                            <Text>Política de privacidade</Text>
                            <Entypo
                                name='chevron-small-right'
                                size={22}
                                color={"#231F20"}
                            />
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('TermsOfUse')}>
                        <TextContainer >
                            <Text>Termo de uso</Text>
                            <Entypo
                                name='chevron-small-right'
                                size={22}
                                color={"#231F20"}
                            />
                        </TextContainer>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('TermsOfCookies')}>
                        <TextContainer >
                            <Text>Política de cookies</Text>
                            <Entypo
                                name='chevron-small-right'
                                size={22}
                                color={"#231F20"}
                            />
                        </TextContainer>
                    </TouchableOpacity>
                </ContentainerConfigurations>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
