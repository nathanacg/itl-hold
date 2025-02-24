import { useState } from "react";
import InputComment from "../../Components/InputComment";
import { SafeAreaViewContainer } from "../../Components/elementsComponents";
import { MessageDate, MessagesContainer, SalaChatContainer } from "./style";
import { FlatList, View } from "react-native";
import SendedMessage from "../Chat/Components/SendedMessage";
import AdminOptions from "./Components/AdminOptions";
import RoomHeader from "./Components/RoomHeader";
import GroupMessage from "./Components/GroupMessage";
import UserOptions from "./Components/UserOptions";

export default function RoomChat() {

    const [inputValue, setInputValue] = useState("")

    const [optionModal, setOptionModal] = useState(false)

    const userType = "user"

    const [lastDate, setLastDate] = useState('')

    return (
        <SafeAreaViewContainer>
            <SalaChatContainer>
                <RoomHeader
                    title="Nome da sala"
                    participants={200}
                    image={{ uri: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80" }}
                    onPressMore={() => setOptionModal(true)}
                />
                <MessagesContainer>
                    <FlatList
                        data={[
                            { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'received', date: "Ontem" },
                            { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'sended', date: "Hoje" },
                            { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'received', date: "Hoje" },
                            { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'sended', date: "Hoje" },
                            // { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'received', date: "Hoje" },
                            // { message: 'Olá, tudo bem?', timeHour: "22:10", type: 'received', date: "Hoje" },
                        ]}

                        renderItem={({ item }) => (
                            <>
                                {lastDate != item.date && (
                                    <MessageDate>{item.date}</MessageDate>
                                )}
                                {item.type == "received" ?
                                    <GroupMessage userName="Martini Rond" userAddress="martini_rond" onLongPress={() => { }} userImage="" text={item.message} timeHour={item.timeHour} /> :
                                    <SendedMessage text={item.message} timeHour={item.timeHour} />}
                                {setLastDate(item.date)}
                            </>

                        )}
                    />
                </MessagesContainer >

            </SalaChatContainer>


            {
                userType == "user" ? (
                    <UserOptions
                        visibleBottonModal={optionModal}
                        setvisibleBottonModal={setOptionModal}
                        room={room}
                    />

                ) : (
                    <AdminOptions
                        visibleBottonModal={optionModal}
                        setvisibleBottonModal={setOptionModal}
                    />
                )
            }



        </SafeAreaViewContainer>
    )
}