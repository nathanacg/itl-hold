import { TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { BoldText, ButtonText, Container, NormalText, RowDirection, SalaButton, SalaHeader, SalaTitle, Shadow, UserImage, UserType, WhiteText } from './style'

import Icon from 'react-native-vector-icons/Ionicons'

import { IRoom } from '../../Types/rooms.type'
import { getDate } from '../../Utils/handleTime'
import { fontStyle } from '../../Theme/theme'

interface RoomCardProps {
    openOption?: () => void
    userType?: "admin" | "user"
    openCard?: () => void,
    onProfile?: boolean
    room?: IRoom
}

export default function SmallRoomCard({ openOption, room, userType = 'user' }: RoomCardProps) {
    const navigation = useNavigation<StackRoutes>()

    return (
        <TouchableOpacity style={{
            width: '100%',
            marginBottom: 10
        }} onPress={() => navigation.push("RoomCommunity", { UserType: userType, RoomId: room?.room_id, Room: room })}>
            <Container source={{ uri: room?.image }}>
                <Shadow>
                    <SalaHeader>
                        <RowDirection style={{ gap: 12 }}>
                            <RowDirection style={{ gap: 12, alignItems: "flex-start" }}>
                                <UserImage source={{ uri: room?.profileImage }} />
                                <View>
                                    <BoldText>{room?.userName}</BoldText>
                                    <NormalText style={{ lineHeight: 13 }}>
                                        @{room?.userNickname}
                                    </NormalText>
                                    {userType && <UserType>{userType === 'admin' ? 'Administrador' : ''}</UserType>}
                                </View>
                            </RowDirection>
                        </RowDirection>

                    </SalaHeader>



                    <RowDirection>
                        <View style={{ width: "68%", marginBottom: 12 }}>
                            <SalaTitle numberOfLines={1}>{room?.room_name}</SalaTitle>
                            <WhiteText numberOfLines={3}>
                                {room?.description}
                            </WhiteText>

                        </View>




                    </RowDirection>
                </Shadow>
            </Container>
        </TouchableOpacity>
    )
}