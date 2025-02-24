import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const ButtonsContainer = styled.View`
   flex-direction: row;
   justify-content: center;
   gap: 6px;
   padding: 0px 24px;
`

export const ButtonNav = styled.TouchableOpacity`
   width: ${(props: { width: string }) => props.width};
   align-items: center;
   padding: 9px 12px;
   border: 1px;
   border-color: ${theme.primarycolor};
   border-radius: 6px;
`

export const ButtonText = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 14px;
   color: ${theme.primarycolor};
   line-height: 18px;
`