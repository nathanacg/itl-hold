import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"

export const ContentContainer = styled.View`
      width: 100%;
      align-items: flex-start;
      gap: 20px;
      padding: 0px 24px;
`

export const DeleteOption = styled.TouchableOpacity`
    border-top-width: 0.3px;
    border-top-color: ${theme.inputTextColor};
    justify-content: center;
    align-items: center;
    padding: 18px 0;
`

export const AllContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 18px 27px 18px 25px;
    gap: 10px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${theme.lightGray};
`

export const AllText=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`