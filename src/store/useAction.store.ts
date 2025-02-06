import {create} from 'zustand'

type Store = {
	isKeyCreating: boolean
	setIsKeyCreating: (payload: boolean) => void
	isKeyEditing: boolean
	setIsKeyEditing: (payload: boolean) => void
	selectedKey: string | null
	setSelectedKey: (payload: string | null) => void
	isLogin: boolean
	setIsLogin: (payload: boolean) => void
	reset: () => void
}

const useActionStore = create<Store>()((set) => ({
	isKeyCreating: false,
	setIsKeyCreating: (payload: boolean) => set(() => ({isKeyCreating: payload})),
	isKeyEditing: false,
	setIsKeyEditing: (payload: boolean) => set(() => ({isKeyEditing: payload})),
	selectedKey: null,
	setSelectedKey: (payload: string | null) =>
		set(() => ({selectedKey: payload})),
	isLogin: false,
	setIsLogin: (payload: boolean) => set(() => ({isLogin: payload})),
	reset: () =>
		set(() => ({
			isKeyCreating: false,
			isKeyEditing: false,
			selectedKey: null,
			isLogin: false,
		})),
}))

export default useActionStore
