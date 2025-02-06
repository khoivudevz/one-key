export const localStorageKey = {
	data: 'data',
	nickname: 'nickname',
}

export const localStorageServices = {
	setLocalStorage: <T>(data: T, key: string) => {
		const json = JSON.stringify(data)
		localStorage.setItem(key, json)
	},
	getLocalStorage: <T>(key: string) => {
		const json = localStorage.getItem(key)
		if (!json) return null

		try {
			return JSON.parse(json) as T
		} catch {
			return null
		}
	},
	removeLocalStorage: (key: string) => {
		localStorage.removeItem(key)
	},
}
