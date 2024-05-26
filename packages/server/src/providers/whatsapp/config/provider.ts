type Send = {
  to: string[]
  message: string
}

export const sendWhatsapp = async ({ to, message }: Send) => {
  console.log(`Sending message to ${to}: ${message}`)
  return Promise.resolve()
}
