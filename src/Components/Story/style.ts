import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";
import Video from "react-native-video";
import { Platform } from "react-native";

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 2.5%;
  right: 6%;
  z-index: 2;
`;

export const StoryOptionsPoints = styled.TouchableOpacity`
    position: absolute;
    top: ${Platform.OS == 'ios' ? '3.2%' : '3.7%'};
    right: 15%;
    z-index: 2;
`;

export const CloseIcon = styled.Text`
  font-size: 30px;
  color: white;
  top: 15%;
  right: -8%;
`;

export const StoryMediaContainer = styled.View`
  height: 90%;
`;

export const StoryImage = styled.Image`
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  height: 97.5%;
`;

export const StoryVideo = styled(Video)`
  flex: 1;
`;

export const ProfilePicture = styled.Image`
  width: 31px;
  height: 31px;
  border-radius: 100px;
`;

export const TextUserName = styled.Text`
    color: #fff;
    font-family: ${fontStyle.regular};
    font-size: 15px;
`

export const Time = styled.Text`
    color: ${theme.textligthGray};
    font-family: ${fontStyle.regular};
    font-size: 14px;
`