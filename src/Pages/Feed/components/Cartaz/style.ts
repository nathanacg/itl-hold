import styled from "styled-components/native";

import { fontStyle, theme } from '../../../../Theme/theme';
import { Platform } from "react-native";

export const CartazContainer = styled.View`
    padding-left: 15px;
    padding-top: ${Platform.OS == 'ios' ? 10 : 0}px;
    padding-bottom: 10px;
`;

export const Title = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    margin-left: 7px;
    text-align: left;
    color: ${theme.textDark};
    margin-bottom: 10px;
`

export const StoryRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 0px;
    margin-left: 15px;
`


export const UserName = styled.Text`
    width: 65px;
    font-family: ${fontStyle.semiBold};
    color: ${theme.primarycolor};
    font-size: 12px;
    margin-left: 15px;
    margin-top: 6px;
`

export const Container = styled.View`
    position: relative;
    width: 63px;
    align-items: center;
    margin-top: 0px;
    margin-bottom: ${Platform.OS == 'ios' ? 0 : -8}px;
`

export const ProfilePictureContainer = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-radius: 8px;
  margin-right: 5px;
  margin-left: 5px;
  overflow: hidden;
  z-index: 0;
  margin-bottom: 8px;
  border: 1px;
  border-color: #00000010;
  justify-content: center;
  align-items: center;
`;



export const StoryButton = styled.TouchableOpacity`
    width: 65px;
    height: 65px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border-width: ${(props: { hasStory: boolean }) => props.hasStory ? ('2px') : ('0px')};
    border-color: ${theme.primarycolor};
    margin-right: 16px;
`


export const UserNameContainer = styled.View`
    align-items: flex-start;
    bottom: ${Platform.OS == 'ios' ? 0 : 4};
`


export const AddButton = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
    border-radius: 10px;
    padding: 3px;
    background-color: ${theme.primarycolor};
    bottom: ${Platform.OS == 'ios' ? 16 : 22}px;
    justify-content: center;
    align-items: center;
`

export const StoryText = styled.Text`
    width: 65px;
    font-size: 12px;
    margin-left: 4px;
    line-height: 14px;
    text-align: center;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};

`