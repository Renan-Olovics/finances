import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

import { env } from 'env'

export const sesClient = new SESClient({
  region: env.AWS_SES_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY, secretAccessKey: env.AWS_SECRET_KEY },
})

type SendEmail = {
  emails: string[]
  body: string
  title: string
  charset?: string
}

export const sendEmail = async ({
  emails: ToAddresses,
  body: Data,
  title,
  charset: Charset = 'UTF-8',
}: SendEmail) => {
  const emailInstance = new SendEmailCommand({
    Source: env.AWS_SES_SENDER_EMAIL,
    ReplyToAddresses: [env.AWS_SES_SENDER_EMAIL],
    Destination: { ToAddresses },
    Message: {
      Body: { Html: { Charset, Data } },
      Subject: { Charset, Data: title },
    },
  })
  return await sesClient.send(emailInstance)
}
