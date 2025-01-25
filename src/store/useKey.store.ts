import {Key} from '@/types/common.type'
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

type Store = {
	key: Key[] | null
	setKey: (data: Key[] | null) => void
}

const useKeyStore = create<Store>()(
	devtools(
		(set) => ({
			key: null,
			setKey: (payload: Key[] | null) => set(() => ({key: payload})),
		}),
		{
			name: 'useKeyStore',
		}
	)
)

export default useKeyStore
