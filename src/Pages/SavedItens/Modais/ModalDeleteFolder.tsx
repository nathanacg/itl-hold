import React, { SetStateAction } from 'react';
import ModalElement from '../../../Components/Modal';
import { Text, View } from 'react-native';
import { TextModal } from '../../CreateRoom/Components/OptionsModal/style';
import { ButtonContent, ContentModalButtons, TextButton } from '../../../Components/Modal/Components/style';
import { typeTheme } from '../../../Config/enumTheme';
import { fontStyle, theme } from '../../../Theme/theme';

interface modalDeleteFolderProps {
    modalDeleteFolder: boolean,
    setModalDeleteFolder: React.Dispatch<SetStateAction<boolean>>,
    deleteFolder: boolean,
    setDeleteFolder: React.Dispatch<SetStateAction<boolean>>
}

export default function ModalDeleteFolder(props: modalDeleteFolderProps) {
    return (
        <ModalElement
            setvisibleBottonModal={props.setModalDeleteFolder}
            isModalVisible={props.modalDeleteFolder}
            iconModal={''}
            titlemodal='Excluir álbum?'
            componentChildren={
                <View>
                    <Text style={{ fontFamily: fontStyle.regular, fontSize: 15, color: theme.textDark, textAlign: 'center' }}>
                        Quando você excluir esta pasta, as fotos e os vídeos continuarão salvos.
                    </Text>
                    <ContentModalButtons>

                        <ButtonContent optionButton={typeTheme.light}>
                            <TextButton
                                optionButton={typeTheme.light}
                                onPress={() => {
                                    props.setModalDeleteFolder(!props.modalDeleteFolder)
                                }}
                            >
                                Não
                            </TextButton>
                        </ButtonContent>
                        <ButtonContent
                            optionButton={typeTheme.default}
                            onPress={() => {
                                props.setModalDeleteFolder(!props.modalDeleteFolder),
                                    props.setDeleteFolder(!props.deleteFolder)
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
