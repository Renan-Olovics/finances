type Send = {
  to: string[]
  message: string
}

export const sendSms = async ({ to, message }: Send) => {
  console.log(`Sending sms to ${to}: ${message}`)
  return Promise.resolve()
}
