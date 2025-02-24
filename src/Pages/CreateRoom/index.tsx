import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import Header from '../../Components/Header';
import DateModal from './Components/DateModal';
import DateInput from '../../Components/DateInput';
import InputIcon from '../../Components/InputIcon';
import OptionsModal from './Components/OptionsModal';
import InputOptions from '../../Components/InputOptions';
import InputConfiguration from '../../Components/InputConfiguration';
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import {
  ContentainerConfigurations,
  TextRegular16,
} from '../../Components/configurationsElemetsStyle';

import { CreateSalaContainer } from './style';
import Info from '../../Components/Info';

export default function CreateRoom() {
  const navigation = useNavigation<StackRoutes>();

  const [showSmallPopup, setshowSmallPopup] = useState<boolean>(false);
  const [popoutText, setPopoutText] = useState<string>('');

  const [roomName, setRoomName] = useState('');
  const [type, setType] = useState<'Pública' | 'Privada'>('Pública');
  const [duration, setDuration] = useState<string>('Permanente');
  const [startDate, setStartDate] = useState<{ data: string; hora: string }>({
    data: '00/00/0000',
    hora: '00:00',
  });
  const [endDate, setEndDate] = useState<{ data: string; hora: string }>({
    data: '00/00/0000',
    hora: '00:00',
  });

  const [selectedCategory, setSelectedCategory] = useState('');

  const [categoryModal, setCategoryModal] = useState(false);

  /*  const [dateModalOpen, setDateModalOpen] = useState(false) */

  /*  const [showDateType, setShowdateType] = useState("Agora") */
  const [showDate, setShowdate] = useState<{ data: string; hora: string }>({
    data: '00/00/0000',
    hora: '00:00',
  });
  const [showDateModal, setShowDateModal] = useState(false);

  const toast = useToast();
  /*
        const handleShowDate = (type: string) => {
            type == "Agendada" && setShowDateModal(true)
            setShowdateType(type)
        }
     */
  const handleDuration = (duration: string) => {
    duration == 'Temporária';
    setDuration(duration);
  };

  const handleAdvance = () => {
    if (!roomName) {
      setPopoutText('Insira o nome da sala.');
      setshowSmallPopup(true);
      return;
    }

    if (!selectedCategory) {
      setPopoutText('Selecione uma categoria.');
      setshowSmallPopup(true);

      return;
    }

    if (duration == 'Temporária') {
      if (startDate.data == '00/00/0000') {
        setPopoutText('Selecione uma data inicial.');
        setshowSmallPopup(true);
        return;
      }

      if (endDate.data == '00/00/0000') {
        setPopoutText('Selecione uma data final.');
        setshowSmallPopup(true);
        return;
      }
    }

    navigation.push('ConfigNewRoom', {
      RoomType: type,
      RoomName: roomName,
      duration: duration,
      startDate: startDate,
      endDate: endDate,
      category: selectedCategory,
    });
  };

  return (
    <SafeAreaViewContainer>
      <CreateSalaContainer>
        <Header
          titleHeader="Criar sala"
          actionHeaderElement={
            <TouchableOpacity
              style={{
                alignItems: 'center',
                paddingTop: 5,
                position: 'absolute',
                right: 0,
              }}
              onPress={handleAdvance}>
              <TextRegular16>Avançar</TextRegular16>
            </TouchableOpacity>
          }
        />

        <ContentainerConfigurations>
          <InputConfiguration
            label="Nome da sala"
            placeholder=""
            value={roomName}
            stylesInput={{
              style: { width: '70%', paddingBottom: 5, paddingLeft: 0 },
            }}
            onSetText={setRoomName}
            width="16%"
          />

          <InputOptions
            label="Tipo"
            options={['Pública', 'Privada']}
            selectedOption={type}
            setOption={setType}
            labelStyle={{ width: '30%' }}
          />

          <InputOptions
            label="Duração"
            options={['Permanente', 'Temporária']}
            selectedOption={duration}
            setOption={handleDuration}
            labelStyle={{ width: '30%' }}
          />

          {duration == 'Temporária' && (
            <View style={{ marginVertical: 10, gap: 10 }}>
              <DateInput
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                alignRight
              />
            </View>
          )}
          <InputIcon
            marginTop="0px"
            label="Categoria"
            placeholder={selectedCategory ? selectedCategory : 'Selecionar'}
            stylesInput={{ width: '70%', paddingBottom: 5, paddingLeft: 0 }}
            width="30%"
            onPress={() => setCategoryModal(true)}
            icon={
              <Ionicons
                name="chevron-forward"
                size={15}
                color={'#5D5D5D'}
                style={{ marginRight: 10 }}
              />
            }
          />

          {/*  <InputOptions
                        label="Divulgação"
                        options={['Agora', 'Agendada']}
                        selectedOption={showDateType}
                        setOption={handleShowDate}
                        labelStyle={{ width: "30%" }}
                    />

                    {showDateType == "Agendada" && (
                        <View style={{ marginVertical: 10, gap: 10 }}>
                            <DateInput
                                startDate={showDate}
                                setStartDate={setShowdate}
                                alignRigth
                            />
                        </View>
                    )} */}

          {/*   <InputIcon
                        label="Administrador"
                        placeholder="Você"
                        stylesInput={{ width: '70%', paddingBottom: 5, paddingLeft: 0  }}
                        width="30%"
                        onPress={() => navigation.navigate("AddAdmin")}
                        icon={
                            <Ionicons
                                name="add"
                                size={15}
                                color={"#5D5D5D"}
                                style={{ marginRight: 10 }}
                            />}
                    /> */}
        </ContentainerConfigurations>
      </CreateSalaContainer>

      <OptionsModal
        options={['Filme', 'Série', 'Livro', 'Música', 'Artigo', 'Podcast']}
        isModalVisible={categoryModal}
        setvisibleBottonModal={setCategoryModal}
        selectedOpion={selectedCategory}
        setSelectedOption={setSelectedCategory}
      />

      {/*  <DateModal
                title="Selecionar duração"
                isVisible={dateModalOpen}
                setVisible={setDateModalOpen}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            /> */}

      <DateModal
        title="Selecionar início"
        isVisible={showDateModal}
        setVisible={setShowDateModal}
        startDate={showDate}
        setStartDate={setShowdate}
      />
      {/* <InfoError setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={popoutText} /> */}
      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      />
    </SafeAreaViewContainer>
  );
}
