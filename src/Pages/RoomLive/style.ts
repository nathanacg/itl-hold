import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";


export const SalaChatContainer = styled.View`
    flex: 1;
    height: 100%;
`

export const MessagesContainer = styled.View`
 width: 100%;
    flex: 1;

    justify-content: flex-end;
`

export const MessageDate = styled.Text`
    font-family: ${fontStyle.light};
    font-size: 12px;
    color: ${theme.textDark};
    align-self: center;
    margin-bottom: 5px;
    margin-top: 5px;
`

export const LiveContainer = styled.View`
    border-bottom-width: 1px;
    border-color: #d3d3d3;
    padding: 20px;
`;

export const LiveButton = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    width: 40%;
    align-self:center;
    margin-bottom: 10px;
`;

export const LiveButtonTitle = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #fff;
`;

export const ControlContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ViewContainer = styled.View`
    flex-direction: row;
    gap:5px;
    width: 30%;
`;

export const CountTitle = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color:#d3d3d3;
`;

export const ButtonCall = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 80px;
    align-items: center;
    background-color: red;
    justify-content: center;
`;

export const InviteLive = styled.TouchableOpacity`
    height: 100px;
    width: 100px;
    border-radius: 100px;
    border-width: 1px;
    border-color: #d3d3d3;
    align-items: center;
    justify-content: center;
`;

export const ItemMargin = styled.View`
    margin:5px;
    border-width: 2px;
    border-radius:55px;
    border-color: #d3d3d3;
    align-items: center;
    justify-content: center;
`;

export const CountViewContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap:6px;
`

export const CountInfo = styled.Text`
    font-size:12px;
    color: ${theme.primarycolor};
`