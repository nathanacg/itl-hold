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
    language: string
    age: number
  }[]
  vote_average: number
  genres: string[]
  casts: {
    id: number
    profile_path: string
  }[]
  movieImagens?: {
    backdrop_sizes: {
      w300: string
      w780: string
      w1280: string
      original: string
    } | null
    logo_sizes: {
      w45: string
      w92: string
      w154: string
      w185: string
      w300: string
      w500: string
      original: string
    } | null
    poster_sizes: {
      w92: string
      w154: string
      w185: string
      w342: string
      w500: string
      w780: string
      original: string
    } | null
    profile_sizes: {
      w45: string
      w185: string
      h632: string
      original: string
    } | null
    still_sizes: {
      w92: string
      w185: string
      w300: string
      original: string
    } | null
  }
  movieId: number;
  movieTitle: string;
  movieOverview: string;
  movieDate: string;
  providers: Providers;
  linkYoutubeWatch: string;
  otherUrlYoutube: string;
}

export interface SerieData {
  classification: {
    language: string
    age: number
  }[]
  vote_average: number
  genres: string[]
  casts: {
    id: number
    profile_path: string
  }[]
  movieImagens?: {
    backdrop_sizes: {
      w300: string
      w780: string
      w1280: string
      original: string
    } | null
    logo_sizes: {
      w45: string
      w92: string
      w154: string
      w185: string
      w300: string
      w500: string
      original: string
    } | null
    poster_sizes: {
      w92: string
      w154: string
      w185: string
      w342: string
      w500: string
      w780: string
      original: string
    } | null
    profile_sizes: {
      w45: string
      w185: string
      h632: string
      original: string
    } | null
    still_sizes: {
      w92: string
      w185: string
      w300: string
      original: string
    } | null
  }
  movieId: number;
  movieTitle: string;
  movieOverview: string;
  movieDate: string;
  providers: Providers;
  linkYoutubeWatch: string;
  otherUrlYoutube: string;
}