import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const GaleryContainer = styled.View`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
`

export const Text = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TextBold = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
`

export const Header = styled.View`
    align-items: flex-end;
   // border-top-right-radius: 30px;
    //border-top-left-radius: 30px;
    padding: 10px;
    background-color: ${theme.secondaryColor};
`
export const Title = styled.Text`
    align-self: center;
    font-size: 16px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`

export const Bottom = styled.TouchableOpacity`
    width: 100%;
    /* height: 60px; */
    border: 1px;
    padding: 8px 10px 25px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryColor};
    /* position: fixed; */
`
export const BottomContain = styled.View`
    width: 100%;
    /* height: 60px; */
    border: 0.2px;
    padding: 8px 20px 25px;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    background-color: ${theme.secondaryColor};
    /* position: fixed; */
`