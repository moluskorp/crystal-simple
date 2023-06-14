import { Theme } from '@mui/material/styles'
//
import { CloseIcon } from './CustomIcons'

// ----------------------------------------------------------------------

export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseIcon />,
      },

      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            // eslint-disable-next-line
            color: theme.palette.text.secondary,
          },
        },
        outlined: {
          // eslint-disable-next-line
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            // eslint-disable-next-line
            borderColor: theme.palette.primary.main,
          },
          '&.MuiChip-colorSecondary': {
            // eslint-disable-next-line
            borderColor: theme.palette.secondary.main,
          },
        },
        //
        avatarColorInfo: {
          // eslint-disable-next-line
          color: theme.palette.info.contrastText,
          // eslint-disable-next-line
          backgroundColor: theme.palette.info.dark,
        },
        avatarColorSuccess: {
          // eslint-disable-next-line
          color: theme.palette.success.contrastText,
          // eslint-disable-next-line
          backgroundColor: theme.palette.success.dark,
        },
        avatarColorWarning: {
          // eslint-disable-next-line
          color: theme.palette.warning.contrastText,
          // eslint-disable-next-line
          backgroundColor: theme.palette.warning.dark,
        },
        avatarColorError: {
          // eslint-disable-next-line
          color: theme.palette.error.contrastText,
          // eslint-disable-next-line
          backgroundColor: theme.palette.error.dark,
        },
      },
    },
  }
}
