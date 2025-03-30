import { NextRequest, NextResponse } from "next/server";
import { GENERATE_JWT_TOKEN } from "@/lib/jwt";
import { render } from "@react-email/render";
import { NODEMAILER_TRANSPORTER } from "@/lib/nodemailer";
import prismaClient from "@/lib/prisma";
import { APP_CONFIGURATION } from "@/components/constants/urls";
import WelcomeEmail from "@/components/email-templates/welcome-email-template";
import { CONSTANT_MESSGAES } from "@/components/constants/messages";
import RegisterEmail from "@/components/email-templates/register-email-template";

export async function POST(request: NextRequest) {
  const { email, fullname } = await request.json();
  const user = await prismaClient.user.findFirst({
    where: { email },
    select: { email: true },
  });
  if (!user) {
    try {
      const token = GENERATE_JWT_TOKEN({ email, fullname });
      let nodeMailerConfiguration = {};

      const Action_Link = `${APP_CONFIGURATION.BASE_URL}/api/auth?token=${token}&type=register`;

      const welcomeEmailHtml = await render(WelcomeEmail());
      const registerEmailHtml = await render(
        RegisterEmail({ action_link: Action_Link })
      );

      nodeMailerConfiguration = {
        from: process.env.EMAIL_FROM || "noreply@example.com",
        to: email,
        subject: CONSTANT_MESSGAES.EMAILS.WELCOME.SUBJECT,
        html: welcomeEmailHtml,
      };

      await NODEMAILER_TRANSPORTER.sendMail(nodeMailerConfiguration);

      try {
        nodeMailerConfiguration = {
          from: process.env.EMAIL_FROM || "noreply@example.com",
          to: email,
          subject: CONSTANT_MESSGAES.EMAILS.REGISTER.SUBJECT,
          html: registerEmailHtml,
        };
        await NODEMAILER_TRANSPORTER.sendMail(nodeMailerConfiguration);
        return NextResponse.json(
          { message: CONSTANT_MESSGAES.EMAILS.SENT },
          { status: 200 }
        );
      } catch (err) {
        console.log("❌ Error in sending register email:", err);
        return NextResponse.json(
          { message: CONSTANT_MESSGAES.EMAILS.ERROR },
          { status: 400 }
        );
      }
    } catch (error) {
      console.log("❌ Error in register route", error);

      return NextResponse.json(
        { message: String(error) || CONSTANT_MESSGAES.COMMON.SERVER_ERROR_500 },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: CONSTANT_MESSGAES.COMMON.CLIENT_USER_ACCOUNT_EXISTS },
      { status: 500 }
    );
  }
}
