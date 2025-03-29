// import { NextRequest, NextResponse } from "next/server";
// import { GENERATE_JWT_TOKEN } from "@/lib/jwt";
// import WelcomeEmail from "@/components/email-template/welcome";
// import RegisterEmail from "@/components/email-template/register";
// import { render } from "@react-email/render";
// import { NODEMAILER_TRANSPORTER } from "@/lib/nodemailer";
// import prismaClient from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//   const { email, fullname, avatar } = await request.json();
//   const user = await prismaClient.user.findFirst({
//     where: { email },
//     select: { email: true },
//   });
//   if (!user) {
//     try {
//       const token = GENERATE_JWT_TOKEN({ email, fullname, avatar });
//       let nodeMailerConfiguration = "";

//       const Action_Link =
//         process.env.NODE_ENV === "production"
//           ? `${clientUrls.host.home}/api/auth?token=${token}&type=register`
//           : `http://${process.env.NEXT_PUBLIC_SITE_URL}/api/auth?token=${token}&type=register`;

//     //   const welcomeEmailHtml = render(<WelcomeEmail />);
//     //   const registerEmailHtml = render(<RegisterEmail action_link={Action_Link} />);

//       nodeMailerConfiguration = {
//         from: emails.from,
//         to: email,
//         subject: emails.welcome.subject,
//         html: welcomeEmailHtml,
//       };

//       await NODEMAILER_TRANSPORTER.sendMail(nodeMailerConfiguration);

//       try {
//         nodemailerConfig = {
//           from: emails.from,
//           to: email,
//           subject: emails.register.subject,
//           html: registerEmailHtml,
//         };
//         await NODEMAILER_TRANSPORTER.sendMail(nodemailerConfig);
//         return NextResponse.json({ message: emails.sent });
//       } catch (err) {
//         throw err;
//       }
//     } catch (error) {
//       return NextResponse.json(
//         { message: String(error) || messages.error },
//         { status: 500 }
//       );
//     }
//   } else {
//     return NextResponse.json(
//       { message: messages.account.exist },
//       { status: 500 }
//     );
//   }
// }
