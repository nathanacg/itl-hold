import React, { SetStateAction } from "react"
import useUserProfile from "../../../../GlobalState/userProfile.zustand"
import { MessageChat } from "../../../../Types/chats.type"
import { useSocket } from "../../../../context/socket"
import AudioMessage from "./Components/AudioMessage"
import AudioMessageReceived from "./Components/AudioMessageReceived"
import DropShare from "./Components/DropShare"
import PublicationShare from "./Components/PublicationShare"
import ReceivedMessage from "./Components/ReceivedMessage"
import RoomInvite from "./Components/RoomInvite"
import SendedMessage from "./Components/SendedMessage"
import { StoryNavigation } from "./Components/StoryNavigation"

interface Props {
  message: MessageChat
  setIsModalOpen?: React.Dispatch<SetStateAction<boolean>>
}
export function MessageItem({ message, setIsModalOpen }: Props) {
  const { user } = useUserProfile()
  const { currentChat } = useSocket()

  return (
    <>
      {message.userId == user.userId ?
        <>
          {message.messageType == "TEXT" &&
            <SendedMessage
              setvisibleBottonModal={setIsModalOpen}
              read={message.messageState == "read"}
              onPressFunction={() => { }}
              text={message.messageText}
              timeHour={message.messageDate}
            />
          }
          {message.messageType == "POST" &&
            <PublicationShare isMy={true} postHexId={message.messageUri || ''} />
          }
          {message.messageType == "DROP" &&
            <DropShare isMy={true} postHexId={message.messageUri || ''} />
          }
          {message.messageType == "ROOM" &&
            <RoomInvite isMy={true} RooomName={'Sala'} description={'teste sala'} idRoom={message.messageUri} />
          }
          {message.messageType == "AUDIO" &&
            <AudioMessage
              read={message.messageState == "read"}
              onPressFunction={() => { }}
              uri={message.messageUri || ''}
              timeHour={message.messageDate}
              audioTotalTime={message?.configAudTime}
              configAudMetrics={message?.configAudMetrics} />
          }
          {message.messageType == "CARTAZ" &&
            <StoryNavigation isMy currentChat={currentChat} message={message} />

          }
        </>
        :
        <>
          {message.messageType == "TEXT" &&
            <ReceivedMessage
              onLongPress={() => { }}
              userImage={currentChat.profileImage}
              text={message.messageText}
              timeHour={message.messageDate}
            />
          }
          {message.messageType == "POST" &&
            <PublicationShare isMy={false} postHexId={message.messageUri || ''} />}

          {message.messageType == "DROP" &&
            <DropShare isMy={true} postHexId={message.messageUri || ''} />
          }
          {message.messageType == "ROOM" &&
            <RoomInvite isMy={false} idRoom={message.messageUri} />
          }

          {message.messageType == "AUDIO" &&
            <AudioMessageReceived
              read={message.messageState == "read"}
              onPressFunction={() => { }}
              uri={message.messageUri || ''}
              userName={message.userName}
              timeHour={message.messageDate}
              userImage={message.profileImage}
              audioTotalTime={message?.configAudTime}
              configAudMetrics={message?.configAudMetrics} />
          }
        </>}
    </>
  )
}