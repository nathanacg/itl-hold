import { Text } from 'react-native-elements';
import UserImageRounded from '../../../../Components/UserImageProfile'
import {
    ContainerAdjust,
    LetfContainer,
    NotificationContent,
    NotificationText,
    NotificationTime,
    OneUserActionContainer,
    PostImage,
    UserAddresss
} from './style'
import Video from 'react-native-video';
import { ImageBackground } from '../../../../Components/AlbumCard/style';
import BackgroundImage from '../../../../Components/Post/components/BackgroundImage';


interface OneUserActionProps {
    user: {
        name: string,
        imageUrl: any
        userHasCartaz?: boolean;
    }
    time: string
    action: string
    postUrl?: string | null
    //link: string
}

export default function OneUserAction(props: OneUserActionProps) {

    return (
        <OneUserActionContainer>
            <LetfContainer>
                <UserImageRounded size={45} hasCartaz={props.user.userHasCartaz} url={props.user.imageUrl} />
                <ContainerAdjust>
                    <NotificationContent>
                        <NotificationText numberOfLines={5}>
                            <UserAddresss>
                                {`${props.user.name} `}
                            </UserAddresss>
                            {`${props.action} `}
                            {props.action.length < 250 && (
                                <NotificationTime>
                                    {props.time}
                                </NotificationTime>
                            )}
                        </NotificationText>
                    </NotificationContent>
                    {props.action.length > 250 && (
                        <NotificationTime>
                            {props.time}
                        </NotificationTime>
                    )}
                </ContainerAdjust>
            </LetfContainer>
            {props.postUrl ? (
                <PostImage source={{ uri: props.postUrl }} />
            ) : (
                <></>
            )}
        </OneUserActionContainer>
    )
}