import FeaturedTile from '@/components/tiles/FeaturedTile'
import Introduction from './Introduction'
import GridView from '@/components/GridView'
import { appsList, gamesList } from '@/constants/data'

function HomePage() {
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
      <GridView heading="Featured Games" horizontalScroll>
        {gamesList.map((item) => (
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
      <GridView heading="Featured Websites" horizontalScroll>
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

export default HomePage
