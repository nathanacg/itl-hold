import { Image, View } from "react-native";
import { BackIcon, StoryTime, UserStory, UserStoryTop } from "./style";
import { useNavigation } from '@react-navigation/native';


interface TextComponentProps{
    profileName: string
}

export default function TextComponent(props: TextComponentProps) {

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
      };
    return (
        <>
            <BackIcon onPress={handleGoBack}>
                <Image style={{position: 'absolute', zIndex: 999}} source={require("../../../../Assets/Icons/chevronBack.png")} />
            </BackIcon>
            <UserStoryTop>
                <UserStory>{props.profileName}</UserStory>
                <StoryTime>10h</StoryTime>
            </UserStoryTop>
        </>
    )
}