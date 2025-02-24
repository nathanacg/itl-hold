import { axiosClientVisualizations } from '../Lib/Visualizations_api';

export const getUsersViewsStory = async (postHexId: string) => {
  var res = await axiosClientVisualizations.get(
    `/visualization/storyvisualizators/${postHexId}`,
  );
  return res;
};

export const getViewsDrop = async (postHexId: string) => {
  var res = await axiosClientVisualizations.get(
    `/visualization/reelsvisualization/${postHexId}`,
  );
  return res;
};

export const getViewsStory = async (postHexId: string) => {
  var res = await axiosClientVisualizations.get(
    `/visualization/totalstoryvisualizators/${postHexId}`,
  );
  return res;
};

export const postViewStory = async (postHexId: string, userId: number) => {
  var res = await axiosClientVisualizations.post(
    '/visualization/addstoryvisualization/',
    { postHexId, userId },
  );
  return res;
};

export const postViewDrop = async (postHexId: string) => {
  var res = await axiosClientVisualizations.post(
    '/visualization/reelsvisualization/',
    { postHexId },
  );
  return res;
};
