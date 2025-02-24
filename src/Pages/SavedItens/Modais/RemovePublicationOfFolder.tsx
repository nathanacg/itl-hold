import React, { SetStateAction } from 'react';
import ModalElement from '../../../Components/Modal';
import { View, Text } from 'react-native';
import { TextModal } from '../../CreateRoom/Components/OptionsModal/style';
import { ButtonContent, ContentModalButtons, TextButton } from '../../../Components/Modal/Components/style';
import { typeTheme } from '../../../Config/enumTheme';
import { theme, fontStyle } from '../../../Theme/theme';

interface modalDeleteFolderProps {
    modalRemovePublicationOfFolder: boolean,
    setModalemovePublicationOfFolder: React.Dispatch<SetStateAction<boolean>>,
    removePublicationOfFolder: () => void,
}

export default function RemovePublicationOfFolder(props: modalDeleteFolderProps) {
    return (
        <ModalElement
            setvisibleBottonModal={props.setModalemovePublicationOfFolder}
            isModalVisible={props.modalRemovePublicationOfFolder}
            iconModal={''}
            titlemodal='Remover publicação da pasta?'
            componentChildren={
                <View>
                    <Text style={{ fontFamily: fontStyle.regular, fontSize: 15, color: theme.textDark, textAlign: 'center' }}>
                        Ao remover essa publicação do álbum, ela continuará em
                        Itens salvos.
                    </Text>
                    <ContentModalButtons>

                        <ButtonContent optionButton={typeTheme.light}>
                            <TextButton
                                optionButton={typeTheme.light}
                                onPress={() => {
                                    props.setModalemovePublicationOfFolder(!props.modalRemovePublicationOfFolder)
                                }}
                            >
                                Não
                            </TextButton>
                        </ButtonContent>
                        <ButtonContent
                            optionButton={typeTheme.default}
                            onPress={() => {
                                props.setModalemovePublicationOfFolder(!props.modalRemovePublicationOfFolder),
                                    props.removePublicationOfFolder()
                            }}
                        >
                            <TextButton optionButton={typeTheme.default}>
                                Sim
                            </TextButton>
                        </ButtonContent>
                    </ContentModalButtons>
                </View>
            }
        />
    );
};
