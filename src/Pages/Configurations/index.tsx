import React, { useState } from 'react';

import { ContainerBottonMenus, ContainerOptions } from './style'
import Header from '../../Components/Header';

import {
    Container,
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import ButtonMenu from '../../Components/ButtonMenu';

import { fontStyle, theme } from '../../Theme/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import ConfirmModal from '../../Components/ConfirmModal';
import { ProfileUser } from '../../Types/User';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { clearStorage } from '../../Lib/asyncStorage';
import { StyleSheet } from 'react-native';

import BottomModalOtherAccount from './Modal';

export default function Configurations() {

    const [isBottomModalVisible, setIsBottomModalVisible] = useState(false)

    const showBottomModal = () => {
        setIsBottomModalVisible(true)
    }

    const { user: userProfile } = useUserProfile()

    const navigation = useNavigation<StackRoutes>();
    const [confirmModal, setConfirmModal] = useState(false)

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header titleHeader='Configurações' />
                <ContainerOptions>
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/notification.png")}
                        text='Notificações'
                        actionFunction={() => navigation.navigate('ConfigNotifications')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/Preferences.png")}
                        text='Preferência de categorias'
                        actionFunction={() => navigation.navigate('PreferencesCategories')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/Privacy.png")}
                        text='Privacidade'
                        actionFunction={() => navigation.navigate('Privacy')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/security.png")}
                        text='Segurança'
                        actionFunction={() => navigation.navigate('Security')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/Account.png")}
                        text='Conta'
                        actionFunction={() => navigation.navigate('Account')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/About.png")}
                        text='Sobre'
                        actionFunction={() => navigation.navigate('About')}
                    />
                    <ButtonMenu
                        textColor={theme.textDark}
                        icon={require("../../Assets/Icons/assistance.png")}
                        text='Ajuda'
                        actionFunction={() => navigation.navigate('ContactUs')}
                    />

                    {/* <ContainerBottonMenus>
                        <ButtonMenu
                            textColor={theme.textDark}
                            icon={require("../../Assets/Icons/addAccout.png")}
                            text='Adicionar conta'
                            actionFunction={showBottomModal}
                        />
                        <ButtonMenu
                            textColor={theme.textDark}
                            icon={require("../../Assets/Icons/logout.png")}
                            text='Sair'
                            actionFunction={() => { setConfirmModal(true) }}
                        />
                    </ContainerBottonMenus> */}
                </ContainerOptions>
            </Container>
            <ConfirmModal
                setvisibleBottonModal={setIsBottomModalVisible}
                isModalVisible={confirmModal}
                onCancel={() => setConfirmModal(false)}
                onConfirm={() => {
                    clearStorage();
                    useUserProfile.getState().setUser({} as ProfileUser);
                    setConfirmModal(false);
                    navigation.navigate("Welcome");

                }}
                title='Sair da conta'
                text='Ao sair da conta, será necessário fazer login novamente para entrar.' postHexId={''}
            />
            <BottomModalOtherAccount
                title=""
                visibleBottonModal={isBottomModalVisible}
                setvisibleBottonModal={setIsBottomModalVisible}
                marginLeftRight="10px"
                children={undefined} image={userProfile.profileImage} name={userProfile.userNickname}
            />
        </SafeAreaViewContainer>
    )
}