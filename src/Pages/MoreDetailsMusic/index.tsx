import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

import { WebView } from 'react-native-webview'

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
  AvaliationContent,
  TitleAverege,
  Stars,
  RateNumber,
  TitleCast,
  Casting,
  CastImage,
  Watching,
  OnAir,
  Streaming,
  Column,
  Genre,
} from './style'

import { theme } from '../../Theme/theme'

import HeaderInfo from '../../Components/HeaderInfo'
import Icon from 'react-native-vector-icons/FontAwesome5'


import { useRoute } from '@react-navigation/native'

import { getMusic } from '../../Service/Publications'

import { MusicData } from './interface/types'
import { getDate } from '../../Utils/handleTime'

export default function MoreDetailsMusic() {

  const route = useRoute()
  const params = route.params as { id: string, category: string }

  const [details, setDetails] = useState<MusicData | null>(null)

  const [musicUrl, setMusicUrl] = useState()

  const [loading, setLoading] = useState<boolean>(false)


  const getMoreDetails = async () => {
    setLoading(true)
    try {
      const response = await getMusic(params.id)
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

  function extrairIdDaFaixa(url: string) {
    var regex = /track\/(\w+)/
    var match = url.match(regex)

    if (match && match.length > 1) {
      return match[1]
    } else {
      return null
    }
  }


  if (loading) {
    return <ActivityIndicator style={{ marginTop: '100%' }} animating size={'small'} color={theme.primarycolor} />
  }

  return (
    <SafeAreaViewContainer>
      <HeaderInfo
        title="Publicação"
      />
      <ContainerPage showVerticalScrollIndicator={false}>

        <BackgroundImage
          source={details?.artistsImagens[0].url ? { uri: details?.artistsImagens[0].url } : require('../../Assets/Image/background_app.png')}
        >
          <Shadow />

          <InfoHeader>
            <InfoText>
              <Title numberOfLines={1}>{details && details.artists[0].name}</Title>
              <GenderInfo>
                {details?.genres && details?.genres.slice(0, 3).map((genre, index) => (
                  <Genre key={index}>{genre}</Genre>
                ))}
              </GenderInfo>
            </InfoText>

          </InfoHeader>

        </BackgroundImage>

        <ContentPage>

          <WebView
            cacheEnabled
            source={{ uri: musicUrl ? musicUrl : details?.musicUrl + '' }}
            style={{ width: 300, height: 100, alignSelf: 'center' }}
          />




          <AvaliationContent>
            <TitleAverege>
              Avaliação:
            </TitleAverege>
            <Stars>
              {[...Array(Math.floor(details?.popularity ? details?.popularity / 2 : 0))].map((_, index) => (
                <Icon
                  key={index}
                  name="star"
                  size={13}
                  color={theme.primarycolor}
                />
              ))}
              {details?.popularity && details?.popularity % 1 !== 0 && (
                <Icon
                  name="star-half"
                  size={13}
                  color={theme.primarycolor}
                />
              )}
            </Stars>
            <RateNumber>
              {details?.popularity ? details?.popularity : 0}
            </RateNumber>
          </AvaliationContent>

          <InfoText>
            <Streaming>
              <Column>
                <OnAir>Lançamento:</OnAir>
                <Watching>{details?.album.release_date ? getDate(details?.album.release_date) : 'Não fornecido'}</Watching>
              </Column>

            </Streaming>

            <TitleCast>
              Músicas:
            </TitleCast>

            <Casting>
              <FlatList
                data={details?.musicAlbum}
                numColumns={4}
                scrollEnabled={false}
                keyExtractor={(item) => "music" + item.musicUrl}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    setMusicUrl('https://open.spotify.com/embed/track/' + extrairIdDaFaixa(item.musicUrl))
                  }}>
                    <CastImage source={{ uri: details?.album.images[1].url }} />
                  </TouchableOpacity>
                )}
              />
            </Casting>
          </InfoText>
        </ContentPage>
      </ContainerPage>



    </SafeAreaViewContainer>
  )
}