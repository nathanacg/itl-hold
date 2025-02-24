import { useEffect, useState } from "react";
import { getRoomsList } from "../../../../Service/Rooms";
import { IRoom } from "../../../../Types/rooms.type";
import { ActivityIndicator, FlatList, View } from "react-native";
import SmallRoomCard from "../../../../Components/SmallRoomCard";
import { TextLightGray } from "../../../../Components/configurationsElemetsStyle";
import { theme } from "../../../../Theme/theme";
import useUserProfile from "../../../../GlobalState/userProfile.zustand";

interface Props {
     filteredRoomsList: IRoom[]
}
export default function RoomsCall({ filteredRoomsList }: Props) {

     const { user } = useUserProfile()

     return (
          <FlatList
               showsVerticalScrollIndicator={false}
               scrollEnabled={false}
               keyExtractor={(item) => "room" + item.room_id}
               style={{ paddingHorizontal: 24, paddingVertical: 25 }}
               data={filteredRoomsList}
               renderItem={({ item }) => (
                    <SmallRoomCard
                         userType={item.userId == user.userId ? 'admin' : 'user'}
                         room={item}
                    />
               )}
               ListEmptyComponent={
                    <View style={{ marginTop: 70 }}>
                         <TextLightGray>Nenhuma sala encontrada.</TextLightGray>
                    </View>
               }
          />
     )
}