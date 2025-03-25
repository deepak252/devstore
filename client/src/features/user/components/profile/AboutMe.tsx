import CodeImg from '@/assets/images/code.png'

const AboutMe = ({ about }: { about?: string }) => {
  return (
    <section id="about-me" className="mt-20">
      <h3 className="mb-10">About Me</h3>
      <div className="flex mt-12 gap-8 max-md:flex-col">
        {/* <div className="relative h-64 w-full min-w-64 overflow-hidden max-md:mx-auto">
          <img src={CodeImg} alt="about" className="rounded-xl object-cover" />
        </div> */}
        <div className="relative h-64 w-full min-w-64 overflow-hidden max-md:mx-auto">
          <img src={CodeImg} alt="about" className="rounded-xl object-cover" />
        </div>
        <p className="text-lg text-light">{about}</p>
      </div>

      {/* <div className="flex mt-12 gap-8 max-md:flex-col">
        <Image
          src={CodeImg}
          alt="about"
          className="rounded-xl size-64 max-md:mx-auto"
        />
        <p className="text-lg text-light">
          Software Engineer with 2+ years of experience in frontend,
          micro-frontend, backend, and microservices. I enjoy solving complex
          programming challenges, staying ahead with the latest technologies,
          and building scalable, high-performance applications. An adaptable and
          quick learner who thrives in dynamic environments and actively
          contributes to collaborative teams—always up for a challenge.
        </p>
      </div> */}
    </section>
  )
}

export default AboutMe
