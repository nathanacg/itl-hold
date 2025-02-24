import styled from "styled-components/native"
import { fontStyle, theme } from "../../../../Theme/theme"

interface LinkStyle {
    background: string
    color: string
}

export const Linkcontainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 3px 12px;
    background-color:${(props: LinkStyle) => props.background ? props.background: theme.secondaryColor};
    border-radius: 11px;
`

export const LinkText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${(props: LinkStyle) => props.color ? props.color: theme.primarycolor};
`
