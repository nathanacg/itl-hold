import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../../Theme/theme';
import { typeTheme } from '../../../../Config/enumTheme';


export const ContainerProfilesList = styled.View`
    flex-direction: row;
    width: 94%;
    /* justify-content: space-between; */
    align-items: flex-start;
    border-color: ${theme.lightGray};
`

export const ImageProfile = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 44px;
`
export const ProfileName = styled.Text`
    font-size:13px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   padding-left: 10px;

`
export const ProfileNickname = styled.Text`
    font-size:13px;
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
   padding-left: 10px;
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    padding-left: 1px;
`

export const AlignItems = styled.View`
        flex-direction: column;
        flex:1 ;
`
export const AlignItemsRow = styled.View`
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
`
