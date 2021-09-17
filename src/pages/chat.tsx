import { Icon } from '@iconify/react/dist/offline'
import bxWorld from '@iconify/icons-bx/bx-world'
import { Link } from 'gatsby'

import type { FC } from 'react'
import type { PageProps } from 'gatsby'

const Main: FC = () => {
  return (
    <>
      <p>This is WIP</p>
      <div className="p-4">
        <Link to="/chat/public/" className="flex space-x-3">
          <div>
            <Icon className="w-12 h-12 text-accent" icon={bxWorld} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Public Chat</h3>
            <p className="text-gray-400">Public messaging room</p>
          </div>
        </Link>
      </div>
    </>
  )
}

const Index: FC<PageProps> = () => {
  return <Main />
}

export default Index
