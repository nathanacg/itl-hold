import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { theme } from '../../Theme/theme'

import { HeaderContainer, HeaderActions, Info, Title } from './style'

interface ProfileHeaderProps {
    title?: string
    actionHeaderElement1?: React.ReactNode
}

export default function HeaderInfo(props: ProfileHeaderProps) {
    const navigation = useNavigation<StackRoutes>()


    return (
        <HeaderContainer>
            <Info>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Icon
                        name='chevron-small-left'
                        type='entypo'
                        color={theme.primarycolor}
                        size={40}
                    />
                </TouchableOpacity>



                <Title>{props.title}</Title>

            </Info>
            <HeaderActions>
                {props.actionHeaderElement1}
            </HeaderActions>
        </HeaderContainer>
    )
}