import { Dispatch, SetStateAction, useState } from 'react'
import { useSocket } from "../../../../context/socket"
import Modal from "react-native-modal"
import { FlatList } from "react-native"
import { SubContainer } from "./style"
import { useEffect } from "react"
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native'
import ListUsersShare from '../../../../Components/ListUsersShare'
import Inputcomment from '../../../../Components/InputComment'
import RadioButton from '../../../../Components/RadioButton'
import SearchInput from '../../../../Components/SearchInput'

interface Props {
  openModal: boolean
  setSelectedChatRoomId: (chatRoomId: string) => void
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
export function ModalListUsers({ openModal, setSelectedChatRoomId, setOpenModal }: Props) {
  const { chatList, getAllchat } = useSocket()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)


  useEffect(() => {
    if (chatList.length < 1) {
      getAllchat()
    }
  }, [chatList])

  return (
    <Modal
      isVisible={openModal}
      animationInTiming={600}
      animationOutTiming={600}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen
      avoidKeyboard
      onBackdropPress={() => setOpenModal(!openModal)}
      style={{ margin: 0, justifyContent: 'flex-end', alignItems: "center", flex: 1 }}
      backdropColor="#000000"
      backdropOpacity={0.8}
      useNativeDriver
    >
      <SubContainer>
        <FlatList
          data={chatList}
          ListHeaderComponent={
            <View style={{ marginLeft: 10, marginRight: 10 }}>
              <SearchInput placeholder='Pesquisar...' value='' onSetText={() => { }} />
            </View>
          }
          contentContainerStyle={{ marginBottom: 20 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => "chatlist" + item.chatId}
          ListEmptyComponent={<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator animating size={16} /></View>}
          renderItem={({ item, index }) => {
            return (
              <ListUsersShare
                key={index}
                onPress={() => {
                  setSelectedChatRoomId(item.chatRoomId)
                }}
                isShare={true}
                userId={item.userId}
                profileImage={item.profileImage}
                userName={item.userName}
                userNickname={item.userNickname}
                rightButton={<RadioButton
                  value={selectedUserId === item.userName}
                  setValue={() => {
                    setSelectedUserId(item.userName)
                    setSelectedChatRoomId(item.chatRoomId)
                  }}
                />}
              />
            )
          }}
        />
        <Inputcomment placeholder='Enviar mensagem...' onSend={() => { setOpenModal(!openModal) }} />
      </SubContainer>
    </Modal>
  )
}