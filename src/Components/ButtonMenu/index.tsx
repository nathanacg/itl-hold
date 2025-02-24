import React from 'react';
import { Image, View } from "react-native"
import {
  ButtonMenuContainer,
  TextButton,
  ContainerImage
} from './style'

interface buttonMenuProps {
  text: string,
  icon: any
  actionFunction: () => void
  textColor: string
  tintColor?: string
}

export default function ButtonMenu(props: buttonMenuProps) {
  return (
    <ButtonMenuContainer onPress={() => props.actionFunction()}>
      <ContainerImage>
        <Image style={{ width: 20, height: 25, tintColor: props.tintColor, resizeMode: 'contain', marginRight: 2 }} source={props.icon} />
      </ContainerImage>
      <TextButton color={props.textColor}>
        {props.text}
      </TextButton>
    </ButtonMenuContainer>
  );
};
