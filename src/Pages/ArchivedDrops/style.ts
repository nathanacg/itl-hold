import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container=styled.View`
   flex: 1;
`

export const TextNotPublicationsArchiveds = styled.Text`
   color: ${theme.textDark};
   font-size: 12px;
   margin: 14% 35px;
   font-family: ${fontStyle.regular};
`;

export const PublicationContainer = styled.TouchableOpacity`
   width: 33.1%;
   height: 242px;
   margin-right: 2px;
   margin-bottom: 2px;
`

export const HeaderText = styled.Text`
    font-size: 15px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark};
    margin-top: 3px;
`

export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 0px 0;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`