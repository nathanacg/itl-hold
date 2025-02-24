import styled from "styled-components/native";
import { fontStyle, theme } from "../../../Theme/theme";
import { Platform } from "react-native";


export const DropContainer = styled.View`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 15px;
    left: 0px;
    flex: 1;
    justify-content: space-between;
    padding-bottom: 8%;
    border-color: transparent;

`

export const DropHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: ${(props: DropFooterProps) => (props.showInFeed ? "21px 0px 0px 20px" : "45px 10px 70px 10px")} ;
`

export const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    flex: 1;
    margin-left: 10px;
    gap: 7px;
   
`

export const UserImage = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 34px;
`

interface DropFooterProps {
    showInFeed?: boolean
}

export const DropFooter = styled.View<DropFooterProps>`

    padding: ${(props: DropFooterProps) => (props.showInFeed ? "0px 30px 80px 40px" : Platform.OS == 'ios' ? "0px 30px 40px 30px" : "0px 30px 70px 30px")} ;
`

export const DropFooterFeed = styled.View<DropFooterProps>`
    margin-top: 5px;
    width:100%;
    height: 20%;
    align-items: flex-start;
`

export const LikesLabel = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${theme.textDark};
    font-weight: 400;
    margin-left: 17px;
`

export const FooterRow = styled.View`
    flex-direction: row;
    margin-left: -15px;
    align-items: center;
    margin-bottom:-30px;
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
    gap: 15px;
`
export const IconsOptionsFeed = styled.View`
    flex-direction: row;
    gap: 10px;
`

export const TextCount = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 18px;
    color: ${theme.secondaryColor};

`

export const TextCountFeed = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 18px;
    color: ${theme.primarycolor};
`

export const IconsCount = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-left: 10px;
`

export const IconsCountFeed = styled.TouchableOpacity`
`


export const IconsCount2 = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-left: 10px;
    /* justify-content: space-between; */
    /* height: 60px; */
`

export const Volume = styled.TouchableOpacity`
    position: absolute;
    bottom: 20px;
    right: 20px;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #ffffff11;
    border-radius: 20px;
    /* justify-content: space-between; */
    /* height: 60px; */
`
