import { CircleDollarSign } from "lucide-react";

type OwnerSummaryProps = {
  owner: {
    id: string;
    email: string;
    name: string;
  } | null;
};

export function OwnerSummary({ owner }: OwnerSummaryProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CircleDollarSign className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {owner?.name ?? "Owner aktif"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {owner?.email ?? "1 akun terhubung"}
          </p>
        </div>
      </div>
    </div>
  );
}
