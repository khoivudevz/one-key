import ReactModal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'transparent',
		border: 'none',
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
}

type Props = {
	isOpen: boolean
	children: React.ReactNode
}

const Modal = ({isOpen, children}: Props) => {
	return (
		<ReactModal
			isOpen={isOpen}
			style={customStyles}
			contentLabel='Example Modal'
		>
			{children}
		</ReactModal>
	)
}

export default Modal
