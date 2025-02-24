import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";


export const DropContainer = styled.View`
    position: relative;
    flex: 1;
    justify-content: space-between;
    padding-bottom: 30px;
    background-color: ${theme.textDark};
`

export const DropHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 24px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 11px;
`

export const UserImage = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 18px;

`

export const DropFooter = styled.View`
    padding: 0 38px 30px 58px ;
`

export const FooterRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const BoldWhite = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.secondaryColor};
`

export const IconsOptions = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

export const TextCount = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 18px;
    color: ${theme.secondaryColor};

`

export const IconsCount = styled.TouchableOpacity`
    align-items: center;
`

export const UserImageFeed = styled.Image`
    width: 23px;
    height: 23px;
    border-radius: 23px;
`

export const Button = styled.TouchableOpacity`
    background-color: ${theme.primarycolor};
    border-radius: 6px;
    padding: 5px;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 150px;
    margin-top: 15px;
`

export const Title = styled.Text`
    color: #fff;
    font-weight: 500;
    font-size: 18px;
`