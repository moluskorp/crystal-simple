import { useState } from 'react'
// @mui
import { List, Collapse, Link } from '@mui/material'
//
import { NavListProps } from '../type'
import NavItem from './NavItem'
import { getActive, isExternalLink } from '..'
import { NavSubList } from './NavSubList'
import { useLocation, useNavigate } from 'react-router-dom'

type NavListRootProps = {
  data: NavListProps
  depth: number
  hasChildren: boolean
  isCollapse?: boolean
}

export default function NavList({
  data,
  depth,
  hasChildren,
  isCollapse = false,
}: NavListRootProps) {
  const pathname = useLocation()
  const push = useNavigate()

  const active = getActive(data.path, pathname.pathname, '')

  const [open, setOpen] = useState(active)

  const handleClickItem = () => {
    if (!hasChildren) {
      push(data.path)
    }
    setOpen(!open)
  }

  return (
    <>
      {isExternalLink(data.path) ? (
        <Link href={data.path} target="_blank" rel="noopener" underline="none">
          <NavItem
            item={data}
            depth={depth}
            open={open}
            active={active}
            isCollapse={isCollapse}
          />
        </Link>
      ) : (
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          isCollapse={isCollapse}
          onClick={handleClickItem}
        />
      )}

      {!isCollapse && hasChildren && (
        <Collapse in={open} unmountOnExit>
          <List component="div" disablePadding>
            <NavSubList data={data.children} depth={depth} />
          </List>
        </Collapse>
      )}
    </>
  )
}
