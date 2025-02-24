import { Image } from 'react-native'

interface VerifyProps {
    width: number
    height: number
    white?: boolean
}

export function Verified(props: VerifyProps) {

    const imgVerified = '../../Assets/Icons/verified.png'

    const imgVerifiedWhite = '../../Assets/Icons/radio_button_checked.png'

    return (
        <Image
            source={props.white ? require(imgVerifiedWhite) : require(imgVerified)}
            defaultSource={props.white ? require(imgVerifiedWhite) : require(imgVerified)}
            style={{
                width: props.width,
                height: props.height,
                resizeMode: 'contain'
            }}
        />
    )
}