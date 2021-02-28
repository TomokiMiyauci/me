import { Cloudinary } from 'cloudinary-core'
import { stringify } from 'srcset'

const cl = new Cloudinary({
  cloud_name: 'dz3vsv9pg',
  secure: true
})

const getSrcset = (img: string, set: number[]): string => {
  const srcset = set.map((size) => {
    const url = cl.url(img, {
      width: size,
      quality: 'auto',
      fetchFormat: 'auto',
      crop: 'scale'
    })

    return {
      url,
      width: size
    }
  })

  return stringify(srcset)
}

export { getSrcset }
