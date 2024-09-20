"use client";

import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h4>{error.message}</h4>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
