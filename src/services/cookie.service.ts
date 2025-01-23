export const cookieKey = {
	USER_INFO: 'USER_INFO',
}

export const cookieServices = {
	// Set a cookie
	setCookie: <T>(
		key: string,
		data: T,
		options?: {days?: number; path?: string}
	) => {
		const json = JSON.stringify(data)
		let cookieString = `${key}=${json};`

		// Set expiration days
		if (options?.days) {
			const date = new Date()
			date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000)
			cookieString += `expires=${date.toUTCString()};`
		}

		// Set path
		if (options?.path) {
			cookieString += `path=${options.path};`
		} else {
			cookieString += `path=/;` // Default path is root
		}

		document.cookie = cookieString
	},

	// Get a cookie
	getCookie: <T>(key: string) => {
		const cookieArray = document.cookie.split('; ')
		for (const cookie of cookieArray) {
			const [cookieKey, cookieValue] = cookie.split('=')
			if (cookieKey === key) {
				const json = JSON.parse(cookieValue)

				if (json !== undefined) {
					return json as T
				}
				return null
			}
		}
		return null
	},

	// Remove a cookie
	removeCookie: (key: string, options?: {path?: string}) => {
		cookieServices.setCookie(key, '', {
			days: -1, // Set expiration to past date
			path: options?.path || '/', // Ensure path matches when removing
		})
	},
}
