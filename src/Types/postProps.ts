import { medias } from './feedProps';

export interface audio {
  duration: number;
  mediaUrl: string;
  idAudConfig: number;
  configAudTime: number;
  configAudMetrics: string;
}

export interface postProps {
  postLegend: string;
  link?: string;
  postColor?: string;
  postSpoiler: boolean;
  isClosed: boolean;
  isSaved?: boolean;
  postEvaluation: string;
  postCategorie: string;
  surveyOpinion: { letter: string; text: string }[];
  tmdbMovieId?: number | string | null;
  selectedUsers?: markedUserProps[];
  idRoom?: number | null;
}

export interface ReportPost {
  postHexId: string;
  reason: string;
}

export interface markedUserProps {
  userId: number;
  postHexId: string;
  marcatedUserId: number | string | undefined;
  x: number;
  y: number;
  mediaName?: string;
  scale: number;
}

export interface postUpdateProps {
  postHexId: string;
  postLegend: string;
  marked_users: {
    fileName: string;
    users: {
      idmarcations: number;
      username: string;
      position: {
        x: string;
        y: string;
      };
      scale: number;
    }[];
  }[];
}

export interface ITvSeries {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface MovieProps {
  classification: {
    language: string;
    age: number;
  }[];
  vote_average: number;
  genres: string[];
  casts: {
    id: number;
    profile_path: string;
  }[];
  movieImagens?: {
    backdrop_sizes: {
      w300: string;
      w780: string;
      w1280: string;
      original: string;
    } | null;
    logo_sizes: {
      w45: string;
      w92: string;
      w154: string;
      w185: string;
      w300: string;
      w500: string;
      original: string;
    } | null;
    poster_sizes: {
      w92: string;
      w154: string;
      w185: string;
      w342: string;
      w500: string;
      w780: string;
      original: string;
    } | null;
    profile_sizes: {
      w45: string;
      w185: string;
      h632: string;
      original: string;
    } | null;
    still_sizes: {
      w92: string;
      w185: string;
      w300: string;
      original: string;
    } | null;
  };
  movieId: string | number;
  movieTitle: string;
  movieOverview: string;
  movieDate: string;
  providers: Providers;
  linkYoutubeWatch: string;
  otherUrlYoutube: string;
}

interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface Providers {
  rent: Provider[];
  flatrate: Provider[];
  buy: Provider[];
}

export interface MovieData {
  classification: {
    language: string;
    age: number;
  };
  vote_average: number;
  genres: string[];
  casts: {
    id: number;
    profile_path: string;
  }[];
  movieImagens?: {
    backdrop_sizes: {
      w300: string;
      w780: string;
      w1280: string;
      original: string;
    } | null;
    logo_sizes: {
      w45: string;
      w92: string;
      w154: string;
      w185: string;
      w300: string;
      w500: string;
      original: string;
    } | null;
    poster_sizes: {
      w92: string;
      w154: string;
      w185: string;
      w342: string;
      w500: string;
      w780: string;
      original: string;
    } | null;
    profile_sizes: {
      w45: string;
      w185: string;
      h632: string;
      original: string;
    } | null;
    still_sizes: {
      w92: string;
      w185: string;
      w300: string;
      original: string;
    } | null;
  };
  movieId: number;
  movieTitle: string;
  movieOverview: string;
  movieDate: string;
  providers: Providers;
  linkYoutubeWatch: string;
  otherUrlYoutube: string;
}

export interface ArtistProsp {
  idArtist: string;
  idLabel: string;
  intBornYear: string;
  intCharted: string;
  intDiedYear: string | null;
  intFormedYear: string;
  intMembers: string;
  strArtist: string;
  strArtistAlternate: string;
  strArtistBanner: string;
  strArtistClearart: string;
  strArtistCutout: string;
  strArtistFanart: string;
  strArtistFanart2: string;
  strArtistFanart3: string;
  strArtistFanart4: string;
  strArtistLogo: string;
  strArtistStripped: string | null;
  strArtistThumb: string;
  strArtistWideThumb: string;
  strBiographyCN: string | null;
  strBiographyDE: string;
  strBiographyEN: string;
  strBiographyES: string;
  strBiographyFR: string;
  strBiographyHU: string | null;
  strBiographyIL: string | null;
  strBiographyIT: string;
  strBiographyJP: string | null;
  strBiographyNL: string | null;
  strBiographyNO: string | null;
  strBiographyPL: string | null;
  strBiographyPT: string | null;
  strBiographyRU: string | null;
  strBiographySE: string | null;
  strCountry: string;
  strCountryCode: string;
  strDisbanded: string | null;
  strFacebook: string;
  strGender: string;
  strGenre: string;
  strISNIcode: string | null;
  strLabel: string;
  strLastFMChart: string;
  strLocked: string;
  strMood: string;
  strMusicBrainzID: string;
  strStyle: string;
  strTwitter: string;
  strWebsite: string;
}

export interface markerUser {
  position: Position;
  username: string;
  userNickname: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface ILikes {
  likeId: number;
  postHexId: string;
  profileImage: string;
  userId: number;
  userName: string;
  userNickname: string;
}
[];
export interface postMarcation {
  idmarcations: number;
  marcatedUserId: number;
  mediaId: number | null;
  pending: number;
  position: {
    x: number;
    y: number;
  };
  postHexId: string;
  scale: string;
  userId: number;
  userInfo: {
    profileImage: string;
    userId: number;
    userName: string;
    userNickname: string;
  };
  username: string;
}

export interface PostProps {
  repostEnabled: boolean;
  index: number;
  Actions?: boolean;
  showLikes?: boolean;
  screen?: boolean;
  markedUsers?: markerUser[];
  hiddenPostLegend?: boolean;
  userNickname: string;
  profileImage: string;
  postColor?: string;
  followingUser: number;
  medias: medias[] | null;
  postLegend: string;
  avaliationPost?: string;
  postActions: boolean;
  hasSpoiler?: boolean;
  isClosed: number;
  handleOpenBottomModal?: (type: 'comments' | 'likes') => void;
  onDeleteAfterHandler?: () => void;
  paddingTop?: string;
  postHexId: string;
  userId: number;
  postSpoiler: number | string;
  postDate: string;
  tmdbMovieId?: number | string | null;
  postId: number;
  isArquivaded?: boolean;
  isSaved: boolean;
  postCategorie: string;
  link?: string;
  roomId?: number;
  mediaImage?: string;
  myPost?: boolean;
}

export interface MovieListResponse {
  movies: MovieProps[];
}

export interface MusicListResponse {
  music: ArtistProsp[];
}

export interface headerPublicationProps {
  userNickname: string;
  userId: number;
  profileImage: string;
  action: () => void;
  hasSpoiler?: boolean;
  showSpoiler?: boolean;
  postSpoiler: number | string;
  postCategorie: string;
  onEdit: boolean;
  Actions?: boolean;
  onSave: () => void;
  postDate: string;
  index: number;
}

export interface SelectedMovieProps {
  onRemove?: () => void;
  ImageUrl?: string;
  width?: string;
  name: string;
  category: string;
  description: string;
  id: number | string | undefined;
  marginTop?: string;
  marginBottom?: string;
  preview?: boolean;
  loading: boolean;
}

export interface MarkedProps {
  mediaUrl: string;
  markedUsers: {
    username: string;
    profileImage: string;
    position: {
      x: number;
      y: number;
    };
  }[];
  type: string;
}
