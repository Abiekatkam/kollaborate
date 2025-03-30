import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Tailwind,
  Text,
} from "@react-email/components";
import Footnote from "./footnote-email-template";
import Footer from "./footer-email-template";
import { APP_CONFIGURATION } from "../constants/urls";

export const LoginEmail = ({ action_link = "" }) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Login link to {APP_CONFIGURATION.APPLICATION_NAME} ✨</Preview>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            {/* <span className="p-3 flex items-center justify-center text-green-700 rounded-full text-4xl bg-green-200 m-auto w-[40px]">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span> */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 mb-[24px] mt-[22px] mx-0">
              Magic Link
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Please click the below link to Login to your account. This link
              will expire in 10 minutes.
            </Text>
            <Link
              className="bg-[#000000] p-2 px-3 mt-1 w-[60px] block rounded-md text-white text-[13px] font-normal no-underline text-center"
              href={action_link}
            >
              Login
            </Link>
            <Text className="text-black text-[14px] mt-[16px] mb-[10px] leading-[24px]">
              or if you are on mobile, copy and paste this URL into your
              browser:{" "}
              <Row>
                <Link className="text-[#cc35e5] break-all text-sm flex w-[465px] leading-[24px]">
                  {action_link.replace(/^https?:\/\//, "")}
                </Link>
              </Row>
            </Text>
            <Text className="text-gray-500 mt-[16px]">
              If you didn{"'"}t try to Login, you can safely ignore this email.
            </Text>
            <Footnote hideNote={true} />
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default LoginEmail;
