import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';
import { typeTheme } from '../../Config/enumTheme';

interface typeButton {
  optionButton: string;
  width: string;
}

export const ProfileStoryActive = styled.TouchableOpacity`
  width: 140px;
  height: 140px;
  border-radius: 140px;
  border-color: #0245f4;
  margin-right: 13px;
  border-width: ${(props: { active: boolean }) =>
    props.active ? '2px' : '0px'};
  /* background-color: #c4c4c4; */
  /* padding: 2px; */
  overflow: hidden;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 15px 25px 0px;
  /* gap: 1px; */
`;

export const ProfileImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export const ProfileImageContent = styled.View`
  border-radius: 100px;
  border-color: ${theme.primarycolor};
  padding: 4px;
`;

export const ImageProfile = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

export const ProfileName = styled.Text`
  text-align: center;
  color: ${theme.primarycolor};
  font-family: ${fontStyle.medium};
  font-size: 18px;
`;

export const BioText = styled.Text`
  /* width: 349px; */
  text-align: center;
  color: ${theme.textDark};
  font-family: ${fontStyle.regular};
  font-size: 14px;
`;

export const SiteText = styled.Text`
  text-align: left;
  color: ${theme.textDark};
  font-family: ${fontStyle.regular};
  font-size: 14px;
`;

export const ContainerProfileInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  margin-left: 1px;
`;

export const ContentInfo = styled.Pressable`
  justify-content: center;
`;

export const SeparatedBorder = styled.View`
  width: 1.5px;
  height: 40%;
  background-color: #d9d9d9;
  margin-bottom: 10px;
`;

export const CounterInfo = styled.Text`
  text-align: center;
  color: ${theme.darkBlue};
  font-family: ${fontStyle.medium};
  font-size: 20px;
  margin-right: 12px;
`;

export const TextInfo = styled.Text`
  text-align: center;
  color: #5e5e5e;
  font-family: ${fontStyle.regular};
  font-size: 14px;
  margin-top: -5px;
  margin-right: 13px;
`;

export const EditProfileContainer = styled.TouchableOpacity`
  border: 0.8px;
  border-color: #c4c4c4;
  border-radius: 6px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-bottom: 5px;
  margin-left: -5px;
  margin-top: 15px;
  gap: 3px;
`;
export const CreateRoomContainer = styled.TouchableOpacity`
  border: 0.8px;
  border-color: #c4c4c4;
  border-radius: 6px;
  width: 49%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-top: 12px;
  margin-right: 3px;
  gap: 8px;
`;
export const ViewRoomContainer = styled.TouchableOpacity`
  border: 0.8px;
  border-color: #c4c4c4;
  border-radius: 6px;
  width: 49%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-top: 12px;
  margin-left: 3px;
  gap: 8px;
`;
export const AlterateProfile = styled.TouchableOpacity`
  border: 1px;
  border-color: #c4c4c4;
  border-radius: 6px;
  width: 13%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-top: 15px;
  gap: 3px;
  margin-left: 8px;
`;

export const RoomButtons = styled.TouchableOpacity`
  border: 1px;
  border-color: #c4c4c4;
  border-radius: 6px;
  width: 48%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  gap: 4px;
`;

export const EditText = styled.Text`
  color: #5e5e5e;
  font-family: ${fontStyle.regular};
  font-size: 13px;
  padding-top: 2px;
`;

export const ContainerSiteLinkProfile = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 10px 0 0px;
`;

export const SiteLinkProfile = styled.Text`
  color: ${theme.primarycolor};
  font-family: ${fontStyle.light};
  font-size: 12px;
`;

export const TextFollowingInfo = styled.Text`
  color: ${theme.textLight};
  font-family: ${fontStyle.regular};
  font-size: 12px;
`;

export const DestackUserFollowing = styled.Text`
  color: ${theme.textLight};
  font-family: ${fontStyle.semiBold};
  font-size: 12px;
`;

export const ActionsOtherProfileContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
  gap: 5px;
  margin-top: 15px;
  width: 90%;
`;

export const ButtonContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: ${(props: { contact: boolean }) =>
    props.contact ? 'center' : 'space-between'};
  align-items: center;
  gap: 3px;
  padding: 4px 8px;
  min-width: 31.5%;
  border-radius: 6px;
  border: 1px;
  border-color: ${(props: typeButton) =>
    props.optionButton === typeTheme.default
      ? theme.primarycolor
      : 'rgba(196, 196, 196, 0.7)'};
  background-color: ${(props: typeButton) =>
    props.optionButton === typeTheme.default
      ? theme.primarycolor
      : theme.secondaryColor};
  width: ${(props: { contact: boolean }) => (props.contact ? '49%' : 'auto')};
`;

export const TextButton = styled.Text`
  font-size: 13px;
  font-family: ${fontStyle.regular};
  color: ${(props: typeButton) =>
    props.optionButton === typeTheme.default
      ? theme.secondaryColor
      : theme.textLight};
`;
