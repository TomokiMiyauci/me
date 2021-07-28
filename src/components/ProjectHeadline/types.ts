type Language = 'ts'

type Project = {
  title: string
  description: string
  hero: string
  repo: string
  npm?: string
} & (Frontend | Universal)

type Frontend = {
  type: 'frontend'
  framework: 'react'[]
}

type Universal = {
  type: 'universal'
  language: Language
  nestland?: string
  runtime: ('deno' | 'node')[]
}

export type { Project }
