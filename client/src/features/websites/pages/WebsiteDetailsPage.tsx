import CustomCarousel from '@/components/CustomCarousel'
import HeartIcon from '@/assets/icons/heart-outlined.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import CodeIcon from '@/assets/icons/code.svg?react'
import RedirectIcon from '@/assets/icons/redirect.svg?react'
import { Link } from 'react-router-dom'

const websiteDetails = {
  _id: '65b50c32511565e4a72f83bd',
  name: 'Ecommerce Web',
  description:
    'Online store Ecommerce Online store EcommerceOnline store Ecommerce Online store EcommerceOnline store Ecommerce Online store Ecommerce',
  icon: 'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
  banner:
    'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
  images: [
    'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
    'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
  ],
  categories: ['Ecommerce', 'Other'],
  owner: {
    _id: '65afdf07b6a9c019bf478b94',
    username: 'deepak1',
    fullName: 'Deepak User',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s',
  },
  platform: 'android',
  demoUrl: 'https://www.google.com',
  sourceCodeUrl: 'https://www.google.com',
}
function WebsiteDetailsPage() {
  //   const dispatch = useAppDispatch()

  return (
    <div className="p-4 lg:p-6">
      <div className="flex gap-6">
        <img
          className="card size-20 aspect-square bg-white md:size-28 lg:size-32"
          src={websiteDetails.icon}
          alt={`${websiteDetails.name}_icon`}
        />
        <div className="flex-grow">
          <div className="flex items-start justify-between w-full">
            <div>
              <h4 className="mb-2 max-sm:text-xl">{websiteDetails.name}</h4>
              <div className="flex gap-2 items-center">
                <img
                  className="size-8 rounded-full aspect-square"
                  src={websiteDetails.owner.imgUrl}
                  alt="icon"
                />
                <Link
                  to={`/u/${websiteDetails.owner.username}`}
                  className="text-neutral-600 text-sm font-medium overflow-ellipsis"
                >
                  {websiteDetails.owner.fullName}
                </Link>
              </div>
            </div>
            <div className="flex">
              <button
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <HeartIcon className="size-10 rounded-full p-2" />
              </button>
              <button
                className="icon-button"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <ShareIcon className="size-10 rounded-full p-1.5" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <a
              href={websiteDetails.demoUrl}
              target="_blank"
              className="btn-filled flex-center gap-2 rounded-full !py-2.5"
            >
              Demo <RedirectIcon className="fill-white size-4" />
            </a>
            <a
              href={websiteDetails.demoUrl}
              target="_blank"
              className="btn-outlined flex-center gap-2 rounded-full !py-2.5"
            >
              Code <CodeIcon className="fill-primary size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <CustomCarousel
          itemWidth={30}
          itemClassName="min-w-80 h-96 sm:h-96 md:h-96"
          autoPlay={false}
          loop={false}
          dragFree={true}
        />
      </div>
      <div className="mt-12">
        <h6 className="mb-4">Description</h6>
        <p className="text-neutral-600 text-15">{websiteDetails.description}</p>
      </div>
      <div className="mt-12">
        <h6 className="mb-4">Related To</h6>
        <div className="flex gap-2 mb-4">
          {websiteDetails.categories.map((cat) => (
            <div key={cat} className="chip py-1">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebsiteDetailsPage
