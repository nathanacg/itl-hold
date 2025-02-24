import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';
import { Platform } from 'react-native';

export const TextHeader = styled.Text`
    font-size:16px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const OptionContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

export const TextOptionSelectedBottom = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const ImageAlbum = styled.Image`
    width: 221px;
    height: 221px;
    border-radius: 10px;
`

export const ImageAlbumContainer = styled.TouchableOpacity`
    padding-top: 10px;
    width: 221px;
`
export const ImageAlbumContainerFlex = styled.View`
    display: flex;
    width: 67%;
    gap: 40px;
    justify-content: flex-end;
    flex-direction: row;
`
export const TextError = styled.Text`
    color: ${theme.dangerColor};
    font-family: ${fontStyle.regular};
    font-size:12px;
    text-align:right;
    right: 0px;
    width: 100%;
    top: 40px;
`

export const TextErrorName = styled.Text`
    color: ${theme.dangerColor};
    font-family: ${fontStyle.regular};
    font-size:12px;
    text-align:right;
    position: absolute;
    right: 0px;
    top: 80%;
`

export const CameraIcon = styled.Image`
    height: 40px;
    width: 40px;
    position: absolute;
    z-index: 2;
    bottom: -10px;
    right: -10px;
    border-radius: 40px;
`

export const Title = styled.Text`
    font-size: 14px;
    font-family: ${fontStyle.regular};
    color: #000;
`

export const Description = styled.Text`
    font-size: 12px;
    font-family: ${fontStyle.regular};
    font-weight: 200;
    color: #000;
`

export const SubContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

export const Wrapper = styled.View`
width: 90%;
align-self: center;
margin-top: 10px;
align-items: flex-start;
justify-content: space-between;
display: flex;
`

export const Wrapper2 = styled.View`
width: 90%;
align-self: center;
margin-top: 10px;
margin-bottom: 20px;
align-items: flex-start;
justify-content: space-between;
display: flex;
flex-direction: row;
`