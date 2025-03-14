// import Carousel, { CarouselShimmer } from '@/components/Carousel'
import WebsiteForm from '../components/WebsiteForm'
import GridView from '@/components/GridView'
import AddIcon from '@/assets/icons/add.svg?react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toggleCreateWebsiteFormOpen } from '../websitesSlice'
import { WebsiteTileMemo } from '@/components/tiles/WebsiteTile'
import CustomCarousel from '@/components/CustomCarousel'

function WebsitesPage() {
  const dispatch = useAppDispatch()
  const isFormOpen = useAppSelector(
    (state) => state.websites.websiteForm.isOpen
  )

  const appItems = [
    {
      _id: '65b50c32511565e4a72f83bd',
      name: 'Todo App',
      description: 'Dummy Todo App',
      icon: 'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_27_13_59_14_847_710591310.png?alt=media&token=de445319-f0a3-49dc-bae1-309775e9bfaa',
      categories: ['Other'],
      owner: {
        _id: '65afdf07b6a9c019bf478b94',
        username: 'user2',
      },
      platform: 'android',
    },
    {
      _id: '65b7f51fd8c3a08e5cbe2d8d',
      name: 'Notes App',
      description: 'Note Taking Application',
      icon: 'https://firebasestorage.googleapis.com/v0/b/dev-store-1865e.appspot.com/o/icons%2Fuser2_2024_01_29_18_57_35_484_336555821.png?alt=media&token=7337a831-3c3f-445e-b48b-18a43aabdb5e',
      categories: ['Productivity', 'Personalization'],
      owner: {
        _id: '65afdf07b6a9c019bf478b94',
        username: 'user2',
      },
      platform: 'android',
    },
  ]
  const handleToggleWebsiteFormOpen = () => {
    dispatch(toggleCreateWebsiteFormOpen())
  }
  return (
    <div className="">
      {/* <Carousel items={carouselItems}></Carousel> */}
      <div className="pt-4">
        {/* <CustomCarousel /> */}
        {/* <CustomCarousel2 /> */}
        <CustomCarousel />
      </div>
      {/* <CarouselShimmer count={3} /> */}
      <div className="mx-6 mb-4 pt-6">
        <div className="chip active me-3">All</div>
        <div className="chip">Websites</div>
      </div>
      <GridView
        heading="Top Websites"
        wrapperClass="my-8 mx-4"
        itemsClass="gap-4 !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3"
      >
        {appItems?.map((app) => (
          <WebsiteTileMemo
            key={app._id}
            id={app._id}
            name={app.name}
            username={app.owner?.username}
            imgUrl={app.icon}
          />
        ))}
      </GridView>
      {/* <GridView heading="Top Websites" wrapperClass="my-8 mx-4">
        {[...Array(6).keys()].map((id) => (
          <AppIconTileShimmer key={id} />
        ))}
      </GridView> */}
      <button
        className="btn-fab fixed bottom-8 right-8"
        onClick={handleToggleWebsiteFormOpen}
      >
        <AddIcon className="fill-primary size-8" />
        Create Website
      </button>
      {isFormOpen && <WebsiteForm onClose={handleToggleWebsiteFormOpen} />}
    </div>
  )
}

export default WebsitesPage
