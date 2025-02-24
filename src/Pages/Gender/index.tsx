import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import {
  ContentainerConfigurations,
  Text,
  TextContainer
} from '../../Components/configurationsElemetsStyle'

import Header from '../../Components/Header'
import Button from '../../Components/Button'
import RadioButton from '../../Components/RadioButton'
import { SafeAreaViewContainer } from '../../Components/elementsComponents'

import { getGender, saveGender } from '../../Service/Profile'
import useUserProfile from '../../GlobalState/userProfile.zustand'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '../../Theme/theme'

export default function Gender() {

  const [selectedGender, setSelectedGender] = useState("")
  const { user, setUser } = useUserProfile()

  const toast = useToast()
  const navigation = useNavigation<StackRoutes>()

  const saveTakeGender = async () => {

    try {
      await saveGender(selectedGender).then(res => {
        setUser({ ...user, gender: selectedGender });
      })
      navigation.pop()
    } catch (error) {
      console.log('deu ruim ao atualizar o genero.', error)
    }
  }

  useEffect(() => {
    const getGenderProfile = async () => {
      try {
        const response = await getGender()
        setSelectedGender(response.response.result[0].gender)


      } catch (error) {
        console.log('Erro ao buscar o genero.', error)
      }
    }
    getGenderProfile()
  }, [])

  return (
    <SafeAreaViewContainer>
      <ScrollView>
        <Header titleHeader='Gênero' />
        <ContentainerConfigurations>
          <TextContainer>
            <Text onPress={() => setSelectedGender("Feminino")}>Feminino</Text>
            <RadioButton
              icon
              value={selectedGender === 'Feminino' && true}
              setValue={() => setSelectedGender("Feminino")}
            />
          </TextContainer>
          <TextContainer>
            <Text onPress={() => setSelectedGender("Masculino")}>Masculino</Text>
            <RadioButton
              icon
              value={selectedGender === 'Masculino' && true}
              setValue={() => setSelectedGender("Masculino")}
            />
          </TextContainer>

          <TextContainer>
            <Text onPress={() => setSelectedGender("Outro")}>Outro</Text>
            <RadioButton
              icon
              value={selectedGender === 'Outro' && true}
              setValue={() => {
                setSelectedGender("Outro");
              }}
            />
          </TextContainer>
          <TextContainer>
            <Text onPress={() => setSelectedGender("Prefiro não informar")}>Prefiro não informar</Text>
            <RadioButton
              icon
              value={selectedGender === 'Prefiro não informar' && true}
              setValue={() => {
                setSelectedGender("Prefiro não informar");
              }}
            />
          </TextContainer>
        </ContentainerConfigurations>
      </ScrollView>
      <Button
        textButton='Salvar'
        typebutton='blue'
        pressFunction={saveTakeGender}
      />
    </SafeAreaViewContainer>
  )
}