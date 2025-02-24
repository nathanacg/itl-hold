import { axiosItensManager_api } from '../Lib/ItensManager_api'
import { axiosClientMediaApi } from '../Lib/Media_api'
import { axiosClientProfile_api } from '../Lib/Profile_api'


export const newDestack = async (data: any) => {
    var res = await axiosItensManager_api.post(`/destack/createDestack`, data, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
    return res
}

export const getDestacks = async () => {
    var res = await axiosItensManager_api.get(`/destack/getAllDestacks`);
    return res
}

export const createHighlight = async (form: any) => {
    var res = await axiosClientMediaApi.post("/createHighlight", form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return res
}

export const getHighlightsUser = async () => {
    try {
        const response = await axiosClientProfile_api.get(`/getHighlightsUser`)
        return response
    } catch (error) {
        throw error;
    }
}

export const getHighlightOtherUser = async (userId: number) => {
    const response = await axiosClientProfile_api.get(`getHighlightsUser?userId=${userId}`)
    return response
}

export const deletehighlight = async (highlightId: number) => {
    var res = await axiosClientProfile_api.delete(`/highlight`, {
        data: { highlightId }
    })
    return res
}



export const getHighlight = async (destackId: number) => {
    const response = await axiosClientProfile_api.get(`/getHighlight/${destackId}`)
    return response
}

export const addDestackStory = async (destackId: number, postHexId: string) => {
    const response = await axiosClientProfile_api.post(`/storyHighlight`, { destackId, postHexId })
    return response.data;
}


export const storyHighlight = async (storyId: number, highlightId: number) => {
    const response = await axiosClientProfile_api.post(`/storyHighlight`, { storyId, highlightId })
    return response.data;
}

export const postHighlight = async (postId: number, highlightId: number) => {
    const response = await axiosClientProfile_api.post(`/postHighlight`, { postId, highlightId })
    return response;
}

export const delPostForDestack = async (postHighlightId: number) => {
    const response = await axiosClientProfile_api.delete(`/postHighlight`, {
        data: { postHighlightId },
    })
    console.log(response, ' -- ')
    return response
}

export const delStoryForDestack = async (storyHighlightId: number) => {
    const response = await axiosClientProfile_api.delete(`/storyHighlight`, {
        data: { storyHighlightId },
    })
    return response
}

export const updateHighlight = async (form: any) => {
    const res = await axiosClientMediaApi.put("/updateHighlight", form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return res;
};
