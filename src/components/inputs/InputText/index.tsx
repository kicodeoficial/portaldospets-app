import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

import {Container, Icon, Input, ChangePasswordText} from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  style?: any;
  showModal?: () => void;
}

interface IInputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputText: React.ForwardRefRenderFunction<InputRef, IInputProps> = (
  {
    name,
    icon,
    placeholderTextColor,
    multiline,
    showModal,
    ...rest
  },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const {registerField, fieldName, defaultValue = '', error} = useField(name);
  const inputValueRef = useRef<IInputValueReference>({value: defaultValue});

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [registerField, fieldName]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={
            isFocused || isFilled ? '#f39c12' : !!error ? '#D82534' : '#999999'
          }
        />
      )}
      <Input
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor={placeholderTextColor ?? '#999999'}
        keyboardAppearance="dark"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        multiline={multiline}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(InputText);
