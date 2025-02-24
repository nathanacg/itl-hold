import { axiosUser_api } from '../Lib/User_api'

export const sendEmailValidation = async (emailAdress: string) => {
    var res = await axiosUser_api.post('/user/send/email', {
        userEmail: emailAdress
    })
    return res
}

export const verifyCodeEmail = async (emailAdress: string, code: string) => {
    const res = await axiosUser_api.post('/user/verify/email', {
        userEmail: emailAdress,
        code
    })
    return res
}

export const sendPhoneValidation = async (phoneNumber: string) => {
    const res = await axiosUser_api.post('/user/send/phone', {
        userPhone: phoneNumber
    })
    return res
}

export const verifyCodePhone = async (phoneNumber: string, code: string) => {
    var res = await axiosUser_api.post('/user/verify/phone', {
        userPhone: phoneNumber,
        code
    })
    return res
}