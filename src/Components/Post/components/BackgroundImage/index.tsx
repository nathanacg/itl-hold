import { Image, View, TouchableOpacity, ImageBackground, Linking, Pressable, Text } from 'react-native'
import { PostLegendText, PostLegendTextLink } from '../../../../Pages/PostPreview/style'
import { markerUser } from '../../../../Types/postProps'
import { ScrollView } from 'react-native-gesture-handler'
import NavigateToProfile from '../../../NavigatetoProfile'
import { MarkedUserName, MarkedUserNameContainer, MarkedUserNameContainerNoImage, PostContainer } from '../../../PostImage/style'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, runOnJS } from 'react-native-reanimated'
import { useEffect, useRef, useState } from 'react'
import { theme } from '../../../../Theme/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import AudioMessageReceived from '../AudioMessageCenter'


interface Background {
    postColor?: string,
    newLegend: string,
    markedUsers?: markerUser[],
    openMarkers: boolean,
    audioPath?: string,
    setOpenMarkers: (value: boolean) => void,
    handleLike: (notUnLiked?: boolean) => void
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function BackgroundImage(props: Background) {
    const lastTapTime = useRef(0)
    const scale = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: Math.max(scale.value, 0) }
        ]
    }))

    function transform() {
        return (
            props.handleLike(true)
        )
    }

    const onDoubleTap = () => {
        const currentTime = new Date().getTime();

        if (currentTime - lastTapTime.current < 300) {
            scale.value = withSpring(0.7, { duration: 400 }, (isFinished) => {
                if (isFinished) {
                    scale.value = withDelay(0, withSpring(0));
                    runOnJS(transform)();
                }
            });
        }

        lastTapTime.current = currentTime;
    }

    return (
        <>
            <PostContainer onTouchEnd={onDoubleTap}>
                {props.postColor && (
                    <ImageBackground
                        source={props.postColor.split("&")[0] == '#000' ? require('../../../../Assets/Image/background_app2.png') : require('../../../../Assets/Image/background_app.png')}
                        style={{
                            backgroundColor: props.postColor.split("&")[0],
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 300

                        }}>
                        <AnimatedImage
                            source={require('../../../../Assets/Image/heart.png')}
                            style={[
                                {
                                    width: 150,
                                    height: 150,
                                    alignSelf: 'center',
                                    resizeMode: 'contain',
                                    tintColor: 'white',
                                    zIndex: 4,
                                    marginTop: -10
                                },
                                rStyle,
                            ]}
                            resizeMode={'contain'}
                        />

                        {props.newLegend.includes('https://') ? (
                            <View style={{ marginTop: -180, width: 250 }}>
                                <PostLegendTextLink style={{ color: props?.postColor.split('&')[1] }}>{props.newLegend.split('https://')[0]}</PostLegendTextLink>
                                <TouchableOpacity onPress={() => Linking.openURL(`https://` + props.newLegend.split('https://')[1].split(' ')[0])}>
                                    <PostLegendTextLink style={{ color: props?.postColor.split('&')[1], textDecorationLine: 'underline' }}>
                                        https://{props.newLegend.split('https://')[1].split(' ')[0]}
                                    </PostLegendTextLink>
                                </TouchableOpacity>

                            </View>
                        ) : props.audioPath && props.newLegend.length == 0 ? (
                            <View style={{ marginTop: -130 }}>
                                <AudioMessageReceived
                                    uri={props.audioPath}
                                    audioonly
                                    configAudMetrics={[-33.92938995361328, -38.041709899902344, -38.041709899902344, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -26.937410354614258, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -33.92938995361328, -33.92938995361328, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -22.133541107177734, -12.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -23.041709899902344, -20.189544677734375]}
                                />
                            </View>
                        ) : (
                            <PostLegendTextLink
                                style={{
                                    marginTop: -140,
                                    color: props?.postColor.split('&')[1],
                                }}
                            >
                                {props.newLegend}
                            </PostLegendTextLink>
                        )}

                        {
                            props.markedUsers && props.markedUsers.length > 0 && props.markedUsers[0] && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        bottom: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => props.setOpenMarkers(!props.openMarkers)}
                                        style={{
                                            backgroundColor: '#fff',
                                            width: 20, height: 20, borderRadius: 20,
                                            left: 15, justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="person"
                                            size={14}
                                            color={theme.textDark}
                                        />
                                    </TouchableOpacity>
                                    <ScrollView
                                        horizontal
                                        style={{ marginLeft: 20 }}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {
                                            props.openMarkers && props.markedUsers.length > 0 && props.markedUsers.map((media, index) => {

                                                return (

                                                    <View key={`${media.userNickname}-${index}`}>
                                                        <NavigateToProfile userNickName={media.userNickname}>
                                                            <MarkedUserNameContainerNoImage noImage={props.postColor?.split("&")[0] == '#ffffff'}>
                                                                <MarkedUserName>
                                                                    {media.userNickname}
                                                                </MarkedUserName>
                                                            </MarkedUserNameContainerNoImage>
                                                        </NavigateToProfile>
                                                    </View>

                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )
                        }
                    </ImageBackground>
                )}
            </PostContainer>
        </>
    )
}