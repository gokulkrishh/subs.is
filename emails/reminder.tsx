import * as React from 'react';

import { Body, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components';
import { Icon } from 'components/icons';

interface ReminderEmailProps {
  name: string;
  fullName: string;
  date: string;
  cost: string;
}

const ReminderEmail = ({
  fullName = 'Gokul',
  cost = '$10',
  name = 'Netflix',
  date = '1 Apr 2024',
}: ReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>From Subs Tracker.</Preview>

    <Body style={main}>
      <Container style={container}>
        <Heading className="font-black gap-2 text-pink-600 text-2xl" style={h1}>
          <Icon style={logo} /> <span>Subs Tracker</span>
        </Heading>
        <Text style={{ ...text, marginBottom: '5px' }}>
          Hi <b>{fullName}</b>,
        </Text>
        <Text style={{ ...text, marginBottom: '5px' }}>
          Your <b>{name}</b> subscription renew{"'"}s at <b>{date}</b> for <b>{cost}</b>.
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }}
        >
          Ignore this email, if already paid.
        </Text>
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

export default ReminderEmail;

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
  padding: '0',
};

const logo = {
  position: 'relative',
  top: '3px',
  marginRight: '3px',
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
