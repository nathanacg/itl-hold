import { View } from 'react-native'

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import {
    DeviceText,
    CityName,
    LocationContainer,
    OnlineText,
    TimerText
} from './style'

interface LocationProps {
    city: string
    status: string
    device: string
}


function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname?.length > maxLength) {
        return nickname.slice(0, maxLength) + '...'
    }
    return nickname
}

export default function LocalizationContent({ city, status, device }: LocationProps) {
    return (
        <LocationContainer>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', height: '80%' }}>

                <SimpleLineIcons
                    size={23}
                    name='location-pin'
                    color="#000"
                />
            </View>
            <View style={{ gap: 0, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                    <CityName>{limitNicknameLength(city, 40)}</CityName>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: -4
                    }} >
                        {status === "Online" ? (
                            <>
                                <OnlineText>online </OnlineText>
                                <DeviceText>-</DeviceText>
                            </>

                        ) : (
                            <TimerText>há {status} atrás -</TimerText>
                        )}
                        <DeviceText> {device}</DeviceText>
                    </View>

                </View>
            </View>
        </LocationContainer>
    );
};
