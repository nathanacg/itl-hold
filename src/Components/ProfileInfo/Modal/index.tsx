import React, { useState, useEffect, SetStateAction } from "react"
import { Alert, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from "react-native"

import {
    TopSpace,
    BottomContainer,
    TitleModal,
    BottomElements,
    TopSpaceContainer,
    BackgroundModal,
    CentralContainer,
    RowContainer
} from "./style"
import { Image } from "react-native-elements"
import UserImageRounded from "../../UserImageProfile"
import BottomModalOtherAccountCreate from "../ModalCrateAccount"
import { ProfileUser } from "../../../Types/User"
import { getProfiles } from "../../../Service/Profile"

export interface bottonModalProps {
    children: React.ReactNode
    title: string
    visibleBottonModal: boolean
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
    marginLeftRight?: string
    image: string
    name: string
}

export default function BottomModalOtherAccount(props: bottonModalProps) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);
    const [listProfiles, setListProfiles] = useState<{ token: string, profile: ProfileUser }[]>([])

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        props.setvisibleBottonModal(!isModalVisible)
    };

    useEffect(() => {
        (async () => {
            const list = await getProfiles()
            setListProfiles(list)
        })()
        setIsModalVisible(props.visibleBottonModal)
    }, [props.visibleBottonModal])



    const showBottomModal = () => {
        setIsBottomModalVisible(true);

    };
    const hideBottomModal = () => {
        setIsBottomModalVisible(false);
    };


    return (
        /*   {/*   <Modal
                 visible={isModalVisible}
                 animationType="fade"
                 transparent={true}
                 onRequestClose={() => {
                     setIsModalVisible(!isModalVisible)
                 }}
             >
                 
                 //transparent={true}
                // animationIn="slideInUp"
                // animationOut="slideOutDown"
     
                // onBackdropPress={toggleModal}
     //onSwipeComplete={toggleModal}
                 //swipeDirection={"down"}
                 //avoidKeyboard={true}
             */
        /*   <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
          >
              
              //transparent={true}
             // animationIn="slideInUp"
             // animationOut="slideOutDown"
  
             // onBackdropPress={toggleModal}
  //onSwipeComplete={toggleModal}
              //swipeDirection={"down"}
              //avoidKeyboard={true}
          >     */
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
        >
            <View onTouchEnd={toggleModal} style={{ backgroundColor: '#000', flex: 4 }}></View>

            <BackgroundModal onPress={toggleModal} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <BottomContainer marginLeftRight={props.marginLeftRight}>
                    <TopSpaceContainer marginBottom={props.title ? "10px" : "20px"}>
                        <TopSpace onPress={toggleModal} />
                    </TopSpaceContainer>
                    {props.title && (<TitleModal>{props.title}</TitleModal>)}
                    <BottomElements>
                        {props.children}
                    </BottomElements>
                    <CentralContainer>
                        {/* <RowContainer> */}
                        {listProfiles.length > 0 ?
                            <RowContainer>
                                {
                                    listProfiles.map(item => (
                                        <TouchableOpacity key={item.profile.userId} onPress={toggleModal} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginRight: 20 }}>
                                            <UserImageRounded url={item.profile.profileImage} size={100} />
                                            <Text style={{ fontWeight: 'bold' }}>{item.profile.userName}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </RowContainer>
                            :
                            <RowContainer>
                                <TouchableOpacity onPress={toggleModal} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginRight: 20 }}>
                                    <UserImageRounded url={props.image} size={100} />
                                    <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={showBottomModal} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginLeft: 20 }}>
                                    <Image style={{ width: 97, height: 97, borderRadius: 50 }} source={require('../../../Assets/Icons/addAccountCircle.png')} />
                                    <Text style={{ fontWeight: 'bold' }}>Adicionar</Text>
                                </TouchableOpacity>
                            </RowContainer>
                        }
                        {/* <TouchableOpacity onPress={toggleModal} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginRight: 20 }}>
                                <UserImageRounded url={props.image} size={100} />
                                <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showBottomModal} style={{ height: 97, width: 97, borderRadius: 50, alignItems: 'center', marginLeft: 20 }}>
                                <Image style={{ width: 97, height: 97, borderRadius: 50 }} source={require('../../../Assets/Icons/addAccountCircle.png')} />
                                <Text style={{ fontWeight: 'bold' }}>Adicionar</Text>
                            </TouchableOpacity>
                        </RowContainer> */}
                    </CentralContainer>
                </BottomContainer>
            </BackgroundModal>
            <BottomModalOtherAccountCreate
                name="Douglas"
                children={undefined}
                setvisibleBottonModal={setIsBottomModalVisible}
                marginLeftRight="10px"
                image=""
                title="Adicionar conta"
                visibleBottonModal={isBottomModalVisible} onOpenOtherAccountModal={function (): void {
                    throw new Error("Function not implemented.")
                }} />
        </Modal>
    )
}