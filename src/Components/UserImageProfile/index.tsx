
import { UserImageContainer, UserImage } from './style'


interface UserImageRoundedProps {
    url?: string
    userId?: number
    size?: number
    photoSquare?: boolean

}

export default function UserImageRounded(props: UserImageRoundedProps) {

    return (
        <UserImageContainer
            style={
                props.size ? {
                    width: props.size,
                    height: props.size
                } : {
                    width: 55,
                    height: 55,

                }}>
            <UserImage photoSquare={props.photoSquare} source={{ uri: props.url, cache: 'force-cache' }} style={[props.size ? {
                width: props.size,
                height: props.size,
            } : {
                width: 55,
                height: 55,
            }]} />
        </UserImageContainer>
    )
}