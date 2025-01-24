export type JSONObject = {
	[key: string]: any
}

export type User = {
	id: string
	username: string
	email: string
}

export type Group = {
	id: string
	name: string
	description: string
}

export type Key = {
	id: string
	name: string
	description: string
	groupId: string
}
