import { FC } from 'react'
import type { Project } from '@/components/ProjectHeadline/types'
import { Icon } from '@iconify/react/dist/offline'
import typescript from '@iconify-icons/logos/typescript-icon'
import deno from '@iconify-icons/logos/deno'
import node from '@iconify-icons/logos/nodejs-icon'
import github from '@iconify-icons/logos/github-icon'
import npmIcon from '@iconify-icons/logos/npm-icon'

type ProjectProps = { className?: string } & Project

const ProjectHeadline: FC<ProjectProps> = ({
  className,
  title,
  description,
  repo,
  npm,
  type
}) => {
  return (
    <article
      title={title}
      className={`rounded-md flex flex-col from-accent to-gray-50 dark:via-blue-gray-700 via-gray-200 dark:to-blue-gray-900 bg-gradient-to-t hover:shadow-md overflow-hidden transition duration-300 ${className}`}
    >
      <div className="px-2 sm:px-4 flex-1 space-y-1 sm:space-y-2 py-2 sm:py-3">
        <h2 className="text-3xl text-accent">{title}</h2>
        <p className="text-xl">{description}</p>
      </div>
      <div className="p-2 sm:p-4">
        <div className="text-right space-x-4">
          {npm && (
            <a href={npm} target="_blank">
              <Icon icon={npmIcon} className="w-8 h-8" />
            </a>
          )}
          <a href={repo} target="_blank">
            <Icon icon={github} className="w-8 h-8" />
          </a>
        </div>
        {type === 'universal' ? (
          <div className="flex justify-between">
            <div className="my-2">
              <h3 className="py-1 text-xs font-light">Language</h3>
              <Icon icon={typescript} className="w-8 h-8" />
            </div>
            <div className="my-2">
              <h3 className="text-right py-1 text-xs font-light">Runtime</h3>
              <div className="space-x-4">
                <Icon icon={deno} className="w-8 h-8  rounded-full" />
                <Icon icon={node} className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </article>
  )
}

export default ProjectHeadline
