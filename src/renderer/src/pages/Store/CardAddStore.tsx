import { Typography, Box, Card, Grid, MenuItem, InputAdornment } from '@mui/material'

import { RHFSelect, RHFTextField } from '@renderer/components/hook-form'
import { useEffect,  useState } from 'react'
import { City, State } from 'src/shared/types/state'
import { EditStoreFormData } from '.'
import {useFormContext} from 'react-hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { Store } from 'src/shared/types/store'

export function CardAddStore() {
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [_, setStore] = useState<Store>({} as Store)

  const { watch, setValue } = useFormContext<EditStoreFormData>()
  const {showAlert} = useAlert()

  const state = watch('state')

  useEffect(() => {
    setValue('city', '')
    if(state) {
      window.api.state.getCities({uf: state}).then(result => {
        if(result.type === 'error'){
          showAlert(result.message!, 'error')
          return
        }
        setCities(result.data!)
      })
    }
  },[state])

  useEffect(() => {
    window.api.state.getStates().then(result => {
      if(result.type === 'error') {

      }
      setStates(result.data!)
    })
  },[])

  function fillFields(data: Store) {
    setValue('city',data.city)
    setValue('cnpj',data.cnpj)
    setValue('cofins',String(data.cofins))
    setValue('district',data.district)
    setValue('name',data.name)
    setValue('number',data.number)
    setValue('pis',String(data.pis))
    setValue('postalcode',data.postalcode)
    setValue('state',data.state)
    setValue('storeAlias',data.storeAlias)
    setValue('street',data.street)
    setValue('id', data.id!)
  }

  useEffect(() => {
    window.api.store.get().then(result => {
      if(result.type === 'error'){
        showAlert(result.message!, 'error')
        return
      }
      if(result.data) {
        setValue('create', false)
        setStore(result.data)
        fillFields(result.data);
      }else {
        setValue('create', true)
      }
    })
  },[])

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
            mask="000.000.000-00"
            label="Inscrição Estadual"
            required
          />
          <RHFTextField name="pis" label="Valor do PIS" InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            ),
            inputProps: {
              style: {textAlign: 'end'}
            }
          }} required />
          <RHFTextField
            name="cofins"
            mask={Number}
            label="Valor do COFINS"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">%</InputAdornment>
              ),
              inputProps: {
                style: {textAlign: 'end'}
              }
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
          />
          <RHFTextField name="street" label="Rua" required sx={{gridColumn: '1/5'}}/>
          <RHFTextField name="number" label="Número" sx={{gridColumn: '5/8'}}/>
          <RHFTextField name="district" label="Bairro" required sx={{gridColumn: '1/3'}}/>
          <RHFSelect name="city" label="Cidade" required sx={{gridColumn: '3/5'}}>
            {cities.map(city => (
              <MenuItem key={city.id} value={String(city.id)} >
                {city.nameMun}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect name="state" label="Estado" required sx={{gridColumn: '5/8'}}>
            {states.map(state => (
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
