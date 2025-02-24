import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

interface textButttonProps {
    color: string
}

export const ButtonMenuContainer = styled.TouchableOpacity`
    flex-direction:row;
    align-items: center;
    gap: 10px;
    margin-bottom: 8%;
`

export const ContainerImage = styled.View`
    width: 7%;
`

export const TextButton = styled.Text`
    font-size:14px;
    color: ${(props: textButttonProps) => props.color};
    font-family: ${fontStyle.regular};
`