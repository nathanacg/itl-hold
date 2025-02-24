import { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Dimensions, FlatList, Platform, TouchableOpacity, View } from 'react-native'

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
  PlayIcon,
  AvaliationContent,
  TitleAverege,
  Stars,
  RateNumber,
  TitleDescription,
  TextDescription,
  SinoView,
  ActionButton,
  TitleCast,
  Casting,
  CastImage,
  Watching,
  OnAir,
  Streaming,
  Column,
  Platforms,
  Providers,
  Genre,
  Age,
  WatchingNo
} from './style'

import { theme } from '../../Theme/theme'

import HeaderInfo from '../../Components/HeaderInfo'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { afterLimitText, isLessTextLength, limitTextLength } from '../../Utils/limitCharacters'

import { useRoute } from '@react-navigation/native'

import { getMovie, getSerie } from '../../Service/Publications'

import { MovieData, SerieData } from './interface/types'

import { getDate } from '../../Utils/handleTime'
import VideoComponent from './VideoComponent'
import { PostLoading } from '../../Components/PostLoading'
import { MovieLoading } from '../../Components/MovieLoading'
import { ContentPageLoading } from '../../Components/elementsComponents'

export default function MoreDetails() {

  const route = useRoute()
  const params = route.params as { id: number, category: string }

  const [moreText, setMoreText] = useState<boolean>(false)

  const [loading, setLoading] = useState(true)

  const [showWebView, setShowWebView] = useState(false)

  const [details, setDetails] = useState<MovieData | SerieData | null>(null)
  const keyVideo = details?.linkYoutubeWatch.split('=')[1]

  const getMoreDetails = async () => {
    try {
      var response
      if (params.category == "Filme") {
        response = await getMovie(params.id)
      } else if (params.category == "Série") {
        response = await getSerie(params.id)
      }

      if (response) setDetails(response.data)

    } catch (error) {
      console.log('Deu ruim ao buscar os detalhes.', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMoreDetails()
  }, [])

  if (loading) {
    return (
      <SafeAreaViewContainer>
        <HeaderInfo
          title="Publicação"
        />
        <ContentPageLoading>
          <MovieLoading />
        </ContentPageLoading>
      </SafeAreaViewContainer>
    )
  }

  return (
    <>
      <SafeAreaViewContainer>
        <HeaderInfo
          title="Publicação"
        />
        <ContainerPage showVerticalScrollIndicator={false}>

          <BackgroundImage
            source={details?.movieImagens ? { uri: details?.movieImagens.poster_sizes?.original } : require('../../Assets/Image/background_app.png')}
          >
            <Shadow />

            <InfoHeader>
              <InfoText>
                <Title numberOfLines={1}>{details && details.movieTitle}</Title>
                <GenderInfo>
                  {details?.genres && details?.genres.slice(0, 4).map((genre, index) => (
                    <Genre key={index}>{genre}</Genre>
                  ))}
                </GenderInfo>
              </InfoText>
              {details?.linkYoutubeWatch && (
                <PlayIcon onPress={() => setShowWebView(true)}>
                  <Icon
                    name="play"
                    size={13}
                    color={theme.secondaryColor}
                  />
                </PlayIcon>
              )}


            </InfoHeader>
          </BackgroundImage>

          <ContentPage>

            <AvaliationContent>
              <TitleAverege>
                Avaliação:
              </TitleAverege>
              <Stars>
                {[...Array(Math.floor(details?.vote_average ? details?.vote_average : 0))].map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={13}
                    color={theme.primarycolor}
                  />
                ))}
                {details?.vote_average && details?.vote_average % 1 !== 0 && (
                  <Icon
                    name="star-half"
                    size={13}
                    color={theme.primarycolor}
                  />
                )}
              </Stars>
              <RateNumber>
                {params.category != "Música" && (
                  <Icon
                    name="imdb"
                    size={20}
                    color={theme.textDark}
                  />
                )}
                {'  '}
                {details?.vote_average ? details?.vote_average * 2 : 0}
              </RateNumber>
            </AvaliationContent>

            <InfoText>
              <SinoView>
                <TitleDescription>
                  Sinopse
                </TitleDescription>

              </SinoView>
              <TextDescription>
                {limitTextLength(details?.movieOverview ? details.movieOverview : 'Não fornecido.', 300)}
                {!moreText && isLessTextLength(details?.movieOverview ? details.movieOverview : 'Não fornecido.', 300)}

                {moreText && (
                  <>
                    {afterLimitText(details?.movieOverview ? details.movieOverview : 'Não fornecido')}
                  </>
                )}

              </TextDescription>

              {details?.movieOverview && details.movieOverview.length > 300 && (
                <ActionButton>
                  <Icon
                    name={moreText ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    onPress={() => setMoreText(!moreText)}
                    color={theme.inputTextColor}
                  />
                </ActionButton>
              )}

              <Streaming>
                <Column>
                  <OnAir>Lançamento:</OnAir>
                  <Watching>{details?.movieDate ? getDate(details?.movieDate) : 'Não fornecido'}</Watching>
                </Column>
                <Column>
                  <OnAir>Classificação:</OnAir>
                  <Age>
                    {details?.classification ? details?.classification.find(item => item.language === "BR")?.age : 'Não fornecido'}
                  </Age>
                </Column>

                <Column>
                  <OnAir>Em exibição:</OnAir>
                  <Platforms>
                    {details?.providers && details?.providers.flatrate?.map((provider, index) => (
                      <Providers
                        key={index}
                        source={{ uri: 'https://image.tmdb.org/t/p/w45/' + provider.logo_path }}
                      />
                    ))}
                  </Platforms>
                </Column>
              </Streaming>

              <TitleCast>
                Elenco e Diretor
              </TitleCast>

              <Casting>

                {details?.casts && details.casts.length > 0 ? (
                  <FlatList
                    data={details?.casts}
                    numColumns={4}
                    scrollEnabled={false}
                    keyExtractor={(item) => "cast" + item.id}
                    renderItem={({ item }) => (
                      <CastImage source={{ uri: item.profile_path }} />
                    )}
                  />
                ) : (
                  <WatchingNo>Não fornecido</WatchingNo>
                )}

              </Casting>
            </InfoText>
          </ContentPage>




        </ContainerPage>

      </SafeAreaViewContainer >
      {showWebView && (<>
        {
          Platform.OS === 'ios' ? (
            <WebView
              ignoreSilentHardwareSwitch
              allowsFullscreenVideo
              cacheEnabled
              source={{ uri: details?.linkYoutubeWatch + '' }}
              style={{ flex: 1 }}
            />
          ) : (
            <VideoComponent keyVideo={keyVideo} setShowWebView={() => setShowWebView(!showWebView)} />
          )
        }
      </>)}

    </>
  )
}

