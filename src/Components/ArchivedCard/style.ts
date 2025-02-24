import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.TouchableOpacity`
   flex: 1;
   align-items: center;
   max-width: 25%;
`;

export const Photo = styled.Image`
   width: 121.67px;
   height: 129.79px;
   max-width: 100%;
   border-width: 1px;
   border-color: ${theme.secondaryColor};
`

export const TicketDate = styled.View`
    background-color: rgba(94, 94, 94, 0.7);
    justify-content: center;
    padding: 2px;
    width: 85%;
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

export const Mask = styled.View`
    background-color: rgba(38, 38, 38, 0.5);
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
`

export const RadioUnchedButton = styled.View`
    border: 2px;
    border-color: #fff;
    border-radius: 50px;
    padding: 8px;
    right:0px;
    position: absolute;
    margin: 5px 10px;
`

export const ImageRadioChecked = styled.Image`
    width:24px;
    height:24px;
    right:0px;
    position: absolute;
    margin: 2.75px 8px;
`

export const ContentLikes = styled.View`
    position: absolute;
    flex-direction: row;
    align-items: center;
    gap: 10;
    z-index: 3;
    bottom: 7px;
    right: 8px;
`

export const CountLikes = styled.Text`
    font-size:11px;
    font-family: ${fontStyle.regular};
    color:${theme.secondaryColor};
`

export const VideoIcon = styled.View`
     position: absolute;
    right: 0;
    flex-direction: row;
    align-items: center;
    gap: 10;
    z-index: 3;
    bottom: 7px;
    right: 8px;
`