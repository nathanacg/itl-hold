import { axiosUser_api } from '../Lib/User_api'

export const login = async (credential: string, password: string) => {
    return await axiosUser_api.post('/user/login', {
        userCredential: credential,
        userPassword: password
    });
}

export const updatePassword = async (email: string, password: string) => {
    var res = await axiosUser_api.post('/user/change/password', {
        userEmail: email,
        userPassword: password
    })
    return res
}

export const LoginWhitGoogle = async (token: string) => {
    var res = await axiosUser_api.post('/user/loginGoogle', {
        googleToken: token
    })
    return res
}

export const LoginWithApple = async (token: string) => {
    var res = await axiosUser_api.post('/user/loginApple', {
        appleToken: token
    })
    return res
}

export const getLoginLog = async (userId: number) => {

    var res = await axiosUser_api.get(`/user/loginlog/${userId}`)
    return res
}
export interface ResquestLogActive {
    userId: number,
    os: 'ANDROID' | 'IOS',
    latitude: number,
    longitude: number,
    device: string
}
export const postLoginLog = async (data: ResquestLogActive) => {
    var res = await axiosUser_api.post(`/user/logLogin`, {
        ...data
    })
    return res
}

export const verificationAccount = async (form: any) => {
    try {
        const res = await axiosUser_api.post('/user/verificationProfile', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: form
        })
        return res
    } catch (error) {
        console.log('Erro ao enviar requisição de verificação de perfil:', error)
        throw error
    }
}