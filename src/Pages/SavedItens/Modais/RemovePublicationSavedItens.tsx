import React, { SetStateAction } from 'react';
import ModalElement from '../../../Components/Modal';
import { View, Text } from 'react-native';
import { TextModal } from '../../CreateRoom/Components/OptionsModal/style';
import { ButtonContent, ContentModalButtons, TextButton } from '../../../Components/Modal/Components/style';
import { typeTheme } from '../../../Config/enumTheme';
import { theme, fontStyle } from '../../../Theme/theme';

interface modalDeleteFolderProps {
    modalRemovePublicationSavedItens: boolean,
    setModalRemovePublicationSavedItens: React.Dispatch<SetStateAction<boolean>>,
    removePublication: () => void,
}

export default function RemovePublicationSavedItens(props: modalDeleteFolderProps) {
    return (
        <ModalElement
            setvisibleBottonModal={props.setModalRemovePublicationSavedItens}
            isModalVisible={props.modalRemovePublicationSavedItens}
            iconModal={''}
            titlemodal='Remover publicação de Itens salvos?'
            componentChildren={
                <View>
                    <Text style={{ fontFamily: fontStyle.regular, fontSize: 15, color: theme.textDark, textAlign: 'center' }}>
                        Ao remover essa publicação de Itens salvos, você também a removerá de todas
                        as coleções.
                    </Text>
                    <ContentModalButtons>

                        <ButtonContent optionButton={typeTheme.light}>
                            <TextButton
                                optionButton={typeTheme.light}
                                onPress={() => {
                                    props.setModalRemovePublicationSavedItens(!props.modalRemovePublicationSavedItens)
                                }}
                            >
                                Não
                            </TextButton>
                        </ButtonContent>
                        <ButtonContent
                            optionButton={typeTheme.default}
                            onPress={() => {
                                props.setModalRemovePublicationSavedItens(!props.modalRemovePublicationSavedItens),
                                    props.removePublication()
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
