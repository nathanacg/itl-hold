export interface User {
	userNickname: string
	userBio: string
	userName: string
	userEmail: string
	userPhone: string
	userBirthday: string
	userPassword: string
}

export interface Profile {
	userNickname: string,
	userBio: string,
	private_account: number
	userPrivate: boolean
}

export interface ListUserMarks {
	userId: number
	postHexId: string
}


export interface ProfileList {
	isFollowing: boolean
	userId: number
	userName: string
	userNickname: string
	profileImage: string
}

export interface getUserResponse {
	profile: {
		userId: number,
		userName: string,
		userEmail: string,
		userPhone: string,
		userBirthday: string,
		userNickname: string,
		userPassword: string,
		userBio: string,
		userPrivate: boolean,
		user_verified: number,
		numSeguidores: number,
		numSeguindo: number,
		numPublicacoes: number,
		profileImage: string,
		private_account: number,
		isFollowing: boolean,
		userFollowing: 0 | 1,
		notifications: boolean,
		site: string,
		gender: string,
		userActive: number
	},
	matters: []
}


export interface ProfileUser {
	userId: number,
	userName: string,
	userEmail: string,
	site: string,
	userBirthday: string,
	userPhone: string,
	userNickname: string,
	user_verified: number,
	userBio: string,
	profileImage: string,
	numSeguidores: number,
	numSeguindo: number,
	numPublicacoes: number,
	private_account: number,
	isFollowing: boolean
	userFollowing: 0 | 1,
	alternativeMail?: string
	alternativePhone?: string
	showAlternativeContact?: number
	gender: string
	status?: string
	notifications: boolean
}

export interface UserToMarcation {
	userId: number,
	userName: string,
	userNickname: string,
	profileImage: string,
	allow: 0 | 1 | 2
}

export interface LoginLog {
	id: any
	location: string,
	deviceInfo: string
	loginTime: string
}

export interface ListRoomUsers {
	room_id: number
	userId: number
	profileImage: string
	userName: string
	userNickname: string
}

export interface MyFile {
	fileCopyUri: string;
	name: string;
	size: number;
	type: string;
	uri: string;
}
