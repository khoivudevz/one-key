import useData from '@/hooks/useData'
import {cookieKey, cookieServices} from '@/services/cookie.service'
import useUserStore from '@/store/useUser.store'
import {User} from '@/types/common.type'
import {delay} from '@/utils/delay'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
const GetCommandConfig = () => {
	const {
		user,
		logging,
		registering,
		setLogging,
		setRegistering,
		setAuthLoading,
		setUser,
		setId,
	} = useUserStore()

	const {groupData} = useData()

	const [email, setEmail] = useState<string | null>(null)

	const resetState = () => {
		setEmail(null)
		setLogging(false)
		setRegistering(false)
	}

	const handleRegister = async (password: string) => {
		console.log('🚀~password :', password)
		try {
			setAuthLoading(true)
			await delay(3000)
			const data: User = {
				id: '1',
				username: 'khoivudevz',
				email: 'khoivudevz@gmail.com',
			}
			setUser(data)
			cookieServices.setCookie<User>(cookieKey.USER_INFO, data)
			resetState()
			setId(uuidv4())

			return (
				<p className='text-success-message'>Register for {email} success ✅</p>
			)
		} catch (error) {
			console.log('🚀~error :', error)
			setEmail(null)
			return (
				<p className='text-error-message'>Register error: {error as any} ❌</p>
			)
		} finally {
			setAuthLoading(false)
		}
	}

	const handleLogin = async (password: string) => {
		console.log('🚀~password :', password)
		try {
			setAuthLoading(true)
			await delay(3000)
			const data: User = {
				id: '1',
				username: 'khoivudevz',
				email: 'khoivudevz@gmail.com',
			}
			setUser(data)
			cookieServices.setCookie<User>(cookieKey.USER_INFO, data)
			resetState()
			setId(uuidv4())

			return <p className='text-success-message'>Login to {email} success ✅</p>
		} catch (error) {
			console.log('🚀~error :', error)
			setEmail(null)
			return (
				<p className='text-error-message'>Login error: {error as any} ❌</p>
			)
		} finally {
			setAuthLoading(false)
		}
	}

	const handleCloseBrowser = () => {
		window.open('about:blank', '_self')
		window.close()
	}

	const handleGetGroup = () => {
		return (
			<ul className='help-list'>
				{groupData?.map((group) => {
					return <li>{group.name}</li>
				})}
			</ul>
		)
	}

	const generalCommandConfig = {
		// maker
		madeby: 'made by khoivudevz',

		// close windows
		quit: () => handleCloseBrowser(),
		exit: () => handleCloseBrowser(),
	}

	const unAuthCommandConfig = {
		register: () => {
			if (registering)
				return (
					<p className='text-error-message'>You are already registering ❌</p>
				)

			setRegistering(true)
			setLogging(false)
			setEmail(null)

			return (
				<div className='guide-message'>
					<p> Enter your email: email "input your email"</p>
					<p> Enter your password: password "input your password"</p>
				</div>
			)
		},
		login: () => {
			if (logging)
				return <p className='text-error-message'>You are already logging ❌</p>
			setLogging(true)
			setRegistering(false)
			setEmail(null)

			return (
				<div className='guide-message'>
					<p> Enter your email: email "input your email"</p>
					<p> Enter your password: password "input your password"</p>
				</div>
			)
		},

		email: (email: string) => {
			setEmail(email)
		},

		password: (password: string) => {
			if (!email)
				return (
					<p className='text-error-message'>Please enter your email first ❌</p>
				)
			if (logging) {
				return handleLogin(password)
			} else {
				return handleRegister(password)
			}
		},

		help: (
			<div>
				<ul className='help-list'>
					<li>register: Register a new account</li>
					<li>login: Login to your account</li>
					<li>clear: Clear the terminal</li>
					<li>quit, exit: Quit the terminal</li>
				</ul>
			</div>
		),
	}

	const loggedCommandConfig = {
		cd: (directory: string) => `changed path to ${directory}`,

		// logout
		logout: () => {
			cookieServices.removeCookie(cookieKey.USER_INFO)
			setUser(null)
			setId(uuidv4())
			return <p className='text-success-message'>Logout success ✅</p>
		},

		// group list
		'group-list': () => handleGetGroup(),

		// create new group
		'create-group': 'create-group',

		// delete group
		'delete-group': 'delete-group',

		// create new key
		'create-key': 'create-key',

		// delete key
		'delete-key': 'delete-key',

		// list key
		'key-list': 'key-list',

		// show key
		'show-key': 'show-key',

		// hide key
		'hide-key': 'hide-key',

		// help list
		help: (
			<div>
				<ul className='help-list'>
					<li>group-list: List all groups</li>
					<li>create-group: Create a new group</li>
					<li>delete-group: Delete a group</li>
					<li>key-list: List all keys</li>
					<li>create-key: Create a new key</li>
					<li>delete-key: Delete a key</li>
					<li>show-key: Show password key</li>
					<li>hide-key: Hide password key</li>
					<li>clear: Clear the terminal</li>
					<li>logout: Logout</li>
					<li>quit, exit: Quit the terminal</li>
				</ul>
			</div>
		),
	}

	return user
		? {...generalCommandConfig, ...loggedCommandConfig}
		: {...generalCommandConfig, ...unAuthCommandConfig}
}

export default GetCommandConfig
