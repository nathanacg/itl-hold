import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`;

export const ContainerImageACover=styled.View`
    width: 132px;
    align-items: center;
`

export const ImageCover=styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 10px;
`

export const ImageContentPress=styled.TouchableOpacity`
    position: absolute;
    z-index: 2;
    bottom: -5px;
    right: -2px;
`

export const ImageIcon=styled.Image`
   width: 30px;
   height: 30px;
   background-color: white;
   border-radius: 50px;
   margin-right: -10px;
`

export const AlbumName = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 18px;
    color: ${theme.primarycolor};
    text-align: center;
    margin-top: 15px;
`

export const ImageAlbum=styled.Image`
   width: 33.1%;
   height: 203px;
   margin-right: 2px;
   margin-bottom: 2px;
`
