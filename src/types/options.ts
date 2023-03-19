export type OptionType = {
  country: string
  lat: number
  local_names: {
    [locale: string]: string
  }
  lon: number
  name: string
  state: string
}