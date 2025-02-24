import React, { useEffect, useState } from 'react'

import { ActivityIndicator, View } from 'react-native'
import {
    ContentPage,
    TextContainer,
    Text,
    Text12
} from './style'

import {
    Container,
    SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import Header from '../../Components/Header'
import ToggleSwitch from '../../Components/ToggleSwitch';
import { getProfile, setNotificationsFromUser, setSeeSpoiler } from '../../Service/Profile';
import { theme } from '../../Theme/theme';

export default function ConfigNotifications() {

    const [notificationsEnable, setNotificationsEnable] = useState<boolean>(false)

    const [loading, setLoading] = useState(true)

    const [spoilerAtivation, setspoilerAtivation] = useState<boolean>(false)


    const handleNotifications = async () => {
        await setNotificationsFromUser(!notificationsEnable)
            .then(res => {
                console.log('Notificações atualizadas.')
            })
            .catch((e) => {
                console.warn('UpdateNoticiations - Config')
                console.log(e)
            })
    }

    const handleSpoiler = async () => {
        await setSeeSpoiler(!spoilerAtivation)
            .then(res => {
                console.log('Spoiler atualizado.')
            })
            .catch((e) => {
                console.warn('UpdateSpoiler - Config')
                console.log(e)
            })
    }

    useEffect(() => {
        const getNotificationsState = async () => {
            setLoading(true)
            await getProfile().then(res => {
                setNotificationsEnable(res.data.notifications === 1 ? true : false)
            }).catch(error => console.log(error))
                .finally(() => setLoading(false))
        }
        const getSpoilerState = async () => {
            setLoading(true)
            await getProfile().then(res => {
                setspoilerAtivation(res.data.allow_spoiler === 1 ? true : false)
            }).catch(error => console.log(error))
                .finally(() => setLoading(false))
        }


        getSpoilerState()
        getNotificationsState()
    }, [])

    if (loading) {
        return <ActivityIndicator
            size={'small'}
            color={theme.primarycolor}
            style={{ marginTop: '100%' }}
        />
    }

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header titleHeader='Notificações' />
                <ContentPage>
                    <TextContainer>
                        <View>
                            <Text>Notificações em push</Text>
                            <Text12>Receber notificações</Text12>
                        </View>
                        <ToggleSwitch
                            value={notificationsEnable}
                            setValue={() => {
                                handleNotifications()
                                setNotificationsEnable(!notificationsEnable)
                            }}
                        />
                    </TextContainer>
                    <TextContainer>
                        <Text>Ativar spoiler</Text>
                        <ToggleSwitch value={spoilerAtivation} setValue={() => {
                            handleSpoiler()
                            setspoilerAtivation(!spoilerAtivation)
                        }
                        } />
                    </TextContainer>
                </ContentPage>
            </Container>
        </SafeAreaViewContainer>
    )
}