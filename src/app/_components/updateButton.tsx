"use client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {};

function UpdateButton({}: Props) {
  const triggerUpdate = api.games.updateGames.useMutation();

  return (
    <Button
      onClick={() =>
        triggerUpdate.mutate({
          triggerManualUpdate: true,
        })
      }
    >
      Trigger Manual Game Update
    </Button>
  );
}

export default UpdateButton;
