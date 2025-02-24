import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import Header from '../../Components/Header';

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import {
    ContentainerConfigurations
} from '../../Components/configurationsElemetsStyle';
import { RegularText, Title } from '../PrivacyPolicy/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TermsOfCookies() {
    return (
        <SafeAreaViewContainer>
             <Header titleHeader='Política de cookies' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ContentainerConfigurations>
                    <View>
                        <Title>
                            POLÍTICA DE COOKIES
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Esta Política de Cookies é um documento complementar à Política de Privacidade da
                            Intellectus.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Aqui, constam informações sobre o que são cookies, quais cookies são utilizados no
                            aplicativo, qual papel desempenham e como configurá-los.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            1. O QUE SÃO COOKIES
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Cookies são pequenos arquivos de texto ou fragmentos de informação que são baixados
                            em seu computador, smartphone ou qualquer outro dispositivo com acesso à internet
                            quando você visita nossa aplicação.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            O seu navegador armazena os cookies no disco rígido, mas ocupam um espaço de
                            memória mínimo, que não afeta o desempenho do seu computador. A maioria das
                            informações são apagadas automaticamente ao encerrar a sessão
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            TIPOS DE COOKIES
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Os cookies, quanto a seus proprietários, podem ser:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies proprietários: são definidos por nós ou por terceiros em nosso nome
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies de terceiros: são definidos por terceiros confiáveis em nossa aplicação
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Os cookies, quanto ao seu tempo de vida, podem ser:
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies de sessão ou temporários: expiram assim que você fecha o seu
                            navegador, encerrando a sessão.
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies persistentes ou permanentes: cookies que permanecem no seu
                            dispositivo durante um período determinado ou até que você os exclua.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Os cookies, quanto a sua finalidade, podem ser:
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies necessários: possibilitam a navegação em nossas aplicações e o
                            acesso a todos os recursos; sem estes, nossos serviços podem apresentar mal
                            desempenho ou não funcionar
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies de desempenho: otimizam a forma que nossas aplicações funcionam,
                            coletando informações anônimas sobre as páginas acessadas
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies de funcionalidade: memorizam suas preferências e escolhas (como seu
                            nome de usuário)
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cookies de publicidade: direcionam anúncios em função dos seus interesses e
                            limitam a quantidade de vezes que o anúncio aparece
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            2. POR QUE SÃO COLETADOS
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Os cookies contêm informações sobre a navegação do usuário no aplicativo e retêm
                            apenas informações relacionadas às suas preferências.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Os cookies contêm informações sobre a navegação do usuário no aplicativo e retêm
                            apenas informações relacionadas às suas preferências.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Os cookies não contêm informações pessoais específicas, como dados sensíveis ou
                            bancários.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            3. QUAIS COOKIES O APLICATIVO UTILIZA
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Abaixo listamos todos os cookies que podem ser utilizados pela Intellectus Social.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            É importante lembrar que você pode gerenciar a permissão concedida para cada cookie
                            em seu navegador.
                        </RegularText>
                    </View>

                    <View>
                        <View>
                            <RegularText>
                                3.1. Cookies necessários
                            </RegularText>
                        </View>

                        <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -160, marginBottom: -30 }} source={require('../../Assets/Image/p01.png')} />
                    </View>

                    <View style={{ marginTop: -150 }}>
                        <View>
                            <RegularText>
                                3.2. Cookies de desempenho
                            </RegularText>
                        </View>

                        <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -180, marginBottom: -200 }} source={require('../../Assets/Image/p02.png')} />

                        <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -160, marginBottom: -30 }} source={require('../../Assets/Image/p03.png')} />
                    </View>

                    <View style={{ marginTop: -155 }}>
                        <View>
                            <RegularText>
                                3.3. Cookies de funcionalidade
                            </RegularText>
                        </View>

                        <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -180, marginBottom: -30 }} source={require('../../Assets/Image/p04.png')} />
                    </View>

                    <View style={{ marginTop: -155, marginBottom: -150 }}>
                        <View>
                            <RegularText>
                                3.4. Cookies de publicidade
                            </RegularText>
                        </View>

                        <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -180, marginBottom: -30 }} source={require('../../Assets/Image/p05.png')} />
                    </View>

                    <View>
                        <Title>
                            4. GERENCIAMENTO DOS COOKIES
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            A instalação dos cookies está sujeita ao seu consentimento. Apesar da maioria dos
                            navegadores estar inicialmente configurada para aceitar cookies de forma automática,
                            você pode rever suas permissões a qualquer tempo, de forma a bloqueá-los, aceitá-los
                            ou ativar notificações para quando alguns cookies forem enviados ao seu dispositivo.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Atualmente, na primeira vez que você acessar o aplicativo, será requerida a sua
                            concordância com a instalação destes. Apenas após a sua aceitação, eles serão
                            ativados. Todavia, a revogação do consentimento de determinados cookies pode
                            prejudicar ou inviabilizar o funcionamento correto de alguns recursos do aplicativo.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Para gerenciar os cookies do seu navegador, basta fazê-lo diretamente nas
                            configurações do navegador, na área de gestão de cookies.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            5. DISPOSIÇÕES FINAIS
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Para a Intellectus, a privacidade e confiança são fundamentais e sempre está
                            atualizando-se para manter os mais altos padrões de segurança. Assim, reserva-se o
                            direito de alterar esta Política de Cookies a qualquer momento.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Sempre que houver atualização, o usuário será avisado por notificação ao acessar o
                            aplicativo, como também via e-mail.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Ao continuar acessando os serviços do aplicativo, o usuário concorda em estar
                            vinculado à nova versão da Política.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Em caso de dúvidas, entre em contato pelo e-mail dpo@intellectus.social.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            A presente versão desta Política de Cookies foi atualizada pela última vez em
                            05/06/2023.
                        </RegularText>
                    </View>

                </ContentainerConfigurations>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
