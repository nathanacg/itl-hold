import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';
import { Platform } from 'react-native';

export const OptionModal = styled.Text`
   font-size:14px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`;

export const BottomContainer = styled.View`
    background-color:#fff;
    border-top-left-radius:25px;
    border-top-right-radius:25px;
    min-height: ${Platform.OS === 'android' ? '20%' : '0%'};
    width:100%;
    gap: 12px;
    align-self: center;
    padding:45px ${(props: { marginLeftRight: string }) => props.marginLeftRight ? (props.marginLeftRight) : ('8%')} 55px;
`