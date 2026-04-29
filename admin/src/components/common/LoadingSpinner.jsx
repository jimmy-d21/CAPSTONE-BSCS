import { cn } from "../ui/utils";

export default function LoadingSpinner({ size = "md", className }) {
  const sizes = { sm: "size-5 border-2", md: "size-8 border-4", lg: "size-12 border-4" };
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full border-gray-200 border-t-orange-500", sizes[size])} />
    </div>
  );
}
