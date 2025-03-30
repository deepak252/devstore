import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchIcon from '@/assets/icons/search.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'

type SearchInputFieldProps = {
  placeholder?: string
  onComplete?: (value: string) => void
}
const SearchInputField = ({
  placeholder = 'Search...',
}: SearchInputFieldProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const searchQuery = searchParams.get('q')?.trim()

  useEffect(() => {
    setQuery(searchQuery || '')
  }, [searchQuery])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    } else if (event.key === 'Escape') {
      //   handleToggleSearch()
    }
  }

  const handleClearClick = () => {
    inputRef.current?.focus()
    setQuery('')
  }

  const handleSubmit = () => {
    if (!query?.trim()) {
      setSearchParams({})
    } else {
      setSearchParams({ q: query?.trim() })
    }
  }

  return (
    <div className="textfield border-2 border-transparent p-0 rounded-full overflow-hidden bg-primary/10 transition-all focus-within:bg-white focus-within:border-primary/50">
      <input
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        className="py-4 px-6 bg-transparent"
      />
      {!!query.length && (
        <CloseIcon
          role="button"
          className="size-5 p-1 rounded-full fill-white bg-neutral-500 me-2"
          onClick={handleClearClick}
        />
      )}
      <button className="rounded-full bg-primary mx-2 p-2.5">
        <SearchIcon
          role="button"
          className="size-5 fill-white"
          onClick={handleSubmit}
        />
      </button>
    </div>
  )
}

export default SearchInputField
