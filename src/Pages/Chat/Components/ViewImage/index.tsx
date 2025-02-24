import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TimeLight } from "../FileMessage/style";
import ImagePanZoom from 'react-native-image-pan-zoom';
import { SafeAreaViewContainer6 } from "../../../../Components/elementsComponents";


interface ViewImage {
    image: string
    setCloseModal: () => void
    userImage?: string
    userName?: string
    date: any
}

const ViewImageChat = ({ image, setCloseModal, userImage, date, userName }: ViewImage) => {



    return (
        <SafeAreaViewContainer6 style={{ flex: 1 }}>
            <View style={{
                backgroundColor: '#000000',
                position: 'absolute',
                justifyContent: 'center'
            }}>
                <View style={{
                    width: '100%',
                    height: '7%',
                    position: 'absolute',
                    zIndex: 4,
                    top: 40,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: `rgba(71, 71, 71, 0.5)`
                }}>
                    <TouchableOpacity onPress={setCloseModal} style={{ width: '10%', height: '50%', top: 20, justifyContent: 'center', marginLeft: '5%', zIndex: 4 }}>
                        <AntDesign name="left" size={27} color={'white'} />
                    </TouchableOpacity>
                    <View style={{ top: '4%' }}>
                        <Text style={{ color: 'white' }}>{userName}</Text>
                        <TimeLight>{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)} - ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}h${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</TimeLight>

                    </View>
                </View>
                <ImagePanZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={400}
                    imageHeight={400}
                    enableCenterFocus={true}
                    panSpeed={10}
                    zoomSpeed={1}
                    doubleTapZoom={5}
                    image={{ uri: userImage }}
                >
                    <Image source={{ uri: image }} style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        backgroundColor: 'blue',
                        zIndex: 3
                    }} />
                </ImagePanZoom>
            </View>
        </SafeAreaViewContainer6>
    )
}

export default ViewImageChat;