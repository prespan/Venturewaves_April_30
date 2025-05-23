import useSWR from 'swr'

type Studio = {
  id: number
  name: string
  description: string
  address?: string
  logo?: string
  keyStartups?: string[]
}

export function useStudios() {
  return useSWR<Studio[]>('/api/studios', async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    // Ensure keyStartups is parsed properly
    return data.map((studio: any) => ({
      ...studio,
      keyStartups: Array.isArray(studio.keyStartups) ? studio.keyStartups : [],
    }))
  })
}