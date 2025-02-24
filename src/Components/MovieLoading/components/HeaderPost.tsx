import { View } from 'react-native'
import { Header, Options, PostTime, UserContent, UserImage, UserInfos } from './style'



export function HeaderPost() {
  return (
    <Header>
      <UserContent>
        <UserImage />
        <View style={{ flexDirection: 'column', gap: 2 }}>
          <UserInfos />
          <PostTime />
        </View>
      </UserContent>
      <Options />
    </Header>
  )
}