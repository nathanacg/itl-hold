import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../Components/Header';

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import {
    ContentainerConfigurations
} from '../../Components/configurationsElemetsStyle';
import { RegularText, Title } from '../PrivacyPolicy/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const sendEmail = () => {
    Linking.openURL(`mailto:contato@intellectus.social`);
}

export default function TermsOfUse() {
    return (
        <SafeAreaViewContainer>
            <Header titleHeader='Termos de uso' />
            <ScrollView>
                <ContentainerConfigurations>
                    <View>
                        <Title>
                            TERMOS DE USO E CONDIÇÕES GERAIS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Estes Termos de Uso e Condições Gerais ("Termos") aplicam-se à utilização do
                            aplicativo Intellectus, mantido pela INTELECTUS Ltda ("Intellectus"), devidamente
                            registrada sob o CNPJ 43.751.398/0001-00 e com endereço de e-mail{' '}
                            <RegularText onPress={sendEmail}>
                                <Text style={{ color: 'blue' }}>contato@intellectus.social</Text>
                            </RegularText>.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O aceite a estes Termos ocorre no momento de cadastro no aplicativo. Assim, ao
                            acessar e utilizar os serviços do Intellectus, você concorda com as condições aqui
                            descritas, que estabelecem as relações entre você, como usuário do aplicativo, e a
                            Intellectus. Caso não concorde com estes Termos, não poderá acessar ou utilizar os
                            recursos, restritos a usuários cadastrados.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            1. ACESSO E USO DO APLICATIVO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Para acessar e usar o aplicativo Intellectus e seus recursos você precisa cadastrar-se
                            na plataforma e agir em conformidade com estes Termos.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Cadastro na plataforma
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            O cadastro do usuário deve ser feito na página inicial do aplicativo, incluindo as
                            informações cadastrais solicitadas.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Para que o cadastro seja concluído, o usuário deverá fornecer integralmente os dados
                            requeridos e todas as informações devem ser precisas, verdadeiras e atualizadas. Em
                            qualquer caso, o usuário poderá responder, em âmbito cível e criminal, pela veracidade,
                            exatidão e autenticidade dos dados informados.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Responsabilidades e deveres dos usuários sobre sua conta
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            É de exclusiva responsabilidade do usuário fornecer e garantir a veracidade e precisão
                            dos dados cadastrais.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O usuário é o único responsável pelas operações realizadas em sua conta e
                            compromete-se a comunicar imediatamente a Intellectus, através do envio de
                            mensagem para o e-mail contact@intellectus.social, caso suspeite da ocorrência de
                            quaisquer atividades suspeitas, inesperadas ou uso não autorizado em sua conta.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            É também de total responsabilidade do usuário a segurança do login e senha que serão
                            por ele utilizados para o acesso à conta no aplicativo, devendo zelar pelo sigilo destes
                            e não compartilhá-los- com terceiros
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O usuário deve definir senhas de alta segurança, utilizando caracteres maiúsculos e
                            minúsculos, números e símbolos.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, uma conta de
                            usuário, que é pessoal e intransferível.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O usuário tem a responsabilidade de garantir a segurança dos equipamentos eletrônicos
                            e sistemas que utilizar para acessar o site
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Escolha de preferências na conta
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Uma vez cadastrado, o usuário pode escolher suas preferências de conteúdo na página
                            inicial do aplicativo, selecionando seus assuntos de interesse.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            O usuário também possui a opção de convidar amigos para fazer parte do aplicativo.
                            Nesta operação, será necessário permitir o acesso à lista de contatos da agenda do seu
                            aparelho para sincronização.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Encerramento da conta
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O encerramento da sua conta, pode ser feito diretamente no aplicativo, em
                            configurações da, ao acessar menu – configurações – perfil – encerrar conta, cessando,
                            assim, seu acordo legal com a Intellectus, bem como o acesso aos dados inseridos e
                            utilizados, como também às atividades nele realizadas.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Seja em caso de pedido de cancelamento de cadastro, seja em caso de deleção por
                            descumprimento das normas aqui previstas ou outra situação, os dados pessoais do
                            usuário serão tratados em conformidade com a Política de Privacidade, sendo possível
                            que todos ou alguns dados sejam mantidos mesmo após a exclusão da conta,
                            independentemente do consentimento do titular dos dados pessoais.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Navegação e gestão do aplicativo
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A Intellectus compromete-se a utilizar todas as soluções técnicas disponíveis para que
                            possa ser acessada 24 horas por dia, todos os dias, entretanto, a qualquer momento, o
                            acesso ao aplicativo ou algumas de suas páginas ou recursos pode ser interrompido
                            temporariamente, limitado ou suspenso, a fim de realizar atualizações, modificações,
                            correções ou qualquer outra ação que sejam consideradas necessárias para garantir
                            seu bom funcionamento.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Esta situação também pode ocorrer em caso de ataque hacker ou caso fortuito e força
                            maior.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Quando a ferramenta ficar indisponível, entretanto, as informações não serão perdidas.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            2. COMO O APLICATIVO É FINANCIADO (GESTÃO DE ANUNCIOS /
                            PATROCINADOS)
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Nosso serviço de compartilhamento de conteúdo cultural é de uso gratuito.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Em vez de pagar pelo uso do serviço, você tem ciência de que nossa empresa e nossos
                            parceiros podem incluir anúncios em conteúdo de nossos serviços.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Podemos usar seus dados pessoais e informações sobre seus interesses para
                            apresentar a você anúncios que lhe sejam mais relevantes. Caso optemos por fazê-lo,
                            os anunciantes não poderão identificá-lo, pois seus dados não serão compartilhados,
                            ficando resguardada sua identidade.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Importante desde já que saiba que não comercializamos seus dados com terceiros.
                            Apenas podemos permitir que anunciantes informem o tipo de público que querem
                            atingir e, então, podemos dirigir o anúncio para os usuários que podem se interessar
                            pelo conteúdo.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            3. COMPROMISSOS E REGRAS DE CONDUTA
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A responsabilidade pelo uso dos serviços e todo o conteúdo que publicar ou
                            compartilhar é do usuário, devendo respeitar leis, regras e regulamentos aplicáveis, bem
                            como estes Termos.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Quem pode utilizar o aplicativo
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A rede social Intellectus só pode ser acessada por maiores de 14 anos de idade.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Em caso de cadastro ou envio de informações de pessoas com idade inferior à
                            estabelecida, os dados serão analisados para providências de bloqueio e/ou exclusão
                            da conta.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Caso o usuário tenha tido uma conta anterior e ela tenha sido desativada pela Intellectus
                            por questões de violação de lei ou dos Termos ou outra situação, o usuário não poderá
                            realizar novo cadastro.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Como utilizar o aplicativo
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O usuário deverá utilizar as funcionalidades do aplicativo para finalidades que não
                            contrariem a lei, a moral ou os bons costumes. Em específico, deverá se limitar a utilizá-las em conformidade com os objetivos para as quais foram desenvolvidas.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            As ações permitidas durante a utilização do aplicativo são:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Criar um perfil, divulgar conteúdos, comentários e fazer lives
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Compartilhar conteúdos, textos, links, fotos, vídeos, arquivos, áudios
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Ler, comentar, postar conteúdo de forma escrita/falada/imagem/foto ou vídeo, curtir
                            postagens, participar de grupos de conversas, salas de bate papo, acessar eventos
                            exclusivos - pagos ou não - criados por usuários
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            O que não pode ser feito
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            É importante que os usuários respeitem algumas diretrizes.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            As ações não permitidas durante o uso do aplicativo são:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Postar ou compartilhar conteúdo que não esteja relacionado ao segmento de
                            atuação do aplicativo, sendo textos, links, fotos, vídeos, arquivos, áudios
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Postar ou compartilhar conteúdo ou que contenha palavras de baixo calão, chulo,
                            impróprio, ofensivo, rude, obsceno, agressivo ou imoral sob o ponto de vista de
                            algumas religiões ou estilos de vida
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Postar ou compartilhar spam, nudez ou conteúdo explícito, conteúdo pornográfico,
                            símbolo ou discurso de ódio, violência ou organizações perigosas, bullying ou
                            assédio, violação de propriedade intelectual, golpe ou fraude, informação falsa
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Postar material falso, ilícito
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Postar material que contenha vírus ou códigos maliciosos que possam vir a danificar
                            equipamentos ou causar danos financeiros a outros usuários
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Fazer uso indevido de nossos serviços, utilizando meios automatizados ou outros
                            que não sejam o de interface direta como usuário, seguindo as instruções destes
                            Termos
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Investigar ou testar vulnerabilidades de nossos sistemas, bem como a fazer algo
                            que interfira neles, ou que prejudique o acesso dos demais usuários por quaisquer
                            meios
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Criar uma conta falsa, usar uma falsa identidade ou se passar por outra pessoa
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Fazer algo ilícito, enganoso ou mediante fraude, para fins ilegais ou não condizentes
                            com estes termos
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Vender, licenciar ou comprar contas ou dados de terceiros obtidos usando o
                            aplicativo
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Publicar informações privadas ou confidenciais de terceiros sem permissão
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Utilizar de crawlers, robôs ou quaisquer programas de computador, algoritmos,
                            equipamentos ou metodologias automatizadas para acessar, copiar, ler, monitorar,
                            navegar, preencher formulários ou publicar conteúdo
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Utilizar quaisquer meios ou ferramentas automatizadas ou manuais para acessar
                            qualquer conteúdo ou informação que não lhe tenha sido intencionalmente
                            disponibilizada pela Intellectus, incluindo as informações constantes de seções e as
                            que estejam armazenadas ou que trafeguem no âmbito da infraestrutura de
                            tecnologia da informação utilizada pelo aplicativo, que inclui equipamentos, redes e
                            servidores
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Violar ou testar as vulnerabilidades dos mecanismos de segurança do aplicativo ou
                            da infraestrutura de Tecnologia da Informação utilizada
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Utilizar quaisquer dos conteúdos ou das informações disponibilizadas na rede social
                            para fins de identificar outros usuários ou pessoas, a menos que o conteúdo ou
                            informação seja licitamente divulgado com este objetivo
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Sobrecarregar a infraestrutura de Tecnologia da Informação que mantém o
                            aplicativo com um número excessivo ou desarrazoado de requisições
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Esconder a identidade do usuário ou a origem de sua conexão, nem se passar por
                            outra pessoa. Neste sentido, além de outras condutas possíveis, o usuário não
                            poderá utilizar quaisquer ferramentas ou mecanismos para manipular ou mascarar
                            a origem de qualquer mensagem enviada à Intellectus ou à sua infraestrutura de
                            Tecnologia da Informação por meio da plataforma ou de qualquer de seus recursos
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            Sobre os conteúdos publicados
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A Intellectus não aprova, apoia, declararem assegura a exatidão, veracidade ou
                            confiabilidade dos conteúdos publicados no aplicativo. Também não endossa quaisquer
                            opiniões de usuários que sejam publicadas no aplicativo.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            O usuário tem ciência que, ao usar os serviços, pode ser exposto a conteúdo ofensivo,
                            inexato, inadequado ou, mesmo em determinados causos, indevido ou fraudulento.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Não é possível a Intellectus realizar o monitoramento de todo o conteúdo publicado, de
                            modo que não se responsabiliza pelas postagens dos usuários. Entretanto, o conteúdo
                            impróprio que o usuário identificar pode ser denunciado através do Canal de Denúncias.
                            Após a apuração, identificado compartilhamento de conteúdo impróprio por algum
                            usuário, a postagem será excluída.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            A distribuição de qualquer conteúdo publicado pode ser removida ou recusada, bem
                            como suspensa ou promovido o encerramento da conta de usuário, sem que a
                            Intellectus seja responsabilizada perante o usuário.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            4. CANAL DE DENÚNCIAS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Os usuários podem denunciar publicações que não estejam de acordo com os Termos.
                            Para acessar o Canal de Denúncias, basta clicar em “Denunciar”, na postagem que viola
                            as diretrizes, selecionar o motivo referente, sendo um dos que seguem abaixo, e a
                            Intellectus irá analisar a solicitação:
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Marcado como spam
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Nudez ou conteúdo explícito
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Símbolo ou discurso de ódio, violência ou organizações perigosas
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Bullying ou assédio
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Violação de propriedade intelectual
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Golpe ou fraude
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Informação falsa
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            5. RESPONSABILIDADES DA INTELLECTUS
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            A Intellectus é responsável pelos fatos ocorridos no aplicativo de acordo com os limites
                            estabelecidos pelos Termos de Uso e Política de Privacidade e pela legislação
                            vigente,como também por defeitos ou vícios eventualmente encontrados no programa
                            de computador que compõe o aplicativo e que tenham sido por ele causados, desde
                            que haja comprovação do dano. Defeitos ou problemas surgidos no âmbito ou em
                            decorrência dos sistemas ou equipamentos utilizados pelo usuário para acessar e
                            utilizar o aplicativo não serão de responsabilidade da Intellectus.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Não tem responsabilidade também pelas ações e condutas realizada por usuários, seja
                            no uso do sistema, seja off-line, tampouco pelas publicações ou compartilhamento de
                            informações que realizam ou por serviços que venham eventualmente a ser oferecidos
                            por terceiros no uso do aplicativo e eventuais danos decorrentes de caso fortuito, força
                            maior ou por aqueles que forem decorrentes das ações de terceiros.
                        </RegularText>
                    </View>
                    <View>
                        <Title>
                            6. REMOÇÃO DE CONTEÚDO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            Sem prejuízo das demais medidas legais cabíveis, a Intellectus pode, a qualquer
                            momento, advertir, suspender ou cancelar a conta do usuário ou qualquer conteúdo que
                            infrinja a legislação vigente, estes Termos seus deveres de usuário e, em especial, em
                            caso de violação de intimidade e privacidade de terceiros, direitos autorais, marcas
                            comerciais, bem como que caracterizem apropriação indébita de propriedade
                            intelectual, falsidade ideológica, atos fraudulentos, ilegais ou imorais, ofensa ou danos
                            a terceiros ou ao próprio aplicativo, assédio ou demais condutas ilegais.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Em caso de conteúdo que seja denunciado através do Canal de Denúncia, o conteúdo
                            será analisado em até 30 dias. Após esse prazo, em caso de exclusão da publicação ou
                            comentário, a decisão será comunicada, via e-mail, para o usuário que violou as regras
                            deste Termo.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Quando um conteúdo for excluído, ele pode não ser eliminado imediatamente ou
                            definitivamente do sistema, caso:
                        </RegularText>
                    </View>

                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Ocorram limitações técnicas de sistema
                        </RegularText>
                    </View>
                    <View style={{ marginTop: 3, flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome
                            name="circle"
                            color={'#8A8A8A'}
                            size={8}
                        />
                        <RegularText style={{ marginTop: 4, marginLeft: 6 }}>
                            Limitar a capacidade de:
                        </RegularText>
                    </View>

                    <View>
                        <Text style={{ color: '#8A8A8A', fontSize: 13, marginLeft: 30, marginTop: -20 }}>
                            a) investigar ilegalidades ou violações destes Termos {'\n'}
                            b) garantir proteção de usuários e sistema {'\n'}
                            c) preservar provas, em especial para o exercício regular do direito {'\n'}
                            d) cumprir obrigações legais ou regulatórias {'\n'}
                            e) atender ordens judiciais ou administrativas {'\n'}
                        </Text>
                    </View>

                    <View>
                        <Title>
                            7. DIREITOS SOBRE CONTEÚDO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O acesso e uso do aplicativo não gera para o usuário qualquer direito de propriedade
                            intelectual relativo aos elementos constantes.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Ao publicar conteúdos de sua autoria, o usuário mantém seus direitos e propriedade
                            sobre ele e sobre o que postou, contudo, concede licença para utilização na rede social
                            Intellectus.
                        </RegularText>
                    </View>

                    <View>
                        <RegularText>
                            Quando envia, publica ou exibe conteúdos no aplicativo Intellectus, o usuário concede
                            licença mundial a título gratuito, não exclusivo, para uso, cópia, reprodução,
                            processamento, adaptação, modificação, publicação, divulgação, transmissão, exibição
                            e distribuição desse conteúdo em qualquer meio de comunicação ou método de
                            distribuição existente ou que venha a ser criado, incluído direito de curadoria,
                            transformação e tradução do conteúdo. A licença concedida autoriza que o conteúdo
                            publicado seja disponibilizado para o mundo todo, permitindo que os demais usuários
                            façam o mesmo.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            O usuário concorda que a licença concedida permite também o compartilhamento e do
                            conteúdo publicado para outras organizações ou pessoas parceiras para fins de
                            distribuição, transmissão, divulgação ou publicação em quaisquer mídias e serviços.
                            Este uso adicional pode ser feito sem que seja devida qualquer remuneração ao usuário
                            ou notificação sobre a atividade.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            8. COMUNICAÇÃO COM OS USUÁRIOS
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O usuário deverá fornecer um endereço de e-mail válido, pois todos os contatos serão
                            realizados e todas as comunicações serão enviadas para o referido endereço e serão
                            consideradas lidas pelo usuário, que se compromete a consultar regularmente as
                            mensagens recebidas e respondê-las, se necessário, em prazo razoável.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Ao enviar mensagens eletrônicas, seja por celular ou e-mail, o usuário tem ciência que
                            a Intellectus pode enviar e-mail e mensagens de texto com informações sobre serviços
                            e/ou enviar materiais promocionais, entre outros.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Caso receba algum e-mail em nome da Intellectus e suspeite de fraude, orienta-se que
                            o usuário não abra os arquivos anexos ou clique em qualquer link ou botão, sem antes
                            enviar uma mensagem para contact@intellectus.social e certificar-se da origem da
                            comunicação recebida e para que sejam tomadas as possíveis medidas no combate ao
                            crime eletrônico.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Phishing é uma técnica de engenharia social usada para enganar usuários e obter
                            informações confidenciais, tais como nome de usuário, senha e detalhes do cartão de
                            crédito. Para cometer as fraudes eletrônicas, os criminosos utilizam mensagens
                            aparentemente reais.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            9. PROPRIEDADE INTELECTUAL
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O aplicativo Intellectus, seus programas e serviços são protegidos por direitos autorais
                            e de marca, não sendo concedido ao usuário e nem a terceiros, o uso de seu nome, ou
                            quaisquer marcas, logotipos, domínios de Internet ou outros direitos de propriedade,
                            como código-fonte.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Os programas e o conteúdo do aplicativo que forem protegidos por direitos autorais não
                            poderão ser, integral ou parcialmente, copiados, reproduzidos, representados,
                            adaptados ou de qualquer forma alterados, por qualquer meio e para qualquer
                            finalidade, sem autorização prévia, expressa e por escrito. Em caso de violações a
                            nossos direitos de propriedade intelectual, a Intellectus resguarda-se no direito de adotar
                            todas as providências judiciais e extrajudiciais cabíveis.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            10. FUNCIONAMENTO DO APLICATIVO
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            O sistema pode, em determinas ocasiões apresentar indisponibilidades, como em casos
                            de atualizações de sistema ou manutenções programadas.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Como em qualquer serviço oferecido na internet, há possibilidade de riscos de natureza
                            cibernética. A Intellectus não se responsabiliza por vícios ou problemas técnicos e/ou
                            operacionais cuja origem seja o sistema de informação do usuário ou de terceiros.
                            Também não se responsabiliza por falhas da conexão de internet ou do provedor do
                            usuário, ou decorrente de condutas de terceiros, caso fortuito ou força maior, como
                            também não é responsável por qualquer vírus, trojan, malware, spyware ou qualquer
                            software que possa danificar, alterar as configurações ou infiltrar o equipamento do
                            usuário em decorrência do acesso, da utilização ou da navegação na internet.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            11. POLÍTICA DE PRIVACIDADE
                        </Title>
                    </View>

                    <View>
                        <RegularText>
                            A Intellectus é controladora de dados pessoais coletados no uso de seus serviços. Ao
                            utilizá-los, o usuário concorda com a coleta e uso de suas informações, nos termos da
                            Política de Privacidade (em www.xxxxxxx).
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            12. DISPOSIÇÕES FINAIS
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Caso algum disposto deste Termo seja declarado nulo por questões judiciais, os demais
                            permanecem válidos.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Não é permitido ao usuário transferir direitos ou obrigações deste Termo a terceiros. Os
                            direitos e obrigações podem ser cedidos a terceiros pela Intellectus, em especial em
                            caso de alteração de propriedade da empresa.
                        </RegularText>
                    </View>
                    <View>
                        <RegularText>
                            Aplica-se a estes Termos de Uso a legislação da República Federativa do Brasil, sendo
                            eleito o Foro da Comarca de Balneário Camboriú/SC para dirimir quaisquer
                            controvérsias que possam surgir.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            13. CONTATO
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            Em caso de dúvidas, sugestões ou problemas com a utilização do aplicativo, o usuário
                            poderá enviar mensagem para o e-mail contact@intellectus.social.
                        </RegularText>
                    </View>

                    <View>
                        <Title>
                            14. DAS ATUALIZAÇÕES
                        </Title>
                    </View>
                    <View>
                        <RegularText>
                            A Intellectus reserva-se no direito de modificar este Termo, o aplicativo e seus serviços
                            a qualquer momento, a fim de atender alterações legislativas, exigências de órgãos
                            regulatórios, como também atender necessidades operacionais ou administrativas, tais
                            como adaptá-la à eventuais alterações feitas no aplicativo, seja pela disponibilização de
                            novas funcionalidades, seja pela eliminação ou modificação daquelas já existentes, por
                            exemplo.
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
                            A presente versão deste Termos de Uso e Condições Gerais foi atualizada pela última
                            vez em 05/06/2023. Em eventual caso de conflito entre documentos, os termos
                            adicionais terão prevalência no que disser respeito aos serviços específicos que
                            regularem.
                        </RegularText>
                    </View>
                </ContentainerConfigurations>
            </ScrollView>
        </SafeAreaViewContainer>
    );
};
