import { axiosClientProfile_api } from '../Lib/Profile_api';
import { axiosClientStory_api } from '../Lib/Story_api';
import { ReportPost } from '../Types/postProps';

export const newStory = async (storyItens: any) => {
  var res = await axiosClientStory_api.post('/createStorie', storyItens, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const NewPostStorie = async (storyItens: any) => {
  var res = await axiosClientStory_api.post(
    '/createNewPostStoryWhithColor',
    storyItens,
  );
  return res;
};

export const getUserStory = async () => {
  var res = await axiosClientStory_api.get('/getAllStoriesUser');
  return res;
};

export const getStoryFollowingUsers = async () => {
  var res = await axiosClientStory_api.get('/getStoriesFollowingUsers');
  return res;
};

export const getUserStories = async (id: number) => {
  var res = await axiosClientStory_api.get(`/getAllStoriesSelectedUser/${id}`);
  return res;
};

export const deleteStorie = async (postHexId: string) => {
  return axiosClientStory_api.delete(`/deleteStorie/${postHexId}`);
};

export const sendMessageStory = async (postHexId: string, comment: string) => {
  const response = await axiosClientStory_api.post('/commentStorie/', {
    postHexId,
    comment,
  });
  return response;
};

//=======Profile======//

export const saveStoryInGalery = async (saveStoryGallery: number | boolean) => {
  try {
    const response = await axiosClientProfile_api.post('/setSaveStoryGallery', {
      saveStoryGallery,
    });
    console.log('saveStoryInGalery');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStatusResponseGalery = async (userId: any) => {
  try {
    const response = await axiosClientProfile_api.get(
      `/statusSaveStoryGallery/${userId}`,
    );
    return response;
  } catch (error) {
    console.log('Error fetching showVizualizations:', error);
    throw error;
  }
};

export const saveStoryArchiveFunction = async (
  saveStoryArchive: number | boolean,
) => {
  try {
    const response = await axiosClientProfile_api.post('/setSaveStoryArchive', {
      saveStoryArchive,
    });
    console.log('saveStoryArchiveFunction');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStatusArquive = async (userId: any) => {
  try {
    const response = await axiosClientProfile_api.get(
      `/statusSaveStoryArchive/${userId}`,
    );
    return response;
  } catch (error) {
    console.log('Error fetching showVizualizations:', error);
    throw error;
  }
};

export const getStatusReshare = async (userId: any) => {
  try {
    const response = await axiosClientProfile_api.get(
      `/statusStoryReshare/${userId}`,
    );
    return response;
  } catch (error) {
    console.log('Error fetching showVizualizations:', error);
    throw error;
  }
};

export const getStatusShare = async (userId: any) => {
  try {
    const response = await axiosClientProfile_api.get(
      `/statusStoryShare/${userId}`,
    );
    return response;
  } catch (error) {
    console.log('Error fetching showVizualizations:', error);
    throw error;
  }
};

export const saveStoryReshare = async (storyReshare: number | boolean) => {
  try {
    const response = await axiosClientProfile_api.post('/setStoryReshare', {
      storyReshare,
    });
    console.log('saveStoryReshare');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveStoryShare = async (storyShare: number | boolean) => {
  try {
    const response = await axiosClientProfile_api.post('/setStoryShare', {
      storyShare,
    });
    console.log('saveStoryShare');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReturnDaniedAcess = async (userId: number) => {
  try {
    const response = await axiosClientProfile_api.get(
      `/returnStoryDeniedAcess/${userId}`,
    );
    return response;
  } catch (error) {
    console.warn('getReturnDaniedAcess - Story Services');
    console.log(error);
    throw error;
  }
};

export const saveDanyStoryAcess = async (blockedUserId: number) => {
  try {
    const response = await axiosClientProfile_api.post('/denyStoryAcess', {
      blockedUserId,
    });
    console.log('saveDanyStoryAcess');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDanyStoryAcess = async (unblockedUserId: number) => {
  try {
    var res = await axiosClientProfile_api.delete('/undenyStoryAcess', {
      data: { unblockedUserId },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status;
  } catch (error) {
    console.log('Error to deleting: ', error);
    throw error;
  }
};

export const reportStory = async (postHexId: string, reason: string) => {
  try {
    var response = await axiosClientStory_api.post<ReportPost>(
      '/reportStorie',
      {
        postHexId,
        reason,
      },
    );
    return response;
  } catch (error) {
    console.log('deu ruim ao denunciar o cartaz.', error);
  }
};

export const hideStoryPerson = async (userId: number) => {
  try {
    var response = await axiosClientStory_api.post('/hideFollowingStorie', {
      hideUserIdStorys: userId,
    });
    return response;
  } catch (error) {
    console.log('Deu ruim ao ocultar o cartaz dessa pessoa.', error);
  }
};

export const gethiddenStoryPerson = async () => {
  try {
    var response = await axiosClientStory_api.get('/hiddenFollowingStorie');
    return response;
  } catch (error) {
    console.log('Deu ruim ao ocultar o cartaz dessa pessoa.', error);
  }
};

export const unhideStoryPerson = async (userId: number) => {
  try {
    var response = await axiosClientStory_api.post('/unhideFollowingStorie', {
      unhideUserIdStorys: userId,
    });
    return response;
  } catch (error) {
    console.log('deu ruim ao desocultar o cartaz dessa pessoa.', error);
  }
};

export const ableToReact = async (userIdStory: number) => {
  try {
    var response = await axiosClientProfile_api.get(
      `/showResponseInput/${userIdStory}`,
    );
    return response;
  } catch (error) {
    console.log('deu ruim ao desocultar o cartaz dessa pessoa.', error);
  }
};
