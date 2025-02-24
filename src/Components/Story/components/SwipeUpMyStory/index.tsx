import { UserViewImage, UsersViews, WhiteText } from "./style";
import { RowDirection } from "../../../elementsComponents";
interface SwipeUpMyStoryProps {
    handleLiskeModal: () => void
    profileImages: string[];
}

export default function SwipeUpMyStory(props: SwipeUpMyStoryProps) {

    return (
        <UsersViews
            onPress={props.profileImages.length > 0 ? props.handleLiskeModal : () => { }}>
            <RowDirection style={{ marginLeft: 8 }}>
                {props.profileImages.slice(0, 4).map((imageSource, index) => (
                    <UserViewImage key={index} source={{ uri: imageSource }} />
                ))}
            </RowDirection>
            <WhiteText>
                {props.profileImages.length > 0 ? 'Visualizações' : 'Nenhuma visualização'}
            </WhiteText>
        </UsersViews>

    )
}