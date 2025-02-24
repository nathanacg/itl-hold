import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Text = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`
export const Title = styled.Text`
    margin-left: 14px;
    font-size:16px;
    color: ${theme.textLight};
    font-family: ${fontStyle.regular};
`

export const Title2 = styled.Text`
    font-size:14px;
    color: ${theme.textLight};
    font-family: ${fontStyle.regular};
`

export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 0px 0;
`
export const ButtonEditImage = styled.TouchableOpacity`
    position: absolute;
    bottom: 0px;
    right: 0px;
`

export const ButtonEditTitle = styled.TouchableOpacity`
margin-left: 10px;
`

export const ContainerImageAlbum = styled.View`
    width: 105px;
    height: 105px;
    align-self: center;
    margin-top: 30px;
    margin-bottom: 14px;
`

export const ContainerTitle = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    margin-bottom: 0px;
`

export const CameraIcon = styled.Image`
    height: 24px;
    width: 24px;
    background-color: white;
    border-radius: 24px;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`
export const TextTab = styled.Text`
   color: ${(props: { active: boolean }) => props.active ? (theme.primarycolor) : ('#c4c4c4')};
   font-family: ${fontStyle.regular};
   font-size: 14px;
   padding-top: 3px;
`
export const TabsContainer = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   border-bottom-color: ${theme.primarycolor};
   margin-top: 20px;
`