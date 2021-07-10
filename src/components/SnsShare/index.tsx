import React, { FC } from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const SNSShare: FC<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton title={title} via="tomoki_miyauci" url={url}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon title={title} size={40} round />
      </LinkedinShareButton>

      <LineShareButton url={url}>
        <LineIcon size={40} round />
      </LineShareButton>
    </>
  )
}

export default SNSShare
