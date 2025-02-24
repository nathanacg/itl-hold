import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';
import { Platform } from 'react-native';

export const Container = styled.View`
   flex: 1;
`;

export const TextHeader = styled.Text`
    color: ${theme.primarycolor};
    font-size: 16px;
    font-family: ${fontStyle.regular};
`

export const ProfilePhotoContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px;
    border-color: transparent;
    border-bottom-color: #ababab;
    padding-bottom: 5px;
`

export const ActionsEditProfilePhotoContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
    margin-left: 1px;
`

export const ImageProfile = styled.Image`
    width: 132px;
    height: 132px;
    border-radius: 100px;
`

export const IconEditProfilePhoto = styled.Image`

`

export const Label = styled.Text`
    font-size: ${Platform.OS == 'ios' ? 14 : 13};
    margin-bottom: 0px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    
    max-width: 64px;
`

export const LabelBirth = styled.Text`
    font-size:14px;
    margin-bottom: 3px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    
    max-width: 90px;
`

export const LabelBio = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    margin-top: -80px;
    max-width: 25%;
`

export const TextInputBox = styled.TextInput`
    border-radius:10px;
    width: 80%;
    height: 110px;
    padding-left: 30px;
    /* padding: 15px 10px; */
    font-family: ${fontStyle.regular};
`

export const TextCountLimitCaractersBio = styled.Text`
    color: #c6c6c6;
    text-align:right;
    font-family: ${fontStyle.regular};
`

export const PersonalInformationsContainer = styled.View`
    border-color: transparent;
    padding-top: 5px;
    margin-top: 5px;
    gap: 7px;
`

export const SectionName = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size: 15px;
    margin-top: 10px;
`

export const SectionDescription = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size: 12px;
    width: 85%;
`

export const FlexContentDateBirthday = styled.View`
    width: 100%;
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
    margin-bottom:5px;
    gap:7px;
`

export const ContactInfoContainer = styled.View`
    border: 1px;
    border-color: transparent;
    border-top-color: #ababab;
    padding-top: 5px;
    margin-top: 5px;
    padding-bottom: 20px;
    gap: 7px;

`

export const ShowContactoInfoContainer = styled.View`
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
`

export const ShowContactText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.inputTextColor};
`
