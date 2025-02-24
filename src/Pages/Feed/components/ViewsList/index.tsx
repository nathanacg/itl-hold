import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { getViewsDrop } from '../../../../Service/Visualizations';

import ListUsersCard from '../../../../Components/ListUsersCard';

interface ViewsListProps {
    userId: number
}

export default function ViewsList(props: ViewsListProps) {
    const [viewsList, setViewsList] = useState()

    


    return (
        <FlatList
            data={viewsList}
            style={{ minHeight: 200 }}
            keyExtractor={(item) => "view" + item.userId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <ListUsersCard
                    userId={item.userId}
                    userNickname={item.userNickname}
                    userName={item.userName}
                    profileImage={item.profileImage}
                    userAddress={item.userNickname}
                    rightButton={<></>}
                    borderBottom
                />
            )}
        />
    );
};
