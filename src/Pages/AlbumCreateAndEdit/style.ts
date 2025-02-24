import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TextHeader=styled.Text`
    font-size:16px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const OptionContainer=styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

export const TextOptionSelectedBottom=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const ImageAlbum=styled.Image`
    width: 221px;
    height: 221px;
    border-radius: 10px;
`

export const ImageAlbumContainer=styled.TouchableOpacity`
    padding-top: 10px;
    width: 221px;
`
export const ImageAlbumContainerFlex=styled.TouchableOpacity`
    width: 160px;
    margin-bottom: 20px;
`

export const CameraIcon=styled.Image`
    height: 30px;
    width: 30px;
    position: absolute;
    z-index: 2;
    bottom: -10px;
    right: -10px;
    background-color: white;
    border-radius: 50px;
`