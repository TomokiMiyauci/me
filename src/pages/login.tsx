import SignIn from '@/components/SignIn'
import homeOutlined from '@iconify/icons-ant-design/home-outlined'
import { Icon } from '@iconify/react/dist/offline'
import { navigate } from 'gatsby'
import Tooltip from '@/components/Tooltip'

import type { FC } from 'react'
import type { PageProps } from 'gatsby'

const Login: FC<PageProps> = ({ location }) => {
  const redirect = new URLSearchParams(location.search).get('redirect')
  return (
    <>
      <main className="h-screen w-screen flex justify-center">
        <SignIn redirect={redirect ?? '/'} />
      </main>

      <span className="fixed top-4 left-4 ">
        <Tooltip tooltip="Home">
          <button
            onClick={() => navigate('/')}
            className="btn-circle p-2 transition duration-300"
          >
            <Icon icon={homeOutlined} className="w-7 h-7" />
          </button>
        </Tooltip>
      </span>
    </>
  )
}

export default Login
