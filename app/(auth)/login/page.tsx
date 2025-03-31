"use client";
import CircleLoader from "@/components/common/circle-loader";
import { CLIENT_SIDE_URL, SERVER_SIDE_URLS } from "@/components/constants/urls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [state, setState] = useState({
    loading: false,
    email: "",
    success: false,
    error: "",
  });

  const handleLogin = async () => {
    setState((prev) => ({ ...prev, loading: true, error: "", success: false }));

    try {
      const res = await fetch(SERVER_SIDE_URLS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email: state.email }),
        headers: { "Content-Type": "application/json" },
      });

      const error = await res.json();
      if (!res.ok) {
        setState((prev) => ({
          ...prev,
          success: false,
          loading: false,
          error: error.message,
        }));
        return;
      }
      setState((prev) => ({
        ...prev,
        success: true,
        loading: false,
        email: "",
        error: "",
      }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  };

  return (
    <div className="sm:w-[380px] min-h-[220px] w-[335px] h-full flex flex-col items-start px-4 pt-2 rounded-md">
      <form
        className="grid w-full grid-cols-1 items-center gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
      >
        <label className="mb-1 block">
        <span className="mb-1 block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-300">
            Email Address
          </span>
          <input
            className="block h-8 w-full appearance-none rounded-md bg-white dark:bg-neutral-950 px-3 text-sm text-black dark:text-white shadow-sm ring-1 ring-neutral-300 dark:ring-neutral-700 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-300 placeholder:italic"
            autoFocus
            inputMode="email"
            autoComplete="email"
            type="email"
            placeholder="eg: your-email@emailadress.com"
            required
            value={state.email}
            onChange={(event) => {
              setState({ ...state, email: event.target.value });
            }}
          />
        </label>
        <Button
          type="submit"
          disabled={state.loading}
          className="h-9"
        >
          {state.loading ? (
            <CircleLoader
              className="text-neutral-300 dark:text-neutral-800"
              text="Generating a link..."
            />
          ) : (
            "Send magic link"
          )}
        </Button>

        <p className="text-center text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Don{"'"}t have an account?{" "}
          <Link
            href={CLIENT_SIDE_URL.AUTH.REGISTER}
           className="border-b-[1px] border-zinc-700 pb-[1px] font-bold hover:border-neutral-500 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-500"
          >
            Register
          </Link>{" "}
          for free.
        </p>

        <p
          className={`h-[50px] text-center text-xs font-medium mt-2 ${
            (state.success && !state.error) || (!state.success && state.error)
              ? ""
              : "hidden"
          }`}
        >
          {state.success && !state.error ? (
            <span className="text-green-700 bg-green-100 p-2 rounded-md">
              We just sent an email with magic link{","} check your inbox.
            </span>
          ) : null}

          {!state.success && state.error ? (
            <span className="text-red-500 bg-red-100 p-2 rounded-md">
              {state.error || "An error occurred, please try again."}
            </span>
          ) : null}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
