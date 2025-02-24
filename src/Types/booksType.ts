export interface BookResponse {
    items: BookVolume[];
}

export interface BookVolume {
    accessInfo: Record<string, unknown>;
    etag: string;
    id: string;
    kind: string;
    saleInfo: Record<string, unknown>;
    searchInfo: Record<string, unknown>;
    selfLink: string;
    volumeInfo: VolumeInfo
}

export interface VolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    readingModes: {
        text: boolean;
        image: boolean;
    };
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    };
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
    };
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}