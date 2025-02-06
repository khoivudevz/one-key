import useActionStore from '@/store/useAction.store'
import Modal from '../Modal'
import Input from '../../Input'
import {useForm} from 'react-hook-form'
import useKeyStore from '@/store/useKey.store'
import {v4 as uuidv4} from 'uuid'

import {useEffect, useState} from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const KeyModal = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		setValue,
		reset,
	} = useForm()

	const {
		isKeyCreating,
		isKeyEditing,
		selectedKey,
		reset: resetAction,
	} = useActionStore()

	const {key, setKey} = useKeyStore()

	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (selectedKey && key) {
			const selectedKeyData = key.find((item) => item.id === selectedKey)
			if (!selectedKeyData) return

			setValue('name', selectedKeyData.username)
			setValue('password', selectedKeyData.password)
			setValue('description', selectedKeyData.description)
		}
	}, [selectedKey, key])

	const onSubmit = (data: any) => {
		if (!key) return

		if (isKeyCreating) {
			const newKey = {
				id: uuidv4(),
				username: data.name,
				password: data.password,
				description: data.description,
			}
			setKey([...key, newKey])
			resetAction()
			reset()
		} else if (selectedKey) {
			const newKey = {
				id: selectedKey,
				username: data.name,
				password: data.password,
				description: data.description,
			}
			setKey(key.map((item) => (item.id === selectedKey ? newKey : item)))
			resetAction()
			reset()
		}
	}

	return (
		<Modal isOpen={isKeyCreating || isKeyEditing}>
			<div className='relative bg-primary p-5 rounded-md'>
				<div className='flex items-center justify-between'>
					<p className='text-xl text-white'>
						{isKeyCreating ? 'Create a key' : 'Edit a key'}
					</p>
				</div>
				<form className='space-y-[20px] mt-[20px] flex flex-col items-start'>
					<Input
						label='Key name'
						name='name'
						register={register}
						errors={errors}
						validation={{
							required: true,
						}}
						autoFocus
					/>
					<div className='flex items-center justify-between space-x-[10px]'>
						<Input
							label='Key password'
							register={register}
							errors={errors}
							validation={{
								required: true,
							}}
							type={showPassword ? 'text' : 'password'}
							name='password'
						/>
						{showPassword ? (
							<FaEye
								className='w-5 h-5 text-white cursor-pointer'
								onClick={() => setShowPassword(false)}
							/>
						) : (
							<FaEyeSlash
								className='w-5 h-5 text-white cursor-pointer'
								onClick={() => setShowPassword(true)}
							/>
						)}
					</div>
					<Input
						label='Description'
						register={register}
						name='description'
						errors={errors}
						validation={{
							required: true,
						}}
					/>
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
						{isKeyCreating ? 'Create' : 'Edit'}
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default KeyModal
