import useSWR from 'swr'

type Studio = {
  id: number
  name: string
  description: string
  industry?: string
  location?: string
  logo?: string
}

export function useStudios() {
  return useSWR<Studio[]>('/api/studios', (url: string) =>
    fetch(url).then((res) => res.json())
  )
}