import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-right: 14px;
   margin-left: 20px;
`;

export const ProfilePublicationContent = styled.View`
    flex-direction: row;
    gap: 12px;
    flex: 1;
    align-items: flex-start;
`

export const ProfilePhoto = styled.Image`
   width: 34px;
   height: 34px;
   border-radius: 34px;
`

export const ProfileName = styled.Text`
   color: ${theme.textDark};
   font-size: 16px;
   font-family: ${fontStyle.semiBold};
`

export const TimerPublicationContent = styled.View`
    flex-direction: row;
    gap: 7px;
    align-items: center;
`

export const TimerPublication = styled.Text`
   color: ${theme.textLight};
   font-size: 10px;
   font-family: ${fontStyle.regular};
`


export const SpoilerIcon = styled.Image`
   width: 23px;
   height: 23px;
   margin-right: -8px;
   object-fit: contain;
`