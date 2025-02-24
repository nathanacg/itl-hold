import React, { memo, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Platform } from "react-native"
import Header from '../../Components/Header';
import { theme } from '../../Theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Container,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import {
  BottomContainer,
  OptionModal
} from "./style"

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { BackgroundModal } from '../Configurations/Modal/style';

const ArchivedItems = () => {
  const navigation = useNavigation<StackRoutes>()
  const { height } = Dimensions.get('screen')
  const [menu, setMenu] = useState(true)

  return (
    <SafeAreaViewContainer>
      <Container
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={250}
        scrollEnabled={true}
      >
        <Header
          titleHeader='Itens arquivados'
          actionHeaderElement={
            <TouchableOpacity onPress={() => { setMenu(!menu) }}>
              <Entypo
                name='dots-three-vertical'
                color={theme.primarycolor}
                size={20}
              />
            </TouchableOpacity>
          }
        />
      </Container>
      {menu &&
        <View
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            height: height,
          }}
        >
          <TouchableOpacity onPress={() => { setMenu(!menu) }} style={{ backgroundColor: '#000000aa', flex: 1, minHeight: 300 }} />

          <BackgroundModal onPress={() => { }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={-45}>
            <BottomContainer>
              <>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                }} onPress={() => {
                  navigation.push('ArchivedPublications')
                }}>

                  <OptionModal>Posts arquivados</OptionModal>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                }} onPress={() => {
                  navigation.push('ArchivedPoster', {
                    markCard: false,
                    showLikes: false,
                    destackId: 0,
                    isFromDestack: false
                  })
                }}>

                  <OptionModal>Cartazes arquivados</OptionModal>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                  navigation.push('ArchivedDrops')
                }}>

                  <OptionModal>Drops arquivados</OptionModal>
                </TouchableOpacity>
              </>
            </BottomContainer>
          </BackgroundModal>

        </View>}
    </SafeAreaViewContainer>
  );
};

export default memo(ArchivedItems)