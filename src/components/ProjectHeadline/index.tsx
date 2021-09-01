import { FC } from 'react'
import ProjectHeadline from '@/components/ProjectHeadline/ProjectHeadline'
import { projects } from '@/components/ProjectHeadline/constants'

const Index: FC = () => {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-10">
      {projects.map((project) => {
        return (
          <li key={project.title}>
            <ProjectHeadline {...project} className="h-full" />
          </li>
        )
      })}
    </ul>
  )
}

export default Index
