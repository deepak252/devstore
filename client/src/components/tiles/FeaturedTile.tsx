import { Link } from 'react-router-dom'
import StarIcon from '@/assets/icons/star.svg?react'
import Shimmer from '../Shimmer'

type FeaturedTileProps = {
  redirectUrl: string
  name: string
  featuredImageUrl: string
  iconUrl: string
  rating?: string
  owner: Record<string, any>
}

const FeaturedTile = ({
  redirectUrl,
  name,
  featuredImageUrl,
  iconUrl,
  rating,
  owner,
}: FeaturedTileProps) => {
  return (
    <Link
      to={redirectUrl}
      className="flex flex-col overflow-hidden rounded-xl m-1 w-[350px] max-lg:w-[315px] max-md:w-[280px] hover:bg-gray-1100 hover:opacity-80"
    >
      <div className="bg-[#4a4a4adc]">
        <img
          src={featuredImageUrl}
          className="aspect-video size-full "
          alt="feat_image"
        />
      </div>
      <div className="flex items-center">
        <img
          className="size-10 bg-white rounded-full m-2 me-0 aspect-square max-lg:size-9 max-md:size-8"
          src={iconUrl}
          alt="icon"
        />
        <div className="m-2 overflow-hidden">
          <p className="text-gray-800 font-medium overflow-ellipsis">{name}</p>
          <p className="text-sm text-gray-700">
            {owner?.name || owner?.username}
          </p>
          {rating && (
            <p className="">
              {rating} <StarIcon className="size-4" />
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export const FeaturedTileShimmer = () => {
  return (
    <Shimmer className="rounded-xl w-[350px] max-lg:w-[315px] max-md:w-[280px]" />
  )
}

export default FeaturedTile
