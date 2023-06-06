// hooks
import { useAuth } from '../hooks/useAuth'
// utils
import createAvatar from '../utils/createAvatar'
//
import Avatar, { Props as AvatarProps } from './Avatar'

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth()
  const photoURL = user?.email || 'André'
  const alt = user?.email || 'André'
  const displayName = user?.displayName || 'André'
  const color = photoURL ? 'default' : createAvatar(displayName).color

  return (
    <Avatar src={photoURL} alt={alt} color={color} {...other}>
      {createAvatar(displayName).name}
    </Avatar>
  )
}
