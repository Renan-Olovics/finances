import { sendSms } from '@/providers/sms/config'

type Example = {
  to: string[]
}

export const example = ({ to }: Example) => {
  sendSms({ to, message: 'Hello, World!' })
  return Promise.resolve()
}
