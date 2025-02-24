import React, { useRef, useEffect, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSocket } from '../../context/socket';
import { MessageItem } from './components/MessageItem';
import { InitialChatContainer, UserName, UserNickname } from './style';
import UserImageRounded from '../../Components/UserImageProfile';
import DarkButton from '../../Components/DarkButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useCreatePost from '../../GlobalState/createPost.zustand';
import InputcommentChat from '../../Components/InputCommentChat';

export function NewChat() {
  const route = useRoute();
  const navigation = useNavigation<StackRoutes>();
  // const { setNickName } = useCreatePost();
  const {
    messageList,
    currentChat,
    handleParticipantId,
    sendMessage,
    getAllMessage,
  } = useSocket();
  const flatListRef = useRef<FlatList>();
  const [newMessage, setNewMessage] = useState('');

  const params = route.params as {
    userId: number;
  };

  function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname?.length > maxLength) {
      return nickname.slice(0, maxLength) + '...';
    }
    return nickname;
  }

  const handleSendNewMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  useEffect(() => {
    if (params) {
      handleParticipantId(params.userId);
      getAllMessage();
    }
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messageList]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{
        height: '100%',
        width: '100%',
      }}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: 5,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <InitialChatContainer>
            <UserImageRounded url={currentChat.profileImage} size={80} />
            <UserNickname style={{ marginTop: 10 }}>
              {currentChat.userNickname}
            </UserNickname>
            <UserName style={{ marginBottom: 13 }}>
              {limitNicknameLength(currentChat.userName, 30)}
            </UserName>
            <DarkButton
              size="sm"
              title="Ver perfil"
              onPress={() => {
                // setNickName(currentChat.userNickname);
                navigation.push('TabNavigation', {
                  screen: 'OtherProfileScreen',
                  params: { nickName: currentChat.userNickname },
                });
              }}
            />
          </InitialChatContainer>
        }
        data={messageList}
        renderItem={({ item, index }) => <MessageItem message={item} />}
      />
      <InputcommentChat
        //onOpenGalery={() => setIsModalOpen(true)}
        placeholder="Escreva uma mensagem..."
        setValue={setNewMessage}
        onSend={handleSendNewMessage}
      />
      {/*  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingLeft: 5, paddingRight: 5 }}>
        <TextInput placeholder="Escreva uma mensagem..." value={newMessage} onChangeText={setNewMessage} style={{ borderWidth: 1, width: '80%' }} />
        <TouchableOpacity onPress={handleSendNewMessage}>
          <View style={{ width: 30, height: 30, backgroundColor: 'red' }} />
        </TouchableOpacity>
      </View> */}
    </KeyboardAvoidingView>
  );
}
