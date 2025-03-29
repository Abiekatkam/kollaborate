"use client";
import Link from "next/link";
import { HiCubeTransparent } from "react-icons/hi";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { FaQuoteLeft, FaXTwitter } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { FaHeadphonesAlt } from "react-icons/fa";
import { BsChatLeftQuote } from "react-icons/bs";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { HiOutlineServerStack } from "react-icons/hi2";
import {
  APP_CONFIGURATION,
  CLIENT_SIDE_URL,
} from "@/components/constants/urls";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { GlowingKeyFeature } from "@/components/common/glowing-key-feature";
import {
  ACCORDION_FAQS,
  DEVELOPER_SOCIAL_LINKS,
  USER_AVATARS,
  USER_REVIEW_DATA,
} from "@/components/constants/static-data";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="relative h-full selection:bg-green-100 selection:text-green-600">
      <header className="relative m-auto h-[56px] max-w-7xl pt-3">
        <div className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center gap-2 p-3 text-2xl group"
          >
            <span className="w-10 h-10 flex items-center justify-center group-hover:rotate-90 text-green-700 bg-green-200 rounded-full  transition-all ease-in duration-200">
              <HiCubeTransparent />
            </span>
            <span className="font-black tracking-[-0.03em] text-neutral-700 group-hover:text-black/70 transition-all ease-in duration-200">
              Kollaborate
            </span>
          </Link>
          <div className="mt-5 flex justify-center gap-4">
            <Link
              target="_blank"
              href={CLIENT_SIDE_URL.SOCIAL_LINKS.GITHUB_REPOSITORY}
              className="ml-6 inline-flex h-[34px] items-center justify-center gap-1 rounded-md bg-white/0 px-4 py-2 text-sm font-medium text-[#13131A] ring-1 ring-[#13131A]/10 hover:bg-gray-100 hover:shadow group"
            >
              <FaGithub className="size-4 mr-1 group-hover:scale-110 transition-all ease-in duration-150" />
              Star on GitHub
            </Link>
            <Link
              href={CLIENT_SIDE_URL.AUTH.LOGIN}
              className="leading-2 mr-4 inline-flex h-[34px] items-center overflow-hidden rounded-md text-white bg-gray-900 px-4 py-1 text-sm font-medium transition hover:bg-primary/90"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="sm:h-[32rem] w-full relative flex items-center justify-center">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

        <span className="hidden md:block absolute top-[20%] left-[25%] z-10 border-2 p-3 -rotate-[15deg] rounded-md bg-neutral-100 text-neutral-400">
          <FaHeadphonesAlt className="size-10" />
        </span>

        <span className="hidden md:block absolute top-[20%] right-[25%] z-10 border-2 p-3 rotate-[15deg] rounded-md bg-neutral-100 text-neutral-400">
          <BsChatLeftQuote className="size-10" />
        </span>

        <span className="hidden md:block absolute bottom-[20%] left-[25%] z-10 border-2 p-3 rotate-[15deg] rounded-md bg-neutral-100 text-neutral-400">
          <MdOutlineKeyboardVoice className="size-10" />
        </span>

        <span className="hidden md:block absolute bottom-[20%] right-[25%] z-10 border-2 p-3 -rotate-[15deg] rounded-md bg-neutral-100 text-neutral-400">
          <HiOutlineServerStack className="size-10" />
        </span>

        <div className="relative z-10 mx-auto mb-16 mt-16 max-w-xl px-3 text-center flex flex-col items-center sm:max-w-3xl sm:px-0">
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing Kollaborate</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>

          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl font-sans py-2 relative z-20 font-bold tracking-tight text-balance">
            Experience The Future of Connectivity
          </h2>
          <p className="mt-1 mb-5 text-base leading-6 tracking-tight sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium text-balance">
            Stay connected and collaborate effortlessly with Kollaborate. Enjoy
            real-time chat, video calls, and organized conversations—all in one
            seamless platform. <br /> Join today and transform the way you
            communicate!
          </p>
          <Link href={CLIENT_SIDE_URL.AUTH.REGISTER}>
            <InteractiveHoverButton>Lets communicate</InteractiveHoverButton>
          </Link>

          <AvatarCircles
            numPeople={99}
            avatarUrls={USER_AVATARS}
            className="mt-3"
          />
        </div>
      </div>

      <div className="mx-auto my-16 max-w-5xl px-3 text-center sm:px-0">
        <h1 className="text-sm capitalize font-black text-pretty leading-[1.15] tracking-[-0.03em] text-neutral-700 dark:text-neutral-400 sm:text-2xl sm:leading-[1.15]">
          Key features
        </h1>
        <p className="mt-1 mb-5 text-base leading-6 tracking-tight sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium text-balance">
          Powerful Features for Seamless Communication & Collaboration
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-around">
          <GlowingKeyFeature />
        </div>
      </div>

      <div className="mx-auto max-w-5xl flex flex-col items-center mt-32">
        <h1 className="text-sm capitalize font-black text-pretty leading-[1.15] tracking-[-0.03em] text-neutral-700 dark:text-neutral-400 sm:text-2xl sm:leading-[1.15]">
          What are our users saying?
        </h1>
        <p className="mt-1 mb-5 text-base leading-6 tracking-tight sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium text-balance">
          Hear from Our Users: Real Experiences, Real Impact
        </p>

        <div className="columns-3 gap-6 space-y-6">
          {USER_REVIEW_DATA.map((review) => (
            <div
              key={review.id}
              className={`break-inside-avoid rounded-xl p-6 shadow-sm hover:shadow-md border hover:bg-secondary dark:hover:bg-primary-foreground transition-all ease-in duration-150`}
            >
              <div className="flex items-center gap-4 mb-1 relative z-10">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover grayscale"
                />
                <div>
                  <h3 className="font-semibold text-lg leading-3 text-gray-900 dark:text-white">
                    {review.author}
                  </h3>
                  <span className="text-xs text-neutral-800 dark:text-neutral-500 font-semibold">
                    {review.role}
                  </span>
                  <div className="flex -mt-1">
                    {Array.from({ length: review.ratings }).map((_, index) => (
                      <span key={index} className="text-green-500 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full flex items-start relative">
                <Quote className="size-24 dark:text-neutral-800 text-neutral-300 absolute right-0 -top-20" />
                <p className="text-neutral-700 dark:text-neutral-400 mb-4 relative z-10">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl flex items-start mt-32 mb-16">
        <div className="w-1/2">
          <h1 className="text-sm capitalize font-black text-pretty leading-[1.15] tracking-[-0.03em] text-neutral-700 dark:text-neutral-400 sm:text-2xl sm:leading-[1.15]">
            Frequently Asked Questions
          </h1>
          <p className="mt-1 mb-5 text-base leading-6 tracking-tight sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium text-balance">
            Get answers to your questions. If you can't find what you're looking
            for, feel free to reach out to us.
          </p>
        </div>

        <div className="w-1/2">
          <Accordion type="single" collapsible className="w-full">
            {ACCORDION_FAQS.map((questions) => (
              <AccordionItem value={questions.value} key={questions.id}>
                <AccordionTrigger>{questions.question}</AccordionTrigger>
                <AccordionContent>{questions.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <footer className="mt-auto pb-4 font-semibold mx-auto text-center mb-3 max-w-6xl flex items-center justify-between">
        <p className="text-xs text-neutral-600">
          © {APP_CONFIGURATION.CURRENT_YEAR}{" "}
          {APP_CONFIGURATION.APPLICATION_NAME} |{" "}
          {APP_CONFIGURATION.DEVELOPER_NAME}. All rights reserved.
        </p>

        <div className="flex items-center justify-center gap-3">
          {DEVELOPER_SOCIAL_LINKS.map((link) => (
            <span key={link.id}>
              <a
                href={link.link}
                target="_blank"
                className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                <link.Icon className="size-6 hover:text-green-500 transition-all ease-in duration-150" />
              </a>
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
