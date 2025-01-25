import GetCommandConfig from '@/configs/command.config'
import GetPromptConfig from '@/configs/prompt.config'
import GetWelcomeMessage from '@/configs/welcome-message.config'
import useData from '@/hooks/useData'
import useUserStore from '@/store/useUser.store'
import {ReactTerminal} from 'react-terminal'

import {useEffect, useState, useRef} from 'react'

import UploadFileModal from './components/UploadFileModal'

const HomeView = () => {
	useData()
	const {importing} = useUserStore()

	const containerRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState<number>(0)

	// Separate useEffect for scrolling
	useEffect(() => {
		const scrollToBottom = () => {
			if (containerRef.current) {
				console.log(
					'🚀~containerRef.current.scrollHeight :',
					containerRef.current.scrollHeight
				)
				setTimeout(() => {
					containerRef.current?.scrollTo({
						top: containerRef.current.scrollHeight,
						behavior: 'smooth',
					})
				}, 100) // Small delay to ensure content is rendered
			}
		}

		scrollToBottom()
	}, [containerHeight]) // Trigger when height changes

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const height = entry.contentRect.height
				setContainerHeight(height)
			}
		})

		if (containerRef.current) {
			observer.observe(containerRef.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<div ref={containerRef} className='min-h-dvh overflow-auto '>
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
				enableInput={!importing}
				errorMessage={
					<p className='text-error-message'>
						Not found command, type "help" to view all available commands.
					</p>
				}
			/>

			<UploadFileModal />
		</div>
	)
}

export default HomeView
