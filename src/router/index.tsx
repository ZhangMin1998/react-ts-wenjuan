import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const MainLayout = lazy(() => import('../layouts/MainLayout'))
const ManageLayout = lazy(() => import('../layouts/ManageLayout'))
const QuestionLayout = lazy(() => import('../layouts/QuestionLayout'))
const Home = lazy(() => import('../pages/Home/Home'))
const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const NotFound = lazy(() => import('../pages/404/404'))
const List = lazy(() => import('../pages/manage/List'))
const Trash = lazy(() => import('../pages/manage/Trash'))
const Star = lazy(() => import('../pages/manage/Star'))
const Edit = lazy(() => import('../pages/question/edit'))
const Stat = lazy(() => import('../pages/question/stat'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />
          },
          {
            path: 'trash',
            element: <Trash />
          },
          {
            path: 'star',
            element: <Star />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  }
])

export default router