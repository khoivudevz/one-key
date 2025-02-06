import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'
import useUserStore from '@/store/useUser.store'

const GetWelcomeMessage = () => {
	const {code, user} = useUserStore()

	const localData = localStorageServices.getLocalStorage<string>(
		localStorageKey.data
	)

	const nickname = localStorageServices.getLocalStorage<string>(
		localStorageKey.nickname
	)

	const authMessage = (
		<div className='mb-[50px]'>
			<h1>
				Welcome back, <span className='text-yellow-500'>{nickname}</span> 🔑
			</h1>
			<hr className='mb-[25px]' />
			<div className='guide-message'>
				<p>Type "code" to unlock your data</p>
				<p>Type "logout" to logout</p>
				<p>Type "help" to get started ℹ️</p>
			</div>
		</div>
	)

	const defaultWelcomeMessage = (
		<div className='space-y-[5px] mb-[50px]'>
			<h1>
				Welcome to the <span className='text-yellow-500'>One Key</span> 🔑
			</h1>
			<p>
				<span className='text-yellow-500'>One Key</span> is a tool that helps
				you manage multiple accounts in a secure and efficient way.
			</p>

			{!code && (
				<div className='guide-message'>
					<p>Type "help" to get started ℹ️</p>
					<p>Type "new" to creat a new data 📝</p>
					<p>Type "import" to import to your account 🚪</p>
				</div>
			)}
		</div>
	)

	const loggedWelcomeMessage = (
		<div className='mb-[50px]'>
			<h1>
				Good to see you,{' '}
				<span className='text-yellow-500'>{user?.nickname}</span> 🔑
			</h1>
			<hr className='mb-[25px]' />
			<div className='guide-message'>
				<p>Type "help" to get started ℹ️</p>
				<p>Type "logout" to logout</p>
			</div>
		</div>
	)

	return localData && !code
		? authMessage
		: code
			? loggedWelcomeMessage
			: defaultWelcomeMessage
}

export default GetWelcomeMessage
