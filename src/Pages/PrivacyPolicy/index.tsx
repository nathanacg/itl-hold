import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from '../../Components/Header';
import FontAwesome from "react-native-vector-icons/FontAwesome"

import {
    Title,
    RegularText,
    ContentContainer
} from "./style"

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import {
    ContentainerConfigurations,
} from '../../Components/configurationsElemetsStyle';
import { Image } from 'react-native-elements';
import { fontStyle } from '../../Theme/theme';

export default function PrivacyPolicy() {
    return (
        <SafeAreaViewContainer>
            <Header titleHeader='Política de privacidade' />
            <ScrollView>
                <ContentContainer>
                    <View>
                        <Title>
                            POLÍTICA DE PRIVACIDADE
                        </Title>
                        {/* <Title>
                            consectetur adipiscing elit,
                        </Title> */}
                    </View>
                    <View>
                        <RegularText>
                            O aplicativo Intellectus é mantido e operado pela Intelectus Ltda, que coleta e utiliza
                            alguns dados pessoais que pertencem àqueles que utilizam a plataforma. Ao fazê-lo,
                            age na qualidade de controlador desses dados e está sujeita às disposições da Lei
                            Federal nº. 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD).
                        </RegularText>
                        <RegularText>
                            Esta política de privacidade demonstra cuidado com a proteção dos dados pessoais do
                            usuário e transparência sobre como são tratados e contém informações sobre:
                        </RegularText>

                        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="circle"
                                color={'#8A8A8A'}
                                size={8}
                            />
                            <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                                Quem deve utilizar o aplicativo
                            </RegularText>
                        </View>

                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="circle"
                                color={'#8A8A8A'}
                                size={8}
                            />
                            <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                                Quais dados são coletados e o que é feito com eles
                            </RegularText>
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="circle"
                                color={'#8A8A8A'}
                                size={8}
                            />
                            <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                                Direitos em relação aos seus dados pessoais
                            </RegularText>
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name="circle"
                                color={'#8A8A8A'}
                                size={8}
                            />
                            <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                                Como entrar em contato
                            </RegularText>
                        </View>


                        <Text style={{ marginTop: 15, color: '#8A8A8A', fontFamily: fontStyle.regular }}>
                            O canal de contato é contato@intellectus.social.
                        </Text>
                    </View>

                    <View>
                        <Title>
                            1. TERMOS E DEFINIÇÕES
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            USUÁRIOS: pessoas naturais que utilizam a plataforma.
                        </RegularText>

                        <RegularText>
                            POLÍTICA DE PRIVACIDADE: documento que informa aos usuários como os seus
                            dados são tratados.
                        </RegularText>

                        <RegularText>
                            CONTROLADOR: pessoa, física ou jurídica, a quem compete as decisões referentes ao
                            tratamento dos seus dados pessoais.
                        </RegularText>

                        <RegularText>
                            DADO PESSOAL: qualquer informação ou conjunto de informações relacionada uma
                            pessoa identificada ou identificável.
                        </RegularText>

                        <RegularText>
                            DADO PESSOAL SENSÍVEL: informação relacionada a origem racial ou étnica,
                            convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter
                            religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético
                            ou biométrico, quando vinculado a uma pessoa natural.
                        </RegularText>

                        <RegularText>
                            ENCARREGADO DE DADOS ou DPO: pessoa que faz a comunicação entre o
                            Controlador e os titulares de dados.
                        </RegularText>

                        <RegularText>
                            LGPD: Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                        </RegularText>

                        <RegularText>
                            TITULAR DE DADOS: o usuário, pessoa natural a quem se referem os dados pessoais
                            que são objeto do tratamento.
                        </RegularText>

                        <RegularText>
                            TRATAMENTO DE DADOS: toda operação realizada com os seus dados pessoais,
                            como a coleta, produção, reprodução, classificação, utilização, distribuição,
                            arquivamento, eliminação, modificação, transferência, extração, entre outros.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            2. QUEM PODE UTILIZAR O APLICATIVO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Em caso de cadastro ou envio de informações de pessoas com idade inferior à
                            estabelecida, os dados serão analisados para providências de bloqueio e/ou exclusão
                            da conta.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            3. DADOS COLETADOS E FINALIDADES
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Alguns dados pessoais do usuário são coletados através do aplicativo Intellectus nas
                            situações relacionadas abaixo.
                        </RegularText>
                    </View>

                    <Image style={{ width: '100%', height: 500, resizeMode: 'contain', marginTop: -35, marginBottom: -35 }} source={require('../../Assets/Image/tab1.jpg')} />

                    <View>
                        <RegularText>
                            Eventualmente, informações adicionais poderão ser coletadas para validação de
                            determinados procedimentos, bem como outros tipos de dados não previstos
                            expressamente nesta Política de Privacidade poderão ser coletados, desde que sejam
                            fornecidos com o consentimento do usuário ou, ainda, que a coleta seja permitida com
                            fundamento em outra base legal prevista em lei. Em qualquer caso, a coleta de dados
                            e as atividades de tratamento dela decorrentes serão informadas aos usuários do site.
                        </RegularText>

                        <RegularText>
                            Não é necessário qualquer dado pessoal adicional para que possamos entrar em
                            contato ou viabilizar a prestação de serviços, mas, caso você os forneça, aceitará a
                            coleta dessas informações de forma livre e espontânea
                        </RegularText>

                        <RegularText>
                            Não serão tratados dados de organizações criminosas, que façam apologia a crimes ou
                            regimes autocráticos ou que promovam qualquer tipo de discriminação de um ser
                            humano.

                        </RegularText>

                        <RegularText>
                            O titular tem ciência de que os dados pessoais fornecidos serão coletados, processados
                            e armazenados para possibilitar atingir as finalidades aqui descritas e para que a
                            Intellectus possa entrar em contato com o usuário, caso necessário
                        </RegularText>

                        <RegularText>
                            Alguns dados pessoais poderão ser tratados para o cumprimento de obrigações legais
                            e/ou regulatórias, para desenvolvimento de estudos internos, aprimorar serviços e
                            promoções ou para o exercício regular de direitos em processos judiciais,
                            administrativos ou arbitrais.
                        </RegularText>

                        <RegularText>
                            Qualquer alteração de finalidade para utilização dos seus dados pessoais será
                            comunicada pelo aplicativo e mensagem de e-mail, considerando atualização desta
                            Política de Privacidade.
                        </RegularText>

                        <RegularText>
                            Por último, informa-se que as informações coletadas e resguardadas apenas serão
                            divulgadas caso obrigados a fazê-lo, por força de lei.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            4. COM QUEM E QUANDO SEUS DADOS SERÃO COMPARTILHADOS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Os dados fornecidos serão compartilhados com terceiros quando:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Você publicar conteúdo de suas preferências. Neste caso, sua rede de contatos do
                            aplicativo poderá visualizar suas publicações, opiniões, curtidas e comentários
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Forem armazenados em sistemas contratados na nuvem ou para manutenção e
                            hospedagem do aplicativo em sistemas na nuvem. Em eventual caso de
                            transferência internacional de dados, isso ocorrerá apenas para fins de
                            armazenamento

                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Necessários para atividades junto a empresas parceiras de publicidade e marketing
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Cumprimento de alguma determinação legal ou regulatória, ou de ordem expedida
                            por autoridade pública
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Compliance frente aos órgãos governamentais, assim como para segurança do
                            próprio usuário
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Em qualquer caso, o compartilhamento de dados pessoais observará todas as leis e
                            regras aplicáveis, buscando sempre garantir a segurança de dados dos usuários, de
                            acordo com os padrões técnicos do mercado.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            5. ARMAZENAMENTO DE SEUS DADOS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Para usuários que realizam o cadastro no aplicativo, as informações pessoais são
                            armazenadas e utilizadas durante o fornecimento de serviços.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            O aplicativo também poderá reter as informações por prazos maiores conforme
                            obrigações legais e regulamentos aplicáveis, bem como para atender às finalidades
                            descritas nesta política, para o exercício de legítimo interesse e para o exercício regular
                            de direitos, quando for o caso.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            6. DIREITOS SOBRE SEUS DADOS PESSOAIS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            titular dos dados pessoais, pode exercer seus direitos, enviando mensagem para o e-mail dpo@intellectus.social, com detalhamento do seu pedido
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Para garantir que o usuário que pretende exercer seus direitos é, de fato, o titular dos
                            dados pessoais objeto da requisição, poderemos solicitar documentos ou outras
                            informações que possam auxiliar em sua correta identificação, a fim de resguardar
                            nossos direitos e os direitos de terceiros. Isto somente será feito, porém, se for
                            absolutamente necessário, e o requerente receberá todas as informações relacionadas
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Conforme previsto na LGPD, você tem direito à:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Confirmação: confirmar a existência de tratamento de seus dados pessoais
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Acesso: acessar seus dados pessoais
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Correção: solicitar que dados incompletos, desatualizados ou incorretos sejam
                            corrigidos

                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Anonimização, bloqueio ou eliminação: solicitar anonimização, bloqueio ou
                            eliminação no caso de dados pessoais desnecessários, excessivos ou tratados em
                            desconformidade com a LGPD
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Portabilidade: solicitar a transferência de dados pessoais para outro fornecedor,
                            serviço, produto
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Informação sobre compartilhamento: solicitar informações sobre as entidades
                            públicas e privadas com as quais o controlador realizou o compartilhamento de
                            dados pessoais
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Eliminação com base no consentimento: solicitar eliminação de dados que tenham
                            sido tratados com o consentimento do titular, exceto nas hipóteses previstas no art.
                            16 da LGPD
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Eliminação com base no consentimento: solicitar eliminação de dados que tenham
                            sido tratados com o consentimento do titular, exceto nas hipóteses previstas no art.
                            16 da LGPD
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Revogação de Consentimento: revogar a qualquer momento o consentimento de
                            uso de seus dados pessoais tratados
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Revisão de decisão automatizada: solicitar revisão e informações sobre quais os
                            critérios e processos utilizados na tomada de decisão automatizada, quando
                            aplicável
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Oposição: opor-se a tratamento realizado com fundamento em uma das hipóteses
                            de dispensa de consentimento, em caso de descumprimento ao disposto na LGPD
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Peticionamento: demandar contra o controlador para assegurar seus direitos
                            perante a Autoridade Nacional de Proteção de Dados e, quando o caso, perante
                            órgãos de defesa do consumidor
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Após encaminhar sua solicitação, ela será avaliada e poderá ser rejeitada mediante
                            justificativa. Todos os esforços serão empreendidos para atender a solicitação no menor
                            tempo possível e poderão ser rejeitadas solicitações desarrazoadas ou não exigidas por
                            lei, tais como as impraticáveis, capazes de exigir um esforço técnico desproporcional ou
                            que possa expor a riscos operacionais, como fraudes.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O endereço de e-mail utilizado no momento do cadastro será utilizado para todas as
                            comunicações com o titular da conta no aplicativo. É recomendável que o e-mail padrão
                            da Intellectus (contact@intellectus.social) seja adicionado como um remetente
                            confiável, para evitar o bloqueio pelo anti-spam.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            7. COMO SEUS DADOS SÃO PROTEGIDOS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Os seus dados são armazenados em locais seguros e confiáveis, seja em sistemas
                            próprios, seja de fornecedores de serviços de gestão e armazenamento na nuvem, de
                            gestão de marketing, entre outros.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Entre as medidas de segurança adotadas, destacamos as seguintes:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Armazenamento de senhas utilizando hashes criptografados
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Restrições de acessos a bancos de dados
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Monitoramento de acesso físico a servidores
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Comitê de Segurança e Compliance
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Plano de Respostas a Incidentes de Segurança de Dados Pessoais
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Medidas de segurança, técnicas e administrativas são implantadas a fim de que
                            somente pessoas autorizadas possam acessar seus dados, bem como impedir acessos
                            desautorizados e tratamentos diversos das finalidades que são informadas neste
                            documento.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O acesso a dados sensíveis, caso coletados, são de acesso restrito a colaboradores
                            autorizados. Comprometida com o planejamento, execução e acompanhamento de
                            ações, com a análise crítica e a melhoria contínua no que diz respeito à segurança da
                            informação, a Intellectus utiliza como base os preceitos definidos na ABNT NBR ISO/IEC
                            27001, ABNT NBR ISO/IEC 27002 e ABNT NBR ISO/IEC 27701.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Uma política de segurança da informação é mantida com os controles necessários e
                            adequados à garantia de confidencialidade, integridade e disponibilidade das
                            informações sob controle da Intellectus, além de manter uma Política de Governança de
                            Dados com os controles necessários e adequados à garantia da privacidade e proteção
                            de dados pessoais sob o controle.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Ainda que adote tudo o que está ao seu alcance para evitar incidentes de segurança, é
                            possível que ocorra algum problema motivado exclusivamente por um terceiro – como
                            em caso de ataques de hackers ou crackers ou, ainda, em caso de culpa exclusiva do
                            usuário, que ocorre, por exemplo, quando ele mesmo transfere seus dados a terceiro.
                            Assim, embora a Intellectus seja, em geral, responsável pelos dados pessoais que trata,
                            exime-se de responsabilidade caso ocorra uma situação excepcional como essas, sobre
                            as quais não tem nenhum tipo de controle.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            De qualquer forma, caso ocorra qualquer tipo de incidente de segurança que possa
                            gerar risco ou dano relevante para qualquer um dos usuários, os afetados e a Autoridade
                            Nacional de Proteção de Dados serão comunicados acerca do ocorrido, em
                            conformidade com o disposto na Lei Geral de Proteção de Dados (LGPD).
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            8. ATUALIZAÇÕES
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A Intellectus reserva-se no direito de modificar esta Política de Privacidade, o aplicativo
                            e seus serviços a qualquer momento, a fim de atender alterações legislativas, exigências
                            de órgãos regulatórios, como também atender necessidades operacionais ou
                            administrativas, tais como adaptá-la à eventuais alterações feitas no aplicativo, seja pela
                            disponibilização de novas funcionalidades, seja pela eliminação ou modificação
                            daquelas já existentes, por exemplo.
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
                            Ao utilizar ou continuar acessando e usando os serviços do aplicativo, o usuário
                            concorda com as alterações realizadas e fica vinculado à nova versão da Política.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            A presente versão desta Política de Privacidade foi atualizada pela última vez em
                            05/06/2023. Em eventual caso de conflito entre documentos, os termos adicionais terão
                            prevalência no que disser respeito aos serviços específicos que regularem.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            9. TERMOS DE USO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A Intellectus é controladora de dados pessoais coletados no uso de seus serviços. Ao
                            utilizá-los, o usuário concorda com a coleta e uso de suas informações, considerando
                            também os Termos de Uso (em www.xxxxxxx).
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            10. CONTATO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Você pode ter acesso a informações sobre coleta, uso, armazenamento, tratamento e
                            proteção dos seus dados pessoais bem como solicitar alteração, remoção ou cópia dos
                            seus dados pessoais ou mesmo exercer quaisquer de seus direitos ou esclarecer
                            quaisquer dúvidas sobre esta Política, através de envio de mensagem para o e-mail
                            dpo@intellectus.social.
                        </RegularText>
                    </View>

                </ContentContainer>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};