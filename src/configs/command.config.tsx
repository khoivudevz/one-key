import KeyCard from '@/components/KeyCard'
import {localStorageKey} from '@/services/localStorage.service'
import {localStorageServices} from '@/services/localStorage.service'
import useActionStore from '@/store/useAction.store'
import useKeyStore from '@/store/useKey.store'
import useUserStore from '@/store/useUser.store'
import {saveAs} from 'file-saver'
import dayjs from 'dayjs'

const GetCommandConfig = () => {
	const localData = localStorageServices.getLocalStorage<string>(
		localStorageKey.data
	)
	const {key, setKey} = useKeyStore()
	const {user, setUser, setCreating, setCode, code, setImporting, setEditing} =
		useUserStore()
	const {setIsKeyEditing, setIsKeyCreating, setSelectedKey, setIsLogin} =
		useActionStore()

	const handleEditAccount = () => {
		setEditing(true)
	}

	const handleImportingData = () => {
		setImporting(true)

		return (
			<div className='guide-message'>
				<p>Select your file to import</p>
			</div>
		)
	}

	const handleNew = () => {
		setCreating(true)
	}

	const handleGetKeyList = () => {
		if (key && key.length) {
			return (
				<div>
					{key?.map((item) => {
						return <KeyCard data={item} key={item.id} />
					})}
				</div>
			)
		} else {
			return (
				<div className='guide-message'>
					<p>
						Your data is empty! Please type "create-key" to create a new key!
					</p>
				</div>
			)
		}
	}

	const handleCloseBrowser = () => {
		window.open('about:blank', '_self')
		window.close()
	}

	const handleShowKey = (keyId: string) => {
		if (key) {
			const foundKey = key.find((item) => item.id === keyId)
			if (!foundKey) return <p className='text-error-message'>Key not found!</p>
			return <KeyCard data={foundKey} isShowPassword />
		}
	}

	const handleDeleteKey = (keyId: string) => {
		if (key) {
			const foundKey = key.find((item) => item.id === keyId)
			if (!foundKey) return <p className='text-error-message'>Key not found!</p>
			setKey(key.filter((item) => item.id !== keyId))
			return <p className='text-success-message'>Key deleted successfully!</p>
		}
	}

	const handleEditKey = (keyId: string) => {
		if (key) {
			const selectedKeyData = key.find((item) => item.id === keyId)
			if (!selectedKeyData)
				return <p className='text-error-message'>Key not found!</p>
			setSelectedKey(keyId)
			setIsKeyEditing(true)
		}
	}

	const handleCreateNewKey = () => {
		setIsKeyCreating(true)
	}

	const handleLogin = () => {
		setIsLogin(true)
	}

	const handleExportData = () => {
		if (!key || !key.length)
			return <p className='text-error-message'>Key list is empty!</p>

		const localData = localStorageServices.getLocalStorage<string>(
			localStorageKey.data
		)
		if (!localData) return <p className='text-error-message'>Data not found!</p>

		const blob = new Blob([localData], {type: 'text/plain;charset=utf-8'})
		saveAs(blob, `${user?.nickname}-${dayjs().format('YYYY-MM-DD')}.txt`)

		return <p className='text-success-message'>Export data successfully!</p>
	}

	const handleLogout = () => {
		localStorageServices.removeLocalStorage(localStorageKey.nickname)
		localStorageServices.removeLocalStorage(localStorageKey.data)
		setCode(null)
		setKey(null)
		setUser(null)
		setCreating(false)

		return <p className='text-success-message'>Logout successfully!</p>
	}

	const loggedCommandConfig = {
		// export data
		export: () => handleExportData(),

		// key list
		'key-list': () => handleGetKeyList(),

		// create new key
		'create-key': () => handleCreateNewKey(),

		//  edit key
		'edit-key': (keyId: string) => handleEditKey(keyId),

		// delete key
		'delete-key': (keyId: string) => handleDeleteKey(keyId),

		// show key
		'show-key': (keyId: string) => handleShowKey(keyId),

		// edit account
		'edit-account': () => handleEditAccount(),

		logout: () => handleLogout(),

		// help list
		help: (
			<div>
				<ul className='help-list'>
					<li>key-list: List all keys</li>
					<li>create-key: Create a new key</li>
					<li>delete-key "key-id": Delete a key</li>
					<li>show-key "key-id": Show password key</li>
					<li>edit-key "key-id": Edit a key</li>
					<li>clear: Clear the terminal</li>
					<li>export: Export data</li>
					<li>logout: Logout</li>
					<li>quit, exit: Quit the terminal</li>
				</ul>
			</div>
		),
	}

	const generalCommandConfig = {
		madeby: 'made by khoivudevz',

		// close windows
		quit: () => handleCloseBrowser(),
		exit: () => handleCloseBrowser(),
	}

	const newCommandConfig = {
		import: () => {
			return handleImportingData()
		},

		new: () => {
			return handleNew()
		},

		help: (
			<div>
				<ul className='help-list'>
					<li>import: Import data</li>
					<li>new: Create new data</li>
					<li>clear: Clear the terminal</li>
					<li>quit, exit: Quit the terminal</li>
				</ul>
			</div>
		),
	}

	const authCommandConfig = {
		code: () => handleLogin(),
		logout: () => handleLogout(),
		help: () => (
			<div>
				<ul className='help-list'>
					<li>code: Enter your code</li>
					<li>logout: Logout</li>
					<li>help: Show help</li>
				</ul>
			</div>
		),
	}

	return localData && !code
		? authCommandConfig
		: key
			? {...generalCommandConfig, ...loggedCommandConfig}
			: {...generalCommandConfig, ...newCommandConfig}
}

export default GetCommandConfig
