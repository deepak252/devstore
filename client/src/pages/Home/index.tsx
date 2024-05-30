import FeaturedTile from '@/components/tiles/FeaturedTile'
import Introduction from './Introduction'
import GridView from '@/components/GridView'

function Home() {
  const appsList = [
    {
      _id: '1',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
    {
      _id: '2',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_890152.jpg',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
    {
      _id: '3',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
  ]

  return (
    <div className="p-6">
      <Introduction />
      <GridView heading="Featured Apps" horizontalScroll>
        {appsList.map((item) => (
          <FeaturedTile
            key={item._id}
            name={item.name}
            iconUrl={item.icon?.url}
            featuredImageUrl={item.images?.[0].url}
            owner={item.owner}
            redirectUrl={`apps/${item._id}`}
          />
        ))}
      </GridView>
      <GridView heading="Featured Apps" horizontalScroll>
        {appsList.map((item) => (
          <FeaturedTile
            key={item._id}
            name={item.name}
            iconUrl={item.icon?.url}
            featuredImageUrl={item.images?.[0].url}
            owner={item.owner}
            redirectUrl={`apps/${item._id}`}
          />
        ))}
      </GridView>
    </div>
  )
}

export default Home
