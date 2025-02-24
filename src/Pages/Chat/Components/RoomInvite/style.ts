import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-self: ${(props: { isMy: any; }) => props.isMy ? "flex-end" : "flex-start"};
    margin-left: 25px;
`

export const Container = styled.ImageBackground`
    width: 192px;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    /* align-self: flex-end;
    margin: 0px 25px; */
`


export const Shadow = styled.View`
    background-color: #0007;
    padding: 10px 8px 15px;
    width: 192px;
    height: 100px;
    border-radius: 6px;
    justify-content: center;
`
export const TextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const DateText = styled.Text`
    font-family: ${(props: { fontFamily: string }) => props.fontFamily ? props.fontFamily : fontStyle.regular};
    font-size: 5px;
    color: ${theme.secondaryColor};
    line-height: ${(props: { lineHeight: string }) => props.lineHeight ? props.lineHeight : "9px"};
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.secondaryColor};
    line-height: 30px;
    margin-bottom: 0px;
`

export const NormalText = styled.Text`
   font-family: ${fontStyle.regular};
    font-size: ${(props: { fontsize: string }) => props.fontsize ? props.fontsize : '10px'};
    color: ${theme.secondaryColor};
    line-height: 10px;
`

export const ParticipantsContainer = styled.View`
    flex-direction: row;
    align-items: center;
`


// export const RoomInviteContainer = styled.View`
//     flex-direction: row;
//     justify-content: flex-end;
//     align-items: center;
//     padding: 8px 25px;
//     gap: 6px;
// `

// export const Container = styled.View`
//     align-self: flex-end;
//     width: 280px;
//     height: 80px;
//     border-width: 1px;
//     border-color: #c4c4c4;
//     border-radius: 6px;
//     flex-direction: row;
//     align-items: flex-start;
//     background-color: ${theme.secondaryColor};
//     margin: 0px 25px;
//     overflow: hidden;
//     gap:2px ;
// `

// export const RoomImage = styled.Image`
//     width: 80px;
//     height: 80px;
// `

// export const ContentInfo = styled.View`
//     padding: 5px;
//     align-items: center;
//     justify-content: center;
// `

// export const Title = styled.Text`
//     width: 190px;
//     font-family: ${fontStyle.semiBold};
//     font-size: 14px;
//     color: ${theme.textDark};
//     line-height: 18px;
// `

// export const Description = styled.Text`
//     width: 190px;
//     font-family: ${fontStyle.regular};
//     font-size: 12px;
//     color: ${theme.textDark};
// `