import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"

interface LinkStyle {
    background: string
    color: string
}

export const Linkcontainer = styled.View`
    position: absolute;
    top: ${(props: {top: string}) => props.top};
    left: ${(props: {left: string}) => props.left};
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 3px 12px;
    background-color:${(props: LinkStyle) => props.background ? props.background: theme.secondaryColor};
    border-radius: 11px;
    transform: scale(${(props: {scale: number}) => props.scale});
    z-index: 2;
`

export const ViewLink = styled.View`
    flex-direction: row;
    align-items: center;
    z-index: 2;
    background-color: #0004;
    height: 50px;
`

export const LinkText = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 15px;
    color: ${(props: LinkStyle) => props.color ? props.color: theme.primarycolor};
`
