import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import { RHFSelect, RHFTextField } from '@renderer/components/hook-form'
import { usePages } from '@renderer/contexts/PagesContext'
import { NewProductFormData } from '@renderer/pages/Products/new'
import { FormEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Group } from 'src/shared/types/group'
import { Origin } from 'src/shared/types/orig'

export function ProductBasicInfo() {
  const [originList, setOriginList] = useState<Origin[]>([])
  const { nextPage, previousPage } = usePages()
  const { getValues, setError, clearErrors } =
    useFormContext<NewProductFormData>()
  const [groups, setGroups] = useState<Group[]>([])

  function handleNextPage(event: FormEvent) {
    event.preventDefault()
    clearErrors()
    const group = getValues('group_id')
    const ncm = getValues('ncm')
    if (group < 1) {
      setError('group_id', { message: 'Grupo inválido' })
      return
    }
    if (ncm) {
      if (ncm.length !== 8) {
        setError('ncm', { message: 'Ncm incorreto' })
        return
      }
    }
    nextPage()
  }

  useEffect(() => {
    window.api.origin.fetchAll().then(({ data }) => {
      setOriginList(data)
    })
    window.api.group.fetchAllActive().then(({ data }) => {
      setGroups(data)
    })
  }, [])

  return (
    <form onSubmit={handleNextPage}>
      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        <RHFTextField
          name="description"
          label="Descrição"
          required
          autoFocus
          sx={{ gridColumn: '1/4' }}
        />
        <RHFTextField
          name="shortDescription"
          label="Descrição reduzida"
          required
          inputProps={{ maxLength: 45 }}
          sx={{ gridColumn: '1/3' }}
        />
        <RHFTextField
          name="ncm"
          label="NCM"
          sx={{ gridColumn: '3/4' }}
          inputProps={{ maxLength: 8 }}
        />
        <RHFSelect
          name="group_id"
          label="Grupo"
          required
          sx={{ gridColumn: '1/4' }}
        >
          <option value={0}>Selecione um grupo</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </RHFSelect>
        <RHFSelect
          name="origin_id"
          label="Origem"
          required
          sx={{ gridColumn: '1/4' }}
        >
          {originList.map((origin) => (
            <option
              key={origin.id}
              value={origin.id}
            >{`${origin.code} - ${origin.description}`}</option>
          ))}
        </RHFSelect>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={previousPage}
          variant="contained"
          color="warning"
          sx={{ mt: '2rem' }}
        >
          Voltar
        </Button>
        <LoadingButton
          variant="contained"
          color="success"
          type="submit"
          sx={{ mt: '2rem' }}
        >
          Próximo
        </LoadingButton>
      </Box>
    </form>
  )
}
