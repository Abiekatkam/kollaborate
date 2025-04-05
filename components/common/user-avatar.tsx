import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl?: string | null | undefined;
  className?: string;
}

export const UserAvatar = ({ imageUrl, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-7 md:size-10", className)}>
      <AvatarImage src={imageUrl || ""} alt="User Avatar" />
    </Avatar>
  );
};
