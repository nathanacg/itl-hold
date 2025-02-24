import { memo, useState } from "react"
import { CreateChat, MessageChat } from "../../../../../../Types/chats.type"
import useStories from "../../../../../../GlobalState/stories.zustand"
import { getUserStories } from "../../../../../../Service/Story"
import { StoryMessageContainer } from "./style"
import { ActivityIndicator } from "react-native"
import { Text } from "react-native"

interface Props {
  isMy?: boolean
  currentChat: CreateChat
  message: MessageChat
}

export const StoryNavigation = memo(({ isMy = false, currentChat, message }: Props) => {
  const { setCurrentStory, setModalVisible } = useStories()
  const [isLoadStory, setIsLoadStory] = useState<boolean>(false)


  const handleOpenCartaz = async (message: MessageChat) => {
    setIsLoadStory(true)
    try {
      const response = await getUserStories(currentChat.chatParticipantUserId)
      const filtered = response.data.filter((item: { postHexId: string | null }) => item.postHexId == message.messageUri)
      console.log(filtered[0].principalMedia.url)
      setCurrentStory(filtered)
      setModalVisible(true)
    } catch (error) {
      console.warn('HandleOpenCartaz - Chat')
      console.log(error)
    } finally {
      setIsLoadStory(false)
    }
  }

  return (
    <StoryMessageContainer isMy={isMy} onPress={() => handleOpenCartaz(message)}>
      {isLoadStory ?
        <ActivityIndicator animating size={16} style={{ margin: 10 }} />
        :
        <Text
          style={{
            margin: 10
          }}
        >Ver cartaz</Text>
      }
    </StoryMessageContainer>
  )
})