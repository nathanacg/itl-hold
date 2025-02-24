import styled from 'styled-components/native'
import { fontStyle, theme } from '../../Theme/theme'
import LinearGradient from 'react-native-linear-gradient'
import { Dimensions } from 'react-native'

const Width = Dimensions.get('screen').width
const Height = Dimensions.get('screen').height

export const Container = styled.ImageBackground`
     height: ${Height <= 853 ? '240px' : '320px'} ;
`

export const Shadow = styled(LinearGradient).attrs({
    colors: ['#000', "#000E", "#000E", "#000A", "#0008", '#0008', '#0008'],
    start: { x: 0.5, y: 3 },
    end: { x: 0.5, y: 0 },
})`
  width: 100%;
  height: 100%;
  padding: 6px 18px;
  justify-content: space-between;
`

export const SalaHeader = styled.View`
    flex-direction: row;
    align-items: flex-start;
    padding: 12px 0px;
    justify-content: space-between;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: ${Height <= 853 ? '10px' : '12px'};;
    color: ${theme.secondaryColor};
`

export const NormalText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size:${Height <= 853 ? '10px' : '12px'};;
    color: ${theme.secondaryColor};
`

export const NormalTextLight = styled.Text`
    font-family: ${fontStyle.light};
    font-size: 11px;
    color: ${theme.secondaryColor};
`

export const UserImage = styled.Image`
    width: ${Height <= 853 ? '28px' : '32px'};
    height: ${Height <= 853 ? '28px' : '32px'};
    margin-left: -14px;
    border-radius: ${Height <= 853 ? '28px' : '32px'};
`

export const IconCircle = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 16px;
    background-color: #D0E0F7;
    justify-content: center;
    align-items: center;
`

export const SalaTitle = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: ${Height <= 853 ? '14px' : '18px'};
    color: ${theme.secondaryColor};
`

export const SalaFooter = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
`

export const Participants = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border-width: 1px;
    border-color: #000000aa;
    margin-right: -8px;

`

export const SalaButton = styled.TouchableOpacity`
    background-color: ${(props: { color: string }) => props.color ? props.color : theme.primarycolor};
    border-radius: 6px;
    padding: 5px 15px 3px;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
`
export const RowDirection = styled.View`
 margin-top: ${(props: { marginTop: string }) => props.marginTop ? (props.marginTop) : ('0px')};
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`
export const ColumnDirection = styled.View`
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
`

export const UserType = styled.Text`
    max-width: 120px;
    align-self: flex-end;
    text-align: center;
    padding: 2px 6px 0px;
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    background-color: #0005;
    border-radius: 6px;
    margin-top: 4px;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 5px;
`