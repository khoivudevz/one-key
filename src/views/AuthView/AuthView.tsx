import GetCommandConfig from '@/configs/command.config'
import GetPromptConfig from '@/configs/prompt.config'
import GetWelcomeMessage from '@/configs/welcome-message.config'
import useUserStore from '@/store/useUser.store'
import {ReactTerminal} from 'react-terminal'

const AuthView = () => {
	const {authLoading} = useUserStore()

	return (
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
			enableInput={!authLoading}
		/>
	)
}

export default AuthView
