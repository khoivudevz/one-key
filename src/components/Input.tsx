import {cn} from '@/utils/cn'
import {InputHTMLAttributes} from 'react'
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	register?: UseFormRegister<FieldValues>
	errors?: FieldErrors<any>
	name?: string
	validation?: any
	label?: string
	value?: string
	type?: 'text' | 'password' | 'number'
}

const Input = ({
	label,
	value,
	register,
	type = 'text',
	name = '',
	validation = {},
	errors = {},
	...props
}: Props) => {
	const err = errors[name] as {message: string} | undefined

	return (
		<div className='lg:flex items-center justify-center space-x-[10px] space-y-[10px] lg:space-y-0'>
			{label && (
				<p
					className={cn(
						'text-xl text-white min-w-[200px]',
						err && 'text-red-500'
					)}
				>
					{label}
				</p>
			)}
			<input
				type={type}
				className={cn(
					'rounded-md bg outline-none border-[1px] border-solid border-white bg-[#272B36] text-white px-5 py-3',
					err && 'border-red-500'
				)}
				value={value}
				onKeyDown={(e) => {
					if (e.key === 'Enter') e.preventDefault()
				}}
				{...(register && register(name, validation))}
				{...props}
			/>
			{err && err?.message && (
				<p className='text-red-500'>{err?.message || ''}</p>
			)}
		</div>
	)
}

export default Input
