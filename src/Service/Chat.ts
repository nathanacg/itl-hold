import { Alert } from 'react-native'
import { axiosClientChat_api } from '../Lib/Chat_api'

export const chatPreview = async (userId: number, messageOwnerId: number) => {
     try {
          const response = await axiosClientChat_api.get(`/chatPreview/${userId}/${messageOwnerId}`, {
               headers: {
                    'Content-Type': 'application/json',
               }
          })
          return response
     } catch (error) {
          console.log(error, ' erro ao listar conversas do chat')
     }
}

export const sendReportMessage = (messageId: number) => {
     axiosClientChat_api.post(`/reportMessage/${messageId}`).then((res) => {
          console.log(res.data)
          // Alert.alert('Aviso', 'Mensagem denúnciada com sucesso!')
          return true
     }).catch((err) => {
          console.warn('sendReportMessage')
          // Alert.alert('Aviso', 'Mensagem já denúnciada!')
          console.log(err.response.data)
          return false
     })
}