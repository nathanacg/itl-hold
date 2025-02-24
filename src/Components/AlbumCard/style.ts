import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.TouchableOpacity`
   flex: 1;
   justify-content: center;
   align-items: flex-start;
   margin-bottom: 23px;
   margin-left: 10px;
`;

export const ImageBackground = styled.Image`
    width: 172px;
    height: 172px;
    border-radius: 10px;
    object-fit: cover;
`

export const Title = styled.Text`
    color: #fff;
    font-family: ${fontStyle.regular};
    font-size: 12px;
    text-align: center;
`

export const BottonContent = styled.View`
    bottom: -145px;
`

export const AddAlbun = styled.View`
    width: 172px;
    height: 172px;
    border-width: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const AddText = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size: 16px;
    text-align: center;
`

export const TextNotPublicationsArchiveds = styled.Text`
    color: ${theme.textDark};
    font-size: 14px;
    text-align: center;
    margin-top: 40px;
    
   font-family: ${fontStyle.regular};
`;

export const TextNotPublicationsNot = styled.Text`
    color: ${theme.textDark};
    font-size: 12px;
    text-align: center;
    margin-top: 40px;
   font-family: ${fontStyle.regular};
`;