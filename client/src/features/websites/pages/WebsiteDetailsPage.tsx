import CustomCarousel from '@/components/CustomCarousel'

const websiteDetails = {
  _id: '65b50c32511565e4a72f83bd',
  name: 'Ecommerce App',
  description: 'Online store',
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
      'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
  },
  platform: 'android',
  demoUrl: 'www.google.com',
  sourceCodeUrl: 'www.google.com',
}
function WebsiteDetailsPage() {
  //   const dispatch = useAppDispatch()

  return (
    <div className="flex gap-4 p-4 lg:p-6">
      <div className="w-1/2">
        <CustomCarousel />
      </div>
      <div className="w-1/2">
        <h4 className="mb-4">{websiteDetails.name}</h4>
        <div className="flex gap-2 mb-4">
          {websiteDetails.categories.map((cat) => (
            <div key={cat} className="chip py-1">
              {cat}
            </div>
          ))}
        </div>
        <div>
          <p>{websiteDetails.description}</p>
        </div>
      </div>
    </div>
  )
}

export default WebsiteDetailsPage
