import styled, {css} from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: ${({theme}) => theme.colors.backgroundSecondary};
  border-radius: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: none;
  ${props =>
    props.isErrored &&
    css`
      border: 1px solid #d82534;
    `}
  ${props =>
    props.isFocused &&
    css`
      border: 1px solid #f39c12;
    `}
`;

export const Icon = styled(Feather)`
  margin-right: 5px;
`;

export const Input = styled.TextInput`
  flex: 1;
  color: ${({theme}) => theme.colors.textDark};
  font-size: ${({theme}) => theme.fontSize.paragraphBig}px;
  font-family: ${({theme}) => theme.fontFamily.poppinsLight};
`;

export const ChangePasswordText = styled.Text`
  color: ${({theme}) => theme.colors.purple};
  font-size: ${({theme}) => theme.fontSizes.size12};
  margin-right: 12px;
`;
