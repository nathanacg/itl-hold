import styled from 'styled-components/native'
import { theme } from '../../Theme/theme'
import { PixelRatio } from 'react-native';

export const Container = styled.ScrollView`
   flex-direction: row;
   margin-left: ${(props: { marginLeft: string }) => props.marginLeft ? props.marginLeft : '25px'};
   margin-top: ${(props: { marginTop: string }) => props.marginTop ? props.marginTop : '0px'};
`;


export const ContainerFilters = styled.ScrollView`
   flex-direction: row;
   align-items: center;
   gap: 10px;
`;

export const FilterCategoryContainer = styled.View`
   padding-right:10px;
   margin-right: 10px;
   border: 1px;
   border-color: ${theme.lightGray};
   border-bottom-color:transparent;
   border-top-color: transparent;
   border-left-color: transparent;
   border-left-width: 0;
`

export const FilterCategoryContent = styled.TouchableOpacity`
   height: 18px;
   width: 18px;
   border-radius: 50px;
   padding: 18px;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background-color: rgba(2, 69, 244, 0.2);

`

export const ImageFilteredIcon = styled.Image`
   width: ${PixelRatio.getPixelSizeForLayoutSize(150)};
   height: ${PixelRatio.getPixelSizeForLayoutSize(150)};
`

