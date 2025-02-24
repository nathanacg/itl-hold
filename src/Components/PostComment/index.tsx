import { TouchableOpacity } from "react-native-gesture-handler";
import CommentController from "../CommentController";
import AddComment from "../AddComment";

import {
    Button,
    Container,
    Header,
    HeaderTitle,
    TitleCount
} from "./style";

import { useEffect, useState } from "react";
import { getComments } from "../../Service/Comment";
import { Text, View } from "react-native";
import useCreateComment from "../../GlobalState/handleComments.zustand";

interface PostCommentProps {
    openComment: () => void
    postHexId: string
    profileImage: string
    createdAt: string
    likes?: boolean
}

export default function PostComment(props: PostCommentProps) {

    const [currentComment, setCurrentComment] = useState("")
    const [data, setData] = useState<{
        createdAt: string; profileImage: string, commentId: number, userId: number, userNickname: string, commentText: string
    }[]>()
    const [inputOnFocus, setInputOnFocus] = useState(false)
    const [reloadAll, setRealoadAll] = useState(false)
    const { setCommentType, reloadComments } = useCreateComment()



    const getAllComments = () => {
        getComments(props.postHexId)
            .then(res => {
                const onlyComments = res.data.filter((comment: any) => comment.commentedId == null)
                setData(onlyComments)
            })
            .catch((e) => {
                console.warn('GetComments - PostComment')
                console.log(e)
            })
    }

    useEffect(() => {
        getAllComments()
    }, [reloadAll, props.postHexId])
    useEffect(() => {
        getAllComments()
    }, [reloadComments])
    return (
        <View
            style={{ flex: 1, marginBottom: 10 }}
        >
            <Container>
                <Header>
                    <Text>
                        <HeaderTitle>Comentários </HeaderTitle>
                        <TitleCount>({data?.length})</TitleCount>
                    </Text>
                    {/*   <TouchableOpacity onPress={() => {
                        setCommentType('comentary')
                        props.openComment()
                    }}>
                        <Button>Ver todos</Button>
                    </TouchableOpacity> */}
                </Header>
                {data && data.slice(0, 3).map(item => (
                    <CommentController
                        postHexId={props.postHexId}
                        userId={item.userId}
                        key={item.commentId.toString() + "comment"}
                        realoadAll={reloadAll}
                        userImage={item.profileImage}
                        id={item.commentId}
                        user={item.userNickname}
                        content={item.commentText}
                        onCommentAdd={getAllComments}
                        createdAt={item.createdAt}
                    />
                ))}

                <AddComment
                    marcation={() => {
                        setCommentType('comentary')
                        props.openComment()
                    }}
                    profileImage={props.profileImage}
                    setReloadAll={setRealoadAll}
                    onCommentAdd={getAllComments}
                    onFocus={inputOnFocus}
                    commentId={currentComment}
                    postHexId={props.postHexId}
                />

            </Container>
        </View>

    )
}