import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.ScrollView`
   flex: 1;
   background-color: ${theme.secondaryColor};
`;

export const Header = styled.View`
    align-items: flex-start;
    padding-bottom: 20px;
    padding-top: 15px;
`

export const ButtonNav = styled.TouchableOpacity`
    width: 33%;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 6px;
    padding: 5px 10px;
`

export const Image = styled.Image`
    width: 102px;
    height: 112.28px;
    margin-right: 2px;
    margin-bottom: 2px;
`

export const ButtonsContainer = styled.View`
   flex-direction: row;
   justify-content: center;
   gap: 6px;
   padding: 0 24px;
`

export const ButtonText = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 14px;
   color: ${theme.primarycolor};
   line-height: 18px;
`

export const Count = styled.Text`
    font-size: 12px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    padding: 4px 24px;
    border-top-width: 0.5px;
    border-top-color: ${theme.lightGray};
`


export const YearLine = styled.Text`
    padding: 6px 10px 2px;
    color: ${theme.textDark};
    font-size: 12px;
`