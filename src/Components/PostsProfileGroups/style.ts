import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

import { Dimensions, Platform } from 'react-native'

const Width = Dimensions.get('screen').width
const is_ios = Platform.OS == 'ios';

export const Container = styled.View`
   flex: 1;
   margin-top: 10px;
`;

export const TabsContainer = styled.ScrollView.attrs({
   horizontal: true,
   showsHorizontalScrollIndicator: false,
   contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
})`
   flex-direction: row;
   border-bottom-color: ${theme.primarycolor};
`


export const TabButton = styled.TouchableOpacity`
   padding: 3px 7px;
   border: ${(props: { active: boolean }) => props.active ? ('1px') : ('0px')};
   border-color: ${theme.primarycolor};
   border-bottom-width: 0;
   flex-direction: row;
   align-items: center;
   gap: 2px;
   border-radius: 6px;
   border-bottom-right-radius: 1px;
   border-bottom-left-radius: 1px;
`

export const TextTab = styled.Text`
   color: ${(props: { active: boolean }) => props.active ? (theme.primarycolor) : ('#c4c4c4')};
   font-family: ${fontStyle.regular};
   font-size: 14px;
   padding-top: 3px;
`

export const ImageIcon = styled.Image`
   width: 18px;
   height: 15px;
`

export const PublicationContainer = styled.TouchableOpacity`
   width: ${Width > 399 ? (is_ios ? 143.3 : 137 )  : '131'}px;
   height: ${Width > 399 ? (is_ios ? 143.3 : 137 ) : '131'}px;
`



export const CarouselIndex = styled.Text`
    text-align: center;
    vertical-align: middle;
    color: ${theme.secondaryColor};
    font-size: 11px;
`

export const IndexContainer = styled.View`
    background-color: #000000C2;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 7px;
    z-index: 50;
    bottom: 7px;
    width: 28px;
    height: 20px;
    border-radius: 3px;
    
`

export const PublicationCard = styled.Image`
   width: 100%;
   height: 135px;
`
export const DropCard = styled.Image`
   width: 33.1%;
   height: 190px;
   margin-right: 2px;
   margin-bottom: 2px;
`
export const SpoilerCard = styled.Image`
   width: 100%;
   height: 142px;
   background-color: black;
`
export const SpoilerCardIcon = styled.Image`
   width: 20px;
   height: 20px;
   margin-right: 10px;
   margin-bottom: 5px;
   background-color: #0009;
`

export const ImageCard = styled.Image`
   width: 33%;
   height: 190px;
   margin-right: 1.1px;
   margin-bottom: 2px;
`

export const PostContainer = styled.View`
   /* border-top-width: 1px;
   border-top-color: ${theme.primarycolor}; */
   padding-top: 15px;
   
`

export const PrivateInfoContainer = styled.View`
   flex: 1;
   align-items: center;
   gap: 6px;
   height: 400px;
   padding: 50px 0 100px;
`

export const ImageLocker = styled.Image`

`

export const TextPrivate = styled.Text`
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
   font-size: 16px;
   text-align: center;
`

export const TextInstructionsPrivate = styled.Text`
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   font-size: 14px;
   text-align: center;
   width: 50%;
`

export const DropOptionsButton = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 10px 0;
`

export const OptionTitle = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`

export const Separator = styled.View`
   width: 100%;
   height: 20px;
`