import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import {
  Container,
  HeaderTextButton,
  TextModal
} from './style'
import { SafeAreaViewContainer, TextOptionSelectedBottom } from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import ArchivedCard from '../../Components/ArchivedCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { theme } from '../../Theme/theme';
import BottomModal from '../../Components/BottomModal';
import ModalElement from '../../Components/Modal';
import { ButtonContent, ContentModalButtons, TextButton } from '../../Components/Modal/Components/style';
import { typeTheme } from '../../Config/enumTheme';
import Info from '../../Components/Info';
import ButtonSelectedMedia from '../../Components/ButtonSelectedMedia';
import ModalDeleteFolder from './Modais/ModalDeleteFolder';
import RemovePublicationSavedItens from './Modais/RemovePublicationSavedItens';
import RemovePublicationOfFolder from './Modais/RemovePublicationOfFolder';

export default function SavedItens() {
  const route = useRoute()
  const navigation = useNavigation<StackRoutes>();

  const params = route.params as { name: string }
  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
  const [modalDeleteFolder, setModalDeleteFolder] = useState<boolean>(false)
  const [selectCard, setSelectCard] = useState<boolean>(false)
  const [markedCount, setMarkedCount] = useState<number>(3)

  const [deleteFolder, setDeleteFolder] = useState<boolean>(false)
  const [modalRemovePublicationSavedItens, setModalRemovePublicationSavedItens] = useState<boolean>(false)
  const [modalRemovePublicationOfFolder, setModalemovePublicationOfFolder] = useState<boolean>(false)

  const names = [1, 2, 3, 4, 5];

  const [isContent, setIsContent] = useState<number[]>([])

  useEffect(() => {
    setIsContent(names);
  }, []);

  return (
    <SafeAreaViewContainer>
      <BottomModal
        visibleBottonModal={visibleBottonModal}
        setvisibleBottonModal={setvisibleBottonModal}
        title=""
        children={
          params.name === "Todos" ? (
            <>
              <TouchableOpacity onPress={() => {
                setSelectCard(!selectCard),
                  setvisibleBottonModal(!visibleBottonModal)
              }}>
                <TextOptionSelectedBottom>
                  Selecionar
                </TextOptionSelectedBottom>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => {
                setSelectCard(!selectCard),
                  setvisibleBottonModal(!visibleBottonModal)
              }}>
                <TextOptionSelectedBottom>
                  Selecionar imagens
                </TextOptionSelectedBottom>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AlbumCreateAndEdit', {
                buttonRightName: 'Salvar',
                nextRoute: 'SavedItensGroups',
                titleHeader: 'Editar álbum'
              })}>
                <TextOptionSelectedBottom>
                  Editar álbum
                </TextOptionSelectedBottom>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setModalDeleteFolder(!modalDeleteFolder),
                  setvisibleBottonModal(!visibleBottonModal)
              }}>
                <TextOptionSelectedBottom>
                  Excluir álbum
                </TextOptionSelectedBottom>
              </TouchableOpacity>
            </>
          )
        }
      />
      <ModalDeleteFolder
        deleteFolder={deleteFolder}
        modalDeleteFolder={modalDeleteFolder}
        setDeleteFolder={setDeleteFolder}
        setModalDeleteFolder={setModalDeleteFolder}
      />
      <RemovePublicationSavedItens
        modalRemovePublicationSavedItens={modalRemovePublicationSavedItens}
        removePublication={() => { }}
        setModalRemovePublicationSavedItens={setModalRemovePublicationSavedItens}
      />
      <RemovePublicationOfFolder
        modalRemovePublicationOfFolder={modalRemovePublicationOfFolder}
        removePublicationOfFolder={() => { }}
        setModalemovePublicationOfFolder={setModalemovePublicationOfFolder}
      />
      <Container>
        <Header
          titleHeader={params.name}
          actionHeaderElement={params.name === "Todos" && selectCard ? (
            <TouchableOpacity onPress={() => setSelectCard(!selectCard)}>
              <HeaderTextButton>
                Cancelar
              </HeaderTextButton>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setvisibleBottonModal(!visibleBottonModal)}>
              <SimpleLineIcons
                name='options-vertical'
                color={theme.primarycolor}
                size={20}
              />
            </TouchableOpacity>
          )}
        />

        {isContent.length > 0 ? (
          <FlatList
            data={isContent}
            numColumns={4}
            renderItem={({ item }) =>
              // <View></View>
              <ArchivedCard
                // fileurl={}
                // period={item.period}
                // markCard={selectCard}
                navigate={() => { /* params.name != "Todos" && (navigation.navigate('SavedItem')) */ }}
              />
            }
          />
        ) : (
          <></>
        )}


      </Container>
      {selectCard && params.name === "Todos" && (
        <ButtonSelectedMedia
          buttons={[
            {
              name: 'Adicionar na pasta',
              count: markedCount,
              onPress: () => { }
            },
            {
              name: 'Remover',
              count: markedCount,
              onPress: () => setModalRemovePublicationSavedItens(!modalRemovePublicationSavedItens)
            }
          ]}
        />
      )}

      {selectCard && params.name !== "Todos" && (
        <ButtonSelectedMedia
          buttons={[
            {
              name: 'Remover da pasta',
              count: markedCount,
              onPress: () => setModalemovePublicationOfFolder(!modalRemovePublicationOfFolder)
            },
            {
              name: 'Remover',
              count: markedCount,
              onPress: () => setModalRemovePublicationSavedItens(!modalRemovePublicationSavedItens)
            }
          ]}
        />
      )}

      {deleteFolder ? (
        <Info text='Pasta excluída' isVisible={false} setVissible={function (value: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }} />
      ) : (<></>)}
    </SafeAreaViewContainer>
  );
};
