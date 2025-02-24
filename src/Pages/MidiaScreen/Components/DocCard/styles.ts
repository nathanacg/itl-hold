import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../../Theme/theme';

export const Container = styled.TouchableOpacity`
  background-color: #FFF;
 
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 18px 22px;
`;

export const RowDirection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const DocImage = styled.Image`
  height: 45px;
  width: 45px;
  margin-right: 20px;
`;

export const RightContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  gap: 5px;
`

export const Description = styled.Text`
  color: #5e5e5e;
  font-size: 14px;
`;

export const DocName = styled.Text`
  font-family: ${fontStyle.semiBold};
  font-size: 15px;
  color: ${theme.textDark};
`;

export const Circle = styled.View`
  height: 4px;
  width: 4px;
  background-color: #5e5e5e;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

export const Download = styled.Image`
  height: 20px;
  width: 20px;
`;

export const SmallText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textDark};
`