import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { getStoreItem, setStoreObject } from "../Lib/asyncStorage";
import userToken from "../GlobalState/userToken.zustand";
import { axiosClientProfile_api } from "../Lib/Profile_api";
import { axiosClientStory_api } from "../Lib/Story_api";
import { axiosClientChat_api } from "../Lib/Chat_api";
import { axiosClientDrop_api } from "../Lib/Drop_api";
import { axiosClientpost_api } from "../Lib/Post_api";
import { axiosClientNotifications } from "../Lib/notifications_api";
import { axiosClientVisualizations } from "../Lib/Visualizations_api";
import { axiosClientMediaApi } from "../Lib/Media_api";
import { axiosUser_api } from "../Lib/User_api";
import { getUser } from "../Service/UserRegister";
import useUserProfile from "../GlobalState/userProfile.zustand";

interface IStorageProvider {
    children: React.ReactNode
}

interface IStorageContext {
    videoAudioMuted: boolean
    token: string
    setVideoAudioMuted: Dispatch<SetStateAction<boolean>>
}


const StorageContext = createContext({} as IStorageContext)

const StorageProvider = (props: IStorageProvider) => {
    const { setToken, token } = userToken()
    const [videoAudioMuted, setVideoAudioMuted] = useState(true)
    const { initializeProfile, setUser } = useUserProfile()

    useEffect(() => {
        (async () => {
            try {
                const tokenStorage = await getStoreItem("@intellectus:tokenUser")
                const token = tokenStorage?.split('"').join("")
                if (token) {
                    setToken(token)
                    axiosClientProfile_api.defaults.headers.common.Authorization = token
                    axiosClientStory_api.defaults.headers.common.Authorization = token
                    axiosClientChat_api.defaults.headers.common.Authorization = token
                    axiosClientDrop_api.defaults.headers.common.Authorization = token
                    axiosClientpost_api.defaults.headers.common.Authorization = token
                    axiosClientNotifications.defaults.headers.common.Authorization = token
                    axiosClientVisualizations.defaults.headers.common.Authorization = token
                    axiosClientMediaApi.defaults.headers.common.Authorization = token
                    axiosUser_api.defaults.headers.common.Authorization = token
                    getUser(token).then((response) => {
                        if (response.status === 200) {
                            setStoreObject("@intellectus:userProfile", response.data.profile)
                            initializeProfile()
                            setUser(response.data.profile)
                        }
                    })
                }
            } catch (error) {
                console.log('StorageContext - UseEffect Token')
                console.log('DEEEEEU RUIIIIM', error)
            }
        })()
    }, [token])

    return (
        <StorageContext.Provider value={{ token, videoAudioMuted, setVideoAudioMuted }}>
            {props.children}
        </StorageContext.Provider>
    )
}

function useStorage() {
    const context = useContext(StorageContext);

    if (!context) {
        throw new Error('useStorage must be used within a StorageProvider');
    }

    return context;
}

export { StorageProvider, useStorage }