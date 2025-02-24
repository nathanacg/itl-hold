import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`;

export const CloseCamContainer = styled.View`
   flex-direction: row;
   top: 65px;
   right: 15px;
   position: absolute;
`

export const ControllersCamContainer = styled.View`
   width: 100%;
   flex-direction: row;
   align-items: center;
   justify-content:center;
   bottom:6%;
   left: 24px;
   gap: 30px;
   position: absolute;
`

export const Capture = styled.View`
   width: 70px;
   height:70px;
   border-radius: 70px;
   background-color: #fff;
   border: 13px;
   border-color: rgba(255, 255, 255, 0.3);
`

export const Galery = styled.Image`
 
   border: 2px;
   border-color: #fff;
   border-radius: 4px;
   height: 48px;
   width: 48px;
`


export const RecordView = styled.View`
   flex-direction: row;
   align-items: center;
   position: absolute;
   top: 70px;
   left: 15px;
   gap: 10px;
`

export const Circle = styled.View`
   width: 20px;
   height: 20px;
   border-radius: 10px;
   background-color: #F00;
`

export const RecordText = styled.Text`
   color: ${theme.secondaryColor};
   font-family: ${fontStyle.medium};
   font-size: 16px;
`