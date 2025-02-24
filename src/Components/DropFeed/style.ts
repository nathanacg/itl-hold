import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";
import { Dimensions, Platform } from "react-native";

const width = Dimensions.get('screen').width;

export const Container = styled.TouchableOpacity`
    width: ${width}px;
    justify-content: center;
`;

export const DropContainer = styled.View`
    position: absolute;
    width: 100%;
    top: 10px;
    left: 0px;
    flex: 1;
    justify-content: space-between;
    padding-bottom: 10%;
    border-color: transparent;
`

export const DropHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: ${(props: DropFooterProps) => (props.showInFeed ? "15px 15px 0px 20px" : "20px 10px 10px 20px")} ;
`

export const UserInfo = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 7px;
`

export const UserImage = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 18px;

`

interface DropFooterProps {
    showInFeed?: boolean
}

export const DropFooter = styled.View<DropFooterProps>`
    padding: ${(props: DropFooterProps) => (props.showInFeed ? "0px 30px 80px 40px" : Platform.OS == 'ios' ? "0px 30px 40px 30px" : "0px 30px 70px 30px")} ;
`

export const DropFooterFeed = styled.View<DropFooterProps>`
    padding-top: 5px;
    width:100%;
    height: 10%;
    align-items: flex-start;

`

export const LikesLabel = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${theme.textDark};
    font-weight: 400;
    margin-left: 17px;
    margin-bottom: 20px;
`

export const FooterRow = styled.View`
    flex-direction: row;
    margin-left: -15px;
    align-items: center;
    margin-bottom: 15px;
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
    height: 33px;
    width: 33px;
    margin-left: ${width - 50}px;
    margin-top: -50px;
    margin-bottom: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    z-index: 100;
    background-color: #000;
    border-radius: 33px;
`
