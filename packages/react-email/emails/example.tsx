import { Body, Head, Html, Preview, Tailwind } from '@react-email/components';
import * as React from 'react';

export const Example = () => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Text Preview</Preview>
        <Body>Body</Body>
      </Html>
    </Tailwind>
  );
};

export default Example;
