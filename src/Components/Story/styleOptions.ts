import { fontStyle, theme } from "../../Theme/theme";

export const avatarTextStyle = {
    myProfile: {
        display: "none"
    },

    destaqueList: {
        textAlign: "center", 
        color: theme.textDark, 
        fontFamily: fontStyle.medium, 
        fontSize: 14,
        marginBottom: 4,
        marginTop: 10,
        width: 80,
    },
    
    view: {
        fontFamily: fontStyle.regular, 
        fontSize: 12, 
        color: theme.textDark,
        width: 64,
        textAlign: "center",
    }

}

export const avatarImageStyle ={ 
    Profile : {
        width: 132, 
        height: 132, 
        borderRadius: 67 
    },
    destaqueList: {
        width: 85, 
        height: 85, 
        borderRadius: 8, 
        borderWidth: 0,
    },
    feed: {
        width: 63, 
        height: 63, 
        borderRadius: 8, 
        borderWidth: 0 
    },
    OtherProfileDestaque: {
        width: 85, 
        height: 85, 
        borderRadius: 8, 
        borderWidth: 1,
        borderColor: theme.primarycolor
    }
}

export const avatarWrapperStyle ={
    Profile: {
        width: 144, 
        height: 144, 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: theme.secondaryColor, 
        borderWidth: 1,
    },
    destaqueList: {
        width: 85, 
        height: 85, 
        borderRadius: 8, 
        borderWidth: 0,
        marginRight: 9,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    feed: {
        width: 63, 
        height: 63, 
        borderRadius: 8, 
        borderWidth: 0 ,
        marginBottom: 3,
        marginRight: 6

    }

}

export const storyAvatarImageStyle = {
    width: 31, 
    height: 31, 
    marginTop: 10, 
    marginLeft: 35
}

export const animationBarContainerStyle = {
    position: "absolute", 
    top: 50, 
    width: 352, 
    left: 20 
}