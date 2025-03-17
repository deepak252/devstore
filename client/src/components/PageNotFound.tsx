import PageNotFoundImage from '@/assets/images/error-404.png'

const PageNotFound = () => {
  return (
    <div className="text-center mb-16">
      <img
        src={PageNotFoundImage}
        alt="error"
        className="mx-auto w-[500px] max-w-[80vw]"
      />
      <p className="text-neutral-600">
        The page you are looking for might be unavailable or does not exist.
      </p>
    </div>
  )
}

export default PageNotFound
