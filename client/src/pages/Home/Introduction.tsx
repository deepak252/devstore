import { useRef } from 'react'
import AndroidImage from '@/assets/images/android.png'
import IosImage from '@/assets/images/apple.png'
import WebImage from '@/assets/images/web.png'

const Introduction = () => {
  const endRef = useRef(null)
  return (
    <div className="">
      <div className="flex items-center max-lg:block">
        <div className="text-center m-6">
          <h1 className="text-gray-900 m-2 max-lg:text-4xl max-lg:leading-normal">
            Centralized Hub for App, Website, and Game Distribution
          </h1>
          <p className="text-2xl text-gray-700 font-light leading-normal m-1 max-lg:text-lg">
            Dev Store brings your creations to the world, all in one place. Join
            and revolutionize the way you share and distribute your digital
            innovations.
          </p>
        </div>
        <div>
          <div className="relative h-[300px] w-[300px] max-lg:h-auto max-lg:w-auto max-lg:flex-center max-lg:py-10">
            <img
              className="size-32 max-lg:size-24 absolute bottom-0 left-0 max-lg:static max-lg:mx-6"
              src={AndroidImage}
              alt="android"
            />
            <img
              className="size-32 max-lg:size-24 absolute bottom-0 right-0 max-lg:static max-lg:mx-6"
              src={IosImage}
              alt="ios"
            />
            <img
              className="size-32 max-lg:size-24 absolute top-0 left-1/2 transform -translate-x-1/2 max-lg:static max-lg:transform-none max-lg:mx-6"
              src={WebImage}
              alt="web"
            />
          </div>
        </div>
      </div>
      <div className="flex-center mt-8">
        <button className="btn-filled m-2 px-7 py-4">Get Started</button>
        <button className="btn-outlined m-2 px-7 py-4">Explore</button>
      </div>
      <div ref={endRef}></div>
      <hr className="my-16" />
    </div>
  )
}

export default Introduction
