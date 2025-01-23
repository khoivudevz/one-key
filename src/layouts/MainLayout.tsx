type Props = {
	component: React.ReactNode
}

const MainLayout = ({component}: Props) => {
	return <div className='min-h-dvh bg-primary'>{component}</div>
}

export default MainLayout
