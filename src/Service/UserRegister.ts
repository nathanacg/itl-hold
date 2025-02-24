import { axiosUser_api } from '../Lib/User_api'
import { axiosClientProfile_api } from '../Lib/Profile_api'
import { Profile, getUserResponse, ProfileUser } from '../Types/User'
import { getStoreItem, setStoreItem } from '../Lib/asyncStorage'
interface IUser {
    userName: string
    userEmail: string
    userPhone: string
    userBirthday: string
    userPassword: string
}

export const getUser = async (token: string) => {
    return await axiosUser_api.get<getUserResponse>('/user/get/profile', {
        headers: {
            Authorization: `${token}`
        }
    })
}

export const addToken = async (token: string, profile: ProfileUser) => {
    var tokens = await getStoreItem("@intellectus:multipleTokensUsers")
    var tokensValue: { profile: ProfileUser, token: string }[] = tokens !== null ? JSON.parse(tokens || '') : []
    tokensValue.push({ profile, token })
    setStoreItem("@intellectus:multipleTokensUsers", JSON.stringify(tokensValue))
}

export const registerUser = async (object: IUser) => {
    console.log(object)
    var res = await axiosUser_api.post('/user/register', object);
    await setStoreItem("@intellectus:tokenNewUser", res.data.token)
    await setStoreItem("@intellectus:tokenUser", res.data.token)
    return res
};

export const activateUser = async (active: number) => {
    var token = await getStoreItem("@intellectus:tokenNewUser")
    var res = await axiosClientProfile_api.put('/userActive', { userActive: active }, {
        headers: {
            Authorization: `${token}`,
            'Accept': 'application/json'
        }
    })
    return res
}

export const getActivationUser = async () => {
    var token = await getStoreItem("@intellectus:tokenUser")
    var res = await axiosClientProfile_api.get('/userActive', {
        headers: {
            Authorization: `${token}`,
        }
    })
    return res
}

export const registerProfile = async (object: Profile) => {
    var token = await getStoreItem("@intellectus:tokenNewUser")
    await setStoreItem("@intellectus:tokenUser", JSON.stringify(token))
    var res = await axiosUser_api.post('/user/add/profile', object, {
        headers: {
            Authorization: `${token}`,
            'Accept': 'application/json'
        }
    })
    return res
}

export const registerProfilePhoto = async (file: any) => {
    var token = await getStoreItem("@intellectus:tokenUser")
    var res = await axiosClientProfile_api.put("/editProfilePhoto", file, {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'multipart/form-data',
        }
    })
    return res
}