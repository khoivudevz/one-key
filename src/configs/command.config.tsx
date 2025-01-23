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

	const generalCommandConfig = {
		// maker
		madeby: 'made by khoivudevz',

		// close windows
		quit: 'quit',
		exit: 'exit',
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
			return `Email ${email}`
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
				<ul>
					<li>register: Register a new account</li>
					<li>login: Login to your account</li>
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
			return 'logout success ✅'
		},

		// create new key
		create_key: 'create-key',

		// delete key
		delete_key: 'delete-key',

		// list key
		key_list: 'key-list',

		// show key
		show_key: 'show-key',

		// hide key
		hide_key: 'hide-key',

		// help list
		help: (
			<div>
				<ul>
					<li>logout: Logout from your account</li>
					<li>create_key: Create a new key</li>
					<li>delete_key: Delete a key</li>
					<li>key_list: List all keys</li>
					<li>show_key: Show password key</li>
					<li>hide_key: Hide password key</li>
				</ul>
			</div>
		),
	}

	return user
		? {...generalCommandConfig, ...loggedCommandConfig}
		: {...generalCommandConfig, ...unAuthCommandConfig}
}

export default GetCommandConfig
