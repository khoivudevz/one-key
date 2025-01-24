import useUserStore from '@/store/useUser.store'

const GetWelcomeMessage = () => {
	const {user, logging, registering} = useUserStore()

	const defaultWelcomeMessage = (
		<div className='space-y-[5px] mb-[50px]'>
			<h1>
				Welcome to the <span className='text-yellow-500'>One Key</span> 🔑
			</h1>
			<p>
				<span className='text-yellow-500'>One Key</span> is a tool that helps
				you manage multiple accounts in a secure and efficient way.
			</p>

			<h1
				className='text-center overflow-hidden before:h-[1px] after:h-[1px] after:bg-white 
				after:inline-block after:relative after:align-middle after:w-1/4 
				before:bg-white before:inline-block before:relative before:align-middle 
				before:w-1/4 before:right-2 after:left-2 text-xl p-4'
			>
				{!logging && !registering
					? 'You can login or register to continue ✨'
					: logging
						? 'LOGIN YOUR ACCOUNT 🔓'
						: 'REGISTER YOUR ACCOUNT ✍️'}
			</h1>
			{!logging && !registering && (
				<div className='guide-message'>
					<p>Type "help" to get started ℹ️</p>
					<p>Type "register" to register a new account 📝</p>
					<p>Type "login" to login to your account 🚪</p>
				</div>
			)}
		</div>
	)

	const loggedWelcomeMessage = (
		<div className='mb-[50px]'>
			<h1>
				Welcome back, <span className='text-yellow-500'>{user?.username}</span>{' '}
				🔑
			</h1>
			<hr className='mb-[25px]' />
			<div className='guide-message'>
				<p>Type "help" to get started ℹ️</p>
			</div>
		</div>
	)

	return user ? loggedWelcomeMessage : defaultWelcomeMessage
}

export default GetWelcomeMessage
