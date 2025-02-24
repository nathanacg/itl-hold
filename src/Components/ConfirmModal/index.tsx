import React, { View } from 'react-native';

import { ButtonContent, TextButton } from '../Modal/Components/style';

import { typeTheme } from '../../Config/enumTheme';
import { ButtonsContainer, ModalText } from './style';
import { SetStateAction } from 'react';
import ModalElementAction from '../ModalAction';

interface ComfirmModalProps {
  postHexId?: string;
  isModalVisible: boolean;
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmModal(props: ComfirmModalProps) {
  //   console.log('ConfirmModal props.isModalVisible', props.isModalVisible);
  //   console.log('ConfirmModal props.postHexId', props.postHexId);
  return (
    <ModalElementAction
      setvisibleBottonModal={props.setvisibleBottonModal}
      isModalVisible={props.isModalVisible}
      iconModal={''}
      titlemodal={props.title}
      componentChildren={
        <View style={{ gap: 25, alignItems: 'center' }}>
          <ModalText>{props.text}</ModalText>
          <ButtonsContainer>
            <ButtonContent
              onPress={props.onCancel}
              optionButton={typeTheme.light}>
              <TextButton optionButton={typeTheme.light}>Não</TextButton>
            </ButtonContent>
            <ButtonContent
              onPress={props.onConfirm}
              optionButton={typeTheme.default}>
              <TextButton optionButton={typeTheme.default}>Sim</TextButton>
            </ButtonContent>
          </ButtonsContainer>
        </View>
      }
    />
  );
}
