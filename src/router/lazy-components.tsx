import {lazy} from 'react'

export const HomePageLazy = lazy(() => import('@/pages/HomePage/HomePage'))
export const AuthPageLazy = lazy(() => import('@/pages/AuthPage/AuthPage'))
export const MainLayoutLazy = lazy(() => import('@/layouts/MainLayout'))
