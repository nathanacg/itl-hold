import { SetStateAction, useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import Modal from "react-native-modal";
import { theme } from "../../../../Theme/theme"
import ListUsersCard from "../../../ListUsersCard";

import { CloseIcon, CountText, StoryImage } from "./style";
import { BottomContainer, TitleModal, TopSpace, TopSpaceContainer } from "../../../BottomModal/style";
import Icon from "react-native-vector-icons/Ionicons"
import { ProfileUser } from "../../../../Types/User";
import SearchInput from "../../../SearchInput";

interface LikesViewProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    setUserInfoVisible?: React.Dispatch<SetStateAction<boolean>>
    storyImage: string
    viewsCount: number,
    usersViewed: ProfileUser[]
}

export default function LikesView(props: LikesViewProps) {

    const [inputValue, setInputValue] = useState<string>('')

    const [users, setUsers] = useState<ProfileUser[]>([])

    const getViewsStory = async () => {
        const filteredUsers = props.usersViewed.filter(
            (item: { userName: string; userNickname: string }) =>
                item.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
                item.userNickname.toLowerCase().includes(inputValue.toLowerCase())
        )
        setUsers(filteredUsers)
    }

    useEffect(() => {
        getViewsStory()
    }, [inputValue])


    return (
        <Modal
            isVisible={props.visibleBottonModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{ margin: 0, marginTop: 60, marginLeft: 0, marginRight: 0, justifyContent: 'flex-end', alignItems: "center", minHeight: 100, flex: 1 }}
            backdropColor="#000000aa"
            backdropOpacity={1}
        >
            <CloseIcon onPress={() => props.setvisibleBottonModal(false)} />

            <StoryImage source={{ uri: props.storyImage }}>
                <CountText>
                    <Image source={require('../../../../Assets/Icons/views.png')} alt={'eye'} style={{
                        width: 15, height:
                            15, resizeMode: 'contain'
                    }} /> {props.viewsCount}
                </CountText>
            </StoryImage>


            <BottomContainer marginLeftRight={"0px"}>
                <TopSpaceContainer marginBottom={"0px"}>
                    <TopSpace onPress={() => props.setvisibleBottonModal(false)} />
                </TopSpaceContainer>
                <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <SearchInput
                        marginTop="15px"
                        value={inputValue}
                        onSetText={setInputValue}
                    />
                </View>
                <FlatList
                    style={{ height: 300 }}
                    data={users}
                    renderItem={({ item }) => (
                        <ListUsersCard
                            limitNick={23}
                            profileImage={item.profileImage}
                            userId={item.userId}
                            userNickname={item.userNickname}
                            userName={item.userName}
                            isFollowing={item.userFollowing}
                        />
                    )}
                />
            </BottomContainer>

        </Modal>




        // <BottomModal
        //     title="Curtidas"
        //     setvisibleBottonModal={props.setvisibleBottonModal}
        //     visibleBottonModal={props.visibleBottonModal}
        //     marginLeftRight='0'
        //     children={
        //         <FlatList
        //             data={[1, 2, 3]}
        //             renderItem={({ item }) => (
        //                 <ListUsersCard
        //                     userAddress="teste_1"
        //                     userName="teste"
        //                     rigthButton={
        //                         <LeftButtons>
        //                             <TouchableOpacity 
        //                                 onPress={() => props.setuserInfoVisible}>
        //                                 <Icon
        //                                     name="ellipsis-horizontal"
        //                                     color={theme.lightGray}
        //                                     size={20}
        //                                 />
        //                             </TouchableOpacity>
        //                             <TouchableOpacity>
        //                                 <Image source={require("../../../../Assets/Icons/conversation.png")} />
        //                             </TouchableOpacity>
        //                         </LeftButtons>
        //                     }
        //                 />
        //             )}
        //         />
        //     }
        // />
    )
}