import React, { SetStateAction } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ContainerSearch, Input } from './style';
import { theme } from '../../Theme/theme';

interface searchInputProps {
  value: string;
  resetSearch: () => void;
  onTextChange: (text: string) => void;
  marginTop?: string;
  marginBottom?: string;
  placeholder?: string;
}

export default function SearchInput(props: searchInputProps) {
  return (
    <ContainerSearch
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}>
      <Input
        value={props.value}
        onChangeText={props.onTextChange}
        placeholder={props.placeholder}
        placeholderTextColor={theme.textligthGray}
      />
      {props.value ? (
        <Ionicons
          onPress={props.resetSearch}
          name="close"
          size={20}
          color="#5E5E5E"
        />
      ) : (
        <Ionicons name="search" size={20} color="#5E5E5E" />
      )}
    </ContainerSearch>
  );
}
