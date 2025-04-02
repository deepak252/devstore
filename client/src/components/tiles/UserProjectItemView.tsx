import { memo } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Shimmer from '../Shimmer'
import Dropdown, { DropdownOption } from '../Dropdown'
import HeartOutlinedIcon from '@/assets/icons/heart-outlined.svg?react'
// import HeartFilledIcon from '@/assets/icons/heart-filled.svg?react'
import MoreVertIcon from '@/assets/icons/more-vert.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import { ProjectListItem } from '@/shared.types'

type UserProjectItemViewProps = {
  project: ProjectListItem
  edit?: boolean
  onDeleteClick?: (projectId: string) => void
  onEditClick?: (projectId: string) => void
}

const menuOptions = [
  {
    label: 'Edit',
    value: 'edit',
  },
  {
    label: 'Delete',
    value: 'delete',
  },
]

const UserProjectItemView = ({
  project,
  edit,
  onDeleteClick,
  onEditClick,
}: UserProjectItemViewProps) => {
  const { _id, name, icon, banner, description } = project

  const handleOptionSelect = (options: DropdownOption[]) => {
    switch (options[0].value) {
      case 'edit': {
        onEditClick?.(_id)
        break
      }
      case 'delete': {
        onDeleteClick?.(_id)
        break
      }
      default:
        break
    }
  }

  return (
    <div>
      <Link
        to={`/projects/${_id}`}
        className="relative block aspect-video overflow-hidden bg-white rounded-lg group"
      >
        <img
          className={classNames(
            'size-full bg-white object-cover duration-300 transition-all',
            {
              edit: 'group-hover:scale-110',
            }
          )}
          src={banner?.url || icon?.url}
          alt={name}
        />
        <div className="absolute inset-0 bg-black/15">
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 hover:bg-black/20">
            {!edit && (
              <div className="flex gap-3 absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  <ShareIcon className="size-10 bg-white rounded-full p-2.5 " />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  <HeartOutlinedIcon className="size-10 bg-white rounded-full p-3 " />
                </button>
              </div>
            )}
          </div>
          {edit && (
            <div className="flex gap-3 absolute top-3 right-3">
              <Dropdown
                options={menuOptions}
                onChange={handleOptionSelect}
                contentClass="min-w-40 shadow-sm rounded-md"
              >
                <button
                  className="icon-button"
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                >
                  <MoreVertIcon className="fill-white" />
                </button>
              </Dropdown>
            </div>
          )}
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-neutral-900">{name}</p>
        {!edit && (
          <p className="text-sm text-neutral-600 font-light">{description}</p>
        )}
      </div>
      {/* <div className="flex justify-between items-center my-2">
        <Link className="flex items-center" to={`/u/${owner.username}`}>
          <ProfileImage className="!size-7" imgUrl={owner.profileImage?.url} />
          <div className="m-2 overflow-hidden">
            <p className="text-sm font-medium text-neutral-900 md:text-base">
              {owner.fullname || owner.username}
            </p>
          </div>
        </Link>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <HeartFilledIcon className="size-5 rounded-full fill-neutral-500" />
          </button>
          <span className="text-sm text-neutral-600">84</span>
        </div>
      </div> */}
    </div>
  )
}

export const UserProjectItemShimmer = () => {
  return (
    <div>
      <Shimmer className="aspect-video w-full !rounded-lg" />
      <div className="flex items-center gap-2 mt-2">
        <div>
          <Shimmer className="!size-8 !rounded-full" />
        </div>
        <Shimmer className="h-8 w-2/3 !rounded-md" />
      </div>
    </div>
  )
}

export const UserProjectItemViewMemo = memo(
  UserProjectItemView,
  (prevProps, nextProps) => {
    return prevProps.project === nextProps.project
  }
)

export default UserProjectItemView
