import Modal from '@/components/Modal/Modal'
import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'
import useKeyStore from '@/store/useKey.store'
import useUserStore from '@/store/useUser.store'

import {decrypt} from '@/utils/auth'
import {useEffect, useState} from 'react'
import {FileUploader} from 'react-drag-drop-files'

const UploadFileModal = () => {
	const {setKey} = useKeyStore()
	const {setUser, setCode, importing, setImporting, setCreating} =
		useUserStore()

	const [file, setFile] = useState<File | null>(null)
	const [unlockCode, setUnlockCode] = useState<string>('')
	const [encrypted, setEncrypted] = useState<string | null>(null)

	const handleChange = (file: File) => {
		setFile(file)
	}

	const handleUnlock = () => {
		if (!encrypted) return

		try {
			const decryptedData = decrypt(encrypted, unlockCode)
			if (!decryptedData.length) {
				alert('Invalid code!')
				return
			}

			setCode(unlockCode)
			const decryptedDataParsed = JSON.parse(decryptedData)
			setKey(decryptedDataParsed.key)
			setUser(decryptedDataParsed.user)
			localStorageServices.setLocalStorage(
				decryptedDataParsed.user.nickname,
				localStorageKey.nickname
			)

			setImporting(false)
			setFile(null)
			setEncrypted(null)
			setUnlockCode('')
		} catch {
			alert('Invalid code!')
		}
	}

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				try {
					const text = e.target?.result as string
					setEncrypted(text)
				} catch (error) {
					console.error('Error parsing file:', error)
				}
			}

			reader.onerror = (error) => {
				console.error('Error reading file:', error)
			}

			try {
				reader.readAsText(file)
			} catch (error) {
				console.error('Error starting file read:', error)
			}
		}
	}, [file])

	const handleCancel = () => {
		setFile(null)
		setEncrypted(null)
		setUnlockCode('')
		setImporting(false)
		setCreating(false)
		setUser(null)
	}

	return (
		<Modal isOpen={importing}>
			<div className='relative'>
				{!file && (
					<FileUploader
						multiple={false}
						handleChange={handleChange}
						name='file'
						types={['txt']}
					/>
				)}

				{file && (
					<div>
						<div className='flex items-center justify-center space-x-[10px]'>
							<p className='text-xl text-white'>Code</p>:{' '}
							<input
								type='text'
								className='rounded-md bg outline-none border-[1px] border-solid border-white bg-[#272B36] text-white px-5 py-3'
								onChange={(e) => setUnlockCode(e.target.value)}
								value={unlockCode}
							/>
						</div>

						<div className='flex items-center justify-center space-x-[10px] mt-[20px]'>
							<button
								className='bg-green-500 text-white px-5 py-3 rounded-md w-1/2'
								onClick={() => {
									setFile(null)
									setEncrypted(null)
									setUnlockCode('')
								}}
							>
								Reupload
							</button>

							<button
								className='bg-yellow-500 text-white px-5 py-3 rounded-md w-1/2'
								onClick={handleUnlock}
							>
								Unlock
							</button>
						</div>
					</div>
				)}

				<button
					className='bg-primary-color text-white px-5 py-3 rounded-md text-center bg-red-500 w-full my-[30px]'
					onClick={handleCancel}
				>
					Cancel
				</button>
			</div>
		</Modal>
	)
}

export default UploadFileModal
