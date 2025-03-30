import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import { APP_CONFIGURATION } from "@/components/constants/urls";
import LoginEmail from "@/components/email-templates/login-email-template";
import { GENERATE_JWT_TOKEN } from "@/lib/jwt";
import { NODEMAILER_TRANSPORTER } from "@/lib/nodemailer";
import prismaClient from "@/lib/prisma";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const user = await prismaClient.user.findFirst({
    where: { email },
    select: { email: true, id: true },
  });

  if (!user || !user?.id) {
    console.log("❌ User not found");
    return NextResponse.json(
      {
        message: CONSTANT_MESSGAES.COMMON.CLIENT_USER_ACCOUNT_NOT_EXISTS,
      },
      { status: 404 }
    );
  } else {
    try {
      const token = GENERATE_JWT_TOKEN({ email });
      let nodeMailerConfiguration = {};

      const Action_Link = `${APP_CONFIGURATION.BASE_URL}/api/auth?token=${token}&type=register`;

      const loginEmailHtml = render(LoginEmail({ action_link: Action_Link }));

      nodeMailerConfiguration = {
        from: process.env.EMAIL_FROM || "noreply@example.com",
        to: email,
        subject: CONSTANT_MESSGAES.EMAILS.LOGIN.SUBJECT,
        html: loginEmailHtml,
      };

      await NODEMAILER_TRANSPORTER.sendMail(nodeMailerConfiguration);

      return NextResponse.json(
        {
          message: CONSTANT_MESSGAES.EMAILS.SENT,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.log("❌ Error in sending login email:", error);
      return NextResponse.json(
        {
          message: CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500,
        },
        {
          status: 500,
        }
      );
    }
  }
}
