import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import {
  FilterCategoryContainer,
  TextOptionSelected
} from './style'

import {
  ContainerExplore,
  ContentPageExplore,
  SafeAreaViewContainer
} from '../../Components/elementsComponents'

import AntDesign from 'react-native-vector-icons/AntDesign'

import SearchInput from '../../Components/SearchInput'
import HeaderSecondary from '../../Components/HeaderSecondary'
import ExploresAndSearchResults from '../../Components/ExploresAndSearchResults'
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications'

import RoomsCall from './Components/RoomsCall'
import MoviesFilter from './Components/MoviesFilter'
import SeriesFilter from './Components/SeriesFilter'
import BooksFilter from './Components/BooksFilter'
import SoundsFilter from './Components/SoundsFilter'
import ArticleFilter from './Components/ArticleFilter'
import PodcastFilter from './Components/PodcastFilter'
import FindFriendCardExplore from '../../Components/FindFriendsExplore'

import { getMoviesList, getSearchExplorer } from '../../Service/Publications'
import { findFriends } from '../../Service/Profile'

import { ProfileUser } from '../../Types/User'
import { handleSearch } from '../../Utils/search'
import { getRoomsList } from '../../Service/Rooms'
import { IRoom } from '../../Types/rooms.type'
import { ITvSeries, MovieProps } from '../../Types/postProps'
import SearchCard from '../Publication/Components/SearchCard'
import { getBySeries } from '../../Service/Tv'
import tokenMusicApi from '../../GlobalState/tokenMusicAPI.zustand'
import { ItemMusic } from '../../Types/Music'
import { getBySearchMusic } from '../../Service/Audio'

import { fontStyle, theme } from '../../Theme/theme'
import { DropsAndPostSearch } from '../../Components/DropsAndPostSearch'

export default function Search() {

  const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string[]>([])
  const [publicard, setPublicard] = useState<[]>([])
  const [userList, setUserList] = useState<ProfileUser[]>([])
  const [modalMovieList, setModalMovieList] = useState<boolean>(false)
  const [movieList, setMovieList] = useState<MovieProps[]>([])
  const [serieList, setSerieList] = useState<ITvSeries[]>([])
  const [musicList, setMusicList] = useState<ItemMusic[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState([] as any[])
  const [roomsList, setRoomsList] = useState<IRoom[]>([])
  const [filteredRoomsList, setFilteredRoomsList] = useState<IRoom[]>([]);
  const { token } = tokenMusicApi()

  const getRooms = async () => {
    try {
      const response = await getRoomsList()
      setRoomsList(response.data.result)
      setFilteredRoomsList(response.data.result);
    } catch (error) {
      console.log('Deu ruim ao listar as salas.', error)
    }
  }

  useEffect(() => {
    if (inputValue.length > 0) {
      if (selectedFilter == "Mais curtidas") {
        const sortedListPosts = publicard.sort((a, b) => b.likesCount - a.likesCount)
        sortedListPosts.map((item) => console.log('Likes', item.likesCount))

        setSearchResults([...handleSearch(inputValue, sortedListPosts, 'postLegend'), ...handleSearch(inputValue, sortedListPosts, ['userNickname', 'userName'])])
      } else if (selectedFilter == "Contas") {
        setModalMovieList(false)
        findFriends(inputValue)
          .then((response) => {
            setUserList(response.data)
          })
          .catch((error) => {
            console.log('Find Friends - Search')
            console.log(error.response.data)
          });
      } else if (selectedFilter == "Salas") {
        setModalMovieList(false)
        const filter = [...handleSearch(inputValue, roomsList, 'room_name'), ...handleSearch(inputValue, roomsList, 'description')].filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.room_id === value.room_id
          ))
        )
        setFilteredRoomsList(filter)
      } else if (selectedFilter == "Filme") {
        setSerieList([])
        setMusicList([])
        getMoviesList(inputValue).then(res => {
          setMovieList(res.data.movies)
          setModalMovieList(true)
        }).catch((e) => {
          console.log(e)
        })
      } else if (selectedFilter == "Série") {
        setMovieList([])
        setMusicList([])
        getBySeries(encodeURI(inputValue), 'w300').then(res => {
          setSerieList(res)
          setModalMovieList(true)
        }).catch((e) => {
          console.log(e)
        })
      } else if (selectedFilter == "Música") {
        setMovieList([])
        setSerieList([])
        getBySearchMusic(inputValue, token).then((res) => setMusicList(res))
        setModalMovieList(true)
      } else {
        setSearchResults([...handleSearch(inputValue, publicard, 'postLegend'), ...handleSearch(inputValue, publicard, ['userNickname', 'userName'])])
        setModalMovieList(false)
      }
    } else {
      setMusicList([])
      setMovieList([])
      setSerieList([])
      setSearchResults(publicard)
      setModalMovieList(false)
      setFilteredRoomsList(roomsList)
      if (inputValue.length == 0) {
        setUserList([])
      }
    }
  }, [inputValue, selectedFilter])


  const handleSearchMovie = (movieId: string) => {
    setModalMovieList(false)
    setSearchResults(handleSearch(movieId, publicard, 'tmdbMovieId'))
  }

  const handleSearchSerie = (serieId: string) => {
    setModalMovieList(false)
    setSearchResults(handleSearch(serieId, publicard, 'tmdbMovieId'))
  }

  const handleSearchMusic = (musicId: string) => {
    setModalMovieList(false)
    setSearchResults(handleSearch(musicId, publicard, 'tmdbMovieId'))
  }

  const getUsers = async () => {
    try {
      const response = await findFriends('')
      setUserList(response.data)
    } catch (error) {
      console.warn('GetUsers')
      console.log(error)
    }
  }

  useEffect(() => {

    const callPuliExplorer = () => {
      getSearchExplorer()
        .then((response) => {
          setPublicard(response?.data.posts)
          setSearchResults(response?.data.posts)
        })
        .catch((e) => {
          console.log('Error on requisites', e)
        })
    }
    callPuliExplorer()
    getRooms()
    getUsers()
  }, [])



  return (
    <SafeAreaViewContainer>
      <HeaderSecondary />

      <ContainerExplore showsVerticalScrollIndicator={false}>

        <CategoriesFilterPublications
          advancedFiltersButton
          onPressCategoryButton={setSelectedFilter}
          onPressadvancedFiltersButton={() => setvisibleBottonModal(!visibleBottonModal)}
          marginLeft='25px'
          marginTop='10px'
          styleCategoryContent={
            { minWidth: 40, padding: 13, height: 36 }
          }
          textStyle={{ fontSize: 12 }}
          categories={[
            'Ver todos',
            'Contas',
            'Mais curtidas',
            'Recomendações',
            'Salas',
            'Filme',
            'Série',
            'Livro',
            'Música',
            'Artigo',
            'Podcast'
          ]}
        />
        <ContentPageExplore>
          <SearchInput
            marginTop="0px"
            marginBottom="0px"
            placeholder="Pesquisar..."
            value={inputValue}
            onSetText={setInputValue}
          />

        </ContentPageExplore>
        {modalMovieList && <View
          style={{
            paddingTop: 15,
            paddingBottom: 15
          }}
        >
          {movieList.length > 0 && movieList.map((item) => (
            <SearchCard
              category='Filme'
              onPressFunction={() => {
                handleSearchMovie(`${item.movieId}`)
              }}
              name={item.movieTitle}
              description={item.movieOverview}
              image={item.movieImagens?.poster_sizes?.w342}
            />
          ))}
          {serieList.length > 0 && serieList.map((item) => (
            <SearchCard
              category='Série'
              key={item.id}
              onPressFunction={() => {
                handleSearchSerie(`${item.id}`)
              }}
              image={item?.poster_path?.replace("w300", 'w342')}
              name={item.name}
              description={item.overview} />
          ))}
          {musicList.length > 0 && musicList.map((item) => (
            <SearchCard
              category='Música'
              onPressFunction={() => {
                handleSearchMusic(item.id)
              }}
              image={item.album?.images && item.album?.images[0]?.url ? item.album?.images[0].url : ''}
              name={item.name}
              description={item.artists[0].name} />
          ))}
        </View>}
        {selectedOption && (
          <View style={{ flexDirection: 'row', marginLeft: 25 }}>
            {selectedOption.map((option, index) => (
              <View key={index} style={{ marginRight: 10, marginTop: 15, maxWidth: '26%' }}>
                <FilterCategoryContainer>
                  <TextOptionSelected>{option}</TextOptionSelected>
                  <TouchableOpacity onPress={() => setSelectedOption(prev => prev.filter(opt => opt != option))}>
                    <AntDesign
                      name='closecircle'
                      size={12}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </FilterCategoryContainer>
              </View>
            ))}

          </View>
        )}
        {selectedFilter == "Contas" && userList.length == 0 && (
          <View style={{ marginTop: '15%', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ color: theme.textDark, textAlign: 'center', fontFamily: fontStyle.regular, fontSize: 16 }}>Sem resultado para{'\n'}a busca</Text>

          </View>
        )}

        {selectedFilter == "Contas" && userList.length > 0 ? (
          <View style={{ alignItems: 'center' }}>
            {
              userList.map((item, index) => (
                <FindFriendCardExplore
                  key={index}
                  userProfile={item}
                  userName={item.userName}
                  userId={item.userId}
                  borderBottom
                  profileImage={item.profileImage}
                  userNickname={item.userNickname}
                />
              ))
            }

          </View>
        ) : (
          <>
            {selectedFilter.length > 0 ? (
              <>
                {selectedFilter == "Salas" && (<RoomsCall filteredRoomsList={filteredRoomsList} />)}
                {selectedFilter == "Filme" && (<MoviesFilter postCard={searchResults} />)}
                {selectedFilter == "Série" && (<SeriesFilter postCard={searchResults} />)}
                {selectedFilter == "Livro" && (<BooksFilter postCard={searchResults} />)}
                {selectedFilter == "Música" && (<SoundsFilter postCard={searchResults} />)}
                {selectedFilter == "Artigo" && (<ArticleFilter postCard={searchResults} />)}
                {selectedFilter == "Podcast" && (<PodcastFilter postCard={searchResults} />)}
                {selectedFilter == "Mais curtidas" && (<ExploresAndSearchResults postCard={searchResults} />)}
                {selectedFilter == "Recomendações" && (<ExploresAndSearchResults postCard={searchResults} />)}
                {selectedFilter == "Ver todos" && (<DropsAndPostSearch postCard={searchResults} filter={inputValue.length > 0} />)}
              </>
            ) : (
              <DropsAndPostSearch filter={inputValue.length > 0} postCard={searchResults} />
            )}
          </>
        )}
      </ContainerExplore>
    </SafeAreaViewContainer>
  )
}