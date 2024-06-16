import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReminderEmailTemplateProps {
  preview: string;
  headerContent: string;
  mainContent: string[];
}

const baseUrl = "https://wishly.vercel.app";

export const ReminderEmailTemplate = ({
  preview,
  headerContent,
  mainContent,
}: ReminderEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Link href={baseUrl} style={logo}>
          <strong>Wishly</strong>
        </Link>

        <Text style={title}>Hey There, {headerContent}</Text>

        <Section style={section}>
          <Text style={text}>Hey There!</Text>
          <Text style={text}>{mainContent[0]}</Text>
          <Text style={text}>{mainContent[1]}</Text>
          <Link href={baseUrl}>{mainContent[2]}</Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ReminderEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 0",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "20px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "30px",
  color: "#83c320",
  lineHeight: 1.25,
};

const text = {
  margin: "0 0 14px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
