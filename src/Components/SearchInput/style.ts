import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';


export const ContainerSearch = styled.View`
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-radius:8px;
    width: 100%;
    background-color: #C4C4C433;
    margin: ${(props: { marginTop: string }) => props.marginTop ? (props.marginTop) : ('8%')} 0 ${(props: { marginBottom: string }) => props.marginBottom ? (props.marginBottom) : ('5%')};
    padding: 0 10px;
    height: 40px;
`

export const Input = styled.TextInput`
    background-color: transparent;
    width: 90%;
    font-size: 12px;
    height: 100%;
    
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`
