import Modal from '../Modal'
import Input from '../../Input'
import {useForm} from 'react-hook-form'
import useKeyStore from '@/store/useKey.store'
import useUserStore from '@/store/useUser.store'
import {
	localStorageKey,
	localStorageServices,
} from '@/services/localStorage.service'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {useEffect, useState} from 'react'

const UserModal = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
		setValue,
	} = useForm()

	const {
		creating,
		setCode,
		setUser,
		setCreating,
		setEditing,
		editing,
		code,
		user,
	} = useUserStore()

	const {setKey} = useKeyStore()

	const [showCode, setShowCode] = useState(false)

	useEffect(() => {
		if (editing) {
			setValue('nickname', user?.nickname)
			setValue('code', code)
		}
	}, [editing])

	const onSubmit = (data: any) => {
		setUser({nickname: data.nickname})
		setCode(data.code)

		localStorageServices.setLocalStorage(
			data.nickname,
			localStorageKey.nickname
		)

		if (creating) {
			localStorageServices.setLocalStorage([], localStorageKey.data)
			setKey([])
		}
		setCreating(false)
		setShowCode(false)
		setEditing(false)
		reset()
	}

	return (
		<Modal isOpen={creating || editing}>
			<div className='relative bg-primary p-5 rounded-md'>
				<div className='flex items-center justify-between'>
					<p className='text-xl text-white'>
						{creating ? 'Create new user' : 'Edit user'}
					</p>
				</div>
				<form className='space-y-[20px] mt-[20px] flex flex-col items-start'>
					<Input
						label='Nickname'
						name='nickname'
						register={register}
						errors={errors}
						validation={{
							required: true,
						}}
						autoFocus
					/>
					<div className='flex flex-col items-start'>
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
						<p className='text-sm text-white mt-[10px]'>
							This code will be use to authenticate your account. Please
							remember it.
						</p>
					</div>
				</form>
				<div className='flex items-center justify-center space-x-[10px] mt-[20px]'>
					<button
						className='bg-yellow-500 text-white px-5 py-3 rounded-md w-1/2'
						onClick={() => {
							setCreating(false)
							setEditing(false)
							setShowCode(false)
							reset()
						}}
					>
						Cancel
					</button>
					<button
						className='bg-green-500 text-white px-5 py-3 rounded-md w-1/2'
						onClick={handleSubmit(onSubmit)}
					>
						{creating ? 'Create' : 'Edit'}
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default UserModal
