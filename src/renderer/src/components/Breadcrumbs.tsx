import { ReactElement } from 'react'
// @mui
import {
  Box,
  Typography,
  BreadcrumbsProps,
  Breadcrumbs as MUIBreadcrumbs,
  styled,
  useTheme,
} from '@mui/material'

import { Link } from 'react-router-dom'

// ----------------------------------------------------------------------

type TLink = {
  href?: string
  name: string
  icon?: ReactElement
}

type LinkItemProps = {
  link: TLink
}

export interface Props extends BreadcrumbsProps {
  links: TLink[]
  activeLast?: boolean
}

function LinkItem({ link }: LinkItemProps) {
  const theme = useTheme()

  const Links = styled(Link)({
    lineHeight: 2,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '& > div': { display: 'inherit' },
    '&:hover': {
      textDecoration: 'underline',
    },
  })

  const { href = '', name, icon } = link
  return (
    <Links key={name} to={href}>
      {icon && (
        <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>
      )}
      {name}
    </Links>
  )
}

// ----------------------------------------------------------------------

export default function Breadcrumbs({
  links,
  activeLast = false,
  ...other
}: Props) {
  const currentLink = links[links.length - 1].name

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ))

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ))

  return (
    <MUIBreadcrumbs
      separator={
        <Box
          component="span"
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: 'text.disabled',
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  )
}
