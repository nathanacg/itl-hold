import { axiosClientProfile_api } from '../Lib/Profile_api'
import { axiosClientMediaApi } from '../Lib/Media_api'
import { axiosClientpost_api } from '../Lib/Post_api'
import { getStoreItem } from '../Lib/asyncStorage'
import { axiosUser_api } from '../Lib/User_api'

import { ProfileUser } from '../Types/User'

interface profile {
    userName: string
    userEmail: string
    userPhone: string
    userNickname: string
    userBio: string
    userBirthday: string
    site: string
    gender: string
    showAlternativeContact: number
    alternativeMail: string
    alternativePhone: string
}

interface personalInformation {
    userEmail: string
    userPhone: string
    userBirthday: string
    gender: string
}

export interface bodyArquiveItems {
    idreels: number
    userId: number
}

export const getProfile = async () => {
    var res = await axiosClientProfile_api.get('/profile');
    return res
}

export const getProfileOuther = async (userId: number) => {
    let res = await axiosClientProfile_api.get(`/profile?userId=${userId}`);
    return res
}

export const getProfiles = async () => {
    var tokens = await getStoreItem("@intellectus:multipleTokensUsers")
    var tokensValue: { token: string, profile: ProfileUser }[] = tokens !== null ? JSON.parse(tokens || '') : []
    return tokensValue
}

export const getProfilesComment = async (page: number, limit: number, search: string) => {
    var res = await axiosClientProfile_api.get(`/search?page=${page}&limit=${limit}&search=${search}`);
    return res
}

export const getPostProfile = async (userId: number) => {
    try {
        var response = await axiosClientpost_api.get(`/post/listPostsUser/${userId}`)
        return response
    } catch (e) {
        console.log("Error no profile: ", e)
    }
}

export const updateProfile = async (profile: profile) => {
    try {
        var res = await axiosClientProfile_api.put(`/editProfile`, profile);
        return res
    } catch (e) {
        console.log('Error in editProfile: ', e)
    }
}

export const updatePersonalInformation = async (profile: personalInformation) => {
    var res = await axiosClientProfile_api.put(`/editAccountPersonalInformations`, profile);
    return res
}


export const getOtherProfile = async (userNickname: string) => {
    var res = await axiosClientProfile_api.get(`/profile/${userNickname}`);
    return res
}


export const getAllProfiles = async (userNickname: string) => {
    var res = await axiosClientProfile_api.get(`/search?page=1&limit=20&search=${userNickname}`)
    return res
}

export const isUserFollowingMe = async (otherUserId: number) => {
    var res = await axiosClientProfile_api.get(`/userIsFollowingMe/${otherUserId}`);
    return res
}

export const postFollowingProfile = async (followerId: number) => {
    var res = await axiosClientProfile_api.post(`/follower`, { followerId });
    return res
}

export const listRequestFollowers = async () => {
    var res = await axiosClientProfile_api.get(`/listRequestFollow`);
    return res
}


export const listMyRequestFollowers = async () => {
    var res = await axiosClientProfile_api.get(`/listMyRequestFollow`);
    return res
}

export const postReqFollowingProfile = async (followerId: number) => {
    var res = await axiosClientProfile_api.post(`/follower`, { followerId });
    return res
}

export const delReqFollowingProfile = async (followerId: number) => {
    var res = await axiosClientProfile_api.delete(`/unfollower`, {
        data: { followerId }
    });
    return res
}

export const deltFollowingProfile = async (followerId: number) => {
    var res = await axiosClientProfile_api.delete(`/unfollower`, {
        data: { followerId }
    });
    return res
}

export const deltAccount = async () => {
    try {
        var res = await axiosUser_api.delete(`/user/deleteAccount`);
        return res;
    } catch (error) {
        console.log("Error deleting account: ", error)
        throw error
    }
}

export const disabledAccount = async (disabled: number) => {
    try {
        var res = await axiosUser_api.post(`/user/disabledAccount`, {
            disabled
        })
        return res
    } catch (error) {
        console.log("Error when disabling account: ", error)
        throw error
    }
}

export const findProfiles = async (username: string) => {
    var res = await axiosClientProfile_api.get(`/findUsersProfiles/${username}`);
    return res;
}

export const findFriends = async (username: string) => {
    if(username.length === 0) {
        var res = await axiosClientProfile_api.get(`/findFriends/''`)
        return res
    } else {
        var res = await axiosClientProfile_api.get(`/findFriends/${username ? username : ' '}`);
        return res;
    }

}

export const searchUsers = async (username: string) => {
    var res = await axiosClientProfile_api.get(`/search?search=${username}`);
    return res;
}

export const sendContact = async (form: any) => {
    try {
        const res = await axiosClientMediaApi.post('/help/', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.log('Erro ao enviar contato:', error)
        throw error
    }
}

export const getPreferencesProfile = async (userId: number) => {
    try {
        var res = await axiosClientProfile_api.get(`/searchProfilePreference/${userId}`);
        return res
    } catch (error) {
        console.log('Error to get Preferences', error, userId)
    }
}

export const updatePreferencesProfile = async (userId: number, updatedPreferences: {}) => {
    try {
        var res = await axiosClientProfile_api.put(`/updateProfilePreference/${userId}`, updatedPreferences)
        return res
    } catch (error) {
        console.log('Erro ao atualizar as preferências erro BACK', error)
    }
}

export const setPreferencesProfile = async (setPreferences: {}) => {
    var res = await axiosClientProfile_api.post(`/setProfilePreference/`, setPreferences);
    return res
}

export const addClosedFriend = async (userId: number) => {
    try {
        var res = await axiosClientProfile_api.post(`/addClosedFriend/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        console.log('Error to post closedFriend', error, userId)
    }
}

export const removeClosedFriend = async (userId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removeClosedFriend/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getClosedFriend = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/searchClosedFriend/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data
    } catch (error) {
        console.log('Erro ao obter perfis', error)
        throw error
    }
}

export const updatePrivacyAccount = async (param: number) => {
    try {
        var res = await axiosClientProfile_api.put(`/updatePrivateAccount/${param}`, {});
        return res
    } catch (error) {
        console.log('Error to UpdatePrivacy: ', error)
    }
}

export const getPrivacyAccount = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getPrivateAccount/${userId}`);
        return response
    } catch (error) {
        console.log('Error to get Privacy', error)
    }
}

export const savePostItem = async (userId: number, idFolders: number, postId: number | undefined) => {
    try {
        const response = await axiosClientProfile_api.post(`/saveitens/post`, { userId, idFolders, postId });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.warn('savePostItem')
        console.log(error)
    }
}

export const unsavePostItem = async (userId: number, idFolders: number, postId: number | undefined) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removesaveditens/post`, {
            data: { userId, idFolders, postId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res
    } catch (error) {
        console.warn('unsavePostItem')
        console.log(error)
        throw error
    }
}

export const saveDrops = async (userId: number, idFolders: number, postHexId: string | undefined) => {
    try {
        const response = await axiosClientProfile_api.post(`/saveitens/reels`, { userId, idFolders, postHexId });
        return response.data;
    } catch (error) {
        console.log('Error to inside the Items: ', error)
        throw error
    }
}

export const unsaveDrops = async (userId: number, idFolders: number, postHexId: string | undefined) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removesaveditens/reels`, {
            data: { userId, idFolders, postHexId },
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}


export const getSavedPost = async (idFolders: number, userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getsaveditens/post/${idFolders}/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const getSavedDrops = async (idFolders: number, userId: number) => {
    try {
        const token = await getStoreItem("@intellectus:tokenUser");
        const response = await axiosClientProfile_api.get(`/getsaveditens/reels/${idFolders}/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const delSavePost = async (userId: number, idFolders: number, postId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removesaveditens/post`, {
            data: { userId, idFolders, postId },
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const delSaveDrops = async (userId: number, idFolders: number, postHexId: string) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removesaveditens/reels`, {
            data: { userId, idFolders, postHexId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const archiveItens = async (postId: number, userId: number) => {
    try {
        const res = await axiosClientProfile_api.post(`/archiveitens/post`, { userId, postId }, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.data
    } catch (error) {
        console.log('Error to inside the Ids: ', error)
        throw error
    }
}

export const archiveStory = async (postHexId: string, userId: number) => {
    try {
        const res = await axiosClientProfile_api.post(`/archiveitens/story`, { userId, postHexId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return res.data
    } catch (error) {
        console.log('Error to inside the Ids: ', error)
        throw error
    }
}

export const saveGender = async (gender: string) => {
    try {
        const res = await axiosClientProfile_api.post(`/UserGender`, { gender });
        return res
    } catch (error) {
        console.log('Error to up gender: ', error)
        throw error
    }
}

export const getGender = async () => {
    try {
        const res = await axiosClientProfile_api.get(`/UserGender`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.data
    } catch (error) {
        console.log('Error to get gender: ', error)
        throw error
    }
}



export const archiveReels = async (userId: number, postHexId: string) => {
    try {
        const res = await axiosClientProfile_api.post(`/archiveitens/reels`, { userId, postHexId }, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.data
    } catch (error) {
        console.log('Error to inside the Ids: ', error)
        throw error
    }
}


export const unArquiveItems = async (postId: number, userId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removearchiveditens/post`, {
            data: { postId, userId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const unArquiveDropsItems = async (userId: number, postHexId: string) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removearchiveditens/reels`, {
            data: { userId, postHexId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const unArquiveStoryItems = async (postHexId: string, userId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/removearchiveditens/story`, {
            data: { userId, postHexId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getArquiveItemsGeneral = async (foldersName: string, userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getfoldercontent/${foldersName}/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const getArquivePost = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getarchiveditens/post/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const getArquiveDrops = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getarchiveditens/reels/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const getArquiveStorys = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getarchiveditens/story/${userId}`);
        return response;
    } catch (error) {
        console.log('Erro ao obter posts arquivados', error)
        throw error
    }
}

export const createFolder = async (form: any) => {
    const res = await axiosClientMediaApi.post('/createfolder', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    console.log('CreateFolder -------')
    console.log(res.data)
    return res

}

export const updateFolder = async (idFolders: number, foldersName: string, file: { uri: string, fileName: string, mime: string }) => {
    const formData = new FormData();
    file && formData.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.mime,
    })
    formData.append('idFolders', idFolders)
    formData.append('foldersName', foldersName)

    try {
        const res = await axiosClientMediaApi.post('/updatefolder', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log('alterou a capa', res.data)
        return res
    } catch (error) {
        console.log('Error inside the informations folder: ', error)
        throw error
    }
}

export const deleteFolder = async (idFolders: number) => {
    try {
        var res = await axiosClientMediaApi.delete(`/deletefolder`, {
            data: { idFolders },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getUserFolders = async (userId: number) => {
    try {
        const response = await axiosClientMediaApi.get(`/getfolder/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching user folders:', error)
        throw error
    }
}

export const blockUser = async (userId: number, blockedUserId: number) => {
    try {
        const response = await axiosClientProfile_api.post(`/blockuser`, { userId, blockedUserId });
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Erro ao bloquear usuário. Status: ' + response.status)
        }
    } catch (error) {
        console.log('Error to block user!!')
        throw error
    }
}

export const unBlockUser = async (userId: number, unblockedUserId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/unblockusers/`, {
            data: { userId, unblockedUserId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getBlockUsers = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/returnblockedusers/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching user folders:', error)
        throw error
    }
}

export const addSilentPerson = async (userId: number, silentUserId: number, publication: any, story: any) => {
    try {
        const response = await axiosClientProfile_api.post(`/silentcomments`, { userId, silentUserId, publication, story });
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Erro ao silenciar usuário. Status: ' + response.status)
        }
    } catch (error) {
        console.log('Error to silence user', error)
        throw error
    }
}


export const deleteSilentPerson = async (userId: number, unsilentUserId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/unsilentcomments`, {
            data: { userId, unsilentUserId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getSilentPerson = async () => {
    try {
        const response = await axiosClientProfile_api.get(`/returnsilentusers`);
        return response
    } catch (error) {
        console.log('Error fetching user folders:', error)
        throw error
    }
}

export const addBlockComments = async (followerId: number) => {
    try {
        const response = await axiosClientProfile_api.post(`/blockUserComments`, { followerId });
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error('Error: ' + response.status)
        }
    } catch (error) {
        console.log('Error to silence user', error)
        throw error
    }
}

export const deleteBlockComments = async (followerId: number) => {
    try {
        var res = await axiosClientProfile_api.delete(`/unblockUserCommentsController/`, {
            data: { followerId },
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return res.status
    } catch (error) {
        console.log("Error to deleting: ", error)
        throw error
    }
}

export const getBlockComments = async () => {
    try {
        const response = await axiosClientProfile_api.get(`/listBlockUsersComments`);
        return response
    } catch (error) {
        console.log('Error fetching user folders:', error)
        throw error
    }
}

export const showLikesFunc = async (showLikes: number | boolean) => {
    try {
        const response = await axiosClientProfile_api.post(`/setShowLikes`, { showLikes });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const showVizualizationsFunc = async (showVisualizations: number | boolean) => {
    try {
        const response = await axiosClientProfile_api.post(`/setShowVisualizations`, { showVisualizations });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getStatusShowLikes = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/statusShowLikes/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching showLikes:', error)
        throw error
    }
}

export const getStatusShowVizualizations = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/statusShowVisualizations/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching showVizualizations:', error)
        throw error
    }
}

export const showAllowMarcations = async (allowMarcations: number) => {
    try {
        const response = await axiosClientProfile_api.post(`/setAllowMarcations`, { allowMarcations });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getStatusAllMarcations = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/statusAllowMarcations/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching showVizualizations:', error)
        throw error
    }
}

export const showManualApproval = async (manualApproval: number | boolean) => {
    try {
        const response = await axiosClientProfile_api.post(`/setManualApproval`, { manualApproval });
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getStatusManualApproval = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/statusManualApproval/${userId}`)
        return response
    } catch (error) {
        console.log('Error fetching manual approval:', error)
        throw error
    }
}

export const getListMarcations = async (userId: number) => {
    try {
        const response = await axiosClientpost_api.get(`/post/listPendingMarcations/${userId}`)
        return response
    } catch (error) {
        console.log('Error fetching pending marcations:', error)
        throw error
    }
}

export const getAllInMarcations = async (userId: number) => {
    try {
        const response = await axiosClientProfile_api.get(`/getInMarcations/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching getInMarcations:', error)
        throw error
    }
}

export const saveAllowResponses = async (allowResponses: number) => {
    try {
        const response = await axiosClientProfile_api.post(`/setAllowResponses`, { allowResponses });
        console.log('saveAllowResponses')
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getAllowResponses = async (userId: any) => {
    try {
        const response = await axiosClientProfile_api.get(`/statusAllowResponses/${userId}`);
        return response
    } catch (error) {
        console.log('Error fetching showVizualizations:', error)
        throw error
    }
}

export const getVerfication = async (userId: number) => {
    try {
        const res = await axiosClientProfile_api.get(`/returnVerifyiedAccounts/${userId}`);
        return res;
    } catch (error) {
        console.log('Erro ao visualizar verificação de perfil:', error)
        throw error
    }
}

export const getActualPass = async (userPass: string) => {
    try {
        const response = await axiosClientProfile_api.post(`/setAllowResponses`, { userPass })
        return response.data
    } catch (error) {
        throw error
    }
}

export const setNotificationsFromUser = async (notifications: boolean) => {
    var res = await axiosUser_api.put(`/user/setNotifications`, {
        notifications
    })
    return res
}

export const setSeeSpoiler = async (enable: boolean) => {
    var res = await axiosClientProfile_api.put('/editProfile', {
        allow_spoiler: enable
    })
    return res
}