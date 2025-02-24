import React, { SetStateAction, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ListUsersCard from '../../../../Components/ListUsersCard';

import { getLikes } from '../../../../Service/Like';
import useCreatePostCurrent from '../../../../GlobalState/currentPost.zustand';
import SearchInput from '../../../../Components/SearchInput';
import { ProfileUser } from '../../../../Types/User';

interface LikesListProps {
    postId?: string
    setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>
}

export default function LikesList(props: LikesListProps) {
    const { postId } = useCreatePostCurrent();
    const [likeList, setLikeList] = useState<ProfileUser[]>([]);
    const [filteredLikeList, setFilteredLikeList] = useState<ProfileUser[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (props.postId) {
            getLikes(props.postId)
                .then(res => {
                    setLikeList(res.data.users);
                    setFilteredLikeList(res.data.users);
                })
                .catch(error => {
                    console.error('Error fetching likes:', error);
                });
        } else {
            getLikes(postId)
                .then(res => {
                    setLikeList(res.data.users);
                    setFilteredLikeList(res.data.users);
                })
                .catch(error => {
                    console.error('Error fetching likes:', error);
                });
        }
    }, []);

    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredLikeList(likeList);
        } else {
            const filteredLikes = likeList.filter(item =>
                item.userNickname.toLowerCase().includes(searchText.toLowerCase()) ||
                item.userName.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredLikeList(filteredLikes);
        }
    }, [searchText, likeList]);

    return (
        <>
            <View style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                <SearchInput
                    marginTop='12px'
                    placeholder='Pesquisar...'
                    onSetText={setSearchText}
                    value={searchText}
                />
            </View>
            <FlatList
                data={filteredLikeList}
                style={{ minHeight: 300 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => "like" + index}
                renderItem={({ item }) => (
                    <ListUsersCard
                        onPress={() => props.setvisibleBottonModal && props.setvisibleBottonModal(false)}
                        userId={item.userId}
                        userNickname={item.userNickname}
                        userName={item.userName}
                        profileImage={item.profileImage}
                        limitNick={20}
                        rightButton={<></>}
                        borderBottom
                    />
                )}
            />
        </>
    );
}
