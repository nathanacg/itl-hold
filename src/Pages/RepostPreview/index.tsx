import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import ProfileHeader from '../../Components/ProfileHeader'

import {
    ButtonText,
    HeaderButton,
    PostContainer,
    PostPreviewContainer,
    PreviewContent,
    RowDirection,
    TextRegularMedium,
    TextRegularSmall,
    UserInfo,
    UserName,
    LikesMask,
    AvaliationConteiner,
    AvaliationText,
    ModalImage,
    ModalSave,
    PostLegendText
} from './style'


import PostFooterPrev from "../../Components/PostFooterPrev";

import SelectedMovie from "../../Components/SelectedMovie";
import { ProfilePhoto, SafeAreaViewContainer } from "../../Components/elementsComponents";
import { StackRoutes } from "../../Routes/StackTypes";
import ToggleSwitch from "../../Components/ToggleSwitch";
import { useNavigation, useRoute } from "@react-navigation/native";
import useCreatePost from "../../GlobalState/createPost.zustand";
import { createMarcation, newPost, newRoomPost, uploadMedias } from "../../Service/Publications";
import { emojiFace } from "../../Utils/emojiFaceAvaliation";
import PostImage from "../../Components/PostImage";
import useCaptureImageStore from "../../GlobalState/zustand.store";
import useFeedData from "../../GlobalState/feed.zustand";
import { medias } from "../../Types/feedProps";
import mime from "mime";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomModal from "../../Components/BottomModal";
import { NewPostStorie, newStory } from "../../Service/Story";
import PostImagePreview from "../../Components/PostPreview";
import AudioContainerPublication from "../../Components/AudioContainerPublication";

import AudioMessageReceived from "../../Components/PostInput/AudioMessageReceived";

import { DocContainer } from "../Publication/style";
import DocumentCard from "../../Components/DocumentCard";
import { fontSize, theme } from "../../Theme/theme";
import { ColorsBg, PrincipalMedia, ResponsePost, StoryFiles } from "./interface";
import { PostColors } from "./components";
import { MarkedContainer, MarkedUserName, MarkedUserNameContainer } from '../../Components/PostImage/style';
import NavigateToProfile from '../../Components/NavigatetoProfile';
import { AllTypesPostsFeed } from '../../Types/discriminator';





interface MarkedProps {
    mediaUrl: string
    markedUsers: {
        username: string
        profileImage: string
        position: {
            x: number
            y: number
        }
    }[]
}

export default function RepostPreview() {
    const navigation = useNavigation<StackRoutes>()
    const route = useRoute();

    const { post, repostLegend } = route.params as { post: AllTypesPostsFeed, repostLegend: string }


    const { setCaptureImage } = useCaptureImageStore()
    const [color, setColor] = useState<ColorsBg>()

    const [principalMidia, setPrincipalMidia] = useState<{ fileName: string, uri: string, top: number, left: number, scale: number }>({ fileName: '', uri: '', left: 0, scale: 1, top: 0 })
    const [publishInCartaz, setPublishInCartaz] = useState<boolean>(false)
    const [colorText, setColorText] = useState<boolean>(false)
    const [publishInCartazModal, setPublishInCartazModal] = useState<boolean>(false)


    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { markedPerson, setMarkedPerson } = useCreatePost()
    const [markedUsers, setmarkedUsers] = useState<MarkedProps[]>([]);
    const [openMarkers, setOpenMarkers] = useState<boolean>(false)


    const { incrementFeed } = useFeedData()
    const { user } = useUserProfile()

    const handleRepost = () => {

    }


    const setNewRepostUser = (repostHexId: string) => {
        incrementFeed({
            medias: medias,
            postCategorie: post.postCategorie,
            postDate: `${new Date()}`,
            profileImage: user.profileImage,
            followingUser: 0,
            postEnable: 1,
            isClosed: post.isClosed ? 1 : 0,
            postEvaluation: post.postEvaluation,
            postSpoiler: post.postSpoiler ? 1 : 0,
            postHexId: postHexId,
            postId: postId,
            postColor: post.postColor,
            postLegend: post.postLegend,
            userId: user.userId,
            userNickname: user.userNickname,
            publicationType: "post",
            tmdbMovieId: post.tmdbMovieId
        })
    }


    return (
        <>
            <SafeAreaViewContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PostPreviewContainer>
                        <ProfileHeader
                            userImage={user.profileImage}
                            title="Pré-visualizar"
                            actionHeaderElement1={
                                <>
                                    {isLoading ? (
                                        <ActivityIndicator size={'small'} color={theme.primarycolor} />
                                    ) : (
                                        <HeaderButton onPress={handleRepost}>
                                            <ButtonText>Publicar </ButtonText>
                                        </HeaderButton>
                                    )}
                                </>}


                        />
                        <PreviewContent>
                            <TextRegularMedium>
                                Revise sua publicação
                            </TextRegularMedium>
                            <RowDirection>

                            </RowDirection>
                            <PostContainer>
                                <UserInfo>
                                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 6 }}>
                                        {user.profileImage ?
                                            <ProfilePhoto source={{ uri: user?.profileImage }} /> :
                                            <Ionicons
                                                name='person-circle'
                                                size={48}
                                                color={"#c4c4c4"}
                                            />
                                        }
                                        <UserName>{user?.userName}</UserName>

                                        {post.postSpoiler && (
                                            <Image style={{ width: 21, height: 21 }} source={require("../../Assets/Icons/spoilerIcon.png")} />
                                        )}
                                    </View>
                                </UserInfo>


                                {/*  {post.medias && (
                                    <AudioMessageReceived
                                        uri={audioPath}
                                        configAudMetrics={[-33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375]}

                                        feed
                                    />
                                )} */}

                                <TextRegularMedium style={{ margin: 10 }}>
                                    {post.medias.length > 0 && post.postLegend}
                                </TextRegularMedium>

                                {post.postEvaluation && (
                                    <AvaliationConteiner>
                                        <AvaliationText>Avaliou como
                                            <Text style={post.postEvaluation == "Excelente" ? { color: '#44AB1B' } :
                                                post.postEvaluation == "Bom" ? { color: '#B6CE3A' } :
                                                    post.postEvaluation == "Nada mal" ? { color: '#F9C900' } :
                                                        post.postEvaluation == "Ruim" ? { color: '#F28A19' } :
                                                            post.postEvaluation == "Muito ruim" && { color: '#EA3106' }
                                            }>
                                                {` ${post.postEvaluation}`}
                                            </Text></AvaliationText>
                                        {post.postEvaluation && <Image style={{ width: 20, height: 20 }} source={emojiFace.find((item) => item.name === post.postEvaluation)?.selectedImage} />}
                                    </AvaliationConteiner>
                                )}
                                {imagesUpload.length > 0 && markedPerson && markedPerson.length > 0 ? (
                                    <PostImage handleLike={() => { }} medias={markedUsers} />
                                ) : markedPerson && markedPerson.length == 0 && imagesUpload.length > 0 ? (
                                    <PostImagePreview medias={markedUsers} />
                                ) : (

                                    <>
                                        {!!color ? (<>

                                            <View style={{
                                                backgroundColor: color.color,
                                                flex: 1,
                                                marginTop: -30,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 300,
                                                borderRadius: 5

                                            }}>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0
                                                }}>
                                                    <View>
                                                        {
                                                            markedPerson.length > 0 && (
                                                                <View >
                                                                    <TouchableOpacity onPress={() => {
                                                                        setOpenMarkers(!openMarkers)
                                                                    }}>

                                                                        <Image style={{
                                                                            marginTop: 10,
                                                                            marginLeft: 10
                                                                        }} source={require('../../Assets/Icons/user.png')} />

                                                                    </TouchableOpacity>
                                                                    {
                                                                        openMarkers && markedPerson.map(({ userNickname }) => {
                                                                            return (
                                                                                <MarkedUserNameContainer key={userNickname}>
                                                                                    <MarkedUserName>
                                                                                        {userNickname}
                                                                                    </MarkedUserName>
                                                                                </MarkedUserNameContainer>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            )
                                                        }

                                                    </View>

                                                </View>
                                                <PostLegendText style={{
                                                    color: "#FFF",
                                                    fontWeight: 600,
                                                }}>{post.postLegend}</PostLegendText>
                                                <PostColors handleColor={setColor} colorSelect={color.id.toString()} />
                                            </View>
                                        </>
                                        ) :
                                            <ImageBackground
                                                resizeMode="cover"
                                                source={require('../../Assets/Image/background_app.png')}
                                                style={{
                                                    flex: 1,
                                                    marginTop: -30,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: 300
                                                }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0
                                                }}>
                                                    {
                                                        markedPerson.length > 0 && (
                                                            <View >
                                                                <TouchableOpacity onPress={() => {
                                                                    setOpenMarkers(!openMarkers)
                                                                }}>

                                                                    <Image style={{
                                                                        marginTop: 10,
                                                                        marginLeft: 10
                                                                    }} source={require('../../Assets/Icons/user.png')} />

                                                                </TouchableOpacity>
                                                                {
                                                                    openMarkers && markedPerson.map(({ userNickname }) => {
                                                                        return (
                                                                            <MarkedUserNameContainer key={userNickname}>
                                                                                <MarkedUserName>
                                                                                    {userNickname}
                                                                                </MarkedUserName>
                                                                            </MarkedUserNameContainer>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        )
                                                    }
                                                </View>

                                                <PostLegendText>{post.postLegend}</PostLegendText>
                                                <PostColors handleColor={setColor} />


                                            </ImageBackground>
                                        }


                                    </>

                                )}
                                {/* <RowDirection >
                                    <TextRegularSmall style={{
                                        fontWeight: 600,
                                        fontSize: fontSize.normal,
                                    }}>
                                        Trocar de Cor Para {colorText ? `Preto` : `Branco`}
                                    </TextRegularSmall>
                                    <ToggleSwitch
                                        value={colorText}
                                        setValue={() => setColorText(!colorText,)}
                                    />
                                </RowDirection> */}
                                {movieSelected &&
                                    <View style={{ marginTop: 10 }}>
                                        <SelectedMovie
                                            name={movieSelected?.name}
                                            description={movieSelected?.description}
                                            ImageUrl={movieSelected?.image}
                                        />
                                    </View>
                                }

                                <>
                                    <PostFooterPrev />
                                    <LikesMask />
                                    <Text style={{ margin: 20 }}>1.034 curtidas</Text>
                                </>
                            </PostContainer>
                        </PreviewContent>
                    </PostPreviewContainer>
                </ScrollView>
            </SafeAreaViewContainer >
            <BottomModal
                title='Publicar no Cartaz'
                setvisibleBottonModal={setPublishInCartazModal}
                visibleBottonModal={publishInCartazModal}
                children={
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 400, width: 250, backgroundColor: 'white', borderRadius: 10 }}>

                            <>
                                {!!color && !imagesUpload[0]?.url ? (
                                    <View style={{
                                        backgroundColor: color.color,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: "100%",
                                        width: '100%',
                                    }}>
                                        <PostLegendText
                                            style={{
                                                color: "#FFF",
                                                fontWeight: 600,
                                            }}
                                        >{post.postLegend}</PostLegendText>

                                    </View>
                                ) :
                                    <ImageBackground
                                        resizeMode="cover"
                                        source={require('../../Assets/Image/background_app.png')}
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 400
                                        }}
                                    >

                                        <PostLegendText>{post.postLegend}</PostLegendText>



                                    </ImageBackground>
                                }


                            </>
                            {imagesUpload[0]?.url && (
                                <ModalImage style={{ height: 400, width: 250, borderRadius: 10 }} source={{ uri: imagesUpload[0]?.url }} />
                            )}


                            {markedPerson && markedPerson.length > 1 && (
                                <View style={{ backgroundColor: 'white', padding: 6, borderRadius: 4, position: 'absolute', left: 10, bottom: 10 }}>
                                    {markedUsers.map((user, index) => (
                                        <Text key={index} style={{ color: theme.inputTextColor, fontSize: fontSize.thin, fontWeight: '400' }}>
                                            @{user.markedUsers[0].username}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>
                        <ModalSave onPress={() => { saveStoryTo() }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>Salvar</Text>
                        </ModalSave>
                    </View>
                }
            />
        </>
    )
}