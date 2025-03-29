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

      if (!res.ok) {
        const error = await res.json();
        setState((prev) => ({
          ...prev,
          success: false,
          loading: false,
          email: "",
          error: error.message,
        }));
      }
      setState((prev) => ({
        ...prev,
        success: true,
        loading: false,
        email: "",
      }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  };

  return (
    <div className="sm:w-[380px] min-h-[220px] w-[335px] h-full flex flex-col items-start px-4 pt-2 rounded-md">
      <form
        className="grid w-full grid-cols-1 items-center gap-4 text-gray-800"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
      >
        <label className="mb-1 block">
          <span className="mb-2 block text-sm font-semibold leading-6">
            Email Address
          </span>
          <input
            className="mt-2 block h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic"
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
          className="h-9 bg-[#09090a]"
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

        <p className="text-center text-xs font-medium text-gray-700">
          Don{"'"}t have an account?{" "}
          <Link
            href={CLIENT_SIDE_URL.AUTH.REGISTER}
            className="border-b-[1px] border-gray-700 pb-[1px] font-bold hover:border-gray-500 hover:text-gray-600"
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
