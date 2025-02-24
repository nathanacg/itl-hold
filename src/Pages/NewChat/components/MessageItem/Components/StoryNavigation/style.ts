import styled from "styled-components/native";
import { theme } from "../../../../../../Theme/theme";

export const StoryMessageContainer = styled.TouchableOpacity`
    width: 193px;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.lightGray};
    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    align-self: ${(props: { isMy: boolean }) => props.isMy ? "flex-end" : "flex-start"};
    overflow: hidden;
`