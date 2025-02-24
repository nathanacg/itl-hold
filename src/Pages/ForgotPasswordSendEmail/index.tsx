import { useState } from 'react'
import { ActivityIndicator, Image } from 'react-native'

import { StackRoutes } from '../../Routes/StackTypes'
import { useNavigation } from '@react-navigation/native'

import Header from '../../Components/Header'
import Button from '../../Components/Button'
import Input from '../../Components/Input'

import { typeTheme } from '../../Config/enumTheme'

import { setStoreItem } from '../../Lib/asyncStorage'
import { sendEmailValidation } from '../../Service/Validators'

import { theme } from '../../Theme/theme'
import locker from '../../Assets/Image/locker.png'

import {
    Container,
    ContentPage,
    TitlePagelight,
    BoldDarkBlue,
    TextSimple,
    ContainerImage,
    SafeAreaViewContainer
} from '../../Components/elementsComponents'




export default function ForgotPasswordSendEmail() {
    const navigation = useNavigation<StackRoutes>();
    const [userEmail, setuserEmail] = useState<string>("")

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = regex.test(userEmail);

    const [isLoading, setIsLoading] = useState(false)
    const [noEmail, setIsEmail] = useState(false)



    async function getCodeEmail() {

        if (!isValidEmail) {
            setIsEmail(true)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        await sendEmailValidation(userEmail).then(async (res) => {
            await setStoreItem("@intellectus:emailResetPassword", userEmail)
            navigation.push('EmailSuccessfullySent')
            setIsLoading(false)
        }).catch(error => {
            setIsEmail(true)
            setIsLoading(false)
            console.log('DEU:', error)
        })
    }

    return (
        <SafeAreaViewContainer>
            <Container
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraHeight={250}
                scrollEnabled={true}
            >
                <Header />
                <ContentPage>
                    <TitlePagelight>Esqueci minha <BoldDarkBlue>senha</BoldDarkBlue></TitlePagelight>

                    <ContainerImage>
                        <Image style={{ width: 150, height: 150 }} source={locker} />
                    </ContainerImage>
                    <TextSimple>
                        Digite seu e-mail no campo abaixo e enviaremos os passos para recuperação da sua senha.
                    </TextSimple>

                    <Input
                        label=" "
                        textError={'E-mail incorreto'}
                        onSetText={setuserEmail}
                        type={"email"}
                        value={userEmail.toLowerCase()}
                        error={noEmail}
                    />

                </ContentPage>
            </Container>
            {isLoading ? (
                <ActivityIndicator style={{ marginBottom: 50 }} size={'small'} color={theme.primarycolor} />
            ) : (
                <Button pressFunction={() => getCodeEmail()} textButton="Enviar" typebutton={typeTheme.default} />
            )}

        </SafeAreaViewContainer>
    )
}