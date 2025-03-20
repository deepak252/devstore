import Carousel, { CarouselShimmer } from '@/components/Carousel'
import AppForm from '../components/AppForm'
import GridView from '@/components/GridView'
import {
  AppIconTileMemo,
  AppIconTileShimmer,
} from '@/components/tiles/AppItemView'
import AddIcon from '@/assets/icons/add.svg?react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { toggleCreateAppFormOpen } from '../appsSlice'

function AppsPage() {
  const dispatch = useAppDispatch()
  const isFormOpen = useAppSelector((state) => state.apps.appForm.isOpen)
  const carouselItems = [
    {
      url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
      redirect: '1',
    },
    {
      url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
      redirect: '2',
    },
    {
      url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
      redirect: '3',
    },
    {
      url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
      redirect: '4',
    },
  ]

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
  const handleToggleAppFormOpen = () => {
    dispatch(toggleCreateAppFormOpen())
  }
  return (
    <div className="">
      <Carousel items={carouselItems}></Carousel>
      <CarouselShimmer count={3} />
      <div className="mx-6 mb-4 pt-6">
        <div className="chip active me-3">All</div>
        <div className="chip">Apps</div>
      </div>
      <GridView heading="Top Apps" wrapperClass="my-8 mx-4">
        {appItems?.map((app) => (
          <AppIconTileMemo
            key={app._id}
            id={app._id}
            name={app.name}
            username={app.owner?.username}
            imgUrl={app.icon}
          />
        ))}
      </GridView>
      <GridView heading="Top Apps" wrapperClass="my-8 mx-4">
        {[...Array(6).keys()].map((id) => (
          <AppIconTileShimmer key={id} />
        ))}
      </GridView>
      <button
        className="btn-fab fixed bottom-8 right-8"
        onClick={handleToggleAppFormOpen}
      >
        <AddIcon className="fill-primary size-8" />
        Create App
      </button>
      {isFormOpen && <AppForm onClose={handleToggleAppFormOpen} />}
    </div>
  )
}

export default AppsPage
