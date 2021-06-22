import React, { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Icon } from '@iconify/react'
import github from '@iconify-icons/uil/github-alt'
import twitter from '@iconify-icons/uil/twitter-alt'

const Me: FC = () => {
  return (
    <>
      <div className="md:flex md:space-x-6">
        <div
          className="border-8 bg-gradient-to-br from-purple-500 via-pink-300 to-amber-300 overflow-hidden inline-block h-[190px] w-[190px]"
          style={{ borderRadius: '40% 60% / 35% 30% 70% 65%' }}
        >
          <StaticImage
            alt="avatar"
            width={180}
            height={180}
            src="https://res.cloudinary.com/dz3vsv9pg/image/upload/v1623810032/logos/avatar.png"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl my-4 md:mb-6">
            Tomoki Miyauci
            <a
              href="https://twitter.com/tomoki_miyauci"
              target="_blank"
              className="hidden md:inline text-2xl"
            >
              (@tomoki_miyauci)
            </a>
          </h1>

          <p>
            Hi 👋 I'm a Software engineer with over 2 years of experience. I'm a
            NEET. If you want to ask me for a job or want to work together on an
            OSS project, contact me.
          </p>
          <p>I like travelling, capturing photos and kitchen garden.</p>

          <div className="my-4 space-x-4">
            <a
              title="GitHub"
              href="https://github.com/TomokiMiyauci"
              target="_blank"
            >
              <Icon className="w-8 h-8" icon={github}></Icon>
            </a>
            <a
              title="Twitter"
              href="https://twitter.com/tomoki_miyauci"
              target="_blank"
            >
              <Icon className="w-8 h-8" icon={twitter}></Icon>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Me
