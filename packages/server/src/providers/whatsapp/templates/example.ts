import { sendWhatsapp } from '@/providers/whatsapp/config'

type Example = {
  to: string[]
}

export const example = ({ to }: Example) => {
  sendWhatsapp({ to, message: 'Hello, World!' })
  return Promise.resolve()
}
