import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'
import useActionStore from '@/store/useAction.store'

import useUserStore from '@/store/useUser.store'

const GetPromptConfig = () => {
	const localData = localStorageServices.getLocalStorage<string>(
		localStorageKey.data
	)
	const {code} = useUserStore()
	const {isKeyEditing, isKeyCreating} = useActionStore()

	if (localData && !code) {
		return `🔒 ~`
	}

	if (isKeyEditing) {
		return '🪄 ~ '
	}

	if (isKeyCreating) {
		return '✍️ ~ '
	}

	return '🔑 ~ '
}

export default GetPromptConfig
