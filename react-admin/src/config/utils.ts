import { SES } from "@aws-sdk/client-ses";

export const validEmail = (email: string) => {
  var emailRegx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegx.test(email);
};

export const validPhone = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const sendSESMail = async (
  emailHtml: string,
  data: string,
  receiver: string,
) => {
  const client = new SES({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY_ID,
    },
  });

  const params = {
    Source: import.meta.env.VITE_APPROVAL_MAIL_SOURCE,
    Destination: {
      ToAddresses: [receiver],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data,
      },
    },
  };

  await client.sendEmail(params);
};
