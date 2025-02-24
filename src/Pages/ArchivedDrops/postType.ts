export interface Post {
     userId: number;
     profileImage: string;
     username: string;
     text: {
       font: null;
       text: null;
       scale: null;
       position: null;
       text_align: null;
       text_color: null;
       background_color: null;
     };
     postHexId: string;
     text_url: {
       url: null;
       scale: null;
       position: null;
       style_type: null;
     };
     users_marcations: null;
     thumbnail: {
       url: string,
       scale: number,
       fileName: string,
       position: {
         x: number,
         y: number
       },
     };
     principalMedia: {
       url: string;
       scale: string;
       fileName: string;
       position: { x: number; y: number };
       usage_media: string;
     };
     secondaryMedia: {
       url: null;
       scale: null;
       fileName: null;
       position: null;
       usage_media: null;
     };
     docMedia: {
       url: null | string;
       scale: null;
       fileName: null;
       position: null;
       usage_media: null;
     };
     music: null;
     emojis: null;
   }