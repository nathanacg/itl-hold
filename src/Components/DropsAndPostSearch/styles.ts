import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
    flex: 1;
   margin-top: 20px;
`

export const ContainerGroups = styled.View`
    width: 100%;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   margin-bottom: 1px;
`;

export const PostLegendText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: center;
    padding: 20px;
    color: ${theme.textDark};
    z-index: 2;
    position: absolute;
`
