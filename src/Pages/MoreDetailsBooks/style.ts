import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fontSize, fontStyle, theme } from '../../Theme/theme'
import { Platform, ScrollView } from 'react-native'

export const SafeAreaViewContainer = styled(SafeAreaView)`
    flex:1;
    background-color: ${theme.secondaryColor};  
`

export const ContainerPage = styled(ScrollView)`
   padding: 10px 16px 0px 16px;
`

export const ContentPage = styled.View`
   padding: 16px 16px 0px 16px;
`

export const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 250px;
`

export const Shadow = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #00000090;
`

export const InfoHeader = styled.View`
  display: flex;
  flex-direction: row;
  padding: 14px;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

export const InfoText = styled.View`
  flex-direction: column;
  flex: 1;
  gap: 1px;
`

export const PlayIcon = styled.TouchableOpacity`
  background-color: ${theme.dangerColor};
  width: 40px;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 40px;
`

export const ShareButton = styled.TouchableOpacity`
  background-color: ${theme.primarycolor};
  padding: 5px 10px;
  border-radius: 6px;
`

export const TitleButton = styled.Text`
  font-family: ${fontStyle.semiBold};
  font-size: ${fontSize.medium}px;
  color: ${theme.secondaryColor};
`

export const ActionButton = styled.View`
  flex-direction: column;
  flex: 1;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${fontStyle.Bold};
  text-align: left;
  width: 92%;
  font-size: ${fontSize.heading}px;
  color: ${theme.secondaryColor};
`

export const TitleCast = styled.Text`
  margin-top: 25px;
  font-family: ${fontStyle.semiBold};
  text-align: left;
  font-size: ${fontSize.normal}px;
  color: ${theme.textDark};
`

export const Watching = styled.Text`
  font-family: ${fontStyle.regular};
  text-align: left;
  font-size: ${fontSize.medium}px;
  color: ${theme.textDark};
`

export const Classification = styled.View`  
  width: 25px;
  align-self: center;
  height: 25px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${theme.primarycolor};
`

export const Age = styled.Text`
  font-family: ${fontStyle.semiBold};
  font-size: ${fontSize.normal}px;
  color: ${theme.secondaryColor};
`

export const Column = styled.View`
  flex-direction: column;
  gap: 2px;
`

export const Platforms = styled.View`
  justify-content: flex-end;
  gap: 3px;
  flex-direction: row;
  align-items: center;
`
export const Providers = styled.Image`  
  width: 25px;
  height: 25px;
  border-radius: 6px;
  background-color: ${theme.textligthGray};
`

export const Streaming = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

export const TitleDescription = styled.Text`
  font-family: ${fontStyle.Bold};
  text-align: left;
  font-size: ${fontSize.heading}px;
  color: ${theme.textDark};
`

export const SinoView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TextDescription = styled.Text`
  font-family: ${fontStyle.regular};
  text-align: auto;
  margin-top: 5px;
  font-size: ${fontSize.thin}px;
  color: ${theme.textDark};
`


export const GenderInfo = styled.View`
  display: flex;
  flex-direction: row;
  gap: 3px;
`

export const Genre = styled.Text`
  font-family: ${fontStyle.regular};
  text-align: left;
  font-size: ${fontSize.thin}px;
  color: ${theme.secondaryColor};
`


export const AvaliationContent = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`

export const TitleAverege = styled.Text`
  font-family: ${fontStyle.semiBold};
  text-align: left;
  font-size: ${fontSize.normal}px;
  color: ${theme.textDark};
`

export const OnAir = styled.Text`
  margin-top: 10px;
  font-family: ${fontStyle.semiBold};
  text-align: right;
  font-size: ${fontSize.normal}px;
  color: ${theme.textDark};
`

export const Stars = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  gap: 5px;
`

export const RateNumber = styled.Text`
font-family: ${fontStyle.Bold};
  text-align: left;
  margin-right: 20px;
  font-size: ${fontSize.heading}px;
  color: ${theme.textDark};
`

export const Casting = styled.View`
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 80px;
`

export const CastImage = styled.Image`
  width: 80px;
  height: 80px;
  margin-top: 3px;
  margin-right: 3px;
  background-color: ${theme.lightGray};
`

export const BottomContainer = styled.View`
    background-color:#fff;
    border-top-left-radius:25px;
    border-top-right-radius:25px;
    min-height: ${Platform.OS === 'android' ? '40%' : '0%'};
    width:100%;
    height: 300px;
    align-self: center;
    padding:12px ${(props: { marginLeftRight: string }) => props.marginLeftRight ? (props.marginLeftRight) : ('8%')} 30px;
`

export const TopSpaceContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${(props: { marginBottom: string }) => props.marginBottom};
`

export const TopSpace = styled.TouchableOpacity`
    width: 114px;
    height: 2.91px;
    border-radius: 2px;
    background-color: rgba(169, 169, 169, 0.2);
`