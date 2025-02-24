import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface VideoInterface {
    keyVideo: string | undefined
    setShowWebView: () => void
}

const VideoComponent = ({ keyVideo, setShowWebView }: VideoInterface) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [isFullScreen, setIsFullScreen] = useState(true);

    const change = () => {
        console.log('ahhhhh')
        setIsFullScreen(!isFullScreen)
    }

    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 1)', position: 'absolute', height: '100%', width: '100%' }}>
            <TouchableOpacity onPress={setShowWebView} style={{zIndex: 4, position: 'absolute', top: '5%', left: '5%', height: 30, width: 30 }}>
                <AntDesign
                    name='close'
                    size={30}
                />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <YoutubePlayer
                    height={300}
                    width={windowWidth}
                    videoId={keyVideo}
                    onFullScreenChange={() => change()}
                    play={true}
                />
            </View>
            <TouchableOpacity onPress={setShowWebView} style={{height: 330, bottom: '40%'/* 340 */}}></TouchableOpacity>
        </View>
    )
}



export default VideoComponent;