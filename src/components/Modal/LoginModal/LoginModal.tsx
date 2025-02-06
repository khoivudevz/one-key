import useActionStore from '@/store/useAction.store'
import Modal from '../Modal'
import Input from '../../Input'
import {useForm} from 'react-hook-form'
import useKeyStore from '@/store/useKey.store'
import {useState} from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {decrypt} from '@/utils/auth'
import useUserStore from '@/store/useUser.store'
import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'

const LoginModal = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm()
	const localData = localStorageServices.getLocalStorage<string>(
		localStorageKey.data
	)
	const {isLogin, reset: resetAction} = useActionStore()

	const {setKey} = useKeyStore()
	const {setUser, setCode} = useUserStore()

	const [showCode, setShowCode] = useState(false)

	const onSubmit = (data: any) => {
		if (!localData) return
		try {
			const decryptedData = decrypt(localData, data.code)
			if (!decryptedData.length) return alert('Invalid code!')
			setCode(data.code)
			const decryptedDataParsed = JSON.parse(decryptedData)
			setKey(decryptedDataParsed.key)
			setUser(decryptedDataParsed.user)
			localStorageServices.setLocalStorage(
				decryptedDataParsed.user.username,
				localStorageKey.nickname
			)
			resetAction()
			reset()
		} catch {
			alert('Invalid code!')
		}
	}

	return (
		<Modal isOpen={isLogin}>
			<div className='relative bg-primary p-5 rounded-md'>
				<div className='flex items-center justify-between'>
					<p className='text-xl text-white'>Unlock data</p>
				</div>
				<form className='space-y-[20px] mt-[20px] flex flex-col items-start'>
					<div className='flex items-center justify-between space-x-[10px]'>
						<Input
							label='Code'
							register={register}
							errors={errors}
							validation={{
								required: true,
							}}
							type={showCode ? 'text' : 'password'}
							name='code'
							autoFocus
						/>
						{showCode ? (
							<FaEye
								className='w-5 h-5 text-white cursor-pointer'
								onClick={() => setShowCode(false)}
							/>
						) : (
							<FaEyeSlash
								className='w-5 h-5 text-white cursor-pointer'
								onClick={() => setShowCode(true)}
							/>
						)}
					</div>
				</form>
				<div className='flex items-center justify-center space-x-[10px] mt-[20px]'>
					<button
						className='bg-yellow-500 text-white px-5 py-3 rounded-md w-1/2'
						onClick={() => {
							resetAction()
							reset()
						}}
					>
						Cancel
					</button>
					<button
						className='bg-green-500 text-white px-5 py-3 rounded-md w-1/2'
						onClick={handleSubmit(onSubmit)}
					>
						Unlock
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default LoginModal
