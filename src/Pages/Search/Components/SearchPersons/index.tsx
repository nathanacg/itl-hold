import { FlatList } from "react-native-gesture-handler";
import { EndFeedText, EndFeedcontainer } from "../../../Feed/style";
import FindFriendCardExplore from "../../../../Components/FindFriendsExplore";

interface SearchProps {
     searchResults: any
}

export default function SearchPersons(props: SearchProps) {
     return (
          <FlatList
               scrollEnabled={false}
               data={props.searchResults}
               keyExtractor={(item) => "user" + item.userId}
               renderItem={({ item }) => (
                    <FindFriendCardExplore
                         userProfile={item}
                         userName={item.userName}
                         userId={item.userId}
                         profileImage={item.profileImage}
                         userNickname={item.userNickname}
                    />
               )}
               ListEmptyComponent={
                    <EndFeedcontainer>
                         <EndFeedText>Sem resultado para a busca</EndFeedText>
                    </EndFeedcontainer>
               }
          />
     )
}