import {Group, Key} from '@/types/common.type'
import useFetch from './useFetch'
import {delay} from '@/utils/delay'

const useData = () => {
	const {data: groupData} = useFetch<Group[]>(async (): Promise<Group[]> => {
		await delay(2000)
		return await import('@/data/group.data').then((mod) => mod.default)
	})

	const {data: keyData} = useFetch<Key[]>(async (): Promise<Key[]> => {
		await delay(2000)
		return await import('@/data/key.data').then((mod) => mod.default)
	})

	return {groupData, keyData}
}

export default useData
