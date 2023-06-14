import { Step, StepLabel, Stepper as StepperMui } from '@mui/material'
import { usePages } from '../contexts/PagesContext'
import { StepIcon } from './StepIcon'
import { QontoConnector } from './StepIcon/styles'

interface Props {
  steps: string[]
}

export function Stepper({ steps }: Props) {
  const { activeStep } = usePages()

  return (
    <StepperMui
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={StepIcon}
            sx={{
              '& .MuiStepLabel-label': {
                typography: 'subtitle2',
                color: 'text.disabled',
              },
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </StepperMui>
  )
}
