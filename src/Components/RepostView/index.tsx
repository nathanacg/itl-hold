import React, { memo, useEffect, useRef, useState } from 'react'
import { Text, Image, View, TouchableOpacity, TextInput, Linking, ImageURISource } from 'react-native'

import PostImage from '../PostImage'
import PostFooter from '../PostFooter'
import HeaderPublication from '../HeaderPost'

import {
    Container,
    PostLegend,
    AvaliationConteiner,
    AvaliationText,
    Likes,
    MarkText,
    MaskButtonText,
    Bold,
    MaskSpoiler2,
    AudioView,
    SubContainer,
} from "./style";

import PostComment from "../PostComment";
import { medias } from "../../Types/feedProps";
import { deleteLike, getLikes, newLike } from "../../Service/Like";
import PostOptions from "../PostOptions";
import { deletePost, getMovie, updatePost } from "../../Service/Publications";
import DocumentCard from "../DocumentCard";
import useFeedData from "../../GlobalState/feed.zustand";
import { theme } from "../../Theme/theme";
import { emojiFace } from "../../Utils/emojiFaceAvaliation";
import BottomModal from "../BottomModal";
import ComentsList from "../../Pages/Feed/components/ComentsList";
import LikesList from "../../Pages/Feed/components/LikesList";
import { useNotification } from "../../context/notification";
import SelectedMovie from "../SelectedMovie";
import { MovieProps, PostProps } from "../../Types/postProps";
import AudioMessageReceived from "../PostInput/AudioMessageReceived";
import { getStoreObject } from '../../Lib/asyncStorage'


import tokenMusicApi from '../../GlobalState/tokenMusicAPI.zustand'
import { getVolumeBookId } from '../../Service/Books'
import { PostLegendText } from '../../Pages/PostPreview/style'
import { ISerie, getFindSerie } from '../../Service/Tv'
import { AudioWaves } from '../AudioContainer/style'
import AudioContainer from '../AudioContainer'
import { ScrollView } from 'react-native-gesture-handler'
import { MarkedContainer, MarkedUserName, MarkedUserNameContainer } from '../PostImage/style'
import NavigateToProfile from '../NavigatetoProfile'
import { IRepost } from '../../Types/repost.type'
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand'

interface Props {
    data: IRepost
}

const RepostView = memo(() => {
    const { repost } = useOtherProfilePost()


    if (!repost) {
        return <></>
    }
    return (
        <View>
            <HeaderPublication
                userId={repost.repostOwner.userId}
                postDate={repost.repostOwner.postDate}
                onEdit={false}
                onSave={() => { }}
                userNickname={repost.repostOwner.userNickname}
                profileImage={repost.repostOwner.profileImage}
                hasSpoiler={false}
                showSpoiler={false}
                action={() => { }}
            />
            <PostLegend>{repost.repostOwner.repostLegend}</PostLegend>
            <SubContainer>
            </SubContainer>
        </View >
    )
})


export default RepostView