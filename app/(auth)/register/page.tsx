"use client";
import CircleLoader from "@/components/common/circle-loader";
import { SERVER_SIDE_URLS } from "@/components/constants/urls";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [state, setState] = useState({
    loading: false,
    email: "",
    fullname: "",
    success: false,
    error: "",
  });

  const handleRegister = async () => {
    setState((prev) => ({ ...prev, loading: true, error: "", success: false }));

    try {
      const res = await fetch(SERVER_SIDE_URLS.AUTH.REGISTER, {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          fullname: state.fullname,
        }),
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
        fullname: "",
      }));
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  };

  

  return (
    <div className="sm:w-[380px] min-h-[220px] w-[335px] h-full flex flex-col items-start px-4 pt-2 rounded-md">
      <form
        className="grid relative w-full grid-cols-1 items-start gap-3 text-gray-800"
        onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
        }}
      >
        <label className="mb-1 block">
          <span className="mb-1 block text-sm font-semibold leading-6">
            Full Name
          </span>
          <input
            className="block h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic"
            autoFocus
            inputMode="text"
            autoComplete="fullname"
            type="text"
            placeholder="eg: Abhishek Katkam"
            required
            value={state.fullname}
            onChange={(event) => {
              setState({ ...state, fullname: event.target.value });
            }}
          />
        </label>
        <label className="mb-1 block">
          <span className="mb-1 block text-sm font-semibold leading-6">
            Email Address
          </span>
          <input
            className="block h-8 w-full appearance-none rounded-md bg-white px-3 text-sm text-black shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:italic"
            inputMode="email"
            autoComplete="email"
            type="email"
            placeholder="eg: your-email@emailaddress.com"
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
          className="h-9 bg-[#09090a] text-white"
        >
          {state.loading ? (
            <CircleLoader
              className="text-neutral-300 dark:text-neutral-800"
              text="Generating a link..."
            />
          ) : (
            "Register"
          )}
        </Button>

        <p className="text-center text-xs font-medium text-zinc-700">
          Already registered?{" "}
          <Link
            href="/login"
            className="border-b-[1px] border-zinc-700 pb-[1px] font-bold hover:border-zinc-500 hover:text-zinc-600"
          >
            Login
          </Link>{" "}
          to your account.
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

export default RegisterPage;
