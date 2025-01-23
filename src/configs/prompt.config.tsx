import useUserStore from '@/store/useUser.store'

const GetPromptConfig = () => {
	const {logging, registering, authLoading} = useUserStore()

	if (authLoading) return 'Loading...'

	switch (true) {
		case logging:
			return 'Login ~ '
		case registering:
			return 'Register ~ '
		default:
			return '~ '
	}
}

export default GetPromptConfig
