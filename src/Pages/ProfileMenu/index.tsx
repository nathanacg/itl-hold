import React, { useEffect, useState } from 'react';
import { Image, StatusBar, TouchableOpacity, View } from 'react-native';

import {
    ContentPage,
    ContentPageProfileMenu,
    ProfilePhotoConfig,
    SafeAreaViewContainer3
} from '../../Components/elementsComponents';
import useUserProfile from '../../GlobalState/userProfile.zustand';


import {
    Header,
    UserPrifleContainer,
    PorfileName,
    ContainerBottonMenus
} from './style';

import { theme } from "../../Theme/theme"

import AntDesign from "react-native-vector-icons/AntDesign"
import ButtonMenu from '../../Components/ButtonMenu';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { shareLink } from '../../Utils/share';
import ShareModal from '../../Components/ShareModal';
import ConfirmModal from '../../Components/ConfirmModal';
import AddPublicationModal from '../../Components/AddPublicationModal';


import BottomModalOtherAccount from '../Configurations/Modal';
import { clearStorage } from '../../Lib/asyncStorage';

import BottomModalOtherAccountCreate from '../Configurations/ModalCrateAccount';
import { Logo } from '../../Components/HeaderSecondary/style';




export default function ProfileMenu() {
    const navigation = useNavigation<StackRoutes>()
    const [isBottomModalVisible, setIsBottomModalVisible] = useState(false)
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const { user, initializeProfile } = useUserProfile()
    const [bottomModalOther, setBottomModalOther] = useState<boolean>(false)

    const showBottomModal = () => {
        setIsBottomModalVisible(true)
    }

    useEffect(() => {
        initializeProfile()
    }, [])

    return (
        <SafeAreaViewContainer3>
            <StatusBar barStyle={'light-content'} />
            <Header>
                <Logo>
                    <Image style={{ marginLeft: -10, width: 40, height: 28, tintColor: 'white', resizeMode: "contain" }} source={require("../../Assets/Image/face-logo.png")} />
                    <Image style={{ width: 115, height: 30, tintColor: 'white', resizeMode: "contain" }} source={require("../../Assets/Image/name-logo.png")} />

                </Logo>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <AntDesign
                        size={24}
                        name='close'
                        color={"#fff"}
                    />
                </TouchableOpacity>
            </Header>
            <ContentPageProfileMenu>
                <UserPrifleContainer>
                    <ProfilePhotoConfig source={{ uri: user.profileImage }} />

                    <TouchableOpacity onPress={() => navigation.push("MyProfileScreen")}>
                        <PorfileName>{user.userNickname}</PorfileName>
                    </TouchableOpacity>

                </UserPrifleContainer>
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/archived.png")}
                    text='Itens arquivados'
                    actionFunction={() => navigation.push('ArchivedItems')}
                />
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/saveItens.png")}
                    text='Itens salvos'
                    actionFunction={() => navigation.push('SavedItensGroups')}
                />
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/friends.png")}
                    text='Amigos próximos'
                    actionFunction={() => navigation.push('CloseFriends')}
                />
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/inviteFriends.png")}
                    text='Convidar amigos'
                    actionFunction={() => shareLink({
                        title: `${user.userName} convidou você para a Intellectus`,
                        message: `Convido você para entrar no app Intellectus, uma nova rede social com conteúdo de filmes, séries, livros, músicas, e muito mais.`,
                        url: 'https://intellectus.app.br',
                    })} />

                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/configuration.png")}
                    text='Configurações'
                    actionFunction={() => navigation.push('Configurations')}
                />
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/About.png")}
                    text='Sobre'
                    tintColor={theme.secondaryColor}
                    actionFunction={() => navigation.push('About')}
                />
                <ButtonMenu
                    textColor={theme.secondaryColor}
                    icon={require("../../Assets/Icons/assistance.png")}
                    text='Ajuda'
                    tintColor={theme.secondaryColor}
                    actionFunction={() => navigation.push('ContactUs')}
                />

                <ContainerBottonMenus>
                    <ButtonMenu
                        textColor={theme.secondaryColor}
                        icon={require("../../Assets/Icons/addUser.png")}
                        text='Adicionar conta'
                        actionFunction={showBottomModal}
                    />
                    <ButtonMenu
                        textColor={theme.secondaryColor}
                        icon={require("../../Assets/Icons/exit.png")}
                        text='Sair'
                        actionFunction={() => { setConfirmModal(true) }}
                    />
                </ContainerBottonMenus>

            </ContentPageProfileMenu>
            <AddPublicationModal
                setvisibleBottonModal={setCreateModal}
                visibleBottonModal={createModal}

            />
            <ShareModal
                visibleBottonModal={shareModalOpen}
                setvisibleBottonModal={setShareModalOpen}
                postUrl={''}
            />
            <ConfirmModal
                isModalVisible={confirmModal}
                setvisibleBottonModal={setConfirmModal}
                onCancel={() => setConfirmModal(false)}
                onConfirm={() => {
                    setConfirmModal(false);
                    clearStorage();
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'Welcome' }],
                    })
                }}
                title='Sair da conta'
                text='Ao sair da conta, será necessário fazer login novamente para entrar.' postHexId={''}
            />
            <BottomModalOtherAccount
                title=""
                visibleBottonModal={isBottomModalVisible}
                setvisibleBottonModal={setIsBottomModalVisible}
                marginLeftRight="10px"
                image={user.profileImage} name={user.userNickname}
                setBottomModalOther={() => { setBottomModalOther(!bottomModalOther), setIsBottomModalVisible(!isBottomModalVisible) }}
            />
            <BottomModalOtherAccountCreate
                name=""
                setvisibleBottonModal={() => setBottomModalOther(!bottomModalOther)}
                marginLeftRight="10px"
                image=""
                title="Adicionar conta"
                visibleBottonModal={bottomModalOther}
            />
        </SafeAreaViewContainer3>
    )
}