import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import queryString from "query-string";

interface PollOptionProps {
  id: string;
  pollQuestion: string;
  pollOptions: string[];
  pollVotes: Record<string, number>;
  userVotedOption?: string;
  isPollMessage?: boolean;
  socketUrl: string;
  socketQuery?: Record<string, string>;
}

export const ChatPollView = ({
  id,
  pollQuestion,
  pollOptions,
  pollVotes: initialVotes,
  userVotedOption,
  isPollMessage,
  socketUrl,
  socketQuery,
}: PollOptionProps) => {
  const [votes, setVotes] = useState(initialVotes);
  const [selectedOption, setSelectedOption] = useState(userVotedOption || "");

  const totalVotes = Object.values(votes).reduce((a, b) => a + Number(b), 0);    

  const handleVoteChange = (newVote: string) => {
    setSelectedOption(newVote);

    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };

      if (selectedOption && updatedVotes[selectedOption] > 0) {
        updatedVotes[selectedOption] -= 1;
      }

      updatedVotes[newVote] = (updatedVotes[newVote] || 0) + 1;

      return updatedVotes;
    });
  };

  const handlePollVote = async (selectedOption: string) => {
    try {
      const url = queryString.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, { selectedOption });
    } catch (error) {
      console.log("Poll vote failed:", error);
    }
  };

  return (
    isPollMessage && (
      <div className="flex md:w-[400px] w-full items-start gap-y-2">
        <div className="flex flex-col items-start py-3 rounded-md w-full transition-all ease-in duration-200">
          <label className="mb-2 block w-full">
            <span className="mb-1 block text-lg font-semibold leading-6 text-neutral-800 dark:text-neutral-300">
              {pollQuestion}
            </span>
          </label>

          <div className="flex flex-wrap flex-row items-start gap-2 w-full">
            <RadioGroup
              value={selectedOption}
              onValueChange={handleVoteChange}
              className="w-full"
            >
              {pollOptions.map((option, index) => {
                const voteCount = votes?.[option] || 0;
                const percent =
                  totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                return (
                  <Label
                    key={index}
                    htmlFor={`poll-option-${index}`}
                    onClick={() => handlePollVote(option)}
                    className={`relative flex flex-col gap-1 border ${
                      selectedOption === option
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-neutral-500 dark:border-neutral-700"
                    } p-3 rounded-lg cursor-pointer transition-all`}
                  >
                    <div className="w-full flex items-center justify-between relative z-10">
                      <span className="text-sm text-neutral-800 dark:text-neutral-200">
                        {option}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {voteCount} vote{voteCount !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <Progress
                      value={percent}
                      className={cn(
                        "h-2 bg-neutral-400 dark:bg-neutral-700",
                        selectedOption === option
                          ? "bg-green-500 dark:bg-green-500"
                          : "bg-neutral-950 dark:bg-neutral-300"
                      )}
                    />

                    <RadioGroupItem
                      value={option}
                      id={`poll-option-${index}`}
                      className="absolute top-3 right-3 hidden"
                    />
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          <div className="mt-2">
            <span className="text-xs text-neutral-500">
              Total votes: {totalVotes}
            </span>
          </div>
        </div>
      </div>
    )
  );
};
