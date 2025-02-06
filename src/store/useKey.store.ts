import {Key} from '@/types/common.type'
import {create} from 'zustand'

type Store = {
	key: Key[] | null
	setKey: (data: Key[] | null) => void
}

const useKeyStore = create<Store>()((set) => ({
	key: null,
	setKey: (payload: Key[] | null) => set(() => ({key: payload})),
}))

export default useKeyStore
