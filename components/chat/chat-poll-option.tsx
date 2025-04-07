import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const MAX_OPTIONS = 4;
const MIN_OPTIONS = 2;

interface ChatPollOptionProps {
  state: {
    pollQuestion: string;
    pollOptions: string[];
    errors: string;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      content: string;
      fileUrl: string;
      fileType: string;
      pollQuestion: string;
      pollOptions: string[];
      errors: string;
      isPollMessage: boolean;
    }>
  >;
}

const ChatPollOption: React.FC<ChatPollOptionProps> = ({ state, setState }) => {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...state.pollOptions];
    updatedOptions[index] = value;

    setState((prev) => ({
      ...prev,
      pollOptions: updatedOptions,
    }));
  };

  const handleAddOption = () => {
    if (state.pollOptions.length < 4) {
      setState((prev) => ({
        ...prev,
        pollOptions: [...prev.pollOptions, ""],
      }));
    }
  };

  const handleRemoveOption = (index: number) => {
    const updated = state.pollOptions.filter((_, i) => i !== index);

    setState((prev) => ({
      ...prev,
      pollOptions: updated,
    }));
  };

  return (
    <div className="flex md:w-[680px] w-full items-start p-2 gap-y-2">
      <div className="flex flex-col items-start p-3 border-2 border-neutral-400 rounded-md w-full">
        <label className="mb-2 block w-full">
          <span className="mb-1 block text-xs font-semibold leading-6 text-neutral-800 dark:text-neutral-300">
            Poll Question
          </span>
          <input
            className="border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700/10 shadow-none text-sm outline-0 focus:border-0 px-1 w-full"
            type="text"
            placeholder="e.g., What is Kollaborate?"
            required
            value={state.pollQuestion}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                pollQuestion: e.target.value,
              }))
            }
          />
        </label>

        <div className="flex flex-wrap flex-row items-start gap-2 w-full py-3">
          {state.pollOptions.map((option, index) => (
            <div
              key={index}
              className="relative group p-2 border-2 border-neutral-400 rounded-md w-[48%]"
            >
              <label className="block w-full">
                <span className="mb-1 block text-xs font-semibold leading-6 text-neutral-800 dark:text-neutral-300">
                  Poll Option {index + 1}
                </span>
                <input
                  className="border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-neutral-600 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700/10 shadow-none text-sm outline-0 focus:border-0 px-2 w-full"
                  type="text"
                  placeholder={`e.g., Option ${index + 1}`}
                  required
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </label>
              {state.pollOptions.length > MIN_OPTIONS && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                  aria-label="Remove Option"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {state.pollOptions.length < MAX_OPTIONS && (
          <Button
            type="button"
            onClick={handleAddOption}
            className="mt-1 px-4 py-1 rounded-md text-sm w-full"
          >
            + Add Option
          </Button>
        )}
        {state.errors && (
          <p className="text-red-500 text-sm mt-1">{state.errors}</p>
        )}
      </div>
    </div>
  );
};

export default ChatPollOption;
