import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { RowDirection, TopOptions, TopOptionsEdit } from '../../style';
import { ColorCircle, FontOption, RigthView, WhiteText } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface OnWriteModeProps {
  handleWritEnable: () => void;
  storyText: {
    text: string;
    color: string;
    background: string;
    font: string;
    align: 'left' | 'right' | 'center' | 'auto' | 'justify';
    left: number;
    top: number;
    scale: number;
  };
  setStoryText: React.Dispatch<
    SetStateAction<{
      text: string;
      color: string;
      background: string;
      font: string;
      align: 'left' | 'right' | 'center' | 'auto' | 'justify';
      left: number;
      top: number;
      scale: number;
    }>
  >;
}

export default function OnWriteMode(props: OnWriteModeProps) {
  const inputRef = useRef(null);
  const [colorMode, setColorMode] = useState<'font' | 'background'>();
  const [showColors, setShowColors] = useState(false);
  const [selectedFont, setSelectedFont] = useState(props.storyText.font);

  const [alignPosition, setAlignPosition] = useState(0);
  const textAligns = ['center', 'left', 'right', 'auto'];

  const handleAlignText = () => {
    setAlignPosition(alignPosition < 2 ? alignPosition + 1 : 0);
    const nextAling = textAligns[alignPosition];
    props.setStoryText({ ...props.storyText, align: 'auto' });
  };

  const [keyboardHeight, setKeyBoardHeigth] = useState(0);

  const onKeyboardWillShow = (e: any) => {
    setKeyBoardHeigth(e.endCoordinates.height - 20);
  };

  const onKeyboardDidHide = (e: any) => {
    setKeyBoardHeigth(0);
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardWillShow,
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardDidHide,
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <Modal isVisible={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
          keyboardShouldPersistTaps="handled">
          <TopOptionsEdit>
            <RowDirection
              style={{ flex: 1, justifyContent: 'center', gap: 80 }}>
              <RowDirection style={{ gap: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowColors(!showColors);
                    setColorMode('font');
                  }}>
                  <Image
                    source={require('../../../../Assets/Icons/colors.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAlignText}>
                  <Image
                    source={require('../../../../Assets/Icons/align.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowColors(!showColors);
                    setColorMode('background');
                  }}>
                  <MaterialIcons
                    name="font-download"
                    size={23}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              </RowDirection>
              <RigthView onPress={props.handleWritEnable}>
                <WhiteText>Concluir</WhiteText>
              </RigthView>
            </RowDirection>
          </TopOptionsEdit>
          <View>
            <TextInput
              keyboardType="default"
              cursorColor={'#FFF'}
              style={[
                {
                  color: props.storyText.color || '#FFF',
                  backgroundColor: props.storyText.background || 'transparent',
                  fontSize: 20,
                  alignSelf: 'center',
                  borderRadius: 6,
                  paddingVertical: 5,
                  paddingHorizontal: 7,
                  fontFamily: selectedFont,
                },
              ]}
              textAlign={'center'}
              autoFocus
              caretHidden={false}
              value={props.storyText.text}
              onChangeText={text =>
                props.setStoryText({
                  ...props.storyText,
                  text,
                  align: props.storyText.align,
                  color: props.storyText.color || '#FFF',
                })
              }
              multiline={true}
              ref={inputRef}
            />
          </View>
          <View>
            {showColors && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  alignSelf: 'flex-end',
                  marginLeft: 30,
                  marginBottom: 10,
                }}
                contentContainerStyle={{
                  marginBottom: keyboardHeight,
                  alignSelf: 'flex-end',
                }}
                ListHeaderComponent={
                  <>
                    <RowDirection>
                      {colorMode == 'background' && (
                        <ColorCircle
                          onPress={() => {
                            props.setStoryText({
                              ...props.storyText,
                              background: '',
                            });
                          }}>
                          <MaterialIcons
                            name="block"
                            color={'#fff'}
                            size={20}
                          />
                        </ColorCircle>
                      )}
                    </RowDirection>
                  </>
                }
                data={[
                  '#fff',
                  '#000',
                  '#F90053',
                  '#9109FF',
                  '#0087FF',
                  '#4BFF23',
                  '#C2FF00',
                  '#e9ff70',
                  '#b9fbc0',
                  '#90dbf4',
                  '#cfbaf0',
                  '#ffcfd2',
                  '#fbf8cc',
                  '#ffe6a7',
                  '#bb9457',
                  '#432818',
                  '#5e503f',
                  '#463f3a',
                  '#eae0d5',
                  '#bcb8b1',
                  '#8b8b8c',
                  '#22333b',
                  '#001219',
                  '#252422',
                  '#121113',
                ]}
                renderItem={({ item }) => (
                  <ColorCircle
                    onPress={() => {
                      colorMode == 'font'
                        ? props.setStoryText({
                            ...props.storyText,
                            color: item,
                          })
                        : props.setStoryText({
                            ...props.storyText,
                            background: item,
                          });
                    }}
                    style={{ backgroundColor: item }}
                  />
                )}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
