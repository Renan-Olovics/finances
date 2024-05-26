import { render } from '@react-email/render'

import { Example as ExampleComponent } from '@repo/react-emails'

import { sendEmail } from '@/providers/mail/config'

type SendExampleEmail = {
  emails: string[]
}

export const example = ({ emails }: SendExampleEmail) => {
  const email = render(ExampleComponent())
  return sendEmail({ body: email, title: 'Example email', emails })
}
