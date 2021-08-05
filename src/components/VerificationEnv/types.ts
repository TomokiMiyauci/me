type VerificationType = 'os' | 'browser' | 'package'

type OS = {
  type: 'os'
  name: 'macOS'
  family: 'Big Sur'
  version: `${number}.${number}.${number}`
}

type Browser = {
  type: 'browser'
  name: 'chrome'
  version: string
}

type Runtime = 'node' | 'deno'

type Package = {
  name: string
  version: string
}

type Packages = {
  [k in Runtime]?: Package[]
}

type Verification = {
  os?: OS
  browser?: Browser
  packages?: Packages
}

export type { Verification, OS, Browser, Package, Packages, Runtime }
