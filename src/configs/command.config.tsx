import KeyCard from '@/components/KeyCard'
import {localStorageKey} from '@/services/localStorage.service'
import {localStorageServices} from '@/services/localStorage.service'
import useActionStore from '@/store/useAction.store'
import useKeyStore from '@/store/useKey.store'
import useUserStore from '@/store/useUser.store'
import {saveAs} from 'file-saver'
import {decrypt} from '@/utils/auth'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

const GetCommandConfig = () => {
	const localData = localStorageServices.getLocalStorage<string>(
		localStorageKey.data
	)
	const {key, setKey} = useKeyStore()
	const {
		user,
		setUser,
		creating,
		setCreating,
		setCode,
		code,
		importing,
		setImporting,
	} = useUserStore()
	const {setIsKeyEditing, isKeyEditing, isKeyCreating, setIsKeyCreating} =
		useActionStore()

	const [selectedKey, setSelectedKey] = useState<string | null>(null)

	const [keyName, setKeyName] = useState<string | null>(null)
	const [keyPassword, setKeyPassword] = useState<string | null>(null)

	const handleImportingData = () => {
		if (importing)
			return <p className='text-error-message'>You are importing data!</p>
		setCreating(false)
		setUser(null)
		setImporting(true)

		return (
			<div className='guide-message'>
				<p>Select your file to import</p>
			</div>
		)
	}

	const handleCreatingData = () => {
		if (creating) return <p className='text-error-message'>You are creating!</p>
		setImporting(false)
		setCreating(true)
		return (
			<div className='guide-message'>
				<p>Enter your nickname: nickname "Your nickname" </p>
				<p>Enter your code: code "Your code" </p>
				<p className='italic text-base'>
					* This code will use to open your file, please remember it!
				</p>

				<li>cancel: Cancel the data creation</li>
			</div>
		)
	}

	const handleCreateDataCode = (code: string) => {
		if (!user)
			return (
				<p className='text-error-message'>You need to type "nickname" first!</p>
			)

		setCode(code)
		setKey([])
		localStorageServices.setLocalStorage(
			user.nickname,
			localStorageKey.nickname
		)

		return (
			<div>
				<p className='text-success-message'>Create data success!</p>
				<div className='guide-message'>
					<p>create-key: Create a new key</p>
					<p>clear: Clear the terminal</p>
				</div>
			</div>
		)
	}

	const handleTypeCode = (code: string) => {
		if (!creating)
			return (
				<p className='text-error-message'> You need to type "new" first!</p>
			)

		if (!user)
			return (
				<p className='text-error-message'>You need to type "nickname" first!</p>
			)
		return handleCreateDataCode(code)
	}

	const handleCreateNickname = (nickname: string) => {
		if (!creating) {
			return <p className='text-error-message'>You need to type "new" first!</p>
		}

		setUser({nickname: nickname})
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
			if (isKeyEditing)
				return <p className='text-error-message'>You are editing key!</p>

			const foundKey = key.find((item) => item.id === keyId)
			if (!foundKey) return <p className='text-error-message'>Key not found!</p>
			setKeyName(null)
			setKeyPassword(null)
			setIsKeyCreating(false)
			setSelectedKey(keyId)
			setIsKeyEditing(true)

			return <InActionMessage />
		}
	}

	const handleCreateNewKey = () => {
		if (isKeyCreating)
			return <p className='text-error-message'>You are creating key!</p>
		setKeyName(null)
		setKeyPassword(null)
		setSelectedKey(null)
		setIsKeyEditing(false)
		setIsKeyCreating(true)
		return <InActionMessage />
	}

	const handleTypeUsername = (keyName: string) => {
		if (!isKeyCreating && !isKeyEditing)
			return (
				<p className='text-error-message'>
					You need to select type "create-key" or "edit-key" first!
				</p>
			)

		setKeyName(keyName)
	}

	const handleTypeKeyPassword = (keyPassword: string) => {
		if (!isKeyCreating && !isKeyEditing)
			return (
				<p className='text-error-message'>
					You need to select type "create-key" or "edit-key" first!
				</p>
			)
		if (!keyName)
			return (
				<p className='text-error-message'>You need to type "username" first!</p>
			)
		setKeyPassword(keyPassword)
	}

	const handleTypeKeyDescription = (keyDescription: string) => {
		if (key) {
			if (!isKeyCreating && !isKeyEditing)
				return (
					<p className='text-error-message'>
						You need to select type "create-key" or "edit-key" first!
					</p>
				)
			if (!keyName)
				return (
					<p className='text-error-message'>
						You need to type "username" first!
					</p>
				)

			if (!keyPassword)
				return (
					<p className='text-error-message'>
						You need to type "password" first!
					</p>
				)

			if (isKeyCreating) {
				const newKey = {
					id: uuidv4(),
					username: keyName,
					password: keyPassword,
					description: keyDescription,
				}
				setKey([...key, newKey])

				setKeyName(null)
				setKeyPassword(null)
				setSelectedKey(null)
				setIsKeyCreating(false)
				setIsKeyEditing(false)

				return <p className='text-success-message'>Key created successfully!</p>
			} else if (selectedKey) {
				const newKey = {
					id: selectedKey,
					username: keyName,
					password: keyPassword,
					description: keyDescription,
				}
				setKey(key.map((item) => (item.id === selectedKey ? newKey : item)))
				setSelectedKey(null)
				setKeyName(null)
				setKeyPassword(null)
				setSelectedKey(null)
				setIsKeyCreating(false)
				setIsKeyEditing(false)

				return <p className='text-success-message'>Key edited successfully!</p>
			}
		}
	}

	const handleCancel = () => {
		setIsKeyCreating(false)
		setIsKeyEditing(false)
		setKeyName(null)
		setKeyPassword(null)
		setSelectedKey(null)
		return <p className='text-success-message'>Cancel successfully!</p>
	}

	const handleLogin = (code: string) => {
		if (!localData) return
		try {
			const decryptedData = decrypt(localData, code)
			if (!decryptedData.length)
				return <p className='text-error-message'>Invalid code!</p>
			setCode(code)
			const decryptedDataParsed = JSON.parse(decryptedData)
			setKey(decryptedDataParsed.key)
			setUser(decryptedDataParsed.user)
			localStorageServices.setLocalStorage(
				decryptedDataParsed.user.username,
				localStorageKey.nickname
			)

			return <p className='text-success-message'>Login successfully!</p>
		} catch {
			return <p className='text-error-message'>Invalid code!</p>
		}
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
		setIsKeyCreating(false)
		setIsKeyEditing(false)
		setSelectedKey(null)
		setKeyName(null)
		setKeyPassword(null)
		setCreating(false)
		setImporting(false)

		return <p className='text-success-message'>Logout successfully!</p>
	}

	const handleNewCancel = () => {
		setImporting(false)
		setCreating(false)
		setUser(null)
		return <p className='text-success-message'>Cancel successfully!</p>
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

		// key information
		username: (keyUsername: string) => handleTypeUsername(keyUsername),
		password: (keyPassword: string) => handleTypeKeyPassword(keyPassword),
		description: (keyDescription: string) =>
			handleTypeKeyDescription(keyDescription),

		// delete key
		'delete-key': (keyId: string) => handleDeleteKey(keyId),

		// show key
		'show-key': (keyId: string) => handleShowKey(keyId),

		// cancel
		cancel: () => handleCancel(),

		logout: () => handleLogout(),

		// help list
		help: (
			<div>
				<ul className='help-list'>
					<li>key-list: List all keys</li>
					<li>create-key: Create a new key</li>
					<li>delete-key: Delete a key</li>
					<li>show-key "key-id": Show password key</li>
					<li>edit-key: Edit a key</li>
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
			return handleCreatingData()
		},

		nickname: (nickname: string) => {
			return handleCreateNickname(nickname)
		},

		code: (code: string) => {
			return handleTypeCode(code)
		},
		cancel: () => handleNewCancel(),

		help: (
			<div>
				<ul className='help-list'>
					<li>import: Import data</li>
					<li>new: Create new data</li>
					<li>cancel: Cancel the data creation</li>
					<li>clear: Clear the terminal</li>
					<li>quit, exit: Quit the terminal</li>
				</ul>
			</div>
		),
	}

	const authCommandConfig = {
		code: (code: string) => {
			return handleLogin(code)
		},
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

const InActionMessage = () => {
	return (
		<div className='guide-message'>
			<p>Enter your key username: username "Your key username"</p>
			<p>Enter your key password: password "Your key password"</p>
			<p>
				Enter your key description: description "Your key description" (
				optional: please blank if you don't want to add description)
			</p>
			<p>cancel: Cancel the key creation</p>
		</div>
	)
}
