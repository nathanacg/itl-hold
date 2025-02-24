import styled from 'styled-components/native'

import { theme } from '../../../Theme/theme'

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UserContent = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 6px;
`

export const UserImage = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 6px;
  background-color: ${theme.textligthGray};
`

export const UserImageRounded = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  margin-right: 10px;
  background-color: ${theme.lightGray};
`

export const UserInfos = styled.View`
  width: 120px;
  height: 18px;
  border-radius: 4px;
  margin-top: 6px;
  background-color: ${theme.textligthGray};
`

export const PostTime = styled.View`
  width: 90px;
  height: 10px;
  border-radius: 4px;
  margin-top: 2px;
  background-color: ${theme.lightGray};
`

export const PostMessage = styled.View`
  width: 100%;
  height: 10px;
  border-radius: 4px;
  margin-top: 7px;
  background-color: ${theme.lightGray};
`

export const PostMessageShort = styled.View`
  width: 70%;
  height: 10px;
  border-radius: 4px;
  margin-top: 7px;
  background-color: ${theme.lightGray};
`

export const Options = styled.View`
 width: 10px;
  height: 35px;
  border-radius: 4px;
  background-color: ${theme.lightGray};
`

export const ImageFake = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 350px;
  background-color: ${theme.lightGray};
`

export const FooterActions = styled.View`
  margin-top: 7px;
  width: 100%;
  height: 30px;
  border-radius: 4px;
  background-color: ${theme.lightGray};
`

export const MovieDetails = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
`

export const MovieImage = styled.View`
 width: 75px;
  height: 75px;
  border-radius: 6px;
  background-color: ${theme.textligthGray};
`

export const MovieTitle = styled.View`
  width: 200px;
  height: 18px;
  border-radius: 4px;
  margin-top: 6px;
  background-color: ${theme.textligthGray};
`

export const MovieDescription = styled.View`
  width: 100%;
  height: 10px;
  border-radius: 4px;
  margin-top: 2px;
  background-color: ${theme.lightGray};
`

export const MovieDescriptionShort = styled.View`
  width: 85%;
  height: 10px;
  border-radius: 4px;
  margin-top: 2px;
  background-color: ${theme.lightGray};
`