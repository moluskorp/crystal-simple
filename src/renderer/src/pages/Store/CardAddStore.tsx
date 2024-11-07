import {
  Typography,
  Box,
  Card,
  Grid,
  MenuItem,
  InputAdornment,
} from '@mui/material'

import {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from '@renderer/components/hook-form'
import { useEffect, useState } from 'react'
import { City, State } from 'src/shared/types/state'
import { EditStoreFormData } from '.'
import { useFormContext } from 'react-hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { Store } from 'src/shared/types/store'
import { removeAccents } from '@renderer/utils/removeAccents'

const TIMEOUT_CITY = 1000

export function CardAddStore() {
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [_, setStore] = useState<Store>({} as Store)

  const { watch, setValue, getValues } = useFormContext<EditStoreFormData>()
  const { showAlert } = useAlert()

  const state = watch('state')
  const isent = watch('isent')

  useEffect(() => {
    setValue('city', '')
    if (state) {
      window.api.state.getCities({ uf: state }).then((result) => {
        if (result.type === 'error') {
          showAlert(result.message!, 'error')
          return
        }
        setCities(result.data!)
      })
    }
  }, [state])

  useEffect(() => {
    window.api.state.getStates().then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      setStates(result.data!)
    })
  }, [])

  function fillFields(data: Store) {
    setValue('state', data.state)
    setValue('cnpj', data.cnpj)
    setValue('cofins', String(data.cofins).replace('.', ','))
    setValue('district', data.district)
    setValue('name', data.name)
    if (data.ie !== 'ISENTO') {
      setValue('ie', data.ie)
    }
    if (data.ie === 'ISENTO') {
      setValue('isent', true)
    }
    setValue('number', data.number)
    setValue('pis', String(data.pis).replace('.', ','))
    setValue('postalcode', data.postalcode)
    setValue('storeAlias', data.storeAlias)
    setValue('street', data.street)
    setValue('id', data.id!)
    setTimeout(() => {
      setValue('city', data.city)
    }, TIMEOUT_CITY)
  }

  useEffect(() => {
    window.api.store.get().then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      if (result.data) {
        setValue('create', false)
        setStore(result.data)
        fillFields(result.data)
      } else {
        setValue('create', true)
      }
    })
  }, [])

  async function handleCep() {
    try {
      const cep = getValues('postalcode')
      if (cep.length < 9) {
        throw new Error('CEP inválido')
      }

      const response = await window.api.cep.find({ cep })

      if (response.type === 'error') {
        throw new Error(response.message)
      }

      const { data: cepValue } = response

      console.log('cepValue: ', cepValue)

      const cityWithoutAccents = removeAccents(cepValue!.city)

      const city = await window.api.state.searchCity({
        city: cityWithoutAccents,
      })

      setValue('street', cepValue!.street)
      setValue('district', cepValue!.neighborhood)

      if (city.data) {
        setValue('state', city.data.nameUf)
        setTimeout(() => {
          setValue('city', String(city.data?.id!))
        }, TIMEOUT_CITY)
      }
    } catch (err: any) {
      console.error(err)
      showAlert(err.message, 'error')
    }
  }

  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h4">Informações Básicas</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <RHFTextField
            name="name"
            label="Nome empresárial"
            required
            autoFocus
            sx={{ gridColumn: '1/5' }}
          />
          <RHFTextField
            name="storeAlias"
            label="Nome fantasia"
            required
            sx={{ gridColumn: '1/5' }}
          />
          <RHFTextField
            name="cnpj"
            label="CNPJ"
            mask="00.000.000/0000-00"
            required
            sx={{ gridColumn: '1/1' }}
          />
          <RHFTextField
            name="ie"
            mask="000.000.000.000"
            disabled={isent}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <RHFCheckbox name="isent" label="Isento" />
                </InputAdornment>
              ),
            }}
            label="Inscrição Estadual"
            required
          />
          <RHFTextField
            name="pis"
            mask={Number}
            label="Valor do PIS"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: {
                style: { textAlign: 'end' },
              },
            }}
            required
          />
          <RHFTextField
            name="cofins"
            mask={Number}
            label="Valor do COFINS"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: {
                style: { textAlign: 'end' },
              },
            }}
            required
          />
        </Box>
      </Card>
      <Typography variant="h4">Endereço</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <RHFTextField
            name="postalcode"
            label="CEP"
            required
            mask="00000-000"
            onBlur={handleCep}
          />
          <RHFTextField
            name="street"
            label="Rua"
            required
            sx={{ gridColumn: '1/5' }}
          />
          <RHFTextField
            name="number"
            label="Número"
            sx={{ gridColumn: '5/8' }}
          />
          <RHFTextField
            name="district"
            label="Bairro"
            required
            sx={{ gridColumn: '1/3' }}
          />
          <RHFSelect
            name="city"
            label="Cidade"
            required
            sx={{ gridColumn: '3/5' }}
          >
            {cities.map((city) => (
              <MenuItem key={city.id} value={String(city.id)}>
                {city.nameMun}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            name="state"
            label="Estado"
            required
            sx={{ gridColumn: '5/8' }}
          >
            {states.map((state) => (
              <MenuItem key={state.id} value={state.uf}>
                {state.uf}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Card>
    </Grid>
  )
}
