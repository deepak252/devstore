import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ForwardIcon from '@/assets/icons/forward.svg?react'
import BackwardIcon from '@/assets/icons/backward.svg?react'
import { useCallback, useMemo } from 'react'
import { useWindowDimensions } from '@/hooks'

const images = [
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww',
]

type CustomCarouselProps = {
  itemWidth?: number
}
export default function CustomCarousel({ itemWidth }: CustomCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ playOnInit: true, stopOnInteraction: false })]
  )
  const { width } = useWindowDimensions()

  const flexWidth = useMemo(() => {
    if (width < 640) return 90
    if (width < 768) return 80
    if (width < 1024) return 60
    return 50
  }, [width])

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div
              key={index}
              className="px-3"
              style={{ flex: `0 0 ${itemWidth || flexWidth}%` }} // Dynamic width
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full object-cover rounded-lg h-52 sm:h-56 md:h-60"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2"
        onClick={scrollPrev}
      >
        <BackwardIcon className="size-12 bg-black/40 p-3 rounded-full hover:bg-black/50" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={scrollNext}
      >
        <ForwardIcon className="size-12 bg-black/40 p-3 rounded-full hover:bg-black/50" />
      </button>
    </div>
  )
}
