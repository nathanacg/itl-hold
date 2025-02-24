import { booksApiRequisition_api } from '../Lib/booksAPI';
import { getUniqueItems } from '../Utils/publication.utils';

export const getVolumeBook = async (bookName: string) => {
  try {
    const response = await booksApiRequisition_api.get('volumes', {
      params: {
        q: bookName,
        projection: 'full',
        key: 'AIzaSyAitfrL95WLIaPjffNXN9mBhfvnLa2RlnU',
        maxResults: 7,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      const firstResult = response.data.items[0];

      const bookTitle = firstResult.volumeInfo.title;
    }

    return getUniqueItems(response.data.items);
  } catch (e) {
    console.log('Error: ', e);
  }
};

export const getVolumeBookId = async (bookId: string) => {
  try {
    const response = await booksApiRequisition_api.get(`volumes/${bookId}`, {
      params: {
        projection: 'full',
        key: 'AIzaSyAitfrL95WLIaPjffNXN9mBhfvnLa2RlnU',
      },
    });
    return response.data;
  } catch (e) {
    console.log('Error: ', e);
  }
};
