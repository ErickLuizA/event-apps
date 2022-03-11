
export default interface OrphanagesProps {
  id: number
  name: string
  whatsapp: string
  latitude: number
  longitude: number
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: [
    {
      id: number
      url: string
    }
  ]
}