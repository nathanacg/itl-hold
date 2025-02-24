import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`

export const TextNotPostsArchiveds = styled.Text`
   color: ${theme.textDark};
   font-size: 12px;
   margin:15% 35px;
   font-family: ${fontStyle.regular};
`;

export const YearDate = styled.View`
    position: fixed;
    right: 5px;
    bottom: 60%;
    background-color: rgba(94, 94, 94, 0.7);
    justify-content: center;
    padding: 1px;
    width: 70px;
    margin-top: ${(props: { markedCard: boolean }) => props.markedCard ? ('30px') : ('10px')};
    position: absolute;
    z-index: 3;
    border-radius: 6px;
`

export const TextTicket = styled.Text`
    text-align: center;
    font-size:12px;
    font-family: ${fontStyle.regular};
    color:${theme.secondaryColor};
`

export const HeaderText = styled.Text`
    font-size: 15px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark};
    margin-top: 3px;
`

export const StoryOptions = styled.TouchableOpacity`
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