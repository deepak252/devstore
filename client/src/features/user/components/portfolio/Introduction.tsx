import ProfileImage from '@/components/ProfileImage'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?react'
import DownloadIcon from '@/assets/icons/download.svg?react'
import { User } from '../../user.types'

const Introduction = ({ user }: { user: User }) => {
  return (
    <section className="flex flex-col items-center gap-5 text-center mt-10">
      <ProfileImage
        imgUrl={user.profileImage?.url}
        className="!size-32"
        alt="profile_pic"
      />
      <h1 className="mt-2">
        Hello, <br /> I&apos;m {user.fullname || user.username}.
      </h1>
      <p className="text-2xl leading-9 text-neutral-600 font-light">
        {user.title} <br /> {user.headline}
      </p>
      <div className="flex items-center gap-4 py-8 max-sm:flex-col">
        <a href="#contact" className="btn-filled rounded-full">
          Connect
          <ArrowRightIcon className="size-6 fill-white dark:fill-dark" />
        </a>
        <a href="/resume.pdf" download className="btn-outlined rounded-full">
          Resume
          <DownloadIcon className="size-6 fill-primary" />
        </a>
      </div>
    </section>
  )
}

export default Introduction
