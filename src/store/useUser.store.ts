import {User} from '@/types/common.type'
import {create} from 'zustand'

type Store = {
	user: User | null
	setUser: (data: User | null) => void
	code: string | null
	setCode: (data: string | null) => void
	creating: boolean
	setCreating: (data: boolean) => void
	importing: boolean
	setImporting: (data: boolean) => void
	editing: boolean
	setEditing: (data: boolean) => void
}

const useUserStore = create<Store>()((set) => ({
	user: null,
	setUser: (payload: User | null) => set(() => ({user: payload})),
	code: null,
	setCode: (payload: string | null) => set(() => ({code: payload})),
	creating: false,
	setCreating: (payload: boolean) => set(() => ({creating: payload})),
	importing: false,
	setImporting: (payload: boolean) => set(() => ({importing: payload})),
	editing: false,
	setEditing: (payload: boolean) => set(() => ({editing: payload})),
}))

export default useUserStore
