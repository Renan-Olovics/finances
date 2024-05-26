import { SendEmailCommand } from '@aws-sdk/client-ses'
import { SESClient } from '@aws-sdk/client-ses'

import { env } from 'env'

const sesClient = new SESClient({
  region: env.AWS_SES_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY, secretAccessKey: env.AWS_SECRET_KEY },
})

export const sendEmail = async (emails: string[]) => {
  const asd = new SendEmailCommand({
    Source: env.AWS_SES_SENDER_EMAIL,
    ReplyToAddresses: [env.AWS_SES_SENDER_EMAIL],
    Destination: { ToAddresses: emails },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: '<h1>body of email</h1>',
        },
        Text: {
          Charset: 'UTF-8',
          Data: '<h1>body of email from text</h1>',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'subject of email',
      },
    },
  })
  return await sesClient.send(asd)
}
