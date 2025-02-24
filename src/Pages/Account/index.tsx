import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import Header from '../../Components/Header';

import { StackRoutes } from '../../Routes/StackTypes';
import { Text, ContentainerConfigurations } from '../../Components/configurationsElemetsStyle';

import {
    Container,
    SafeAreaViewContainer
} from '../../Components/elementsComponents';


export default function Account() {
    const navigation = useNavigation<StackRoutes>();

    return (
        <SafeAreaViewContainer>
            <Header titleHeader='Conta' />
            <Container>
                <ContentainerConfigurations>
                    <TouchableOpacity onPress={() => navigation.push('PersonalInformation')}>
                        <Text style={{ marginTop: 1 }}>Informações pessoais</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('RequestVerification')}>
                        <Text>Solicitar verificação</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Language')}>
                        <Text>Idioma</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.push('DeleteAccount')}>
                        <Text>Excluir conta</Text>
                    </TouchableOpacity>
                </ContentainerConfigurations>
            </Container>
        </SafeAreaViewContainer>
    );
};
