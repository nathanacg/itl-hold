import React, { useState } from 'react';
import { View } from 'react-native';

import {
  Container,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';
import ProfileHeader from '../../Components/ProfileHeader';
import Repost from '../../Components/Repost';
import PostFooter from '../../Components/PostFooter';
import PostComment from '../../Components/PostComment';
import BottomModal from '../../Components/BottomModal';
import ComentsList from '../Feed/components/ComentsList';
import LikesList from '../Feed/components/LikesList';

import { deleteLike, getLikes, newLike } from '../../Service/Like';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';

import { useNotification } from '../../context/notification';

export default function RepostScreen() {
  const { user } = useUserProfile();
  const { repost } = useOtherProfilePost();
  const { sendNotificationLikedPost } = useNotification();

  const [likes, setLikes] = useState([]);

  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false);
  const [typeBottonModal, setTypeButtonModal] = useState<
    'Comentários' | 'Curtidas'
  >('Comentários');

  const updateLikes = async () => {
    await getLikes(repost?.repostOwner.repostHexId)
      .then(res => {
        setLikes(res.data.users);
      })
      .catch(e => {
        console.warn('UpdateLikes - Post');
        console.log(e);
      });
  };

  const handleBottonModal = (type: 'Comentários' | 'Curtidas') => {
    setvisibleBottonModal(!visibleBottonModal);
    setTypeButtonModal(type);
  };

  const handleLike = async (notUnLiked?: boolean) => {
    if (!liked) {
      await newLike({ postHexId: repost?.repostOwner.repostHexId });
      setLikeCount(pv => pv + 1);
      await updateLikes();
      sendNotificationLikedPost(repost?.repostOwner.repostHexId);
      setLiked(true);
    } else if (!notUnLiked) {
      await deleteLike({ postHexId: repost?.repostOwner.repostHexId });
      setLikeCount(pv => pv - 1);
      await updateLikes();
      setLiked(false);
    }
  };

  return (
    <SafeAreaViewContainer>
      <Container showsVerticalScrollIndicator={false}>
        {repost && (
          <>
            <ProfileHeader fromComponent="Repost" />
            <View style={{ marginTop: 20 }} />
            <Repost
              index={1}
              repostScreen
              paddingTop={'-20px'}
              Actions
              postActions={false}
              showLikes={false}
              isSaved={false}
              hasSpoiler={repost.originalPost.post.postSpoiler === '1'}
              profileImageRepost={repost.repostOwner?.profileImage}
              userIdRepost={repost.repostOwner?.userId}
              userNicknameRepost={repost.repostOwner?.userNickname}
              postDateRepost={repost.repostOwner.postDate}
              postLegendRepost={repost.repostOwner.repostLegend || ''}
              userNickname={repost.originalPost.postOwner?.userNickname}
              profileImage={repost.originalPost.postOwner?.profileImage}
              postColor={repost.originalPost.post.postColor}
              postDate={repost.originalPost.post.postDate}
              medias={repost.originalPost.medias}
              postLegend={repost.originalPost.post.postLegend || ''}
              avaliationPost={repost.originalPost.post.postEvaluation}
              repostHexId={repost.repostOwner.repostHexId}
              postHexId={repost.originalPost.post.postHexId}
              userId={repost.repostOwner?.userId}
              tmdbMovieId={repost.originalPost.post.tmdbMovieId}
              postId={repost.originalPost.post.postId}
              postCategorie={repost.originalPost.post.postCategorie}
              isClosed={0}
              followingUser={1}
            />

            <PostFooter
              repost={repost.repostOwner.repostHexId}
              openComment={() => handleBottonModal('Comentários')}
              likeList={likes}
              userId={repost?.repostOwner.userId}
              updateLikes={updateLikes}
              liked={liked}
              postHexId={repost?.repostOwner.repostHexId}
              handleLike={handleLike}
              setLiked={setLiked}
              postId={repost?.repostOwner.repostId}
              isSaved={false}
              mediaImage={repost?.repostOwner.profileImage}
              userImage={repost?.repostOwner.profileImage}
              userNickname={repost?.repostOwner.userNickname}
              time={repost?.repostOwner.postDate}
              legend={repost?.repostOwner.repostLegend}
              tmdbMovieId={repost?.originalPost.post.tmdbMovieId}
              repostEnabled={false}
            />
            <View style={{ marginTop: 12, marginBottom: 15 }} />
            <PostComment
              postHexId={repost.repostOwner.repostHexId}
              profileImage={user.profileImage}
              createdAt={repost.repostOwner.postDate}
              openComment={() => handleBottonModal('Comentários')}
            />
          </>
        )}
        <BottomModal
          visibleBottonModal={visibleBottonModal}
          setvisibleBottonModal={setvisibleBottonModal}
          title={typeBottonModal}
          marginLeftRight="0"
          children={
            <>
              {typeBottonModal === 'Comentários' && (
                <ComentsList
                  setvisibleBottonModal={setvisibleBottonModal}
                  postId={repost?.repostOwner.repostHexId}
                />
              )}
              {typeBottonModal === 'Curtidas' && (
                <LikesList postId={repost?.repostOwner.repostHexId} />
              )}
            </>
          }
        />
      </Container>
    </SafeAreaViewContainer>
  );
}
