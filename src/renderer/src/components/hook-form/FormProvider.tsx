import { FormEvent, ReactNode, useCallback } from 'react'
// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode
  methods: UseFormReturn<any>
  onSubmit?: () => void
}

export default function FormProvider({ children, onSubmit, methods }: Props) {
  const submit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      if (onSubmit) {
        onSubmit()
      }
    },
    [onSubmit],
  )

  return (
    <Form {...methods}>
      <form onSubmit={submit}>{children}</form>
    </Form>
  )
}
