import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Linking, TouchableOpacity } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

import {
  SafeAreaViewContainer,
  BackgroundImage,
  Shadow,
  ContainerPage,
  ContentPage,
  InfoHeader,
  Title,
  GenderInfo,
  InfoText,
  Watching,
  OnAir,
  Streaming,
  Column,
  Genre,
  SinoView,
  TitleDescription,
  TextDescription,
  ActionButton,
  TitleCast,
  Casting,
  CastImage,
} from './style'

import { theme } from '../../Theme/theme'

import HeaderInfo from '../../Components/HeaderInfo'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { getBook } from '../../Service/Publications'
import { BookData, BookData2 } from './interface/types'

import { getDate } from '../../Utils/handleTime'
import { afterLimitText, limitTextLength } from '../../Utils/limitCharacters'
import { StackRoutes } from '../../Routes/StackTypes'

export default function MoreDetailsBooks() {

  const navigation = useNavigation<StackRoutes>()

  const route = useRoute()
  const params = route.params as { id: string, category: string }

  const [details, setDetails] = useState<BookData2 | null>(null)

  const [moreText, setMoreText] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)


  const getMoreDetails = async () => {
    setLoading(true)
    try {
      const response = await getBook(params.id)
      setDetails(response.data)
    } catch (error) {
      console.log('Deu ruim ao buscar os detalhes.', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMoreDetails()
  }, [])

  useEffect(() => {
    getMoreDetails()
  }, [params.id])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: '100%' }} animating size={'small'} color={theme.primarycolor} />
  }
  const regex = /(<([^>]+)>)/ig;
  const result = details?.volumeInfo.description.replace(regex, '');
  return (
    <SafeAreaViewContainer>
      <HeaderInfo
        title="Publicação"

      />
      <ContainerPage showVerticalScrollIndicator={false}>

        <BackgroundImage
          source={details?.volumeInfo.imageLinks ?
            { uri: `https://books.google.com/books/content?id=${params.id}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api` }
            : require('../../Assets/Image/background_app.png')}>

          <Shadow />

          <InfoHeader>
            <InfoText>
              <Title numberOfLines={1}>{details?.volumeInfo.title}</Title>
              <GenderInfo>

                <Genre>{limitTextLength(details?.volumeInfo.categories ? details?.volumeInfo.categories[0] : '', 100)}</Genre>

              </GenderInfo>
            </InfoText>

          </InfoHeader>

        </BackgroundImage>

        <ContentPage>

          <InfoText>
            <SinoView>
              <TitleDescription>
                Biografia
              </TitleDescription>

            </SinoView>
            <TextDescription>
              {limitTextLength(result ? result : 'Não fornecido', 300)}
              {moreText && (
                <>
                  {afterLimitText(result ? result : '')}
                </>
              )}
            </TextDescription>

            {result && result.length > 300 && (
              <ActionButton>
                <Icon
                  name={moreText ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  onPress={() => setMoreText(!moreText)}
                  color={theme.inputTextColor}
                />
              </ActionButton>
            )}

          </InfoText>
          <InfoText>
            <Streaming>
              <Column>
                <OnAir>Lançamento:</OnAir>
                <Watching>{details?.volumeInfo.publishedDate ? getDate(details?.volumeInfo.publishedDate) : 'Não fornecido'}</Watching>
              </Column>
              <Column>
                <OnAir>Páginas:</OnAir>
                <Watching style={{ textAlign: `center` }}>{details?.volumeInfo.pageCount ? details.volumeInfo.pageCount : 'Não fornecido'}</Watching>
              </Column>
              <Column>
                <OnAir>Autor:</OnAir>
                <Watching>{details?.volumeInfo.authors ? details.volumeInfo.authors[0] : 'Não fornecido'}</Watching>
              </Column>

            </Streaming>
            {details?.accessInfo.pdf.isAvailable && (
              <>
                <TitleCast>
                  Mais informações:
                </TitleCast>
                <Casting>
                  <TouchableOpacity onPress={() => Linking.openURL(details?.accessInfo.webReaderLink)}>
                    <CastImage source={{ uri: `https://books.google.com/books/content?id=${params.id}&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70bs7XlaW7qtsTDwrOsMpo6d2iylD9zrybGEhpXsv9J4yOVgCKsluOJHSBAYpXaYsBy_3j4y5vIRA9Twtj_9mbXLdp9XQtHbGUEsYTTgRWVWoO1kxj5Sl1MqjAfxU55-sh24iqv&source=gbs_api` }} />
                  </TouchableOpacity>
                </Casting>
              </>
            )}

          </InfoText>
        </ContentPage>
      </ContainerPage>

    </SafeAreaViewContainer>
  )
}