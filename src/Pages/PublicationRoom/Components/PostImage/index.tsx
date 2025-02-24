import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, findNodeHandle } from "react-native";
import { RemoveMovie, TextRegularMedium } from "../../style";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListUsersCard from "../../../../Components/ListUsersCard";
import { Container, ImagePost, PostImageContainer, UserCompletlyName, UserImage, UserName, UserView } from "./style";
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import TagUser from "../TagUser";
import { panGetures } from "../../../../Utils/handleGesture";

import useCaptureImageStore from "../../../../GlobalState/zustand.store";
import useGaleryData from "../../../../GlobalState/galeryData.zustand";


interface PostImageProps {
    selectedImage: string;
    marker: any;
    markedUsers: { name: string, address: string, positionX: number, positionY: number }[] | undefined;
    removeUser: (item: { name: string, address: string }) => void;
    onSelectMore: () => void;
    onLongPress: () => void;
    setImages: React.Dispatch<SetStateAction<{ key: string, fileName: string, url: string, markedUsers: { name: string; address: string, positionX: number, positionY: number }[] }[]>>;
    setTagUsers: (tagUSer: { name: string, address: string, positionX: number, positionY: number }, positionX: number, positionY: number) => void;
    rotation?: number
}

export default function PostImage(props: PostImageProps) {
    const ImageRef = useRef(null);
    const { captureImage, setCaptureImage } = useCaptureImageStore()


    return (

        <Container onLongPress={props.onLongPress} onPress={() => {
            props.marker(
                ...captureImage.filter(img => img.uri === props.selectedImage)
            )
        }} opacity={1}>
            <GestureHandlerRootView >



                <PostImageContainer ref={ImageRef} >
                    <Animated.View>

                        <ImagePost
                            // style={{
                            //     borderColor: "#000",
                            //     borderWidth: 1
                            // }}
                            source={{ uri: props.selectedImage }} resizeMode="cover">
                            <RemoveMovie onPress={() => {
                                props.setImages(prev => prev.filter(img => img.url != props.selectedImage))
                                setCaptureImage(captureImage.filter(img => img.uri != props.selectedImage))
                            }}>
                                <Ionicons
                                    name="close-outline"
                                    color={"#FFF"}
                                    size={30}
                                />
                            </RemoveMovie>

                            {props.markedUsers?.map(user => (
                                <TagUser key={user.address} setTagUsers={props.setTagUsers} parentRef={ImageRef} userName={user.address} tagUser={user} />
                            ))}
                        </ImagePost>

                    </Animated.View>
                </PostImageContainer>

            </GestureHandlerRootView>

            <View style={{ width: "100%", alignSelf: "center", margin: 10 }}>
                {props.markedUsers ? (
                    props.markedUsers.map(user => (
                        <UserView key={user.address}>
                            <UserImage source={{ uri: 'https://images.unsplash.com/photo-1688291997328-f67f8f3e0330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' }} />
                            <View style={{ marginRight: 5 }}>
                                <UserName>Username</UserName>
                                <UserCompletlyName numberOfLines={1}>
                                    {user.address.length > 17 ? `${user.address.substring(0, 17)}...` : user.address}
                                </UserCompletlyName>
                            </View>
                            <TouchableOpacity onPress={() => props.removeUser(user)}>
                                <Ionicons
                                    name="close-outline"
                                    color={"#dddd"}
                                    size={26}
                                    style={{ marginRight: -12, marginLeft: 8 }}
                                />
                            </TouchableOpacity>
                        </UserView>
                        /* <ListUsersCard
                                        <UserView>
                                        <UserImage source={{ uri: 'https://images.unsplash.com/photo-1688291997328-f67f8f3e0330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' }} />
                                        <View>
                                            <UserName>Username</UserName>
                                            <UserCompletlyName>Completly people name</UserCompletlyName>
                                        </View>
                                    </UserView>
                                        rigthButton={
                                            <TouchableOpacity onPress={() => props.removeUser(user)}>
                                                <Ionicons
                                                    name="close-outline"
                                                    color={"#dddd"}
                                                    size={26}
                                                />
                                            </TouchableOpacity>} /> */
                    ))
                ) : null}
            </View>
        </Container>
    );
}
