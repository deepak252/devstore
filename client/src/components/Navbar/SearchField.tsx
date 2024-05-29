import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      {Object.values(PATHNAMES).includes(pathname) &&
        (!isSearch ? (
          <button className="icon-button size-11" onClick={handleToggleSearch}>
            <SearchIcon className="size-6" />
          </button>
        ) : (
          <div className="textfield rounded-full p-[6px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={getPlaceholder()}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              autoFocus
              className="max-w-52"
            />
            {query.length ? (
              <CloseIcon
                role="button"
                className="size-5"
                onClick={handleClearSearch}
              />
            ) : (
              <SearchIcon
                role="button"
                className="size-5"
                onClick={handleToggleSearch}
              />
            )}
          </div>
        ))}
    </div>
  )
}

export default SearchField
