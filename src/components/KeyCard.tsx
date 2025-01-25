import {Key} from '@/types/common.type'

type Props = {
	data: Key
	isShowPassword?: boolean
}

const KeyCard = ({data, isShowPassword = false}: Props) => {
	return (
		<div className='guide-message'>
			<p>ID: {data.id}</p>
			<p>Username: {data.username}</p>
			<p>Description: {data.description}</p>
			{isShowPassword && <p>Password: {data.password}</p>}
		</div>
	)
}

export default KeyCard
