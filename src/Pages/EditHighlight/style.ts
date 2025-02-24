import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TextHeader = styled.Text`
    font-size:16px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TextOptionSelectedBottom = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.light};
`

export const TextOptionSelected = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
`

export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 2px 0px;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textDark};
`


export const ImageAlbum = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 10px;
`

export const ImageAlbumEdit = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 10px;
`

export const WithoutImage = styled.View`
    left: -30px;
`

export const ImageAlbumContainer = styled.View`
    padding-top: 10px;
    width: 221px;
`

export const ImageAlbumContainerNoValue = styled.View`
    padding-top: 15px;
    width: 45px;
`

export const CameraIcon = styled.Image`
    position: absolute;
    z-index: 2;
    bottom: -10px;
    right: 60px;
`

export const CameraIconEdit = styled.Image`
    position: absolute;
    z-index: 2;
    bottom: -5px;
    right: 60px;
`

export const TextInputTitle = styled.TextInput`
    width: 60%;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 20px;
    position: relative;
    color: ${theme.inputTextColor};
    font-size: 14px;
    font-family: ${fontStyle.regular};
    border-color: #ababab;
    border-width: 1px;
    border-left-width: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
`

export const ImageCameraIcon = styled.Image`
    width: 20px;
    height: 20px;
    resize-mode: contain;
    margin-bottom: 3px;
    tint-color: black;
`
export const ImageGaleryIcon = styled.Image`
    width: 22px;
    height: 22px;
    tint-color: black;
    resize-mode: contain;
    margin-bottom: 3px;
`
export const SetEditSelection = styled.TouchableOpacity`
    flex-direction: row;
`