import { SetStateAction, useState } from 'react';
import {
  Message,
  MessageContainer,
  MessageText,
  MessageTextLong,
  UserImage,
  Time,
  MessageInfo,
  ViewImage,
  UserInfo,
  UserNameTitle,
  UserNicknameTitle,
  StoryOptions,
  OptionTextIn,
} from './style';
import BottomModal from '../../../../../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../../../../Routes/StackTypes';
import useUserProfile from '../../../../../../GlobalState/userProfile.zustand';
import useCreatePost from '../../../../../../GlobalState/createPost.zustand';
import { getPostProfile } from '../../../../../../Service/Profile';

interface ReceivedMessageProps {
  userName?: string;
  userNickname?: string;
  text: string;
  timeHour: string | Date | undefined;
  userImage: string;
  onLongPress: () => void;
  userId?: number;
}

export default function ReceivedMessageRoom(props: ReceivedMessageProps) {
  const navigation = useNavigation<StackRoutes>();
  const [date, setDate] = useState(new Date(props.timeHour || ''));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = useUserProfile();
//   const { setNickName } = useCreatePost();

  const TextComponent = props.text.length > 28 ? MessageText : MessageTextLong;

  const copyToClipboard = () => {
    const message = props.text;
    Clipboard.setString(message);
    setIsModalOpen(!isModalOpen);
  };

  const handleNavigateToProfile = async () => {
    try {
      const response = await getPostProfile(props.userId);
      //   setNickName();
      setIsModalOpen(!isModalOpen);
      navigation.push('TabNavigation', {
        screen: 'OtherProfileScreen',
        params: {
          nickName: Object.values(response.data.post)[0].userNickname,
        },
      });
    } catch (error) {
      console.warn('handleNavigateToProfile');
      console.log(error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const colors = ['red', 'blue', 'green'];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <MessageContainer onPress={handleModal}>
        <UserImage source={{ uri: props.userImage, cache: 'force-cache' }} />
        <UserInfo>
          <Message>
            <UserNicknameTitle color={randomColor}>
              {props.userNickname}
            </UserNicknameTitle>
            <UserNameTitle color={randomColor}>{props.userName}</UserNameTitle>

            <TextComponent>{props.text}</TextComponent>
            <MessageInfo>
              <Time>{`${
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              }:${
                date.getMinutes() < 10
                  ? '0' + date.getMinutes()
                  : date.getMinutes()
              }`}</Time>
            </MessageInfo>
          </Message>
        </UserInfo>
      </MessageContainer>
      <>
        <BottomModal
          title=""
          setvisibleBottonModal={() => setIsModalOpen(!isModalOpen)}
          children={
            <>
              <StoryOptions onPress={copyToClipboard}>
                <Ionicons
                  name="copy-outline"
                  color={'#231F20'}
                  size={22}
                  style={{ marginBottom: 5 }}
                />
                <OptionTextIn>Copiar</OptionTextIn>
              </StoryOptions>
              <StoryOptions onPress={handleNavigateToProfile}>
                <Ionicons
                  name="person"
                  color={'#231F20'}
                  size={22}
                  style={{ marginBottom: 5 }}
                />
                <OptionTextIn>Ir para o perfil</OptionTextIn>
              </StoryOptions>
            </>
          }
          visibleBottonModal={isModalOpen}
        />
      </>
    </>
  );
}
