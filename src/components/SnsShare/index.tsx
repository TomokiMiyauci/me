import React, { FC } from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditIcon,
  RedditShareButton,
  HatenaShareButton,
  HatenaIcon
} from 'react-share'

const SNSShare: FC<{ title: string; url: string }> = ({ title, url }) => {
  return (
    <>
      <FacebookShareButton title={title} url={url}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton title={title} via="tomoki_miyauci" url={url}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton title={title} url={url}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>

      <RedditShareButton url={url} title={title}>
        <RedditIcon size={40} round />
      </RedditShareButton>

      <LineShareButton title={title} url={url}>
        <LineIcon size={40} round />
      </LineShareButton>

      <HatenaShareButton title={title} url={url}>
        <HatenaIcon size={40} round />
      </HatenaShareButton>
    </>
  )
}

export default SNSShare
