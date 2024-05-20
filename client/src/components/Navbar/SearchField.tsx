import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
// import IconButton from '../../Buttons/IconButton'
// import TextInput from '../../TextInput'
import SearchIcon from '@/assets/icons/Search.svg?react'
import CloseIcon from '@/assets/icons/Close.svg?react'

const PATHNAMES = {
  HOME: '/',
  APPS: '/apps',
  WEBSITES: '/websites',
  GAMES: '/games',
}

const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [isSearch, setIsSearch] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const searchQuery = searchParams.get('q')?.trim()

  useEffect(() => {
    setQuery('')
    setIsSearch(false)
  }, [pathname])

  useEffect(() => {
    // set search with hardcode query url
    if (searchQuery?.length) {
      setIsSearch(true)
      setQuery(searchQuery)
    }
  }, [searchQuery])

  const handleToggleSearch = () => {
    setQuery('')
    setIsSearch(!isSearch)
    if (searchQuery?.trim()?.length) {
      // Disable search
      searchParams.delete('q')
      setSearchParams(searchParams)
    }
  }

  const handleClearSearch = () => {
    inputRef.current?.focus()
    setQuery('')
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!query?.trim()?.length) {
        return
      }
      setSearchParams({ q: query?.trim() })
    } else if (event.key === 'Escape') {
      handleToggleSearch()
    }
  }

  const getPlaceholder = () => {
    switch (pathname) {
      case PATHNAMES.APPS:
        return 'Search apps'
      case PATHNAMES.WEBSITES:
        return 'Search websites'
      case PATHNAMES.GAMES:
        return 'Search games'
      default:
        return 'Search'
    }
  }

  return (
    <div>
      {
        Object.values(PATHNAMES).includes(pathname) &&
          (!isSearch ? (
            <button
              className="icon-button size-11"
              onClick={handleToggleSearch}
            >
              <SearchIcon className="size-6" />
            </button>
          ) : (
            <div className="textfield rounded-full p-[6px]">
              {/* <SearchIcon className="size-5" /> */}
              <input type="text" placeholder={getPlaceholder()} />
              <SearchIcon className="size-5" />
            </div>
          ))
        //     (
        //   <IconButton
        //     icon={<SearchIcon className="size-24" />}
        //     onClick={handleToggleSearch}
        //     className={styles.container__iconButton}
        //   />
        // ) : (
        //   <TextInput
        //     ref={inputRef}
        //     value={query}
        //     onChange={(e) => setQuery(e.target.value)}
        //     placeholder={getPlaceholder()}
        //     textfieldClass={styles.container__searchInput}
        //     trailing={
        //       query?.length ? (
        //         <CloseIcon
        //           onClick={handleClearSearch}
        //           className={classNames(
        //             'size-12 c-pointer',
        //             styles.container__searchInput__iconClose
        //           )}
        //         />
        //       ) : (
        //         <SearchIcon
        //           onClick={handleToggleSearch}
        //           className={classNames(
        //             'size-20 c-pointer',
        //             styles.container__searchInput__iconSearch
        //           )}
        //         />
        //       )
        //     }
        //     onKeypress={handleKeyPress}
        //     autoFocus={true}
        //   />
        // )
      }
    </div>
  )
}

export default SearchField
