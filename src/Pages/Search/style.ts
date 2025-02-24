import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerSearch = styled.View`
   padding-left: 25px;
   padding-right: 25px;
`;

export const FilterCategoryContainer=styled.View`
   border-radius: 20px;
   height: 23px;
   padding: 2px 7px 2px 12px;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   background-color: ${theme.primarycolor};
   gap: 6px;
`

export const TextOptionSelected = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 12px;
    color: #fff;
`
