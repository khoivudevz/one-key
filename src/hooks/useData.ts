import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'
import useKeyStore from '@/store/useKey.store'
import useUserStore from '@/store/useUser.store'
import {encrypt} from '@/utils/auth'
import {useEffect} from 'react'

const useData = () => {
	const {key} = useKeyStore()
	const {code, user} = useUserStore()

	useEffect(() => {
		if (key && code) {
			const storageData = {
				user,
				key,
			}

			const encryptedKey = encrypt(JSON.stringify(storageData), code)

			localStorageServices.setLocalStorage(encryptedKey, localStorageKey.data)
		}
	}, [key, code, user])
}

export default useData
