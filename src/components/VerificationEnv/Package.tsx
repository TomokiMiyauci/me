import React, { FC } from 'react'
import { Package, Packages, Runtime } from '@/components/VerificationEnv/types'
import { isUndefined } from '@/utils/is'
import deno from '@iconify-icons/logos/deno'
import node from '@iconify-icons/logos/nodejs-icon'
import type { IconifyIcon } from '@iconify/react'
import { Icon } from '@iconify/react/dist/offline'

const getIcon = (runtime: Runtime): IconifyIcon => {
  switch (runtime) {
    case 'deno': {
      return deno
    }

    case 'node': {
      return node
    }
  }
}

const Pkg: FC<Package> = ({ name, version }) => {
  return (
    <a
      href={`https://www.npmjs.com/package/${name}/v/${version}`}
      target="_blank"
      rel="noreferrer"
      className="hover:underline hover:text-accent transition-colors duration-200"
      title={`${name}@${version}`}
    >
      <span>{name}</span>@<span>{version}</span>
    </a>
  )
}

const hasPackage = (packages: Packages): boolean =>
  !!packages.node || !!packages.deno

const PackageComponent: FC<Packages> = ({ node, deno }) => {
  return (
    <>
      {hasPackage({ node, deno }) && (
        <>
          <h3 className="ml-2">Package</h3>
          <div className="ml-4">
            {!isUndefined(node) && (
              <div>
                <h3 className="space-x-2">
                  <Icon icon={getIcon('node')} className="w-5 h-5" />
                  <span className="align-middle">Node</span>
                </h3>

                <ul className="ml-4">
                  {node.map((props) => {
                    return (
                      <li key={`${props.name}@${props.version}`}>
                        <Pkg {...props} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {!isUndefined(deno) && (
              <div>
                <h3>Deno</h3>

                {deno.map((props) => {
                  return <Pkg {...props} />
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default PackageComponent
