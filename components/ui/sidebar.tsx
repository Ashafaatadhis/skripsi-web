"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarContextValue = {
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMobile: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
}

function SidebarProvider({ children }: React.ComponentProps<"div">) {
  const [openMobile, setOpenMobile] = React.useState(false);

  return (
    <SidebarContext.Provider
      value={{
        openMobile,
        setOpenMobile,
        toggleMobile: () => setOpenMobile((open) => !open),
      }}
    >
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return <main className={cn("min-w-0 flex-1", className)} {...props} />;
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleMobile } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleMobile}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur-xl transition hover:bg-accent lg:hidden",
        className,
      )}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "hidden h-screen w-72 shrink-0 border-r border-border/70 bg-card/85 lg:flex lg:flex-col lg:sticky lg:top-0",
          className,
        )}
        {...props}
      >
        {children}
      </aside>

      {openMobile ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm lg:hidden">
          <aside className="flex h-full w-[88vw] max-w-xs flex-col border-r border-border/70 bg-background shadow-2xl">
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                type="button"
                onClick={() => setOpenMobile(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/80 text-foreground transition hover:bg-accent"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close sidebar</span>
              </button>
            </div>
            {children}
          </aside>
        </div>
      ) : null}
    </>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("border-b border-border/70 p-4", className)} {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex-1 overflow-y-auto p-4", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("border-t border-border/70 p-4", className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
};

function SidebarMenuButton({
  className,
  asChild = false,
  isActive = false,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
        isActive && "bg-primary/10 text-primary",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
