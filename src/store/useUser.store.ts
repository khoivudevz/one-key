import {User} from '@/types/common.type'
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

type Store = {
	user: User | null
	setUser: (data: User | null) => void
	code: string | null
	setCode: (data: string | null) => void
	creating: boolean
	setCreating: (data: boolean) => void
	importing: boolean
	setImporting: (data: boolean) => void
}

const useUserStore = create<Store>()(
	devtools(
		(set) => ({
			user: null,
			setUser: (payload: User | null) => set(() => ({user: payload})),
			code: null,
			setCode: (payload: string | null) => set(() => ({code: payload})),
			creating: false,
			setCreating: (payload: boolean) => set(() => ({creating: payload})),
			importing: false,
			setImporting: (payload: boolean) => set(() => ({importing: payload})),
		}),
		{
			name: 'useUserStore',
		}
	)
)

export default useUserStore
