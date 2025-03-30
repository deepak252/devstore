import Introduction from './Introduction'
import HomeProjects from './components/HomeProjects'

function HomePage() {
  return (
    <div className="p-6 pt-2">
      <Introduction />
      <HomeProjects />
      {/* <GridView heading="Featured Games" horizontalScroll>
        {gamesList.map((item) => (
          <FeaturedItemView
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
          <FeaturedItemView
            key={item._id}
            name={item.name}
            iconUrl={item.icon?.url}
            featuredImageUrl={item.images?.[0].url}
            owner={item.owner}
            redirectUrl={`apps/${item._id}`}
          />
        ))}
      </GridView> */}
    </div>
  )
}

export default HomePage
