import {cookieKey, cookieServices} from '@/services/cookie.service'
import {User} from '@/types/common.type'
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {v4 as uuidv4} from 'uuid'

type Store = {
	id: string
	setId: (data: string) => void
	user: User | null
	setUser: (data: User | null) => void
	registering: boolean
	setRegistering: (data: boolean) => void
	logging: boolean
	setLogging: (data: boolean) => void

	authLoading: boolean
	setAuthLoading: (data: boolean) => void
}

const defaultUser: User | null = cookieServices.getCookie<User>(
	cookieKey.USER_INFO
)

const useUserStore = create<Store>()(
	devtools(
		(set) => ({
			id: uuidv4(),
			setId: (payload: string) => set(() => ({id: payload})),
			user: defaultUser,
			setUser: (payload: User | null) => set(() => ({user: payload})),
			registering: false,
			setRegistering: (payload: boolean) => set(() => ({registering: payload})),
			logging: false,
			setLogging: (payload: boolean) => set(() => ({logging: payload})),

			authLoading: false,
			setAuthLoading: (payload: boolean) => set(() => ({authLoading: payload})),
		}),
		{
			name: 'useUserStore',
		}
	)
)

export default useUserStore
