import CodeImg from '@/assets/images/code.png'

const AboutMe = ({ about }: { about?: string }) => {
  return (
    <section id="about-me" className="mt-20">
      {/* <h3 className="mb-10">A Little About Me</h3> */}
      <h3 className="mb-10">About Me</h3>
      <div className="flex mt-12 gap-8 max-md:flex-col">
        <div className="relative h-64 w-full min-w-64 overflow-hidden max-md:mx-auto">
          <img src={CodeImg} alt="about" className="rounded-xl object-cover" />
        </div>
        <p className="text-lg text-light">{about}</p>
      </div>
    </section>
  )
}

export default AboutMe
