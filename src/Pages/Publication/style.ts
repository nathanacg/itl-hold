import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const PublicationContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
    padding-bottom: 50px;
`

export const MainContainer = styled.View`
    padding: 18px 17px;
`

export const HeaderButton = styled.TouchableOpacity`
    justify-content: center;
    height: 35px;
    align-items: center;
    padding: 4px 30px;
    background-color: ${theme.primarycolor};
    border-radius: 8px;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.secondaryColor};
    font-size: 14px;
    margin-top: 2px;
`

export const LightText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textLight};
`

export const CategoryList = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    margin-top: 12px;
    margin-bottom: 20px;
`

export const CategoryCard = styled.View`
    justify-content: center;
    align-items: center;
    gap: 6px;
`

export const OptionContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-bottom: 3px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    border-color: ${theme.textligthGray};
`

export const OptionContainerClose = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding-bottom: 3px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    border-color: ${theme.textligthGray};
`

export const CategoryIcon = styled.Image`
    width: 20px;
`

export const InputLegend = styled.View`
    position: relative;
    width: 100%;
    height: 132px;
    border-radius: 10px;
    border: 1px;
    border-color: ${theme.lightGray};
    padding: 0 14px;
`

export const InputIconscontainer = styled.View`
    flex-direction: row;
    gap: 15px;
    position: absolute;
    bottom: 8px;
    right: 9px;
`

export const InputIcons = styled.Image`
    width: 20px;
`


export const InputCount = styled.Text`
    align-self: flex-end;
    font-family: ${fontStyle.medium};
    font-size: 12px;
    color: ${theme.textLight};
    margin-top: 9px;
`

export const AddList = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 36px;
    margin-top: -15px;
    margin-bottom: 10px;
`

export const SpoilerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 19px;
`

export const NoDataSearch = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 16px;
    margin-top: -10px;
    margin-bottom: 10px;
    color: ${theme.textLight};
    text-align: left;
`

export const ContainerPage = styled.View`
   padding: 10px 25px 0px 25px;
`;

export const CloseContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 19px;
`

export const SpoilerText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textLight};
`

export const ListDivisor = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${theme.lightGray};
`

export const SelectedMovieCard = styled.View`
    position: relative;
    width: 100%;
    height: 120px;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

export const SelectedMovieImage = styled.Image`
    width: 113px;
    height: 120px;
    border-radius: 8px;
`

export const SelectedMovieTitle = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textLight};
`

export const SelectedMovieText = styled.Text`
    width: 222px;
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: #5D5D5D;
`
export const RemoveMovie = styled.TouchableOpacity`
    position: absolute;
    top: 2px;
    right: 4px;
`

export const LegendButtonsContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin: 40px 0;
`

export const LegendButtons = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    width: 224px;
    border: 1px;
    border-radius: 50px;
    border-color: #d0d0d0;
    margin: 20px;
`

export const LegendButtonLetter = styled.Text`
    text-align: center;
    font-family: ${fontStyle.Bold};
    width: 22px;
    height: 22px;
    border: 1.25px;
    border-radius: 12px;
    border-color: #000;
`

export const AddButton = styled.TouchableOpacity`
    width: 222px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    background-color: ${theme.primarycolor};
    border-radius: 6px;
    gap: 6px;
`

export const AddButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 15.5px;
    color: ${theme.secondaryColor};
`


export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
`

export const TextRegularMedium = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
    text-align: center;
`

export const MarkUserButtom = styled.TouchableOpacity`
    width: 15px;
    height: 15px;
    border: 1px;
    border-radius: 7px;
    border-color: ${theme.primarycolor};
`

export const DocContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${(props: { marginBottom: boolean }) => props.marginBottom ? 5 : 2}px;
    padding-right: 10px;
    margin-top: ${(props: { marginTop: boolean }) => props.marginTop ? -18 : 10}px;
    margin-left: ${(props: { marginLeft: boolean }) => props.marginLeft ? 8 : 0}px;

`