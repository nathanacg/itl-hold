export interface ArchivedPublication {
     postId: number,
     postLegend: string,
     postHexId: string,
     postSpoiler: number,
     postEvaluation: string,
     postCategorie: string,
     postEnable: string,
     userId: number,
     postDate: number,
     tmdbMovieId: null,
     userName: string,
     userNickname: string,
     profileImage: string,
     medias: [
       {
         idmedias: number,
         mediaUrl: string,
         mediaName: string,
         mediaSize: string,
         mediaType: string,
         markedUsers: null,
         mediaExtension: string
       }
     ]
   }