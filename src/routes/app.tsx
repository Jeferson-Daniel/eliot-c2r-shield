import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/eliot/AppShell";

export const Route = createFileRoute("/app")({
  component: AppShell,
});
