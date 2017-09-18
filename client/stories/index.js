import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';

const Hello = ({ lang = 'en' }) => {
  const data = {
    en: 'Hello World',
    es: 'Hola Mundo',
  };
  return (
    <div>
      <h4>{data[lang]} !!!</h4>
    </div>
  );
};

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Hello', module)
  .add('Spanish', () => (
    <Hello lang='es' />
  ))
  .add('English', () => (
    <Hello lang='en' />
  ));
