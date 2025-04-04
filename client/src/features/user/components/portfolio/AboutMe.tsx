import CodeImg from '@/assets/images/code.png'

const AboutMe = ({ about }: { about?: string }) => {
  return (
    <section id="about-me" className="mt-20">
      <h3 className="mb-10">About Me</h3>
      <div className="flex mt-12 gap-8 max-md:flex-col">
        <div className="relative h-64 w-full min-w-64 max-md:mx-auto">
          <img
            src={CodeImg}
            alt="about"
            className="rounded-xl size-64 object-cover max-md:mx-auto max-md:w-full"
          />
        </div>
        <p className="text-lg text-neutral-700">{about}</p>
      </div>
    </section>
  )
}

export default AboutMe
