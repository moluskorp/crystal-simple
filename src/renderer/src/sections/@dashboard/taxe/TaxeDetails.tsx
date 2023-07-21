import { LoadingButton } from '@mui/lab'
import { Box, Button, InputAdornment, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RHFSelect, RHFTextField } from '../../../components/hook-form'
import { usePages } from '../../../contexts/PagesContext'
import { NewTaxeFormData } from '@renderer/pages/Taxes'
import { Taxe } from '../../../../../shared/types/taxes'
import { useNavigate } from 'react-router-dom'

interface Props {
  finishRegistration: (
    data: NewTaxeFormData,
    updating: boolean,
    id?: number,
  ) => void
  ncm: string
  fromProduct?: boolean
  loading: boolean
}

export function TaxeDetails({
  finishRegistration,
  ncm,
  loading,
  fromProduct = false,
}: Props) {
  const [updatingTaxe, setUpdatingTaxe] = useState(false)
  const [taxeId, setTaxeId] = useState(0)

  const { handleSubmit, watch, reset, setValue } =
    useFormContext<NewTaxeFormData>()

  const icmsNature = watch('icmsNature')
  const ipiCst = watch('ipiCst')
  const pisCofinsCst = watch('pisCofinsCst')

  const { previousPage } = usePages()
  const navigate = useNavigate()

  function handleCancel() {
    reset()
    if (fromProduct) {
      navigate(-1)
      return
    }
    previousPage()
  }

  function setFields(data: Taxe) {
    setValue('icmsNature', data.icmsNature)
    setValue('icmsPercentage', data.icmsPercentage || '')
    setValue('icmsReduction', data.icmsReduction || '')
    setValue('ipiCst', data.ipiCst)
    setValue('ipiPercentage', data.ipiPercentage || '')
    setValue('pisCofinsCst', data.pisCofinsCst)
    setValue('cofinsPercentage', data.cofinsPercentage || '')
    setValue('pisPercentage', data.pisPercentage || '')
    setValue('fcpPercentage', data.fcpPercentage || '')
    setUpdatingTaxe(true)
    setTaxeId(data.id)
  }

  useEffect(() => {
    window.api.taxe.fetch({ ncm }).then(({ data }) => {
      if (data) {
        setFields(data)
      }
    })
    // eslint-disable-next-line
  }, [ncm])

  function submitForm(data: NewTaxeFormData) {
    finishRegistration(data, updatingTaxe, taxeId)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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

        <RHFSelect name="icmsNature">
          <MenuItem value="substitution">Substituição Tributária</MenuItem>
          <MenuItem value="free">Isento</MenuItem>
          <MenuItem value="taxed">Tributado</MenuItem>
        </RHFSelect>
        {icmsNature === 'taxed' ? (
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
            <RHFTextField
              name="icmsPercentage"
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
          <MenuItem value="50">Saída tributada</MenuItem>
          <MenuItem value="51">Saída tributável com alíquota zero</MenuItem>
          <MenuItem value="52">Saída isenta</MenuItem>
          <MenuItem value="53">Saída não-tributada</MenuItem>
          <MenuItem value="54">Saída com suspensão</MenuItem>
        </RHFSelect>
        {ipiCst === '50' ? (
          <RHFTextField
            name="ipiPercentage"
            label="IPI"
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
          <MenuItem value="01">Alíquota Básica </MenuItem>
          <MenuItem value="02">Alíquota Diferenciada</MenuItem>
          <MenuItem value="04">Monofásico</MenuItem>
          <MenuItem value="06">Alíquota Zero</MenuItem>
          <MenuItem value="07">Isento</MenuItem>
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
          label="FCP"
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
