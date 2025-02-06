export type JSONObject = {
	[key: string]: any
}

export type User = {
	nickname: string
}

export type Group = {
	id: string
	name: string
	description: string
}

export type Key = {
	id: string
	username: string
	description: string
	password: string
}

export type LocalStorageData = {
	user: User
	key: Key[]
}
