import { SetStateAction, useEffect, useState } from "react"

import { Container, AnswerContainer, AnswerButton } from "./style"

import { getAnswers } from "../../Service/Comment"

import Comment from "../Comment"

import { handleTime } from "../../Utils/handleTime"
import useCreateComment from "../../GlobalState/handleComments.zustand"



interface CommentControllerProps {
    user: string
    createdAt: string
    content: string
    userImage: string
    darkLike?: boolean
    // setCurrentComment: () => {}
    id: number
    onCommentAdd?: () => void
    userId: number
    postHexId: string;
    realoadAll: boolean
    setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>
}

interface CommentResponse {
    commentId: number;
    userId: number;
    postHexId: string;
    commentText: string;
    commentedId: number;
    createdAt: string;
    userNickname: string
    profileImage: string
}

export default function CommentController(props: CommentControllerProps) {
    const [showAnswers, setShowAnswers] = useState(false)
    const [answersList, setAnswersList] = useState<CommentResponse[]>([])
    const { reloadComments } = useCreateComment()


    const handleShowAnswers = () => {
        setShowAnswers(!showAnswers)
    }

    useEffect(() => {
        getAnswers(props.id)
            .then(res => setAnswersList(res.data))
            .catch((e) => {
                console.warn('GetAnswers - CommentController')
                console.log(e)
            })
    }, [props.realoadAll])

    useEffect(() => {
        getAnswers(props.id)
            .then(res => setAnswersList(res.data))
            .catch((e) => {
                console.warn('GetAnswers - CommentController')
                console.log(e)
            })
    }, [reloadComments, props.realoadAll])
    return (
        <Container>
            <Comment
                userId={props.userId}
                userNickName={props.user}
                userImage={props.userImage}
                id={props.id}
                setCurrentComment={() => { }}
                isAnswerClose={!showAnswers}
                openAnswer={handleShowAnswers}
                answerCount={answersList.length > 0 ? `${answersList.length}` : ""}
                content={props.content}
                onCommentAdd={props.onCommentAdd}
                createdAt={handleTime(props.createdAt)}
                setvisibleBottonModal={props.setvisibleBottonModal}
                darkLike={props.darkLike}
                postHexId={props.postHexId}
            />
            {showAnswers && (
                <AnswerContainer>
                    {answersList?.map(item => (
                        <Comment
                            onCommentAdd={props.onCommentAdd}
                            postHexId={props.postHexId}
                            userId={props.userId}
                            commentedId={props.id}
                            setvisibleBottonModal={props.setvisibleBottonModal}
                            userNickName={item.userNickname}
                            id={item.commentId}
                            key={item.commentId}
                            isAnswer
                            content={item.commentText}
                            createdAt={handleTime(item.createdAt)}
                            userImage={item.profileImage}
                        />
                    ))}
                    <AnswerButton onPress={handleShowAnswers}>Ocultar respostas</AnswerButton>
                </AnswerContainer>
            )}

        </Container>
    )
}