import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

type Store = {
	isKeyCreating: boolean
	setIsKeyCreating: (payload: boolean) => void
	isKeyEditing: boolean
	setIsKeyEditing: (payload: boolean) => void
}

const useActionStore = create<Store>()(
	devtools(
		(set) => ({
			isKeyCreating: false,
			setIsKeyCreating: (payload: boolean) =>
				set(() => ({isKeyCreating: payload})),
			isKeyEditing: false,
			setIsKeyEditing: (payload: boolean) =>
				set(() => ({isKeyEditing: payload})),
		}),
		{
			name: 'useActionStore',
		}
	)
)

export default useActionStore
