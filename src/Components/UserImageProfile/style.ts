import styled from "styled-components/native";

export const UserImageContainer = styled.View`
    justify-content: center;
    align-items: center;
    padding: 3px;
    position: relative;
`

export const UserImage = styled.Image`
    border-width: 1px;
    border-color: #00000015;
    border-radius: ${(props: { photoSquare: boolean }) => props.photoSquare ? ('6px') : ('60px')};
`