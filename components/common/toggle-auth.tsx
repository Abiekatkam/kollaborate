"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { APP_CONFIGURATION, CLIENT_SIDE_URL } from "../constants/urls";
import { Button } from "../ui/button";
import { LuMessageSquareText } from "react-icons/lu";

// TODO: Complete the functionality of feedback component
// TODO: Chat reaction
// TODO: New message notification

const ToggleAuthButton = () => {
  const [isCookieAvailable, setIsCookieAvailable] = useState(false);

  useEffect(() => {
    const token = Cookies.get(APP_CONFIGURATION.COOKIE_TOKEN);
    setIsCookieAvailable(!!token);
  }, []);

  return isCookieAvailable ? (
    <Button className="flex items-center group">
      <LuMessageSquareText className="size-4 group-hover:scale-110 transition-all ease-in-out duration-150" />
      Feedback
    </Button>
  ) : (
    <Link
      href={CLIENT_SIDE_URL.AUTH.LOGIN}
      className="leading-2 mr-4 inline-flex h-[34px] items-center overflow-hidden rounded-md text-white bg-neutral-900 dark:text-neutral-800 dark:bg-neutral-50 px-4 py-1 text-sm font-medium transition hover:bg-neutral-800 dark:hover:bg-neutral-300"
    >
      Login
    </Link>
  );
};

export default ToggleAuthButton;
