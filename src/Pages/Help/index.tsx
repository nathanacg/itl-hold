import { ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import { ContentainerConfigurations, Text } from '../../Components/configurationsElemetsStyle';

export default function Help() {

    const navigation = useNavigation<StackRoutes>()

    return (
        <SafeAreaViewContainer>
            <ScrollView>
                <Header titleHeader='Ajuda' />
                <ContentainerConfigurations>
                    {/*  <TouchableOpacity onPress={() => navigation.push('CommonQuestions')}>
                        <Text style={{ marginTop: 1 }}>Perguntas frequentes</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => navigation.push('ContactUs')}>
                        <Text>Entrar em contato</Text>
                    </TouchableOpacity>
                </ContentainerConfigurations>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
