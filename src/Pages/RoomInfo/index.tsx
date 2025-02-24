import { SetStateAction, useEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import mime from 'mime'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../Theme/theme'
import { SemiBoldText, TextRegular16 } from '../../Components/configurationsElemetsStyle'

import Header from '../../Components/Header'
import SearchInput from '../../Components/SearchInput'
import ConfirmModal from '../../Components/ConfirmModal'
import SilenceTimeModal from '../../Components/SilenceTimeModal'
import DateInput from '../../Components/DateInput'
import InputIcon from '../../Components/InputIcon'
import InputDesc from '../../Components/InputDesc'
import InputOptions from '../../Components/InputOptions'
import UserInfoModal from '../../Components/UserInfoModal'
import RoomNameInput from '../../Components/RoomNameInput'
import ListUsersMember from '../../Components/ListUsersMember'
import OptionsModal from '../CreateRoom/Components/OptionsModal'
import InputConfiguration from '../../Components/InputConfiguration'

import ImagePicker from 'react-native-image-crop-picker'

import { Container, SafeAreaViewContainer, TextSimple } from '../../Components/elementsComponents'

import { ActionsEditProfilePhotoContainer, GrayText, ProfilePhotoContainer } from '../../Components/Informationsform'

import {
    BottomOptions,
    ContainerAdjust,
    ContentPage,
    Divisor,
    ParticipantsContainer,
    ParticipantsLine,
    ParticipantsText,
    PublicImage,
    RoomInfoContainer,
    RowDirection,
    Text14,
    ToRightContainer
} from './style'

import { getRoomMembers, deleteRoom, desactiveRoom, getRoomDetails, updateRoom, updateRoomDuration, getRequestsRoom } from '../../Service/Rooms'
import { ListRoomUsers } from '../../Types/User'
import { IRoom, RoomType } from '../../Types/rooms.type'
import useRoom from '../../GlobalState/room.zustand'

interface documentProps {
    mime: string,
    uri: string,
    name: string | null
}

interface RoomProps {
    setvisibleModal: React.Dispatch<SetStateAction<boolean>>
}

export default function RoomInfo({ setvisibleModal }: RoomProps) {

    const { room, setRoom } = useRoom()

    const navigation = useNavigation<StackRoutes>()

    const [type, setType] = useState(room?.public === 1 ? 'Pública' : 'Privada')

    /*  const [category, setCategory] = useState(roomDetails?.categories)
     const [categoryModal, setCategoryModal] = useState(false) */

    const [roomName, setRoomName] = useState(room?.room_name)
    const [description, setDescription] = useState(room?.description)
    const [roomDetails, setRoomDetails] = useState<RoomType | null>(null)

    const [requests, setRequests] = useState<ListRoomUsers[]>([])

    const [isLoad, setLoad] = useState(true)

    const [duration, setDuration] = useState<"Temporária" | "Permanente">(roomDetails?.temporaryRoom == 'true' ? "Temporária" : "Permanente")

    const getDetailRoom = async () => {
        try {
            const response = await getRoomDetails(room?.room_id)
            setRoomDetails(response.data.result)
        } catch (error) {
            console.log('Erro ao buscar detalhes da sala.', error)
        }
    }

    const [deleteRoomModal, setDeleteRoomModal] = useState(false)
    const [disableRoomModal, setDisableRoomModal] = useState(false)
    const [enableRoomModal, setEnableRoomModal] = useState(false)
    const [userInfoModal, setUserInfoModal] = useState(false)
    const [useModalType, setUserModalType] = useState<"participant" | 'administrador'>('administrador')
    const [activate, setActivate] = useState<boolean>(true)
    const [roomNewImage, setNewImageRoom] = useState<documentProps | null>(null)

    const [roomMembers, setRoomMembers] = useState<ListRoomUsers[]>([])

    const getMembersRoom = async () => {
        try {
            const response = await getRoomMembers(room?.room_id)
            setRoomMembers(response.data.result)
        } catch (error) {
            console.log('Erro listar membros da sala.', error)
        }
    }

    const getSolicitationsRoom = async () => {
        try {
            const response = await getRequestsRoom(room?.room_id)
            console.log(response.data)
            setRequests(response.data)
        } catch (error) {
            console.log('Erro listar membros da sala.', error)
        }
    }

    async function handleDeleteRoom() {
        try {
            await deleteRoom(roomDetails?.room_id)
            navigation.navigate("Rooms")
        } catch (e) {
            console.log('erro ao deletar a sala', e)
        }
    }
    async function handleDesactivate(roomId: number, activate: number) {
        try {
            await desactiveRoom(roomId, activate)
            setActivate(false)
        } catch (e) {
            console.log('erro ao desativar a sala', e)
        }
    }

    async function handleActivate(roomId: number, activate: number) {
        try {
            await desactiveRoom(roomId, activate)
            setActivate(true)
        } catch (e) {
            console.log('erro ao desativar a sala', e)
        }
    }

    function getSelectedCategory(params: IRoom) {

        const selectedTypes = []

        if (params.articles === 1) {
            selectedTypes.push('Artigo')
        }
        if (params.musics === 1) {
            selectedTypes.push('Música')
        }
        if (params.podcasts === 1) {
            selectedTypes.push('Podcast')
        }
        if (params.movies === 1) {
            selectedTypes.push('Filme')
        }
        if (params.series === 1) {
            selectedTypes.push('Série')
        }
        if (params.books === 1) {
            selectedTypes.push('Livro')
        }

        return selectedTypes
    }

    const result = getSelectedCategory(room)

    const takePhotoFromGalery = async () => {
        await ImagePicker.openPicker({
            width: 500,
            maxFiles: 1,
            smartAlbums: ['UserLibrary'],
            writeTempFile: true,
            compressImageQuality: 0.8,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            cropperTintColor: 'blue',
            height: 250,
            forceJpg: true,
            cropping: true,
        }).then((image) => {
            const imageSelected: documentProps = {
                uri: image.path,
                name: image.filename || '',
                mime: image.mime
            }
            setNewImageRoom(imageSelected)
        })
            .catch((e) => {
                console.warn('ImagePicker OpenPicker - Room Info')
                console.log(e)
            })
    }

    const takePhotoFromCamera = async () => {
        await ImagePicker.openCamera({
            width: 500,
            maxFiles: 1,
            writeTempFile: true,
            compressImageQuality: 0.8,
            useFrontCamera: false,
            cropperCancelText: 'Cancelar',
            cropperChooseText: 'Escolher',
            loadingLabelText: 'Carregando...',
            height: 250,
            forceJpg: true,
            cropping: true,
        }).then((image) => {
            const imageSelected: documentProps = {
                uri: image.path,
                name: image.filename || '',
                mime: image.mime
            }
            setNewImageRoom(imageSelected)
        })
            .catch((e) => {
                console.warn('ImagePicker - Room Info')
                console.log(e)
            })
    }

    function dataForm(datetime: string | undefined) {
        if (datetime) {
            const date = new Date(datetime)
            if (!isNaN(date.getTime())) {
                const dataFormatada = date.toLocaleDateString('pt-BR', {
                    timeZone: 'UTC',
                });
                const horaFormatada = date.toISOString().split('T')[1]?.slice(0, 5) || '';
                return {
                    data: dataFormatada,
                    hora: horaFormatada
                };
            } else {
                console.error('Invalid date string:', datetime)
            }
        }
        return { data: '', hora: '' }
    }

    const result1 = dataForm(roomDetails?.duration ? roomDetails?.duration[0]?.start_datetime : '0000-00-00T00:00:00.000Z')
    const result2 = dataForm(roomDetails?.duration ? roomDetails?.duration[0]?.end_datetime : '0000-00-00T00:00:00.000Z')


    const [startDate, setStartDate] = useState<{ data: string, hora: string } | undefined>({ data: roomDetails?.temporaryRoom == "true" ? result1.data : '00/00/0000', hora: roomDetails?.temporaryRoom == "true" ? result1.hora : '00:00' })
    const [endDate, setEndDate] = useState<{ data: string, hora: string } | undefined>({ data: roomDetails?.temporaryRoom == "true" ? result2.data : '00/00/0000', hora: roomDetails?.temporaryRoom == "true" ? result2.hora : '00:00' })

    function parseDate(datetime: { data: string, hora: string }) {
        console.log(datetime)
        const replaceTime = datetime.hora.replace(':', 'h')
        const splitTime = replaceTime.split('h')
        const hour = parseInt(splitTime[0])
        const minute = parseInt(splitTime[1])
        const splitDate = datetime.data.split('/')
        const day = parseInt(splitDate[0])
        const month = parseInt(splitDate[1])
        const year = parseInt(splitDate[2])
        const seconds = 0
        const convertedDate = new Date(Date.UTC(year, month, day, hour, minute, seconds)).toISOString()
        console.log(year, month, day, hour, minute, seconds)
        const replaceDate = convertedDate.replace('T', ' ')
        const spliteDateConverted = replaceDate.split('.')
        return spliteDateConverted[0]
    }


    async function handleSave() {
        const form = new FormData()
        if (roomNewImage) {
            form.append('file', {
                uri: roomNewImage?.uri,
                type: roomNewImage?.mime,
                name: roomNewImage?.uri?.split("/").pop()?.split('.')[0],
            })
        }

        form.append('roomDesc', description)
        form.append('roomName', roomName)
        form.append('isPublic', type === 'Pública' ? 1 : 0)
        form.append('temporary', duration === 'Temporária' ? 'true' : 'false')
        if (duration === 'Temporária') {
            const dataHoraFormatadaInicio = parseDate(startDate)
            const dataHoraFormatadaFim = parseDate(endDate)
            form.append('startDatetime', dataHoraFormatadaInicio)
            form.append('endDatetime', dataHoraFormatadaFim)
        }
        try {
            const result = await updateRoom(roomDetails?.room_id, form)
            setRoom(result.data)
            navigation.pop()
        } catch (error) {
            console.warn('UpdateRoom - RoomInfo')
            console.log(error.response.data)
        }

    }
    useEffect(() => {
        getDetailRoom()
        getMembersRoom()
        getSolicitationsRoom()
    }, [room])
    useEffect(() => {
        console.log(roomDetails)
    }, [roomDetails])

    useEffect(() => {
        if (roomDetails?.temporaryRoom == 'true' && !!result1 && !!result2 && isLoad) {
            setStartDate(result1)
            setEndDate(result2)
            setDuration("Temporária")
            setLoad(false)
        } else {
            setDuration("Permanente")
        }

    }, [roomDetails])

    useEffect(() => {
        console.log('Data Inicio')
        console.log(startDate)
        console.log('Data Fim')
        console.log(endDate)
    }, [startDate, endDate])



    useEffect(() => {
        navigation.addListener('blur', () => { })
        return () => {
            navigation.removeListener('blur', () => { })
        }
    }, [navigation])

    return (
        <SafeAreaViewContainer>
            <Container showsVerticalScrollIndicator={false}>
                <RoomInfoContainer>
                    <Header
                        titleHeader="Informações"
                        actionHeaderElement={
                            <TouchableOpacity
                                style={{ alignItems: "center", paddingTop: 5, position: "absolute", right: 0 }}
                                onPress={handleSave}>
                                <TextRegular16>
                                    Salvar
                                </TextRegular16>
                            </TouchableOpacity>
                        }
                    />

                    {roomNewImage ? (
                        <PublicImage source={{ uri: roomNewImage.uri }} />
                    ) : (
                        <PublicImage source={{ uri: roomDetails?.image }} />
                    )}

                    <ContentPage>
                        <ProfilePhotoContainer>
                            <ActionsEditProfilePhotoContainer>

                                <TouchableOpacity onPress={takePhotoFromGalery}>
                                    <Image source={require('../../Assets/Icons/galeryIconRounded.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={takePhotoFromCamera}>
                                    <Image source={require('../../Assets/Icons/CameraIconRounded.png')} style={{ width: 45, height: 45, resizeMode: 'contain' }} />
                                </TouchableOpacity>


                            </ActionsEditProfilePhotoContainer>
                        </ProfilePhotoContainer>

                        <RoomNameInput setText={setRoomName} textValue={roomName} />

                        <InputOptions
                            label="Tipo"
                            options={['Pública', 'Privada']}
                            selectedOption={type}
                            setOption={setType}
                            labelStyle={{ width: "30%" }}
                        />

                        <InputOptions
                            label="Duração"
                            options={["Permanente", "Temporária"]}
                            selectedOption={duration}
                            setOption={setDuration}
                            labelStyle={{ width: "30%" }}
                        />

                        {duration === "Temporária" && (
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

                        {/* 
                        <InputOptions
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
                        )}
                        */}

                        <InputIcon
                            label="Categoria"
                            placeholder={result[0]}
                            stylesInput={{ width: '70%' }}
                            width="30%"
                            onPress={() => { }}
                            icon={<></>}
                        />


                        <InputIcon
                            label="Administrador"
                            placeholder="Você"
                            stylesInput={{ width: '70%' }}
                            width="30%"
                            onPress={() => navigation.navigate("AddAdmin")}
                            icon={
                                <Ionicons
                                    name="add"
                                    size={20}
                                    color={"#5D5D5D"}

                                />}
                        />


                        <InputDesc
                            labelStyle={{ width: "30%" }}
                            boxStyle={{ width: "70%", height: 120 }}
                            label="Descrição"
                            placeholder={room?.description}
                            value={description}
                            setValue={setDescription}
                            maxLength={300}
                        />

                        {/*   <InputConfiguration
                            label="Link"
                            placeholder="Link"
                            value={params.Room.link}
                            stylesInput={{ style: { width: '70%' } }}
                            onSetText={setLink}
                            width="30%"
                        /> */}

                        {/*   <InputIcon
                            label="Silenciar"
                            placeholder="Nunca"
                            stylesInput={{ width: '70%' }}
                            width="30%"
                            onPress={() => setSilenceModal(true)}
                            icon={
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={15}
                                    color={"#5D5D5D"}
                                    style={{ marginRight: 10 }} />}
                        />
 */}

                        {/*   <InputIcon
                            label="Mídia, links e docs"
                            placeholder="0"
                            stylesInput={{ width: '70%' }}
                            width="30%"
                            onPress={() => navigation.navigate("MidiaScreen")}
                            icon={
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={15}
                                    color={"#5D5D5D"}
                                    style={{ marginRight: 10 }} />}
                        /> */}

                        {/* {
                            type == "Privada" ? (
                                <InputIcon
                                    label="Enviar mensagens"
                                    placeholder="Todos os participantes"
                                    stylesInput={{ width: '70%' }}
                                    width="30%"
                                    onPress={() => setMessageAllowModal(true)}
                                    icon={
                                        <Ionicons
                                            name="chevron-forward-outline"
                                            size={15}
                                            color={"#5D5D5D"}
                                            style={{ marginRight: 10 }} />}
                                />
                            ) : ( */}
                        {/*  <InputIcon
                            label="Publicar"
                            placeholder="Todos os participantes"
                            stylesInput={{ width: '70%' }}
                            width="30%"
                            onPress={() => setMessageAllowModal(true)}
                            icon={
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={15}
                                    color={"#5D5D5D"}
                                    style={{ marginRight: 10 }} />}
                        /> */}

                        <ParticipantsContainer>
                            <ParticipantsLine>
                                <ParticipantsText>
                                    Participantes: {roomMembers.length}
                                </ParticipantsText>
                                <TouchableOpacity onPress={() => navigation.navigate("AddParticipant")}>
                                    <Ionicons
                                        name="add"
                                        size={20}
                                        color={"#5D5D5D"}
                                    />
                                </TouchableOpacity>
                            </ParticipantsLine>
                        </ParticipantsContainer>
                    </ContentPage>

                    {roomMembers.slice(0, 5).map((user, index) => {
                        return (
                            <View key={user.userId}>
                                <ListUsersMember
                                    borderBottom
                                    userId={user.userId}
                                    profileImage={user.profileImage}
                                    userNickname={user.userNickname}
                                    userName={user.userName}
                                    rightButton={
                                        user.userId === room?.userId &&
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                            <GrayText>Admin</GrayText>

                                        </View>
                                    }
                                />
                                <UserInfoModal
                                    user={user}
                                    setvisibleBottonModal={setUserInfoModal}
                                    visibleBottonModal={userInfoModal}
                                    userType={useModalType}
                                />
                            </View>
                        )
                    })}
                    <ContainerAdjust>
                        <ToRightContainer>
                            <TextSimple onPress={() => navigation.push("RoomParticipants")}>
                                ver todos
                            </TextSimple>
                        </ToRightContainer>

                    </ContainerAdjust>
                    {type == "Privada" && (
                        <ContentPage>
                            <RowDirection>
                                <Text14>
                                    Solicitações
                                </Text14>
                                <TouchableOpacity onPress={() => navigation.push("RoomSolicitation")}>
                                    <RowDirection >
                                        <GrayText>{requests.length}</GrayText>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={15}
                                            color={"#5D5D5D"}
                                        />
                                    </RowDirection>
                                </TouchableOpacity>
                            </RowDirection>
                        </ContentPage>
                    )}
                    <BottomOptions>
                        <SemiBoldText onPress={() => setDeleteRoomModal(true)}>
                            Excluir sala
                        </SemiBoldText>
                        <Divisor />
                        {activate ? (
                            <SemiBoldText onPress={() => setDisableRoomModal(true)}>
                                Desativar sala
                            </SemiBoldText>
                        ) : (
                            <SemiBoldText onPress={() => setEnableRoomModal(true)}>
                                Ativar sala
                            </SemiBoldText>
                        )}

                    </BottomOptions>
                </RoomInfoContainer>
            </Container>

            {/*    <SilenceTimeModal
                visibleBottonModal={SilenceModal}
                setvisibleBottonModal={setSilenceModal}
                seletedOption={silenceTime}
                setOption={setSilenceTime}
            /> */}

            {/*    <OptionsModal
                options={['Participantes', 'Administradores']}
                isModalVisible={messageAllowModal}
                setvisibleBottonModal={setMessageAllowModal}
                selectedOpion={messageAllow}
                setSelectedOption={setMessageAllow}
            /> */}

            {/*  <OptionsModal
                options={['Filme', 'Série', 'Livro', 'Música', 'Artigo', 'Podcast']}
                isModalVisible={categoryModal}
                setvisibleBottonModal={setCategoryModal}
                selectedOpion={category}
                setSelectedOption={setCategory}
            />
 */}
            <ConfirmModal
                setvisibleBottonModal={setvisibleModal}
                isModalVisible={deleteRoomModal}
                text="Ao excluir a sala, ela será eliminada por completo e definitivamente."
                title={`Você deseja excluir a sala ${[roomDetails?.room_name]}?`}
                onCancel={() => { setDeleteRoomModal(false) }}
                onConfirm={() => {
                    handleDeleteRoom()
                    setDeleteRoomModal(false)
                }}
            />

            <ConfirmModal
                setvisibleBottonModal={setvisibleModal}
                isModalVisible={disableRoomModal}
                text="Ao desativar a sala, não será possível qualquer nova interação até a sua reativação."
                title={`Você deseja desativar a sala ${[roomDetails?.room_name]}?`}
                onCancel={() => { setDisableRoomModal(false) }}
                onConfirm={() => {
                    handleDesactivate(room?.room_id, 0)
                    setDisableRoomModal(false)
                }}
            />

            <ConfirmModal
                setvisibleBottonModal={setvisibleModal}
                isModalVisible={enableRoomModal}
                text="Essa sala foi desativar por um dos administradores."
                title={`Você deseja ativar a sala ${[room?.room_name]}?`}
                onCancel={() => { setDisableRoomModal(false) }}
                onConfirm={() => {
                    handleActivate(room?.room_id, 1)
                    setEnableRoomModal(false)
                }}
            />

            {/*  <SilenceTimeModal
                visibleBottonModal={TimeModal}
                setvisibleBottonModal={setTimeModal}
                seletedOption={seletedTime}
                setOption={setSelectedTime}
            /> */}

        </SafeAreaViewContainer>
    )
}