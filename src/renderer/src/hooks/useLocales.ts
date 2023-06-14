import useSettings from './useSettings'
// config
import { allLangs, defaultLang } from '../config'

// ----------------------------------------------------------------------

export default function useLocales() {
  const { onChangeDirectionByLang } = useSettings()

  const langStorage =
    typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : ''

  const currentLang =
    allLangs.find((_lang) => _lang.value === langStorage) || defaultLang

  const handleChangeLanguage = (newlang: string) => {
    onChangeDirectionByLang(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => String(text),
    currentLang,
    allLangs,
  }
}
