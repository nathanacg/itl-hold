import { Share } from "react-native"

export const shareLink = ({ title, message, url }: { title: string, message: string, url: string }) => {
    Share.share({
        title,
        message,
        url,

    })
}