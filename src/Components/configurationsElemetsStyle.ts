import styled from 'styled-components/native';
import { fontStyle, theme } from '../Theme/theme';
import { Dimensions } from 'react-native';

const Height = Dimensions.get('screen').height

export const Container = styled.View`
    flex: 1;
    gap: 25px;
    margin-top: 35px;
`

export const ContentainerConfigurations = styled.View`
   padding: 0px 25px 20px;
   gap: 20px;
   margin-top: 35px;
`;

export const SectionContainer = styled.View`
   padding: 0px  25px 7px;
   border-width: 1px;
   border-color: ${(props: { borderColor: string }) => props.borderColor ? (props.borderColor) : ('#C4C4C4')};
   border-left-color: transparent;
   border-right-color: transparent;
   border-top-color: transparent;
   gap: 19px;
`

export const SemiBoldText = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
`

export const TextContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   gap:10px;
`;

export const TextSelection = styled.View`
    flex-direction: row;
    gap:10px;
    margin-top: -10px;
    justify-content: space-between;
`

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`

export const TextRegular16 = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size: 16px;
`

export const TextRegular16Prefer = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size: 14px;
    margin-top: 20px;
`

export const TextRegular12 = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
    margin-top: 5px;
`

export const TextRegular12Light2 = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    margin-top: 5px;
`

export const TextRegular12Error = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    text-align: right;
    color: ${theme.dangerColor};
    margin-top: 20px;
`

export const TextRegular12Center = styled.Text`
    font-family: ${fontStyle.semiBold};
    padding-left: 30px;
    font-size: 14px;
    color: ${theme.textDark};
    margin-bottom: ${(props: { marginBottom: number; }) => props.marginBottom ? props.marginBottom : 0}px;
    margin-top: ${(props: { marginTop: number; }) => props.marginTop ? props.marginTop : 0}px;
`

export const TextRegular12Light = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: ${Height <= 853 ? '11px' : '14px'};
    color: ${theme.secondaryColor};
    margin-top: 0px;
    margin-bottom: 2px;
`
export const TextRegular12Light1 = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textDark};
    margin-top: 5px;
    margin-bottom: 2px;
`

export const TextRegular11 = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textligthGray};
`

export const TextLightGray = styled.Text`
     font-family: ${fontStyle.regular};
     color: ${theme.textligthGray};
     font-size: 13px;
     text-align: ${(props: { textAlign: string; }) => props.textAlign ? props.textAlign : 'left'};
`

export const TextMin = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
    width: 90%;
`


export const TextMarkPending = styled.Text`
    color:${theme.textLight};
    font-family: ${fontStyle.regular};
    font-size:12px;
   
`