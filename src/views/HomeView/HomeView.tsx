import GetCommandConfig from '@/configs/command.config'
import GetPromptConfig from '@/configs/prompt.config'
import GetWelcomeMessage from '@/configs/welcome-message.config'
import useData from '@/hooks/useData'
import useUserStore from '@/store/useUser.store'
import {ReactTerminal} from 'react-terminal'
import UploadFileModal from './components/UploadFileModal'
import KeyModal from '@/components/Modal/KeyModal/KeyModal'
import UserModal from '@/components/Modal/UserModal/UserModal'

import useActionStore from '@/store/useAction.store'
import LoginModal from '@/components/Modal/LoginModal/LoginModal'

const HomeView = () => {
	useData()
	const {importing, editing, creating} = useUserStore()
	const {isKeyCreating, isKeyEditing, isLogin} = useActionStore()

	return (
		<div className='min-h-dvh overflow-auto '>
			<ReactTerminal
				commands={GetCommandConfig()}
				themes={{
					'my-custom-theme': {
						themeBGColor: '#272B36',
						themeToolbarColor: '#DBDBDB',
						themeColor: '#FFFEFC',
						themePromptColor: '#a917a8',
					},
				}}
				theme='my-custom-theme'
				showControlBar={false}
				showControlButtons
				prompt={GetPromptConfig()}
				welcomeMessage={GetWelcomeMessage()}
				enableInput={
					!importing &&
					!isKeyCreating &&
					!isKeyEditing &&
					!editing &&
					!isLogin &&
					!creating
				}
				errorMessage={
					<p className='text-error-message'>
						Not found command, type "help" to view all available commands.
					</p>
				}
			/>

			<UploadFileModal />
			<KeyModal />
			<UserModal />
			<LoginModal />
		</div>
	)
}

export default HomeView
