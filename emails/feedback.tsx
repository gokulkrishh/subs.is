import * as React from 'react';

import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components';
import { Icon } from 'components/icons';

interface FeedbackEmailProps {
  message: string;
  fullName: string;
  emoji?: string;
}

const FeedbackEmail = ({ fullName = '', message, emoji }: FeedbackEmailProps) => (
  <Html>
    <Head />
    <Preview>From {fullName ?? 'Subs Tracker'}.</Preview>

    <Body style={main}>
      <Container style={container}>
        <Link href="https://subs.is" target="_blank">
          <Heading className="font-extrabold gap-2 text-pink-600 text-2xl" style={h1}>
            <span>Subs Tracker</span>
          </Heading>
        </Link>
        <Text style={{ ...text, marginBottom: '5px' }}>
          From <b>{fullName}</b>,
        </Text>
        <Text style={{ ...text, marginBottom: '5px' }}>Feedback: {message}</Text>
        {emoji ? <Text style={{ ...text, marginBottom: '5px' }}>{emoji}</Text> : null}
        <h3 className="font-black flex items-center gap-2 text-pink-600 text-2xl"></h3>
        <Icon />
        <Text style={footer}>
          <Link href="https://subs.is" target="_blank" style={{ ...link, color: '#898989' }}>
            Subs Tracker
          </Link>
          <br />
          Track and organise all your subscriptions in one-place.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default FeedbackEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: 'rgb(219,39,119)',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  marginBottom: '20px',
  padding: '0',
  display: 'flex',
  alignItems: 'center',
};

const imgStyle = {
  marginRight: '8px',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '14px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '3px',
  marginBottom: '24px',
};
