import React, { FC } from 'react'
import ProjectHeadline from '@/components/ProjectHeadline'

const Projects: FC = () => {
  return (
    <>
      <section className="-mx-4 text-center heropattern-jigsaw-gray-200 dark:heropattern-jigsaw-gray-800 p-8 md:p-20">
        <h1 className="text-5xl p-2">Projects</h1>
        <p className="text-3xl">My project packages</p>
      </section>
      <div className="container my-8 mx-auto">
        <section>
          <ProjectHeadline />
        </section>
      </div>
    </>
  )
}

export default Projects
