const Preview = ({ webUrl }: { webUrl: string }) => {
  return (
    <div className="relative mt-10 h-[440px] w-full border-8 border-neutral-900 rounded-lg sm:h-[500px] md:h-[540px] lg:h-[600px] xl:h-[640px]">
      <iframe
        src={'https://sam-threads.vercel.app'}
        width="100%"
        height="100%"
        title={webUrl}
      />
      {/* NOTCH */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-24 rounded-b-md bg-neutral-900" />
    </div>
  )
}

export default Preview
