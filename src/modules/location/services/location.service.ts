import http from '@/infra/plugins/http'

export const LocationService = () => {
  const getStates = async () => {
    const countryId = 1

    const { data } = await http.get(`/locations/countries/${countryId}`)
    return data.states
  }

  const getCities = async (stateId: number) => {
    const { data } = await http.get(`/locations/states/${stateId}`)
    return data.cities
  }

  return { getStates, getCities }
}
