import { LoadingButton } from '@mui/lab'
import { Box, Button, InputAdornment } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { RHFSelect, RHFTextField } from '../../../components/hook-form'
import { usePages } from '../../../contexts/PagesContext'
import { api } from '../../../services/apiClient'
import { NewTaxeFormData } from '@renderer/pages/Taxes'

interface Props {
  finishRegistration: (data: NewTaxeFormData) => void
  ncm: string
  loading: boolean
}

export function TaxeDetails({ finishRegistration, ncm, loading }: Props) {
  const { handleSubmit, watch, reset } = useFormContext<NewTaxeFormData>()

  const taxeNature = watch('taxeNature')
  const ipiCst = watch('ipiCst')
  const pisCofinsCst = watch('pisCofinsCst')

  const { previousPage } = usePages()

  function handleCancel() {
    reset()
    previousPage()
  }

  function setFields(data: any) {
    console.log(data)
  }

  useEffect(() => {
    api.get(`/taxes/${ncm}`).then((data) => {
      setFields(data)
    })
  }, [ncm])

  return (
    <form onSubmit={handleSubmit(finishRegistration)}>
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
          name="ncm"
          label="NCM"
          mask="00000000"
          required
          autoFocus
          disabled
          fullWidth={false}
          value={ncm}
          sx={{ width: '20rem' }}
        />
        <br />
        <h2>ICMS</h2>
        <br />

        <RHFSelect name="taxeNature">
          <option value="substitution">Substituição Tributária</option>
          <option value="free">Isento</option>
          <option value="taxed">Tributado</option>
        </RHFSelect>
        {taxeNature === 'taxed' ? (
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
            <RHFTextField
              name="taxationPercentage"
              label="Porcentagem"
              type="number"
              mask="00"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: {
                  style: { textAlign: 'right' },
                },
              }}
              sx={{ width: '10rem' }}
            />
            <RHFTextField
              name="icmsReduction"
              label="Redução"
              type="number"
              mask="00"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: {
                  style: { textAlign: 'right' },
                },
              }}
              sx={{ width: '10rem' }}
            />
          </Box>
        ) : (
          <br />
        )}
        <h2>IPI</h2>
        <br />
        <RHFSelect name="ipiCst">
          <option value="50">Saída tributada</option>
          <option value="51">Saída tributável com alíquota zero</option>
          <option value="52">Saída isenta</option>
          <option value="53">Saída não-tributada</option>
          <option value="54">Saída com suspensão</option>
        </RHFSelect>
        {ipiCst === '50' ? (
          <RHFTextField
            name="ipiPercentage"
            label="Porcentagem"
            type="number"
            mask="00"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: {
                style: { textAlign: 'right' },
              },
            }}
            sx={{ width: '10rem', marginLeft: 'auto' }}
          />
        ) : (
          <br />
        )}
        <h2>Pis/Cofins</h2>
        <br />
        <RHFSelect name="pisCofinsCst">
          <option value="01">Alíquota Básica </option>
          <option value="02">Alíquota Diferenciada</option>
          <option value="04">Monofásico</option>
          <option value="06">Alíquota Zero</option>
          <option value="07">Isento</option>
        </RHFSelect>
        {pisCofinsCst === '02' ? (
          <Box sx={{ display: 'flex', marginLeft: 'auto', gap: 2 }}>
            <RHFTextField
              name="pisPercentage"
              label="PIS"
              type="number"
              mask="00"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: {
                  style: { textAlign: 'right' },
                },
              }}
              sx={{ width: '10rem', marginLeft: 'auto' }}
            />
            <RHFTextField
              name="cofinsPercentage"
              label="COFINS"
              type="number"
              mask="00"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: {
                  style: { textAlign: 'right' },
                },
              }}
              sx={{ width: '10rem', marginLeft: 'auto' }}
            />
          </Box>
        ) : (
          <br />
        )}
        <h2>FCP</h2>
        <br />
        <RHFTextField
          name="fcpPercentage"
          label="Porcentagem"
          type="number"
          mask="00"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
            inputProps: {
              style: { textAlign: 'right' },
            },
          }}
          sx={{ width: '10rem' }}
        />
        <br />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          type="button"
          color="error"
          variant="contained"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <LoadingButton
          type="submit"
          color="success"
          variant="contained"
          loading={loading}
        >
          Salvar
        </LoadingButton>
      </Box>
    </form>
  )
}
