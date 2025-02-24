import styled from 'styled-components/native'
import { theme } from '../../../../Theme/theme'


export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0000008d;
`

export const ActionCloseModal = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const SubContainer = styled.View`
  width: 100%;
  min-height: 200px;
  padding: 20px 10px 10px 10px;
  background-color: ${theme.secondaryColor};
  border-radius: 12px;
`