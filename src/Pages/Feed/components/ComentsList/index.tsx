import React, { useCallback, useEffect, useState, SetStateAction } from 'react';
import { FlatList, Keyboard, Text, TextInput, View } from 'react-native';
import CommentController from '../../../../Components/CommentController';
import useCreatePostCurrent from '../../../../GlobalState/currentPost.zustand';
import { getComments, newAnswer, newComment } from '../../../../Service/Comment';
import useCreateComment from '../../../../GlobalState/handleComments.zustand';

import { useNotification } from '../../../../context/notification';

import { getProfilesComment } from '../../../../Service/Profile';
import ListUsersMentions from '../../../../Components/ListUsersMentions';
import Inputcomment from '../../../../Components/InputComment';
import { BlueButtonImage, CircleButton } from '../../../../Components/InputComment/style';


interface CommentListProps {
  darkLike?: boolean
  postId?: string
  setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>
}

export interface Profile {

  profileImage: string,
  userId: number,
  userName: string,
  userNickname: string

}

interface Users {
  pageCount: number,
  profiles: Profile[]
}

export default function ComentsList(props: CommentListProps) {
  const { commentId, setReloadComment, commentType } = useCreateComment()
  const { postId } = useCreatePostCurrent()
  const [data, setData] = useState<any[]>()
  const [reloadAnswers, setReloadAnswers] = useState(false)
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const [commentValue, setCommentValue] = useState('')
  const [usersList, setUsersList] = useState<Users | undefined>()

  const [marcations, setMarcations] = useState<Profile[]>([])



  const { sendNotificationCommentPost } = useNotification()

  const handleNewComment = async (text: string) => {

    if (commentType == "comentary") {
      let marks = []
      for (const mark of marcations) {
        marks.push(mark.userId)
      }
      const res = await newComment({ postHexId: props.postId ? props.postId : postId, commentText: text, marcations: marks })
      sendNotificationCommentPost(res.data?.commentId, props.postId ? props.postId : postId, false)
      setReloadComment(true)
      setCommentValue("")
    } else {
      const res = await newAnswer({ postHexId: props.postId ? props.postId : postId, commentText: text, commentedId: commentId })
      sendNotificationCommentPost(res.data?.commentedId, props.postId ? props.postId : postId, true)
      setReloadAnswers(!reloadAnswers)
      setCommentValue("")
    }
    getAllComments()
    setShouldRenderComponent(true)

  }

  const getAllComments = () => {
    if (props.postId) {
      getComments(props.postId)
        .then(res => {
          const onlyComments = res.data.filter((comment: any) => comment.commentedId == null)
          setData(onlyComments)
        })
        .catch((e) => {
          console.warn('GetComments - CommentList')
          console.log(e)
        })
    } else {
      getComments(postId)
        .then(res => {
          const onlyComments = res.data.filter((comment: any) => comment.commentedId == null)
          setData(onlyComments)
        })
        .catch((e) => {
          console.warn('GetComments(else) - CommentList')
          console.log(e)
        })
    }

  }

  useEffect(() => {
    getAllComments()
  }, [])

  useEffect(() => {
    let arrayText = commentValue.split(' ')

    let arroba = arrayText.filter(text => text.includes('@'))

    let newMarked = ''

    if (marcations.length > 0) {
      const newMarcations = marcations.filter(mc => commentValue.includes(mc.userNickname))
      setMarcations(newMarcations)

      for (const iterator of arroba) {
        if (!marcations.find(mc => iterator.slice(1) == mc.userNickname)) {
          newMarked = iterator.slice(1)
        }
      }

    } else if (arroba.length > 0) {
      newMarked = commentValue.slice(1)
    }

    if (newMarked) {
      const searchQuery = newMarked.trim()
      getProfilesComment(1, 4, searchQuery)
        .then(res => {
          setUsersList(res.data)
        })
        .catch((e) => {
          console.warn('GetProfilesComment - CommentList')
          console.log(e)
        })
    } else {
      setUsersList(undefined)
    }
  }, [commentValue])

  return (
    <>
      {usersList?.profiles ? (
        <FlatList
          data={usersList.profiles}
          style={{ minHeight: 340, maxHeight: 340 }}
          keyExtractor={(item) => 'mentions' + item.userId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>

            <ListUsersMentions
              userName={item.userNickname}
              userAddress={item.userName}
              profileImage={item.profileImage}
              onPress={() => {
                setMarcations(pv => [...pv, item])
              }}
            />
          }
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', paddingTop: 20 }}>Nenhum usuário encontrado.</Text>
          }
        />

      ) : (
        <FlatList
          data={data}
          style={{ minHeight: 340, maxHeight: 340 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <CommentController

              userId={item.userId}
              realoadAll={reloadAnswers}
              userImage={item.profileImage}
              id={item.commentId}
              user={item.userNickname}
              content={item.commentText}
              createdAt={item.createdAt}
              setvisibleBottonModal={props.setvisibleBottonModal}
            />

          )}
        />

      )}

      <View style={{ paddingBottom: 10, justifyContent: 'center', alignItems: 'center' }}>

        <Inputcomment
          paddingBottom={"0px"}
          onOpenGalery={() => { }}
          onSend={handleNewComment}
          placeholder={commentType == "answer" ? "Responder comentário" : "Adicionar comentário..."}
          setValue={setCommentValue}
          marcations={marcations}
        />
      </View>
    </>
  )
}