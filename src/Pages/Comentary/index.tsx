import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"

import {
    Container,
    TextContainer,
    Text,
    Text12
} from './style'
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { deleteBlockComments, getBlockComments } from '../../Service/Profile';

export default function Comentary() {
    const navigation = useNavigation<StackRoutes>();

    const [usersBloked, setUsersBlocked] = useState()

    const getBlockeds = async () => {
        try {
            const response = await getBlockComments();
            setUsersBlocked(response.data.data)
        } catch (error) {
            console.log('Error', error);
        }
    };

    useEffect(() => {
        getBlockeds()
    }, [])

    return (
        <SafeAreaViewContainer>
            <Header titleHeader='Comentários' />
            <Container>

                <TextContainer>
                    <Text>Bloquear comentários</Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => navigation.push('CommentsBlocked')}
                    >
                        <Text>{usersBloked && usersBloked.friends.length} {usersBloked && usersBloked.friends.length > 1 || usersBloked && usersBloked.friends.length == 0 ? 'pessoas' : 'pessoa'}</Text>
                        <Entypo
                            name='chevron-small-right'
                            size={18}
                            color={"#979797"}
                        />
                    </TouchableOpacity>
                </TextContainer>
                <Text12>
                    Novos comentários de pessoas bloqueadas não vão aparecer na postagem.
                </Text12>
            </Container>
        </SafeAreaViewContainer>
    );
};
