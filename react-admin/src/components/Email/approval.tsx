import * as React from "react";
import { Html } from "@react-email/html";
import { status } from "../../config/const";

interface EmailProps {
  username: string;
  password: string;
  mailStatus: number;
  businessId: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({
  username,
  password,
  mailStatus,
  businessId,
}) => {
  return (
    <Html lang="en">
      <h1>Thank you for registering your business with our application.</h1>
      <h3>
        We have reviewed your application, and we would like to inform you about
        the status of your registration.
      </h3>

      {mailStatus == status.APPROVED ? (
        <>
          <p>
            Congratulations! We are pleased to inform you that your business
            registration has been approved. <br />
            You are now officially a part of our platform. We appreciate your
            interest and trust in our application. <br />
            <br />
            You can access your business on <br />
            {import.meta.env.VITE_BUSINESS_DASHBOARD_URL + "/" + businessId}
            <br />
            Here are the credentials for you to get started:
          </p>
          <ul>
            <li>
              <b>Username</b>: {username}
            </li>
            <li>
              <b>Password</b>: {password}
            </li>
          </ul>
          <p>
            <b>Note:</b> Please do not share these information with anyone to
            prevent threats.
          </p>{" "}
        </>
      ) : (
        <>
          <p>
            We regret to inform you that your business registration has been
            rejected at this time. We appreciate your interest in joining our
            platform, but unfortunately, our requirements are not mathced with
            your request. If you believe there has been a mistake or have any
            questions, please feel free to reach out to us.
          </p>
          <p>
            Thank you for considering our platform, and we wish you the best of
            luck with your future endeavors..
          </p>
        </>
      )}
    </Html>
  );
};
