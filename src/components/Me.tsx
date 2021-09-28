import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'

const Me: FC = () => {
  return (
    <div className="md:flex md:space-x-6 mb-6">
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
            rel="noopener"
            target="_blank"
            className="hidden md:inline hover:underline ml-2 text-2xl text-accent"
          >
            <span>@tomoki_miyauci</span>
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
            className="hover:text-accent transition-colors duration-300"
            href="https://github.com/TomokiMiyauci"
            rel="noopener"
            target="_blank"
          >
            <IconSkeltonLoader
              icon={() => import('@iconify-icons/uil/github-alt')}
              className="w-8 h-8"
              fallbackClassName="rounded-full"
            />
          </a>
          <a
            title="Twitter"
            className="hover:text-accent transition-colors duration-300"
            href="https://twitter.com/tomoki_miyauci"
            rel="noopener"
            target="_blank"
          >
            <IconSkeltonLoader
              icon={() => import('@iconify-icons/uil/twitter-alt')}
              className="w-8 h-8"
              fallbackClassName="rounded-full"
            />
          </a>

          <a
            title="Mail"
            className="hover:text-accent transition-colors duration-300"
            href="mailto:contact&#64;miyauchi.dev"
          >
            <IconSkeltonLoader
              icon={() => import('@iconify-icons/feather/at-sign')}
              className="w-8 h-8"
              fallbackClassName="rounded-full"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Me
