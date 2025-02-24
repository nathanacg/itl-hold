import { axiosClientProfile_api } from "../Lib/Profile_api"

export const getFollowers = async (userId: number) => {
    var res = await axiosClientProfile_api.get(`/searchFollowers/${userId}`)
    return res
}

export const getFollowing = async (userId: number) => {
    var res = await axiosClientProfile_api.get(`/searchFollowings/${userId}`)
    return res
}

export const getNonFollowing = async (userId: number) => {
    var res = await axiosClientProfile_api.get(`/searchNonFollowers/${userId}`)
    return res
}

export const getRequestFollowers = async () => {
    var res = await axiosClientProfile_api.get(`/searchFollowRequests/`)
    return res
}

export const getRequestFollowStatus = async (followerId: number) => {
    var res = await axiosClientProfile_api.get(`/statusFollowRequest/${followerId}`)
    return res
}



export const acceptFriend = async (accept: number, userRequestId: number) => {
    var res = await axiosClientProfile_api.post(`/actionFollowRequest/`, { accept, userRequestId })
    console.log(res.data)
    return res
}


export const getSameFollowers = async (userId: number, otherUserId: number) => {
    var res = await axiosClientProfile_api.get(`/searchCommonFollowers/${userId}/${otherUserId}`)
    return res
}

export const getUsersAbleMarcations = async () => {
    var res = await axiosClientProfile_api.get('/folloewrsAbleToMarcations')
    return res
}

export const getUsersToMarcation = async () => {
    var res = await axiosClientProfile_api.get(`/folloewrsAbleToMarcations`)
    return res
}

export const handleRequestNotification = async (accept: number, notificationId: number) => {
    var res = await axiosClientProfile_api.post(`/resetNotification`, {
        accept,
        notificationId
    })
    return res
}