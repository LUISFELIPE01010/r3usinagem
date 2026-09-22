import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "R3 Usinagem" },
      { name: "theme-color", content: "#050505" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "R3 Usinagem" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Montserrat:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function VLibrasLoader() {
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    // Reseta qualquer estado salvo pelo VLibras (ex.: fechado com X) para que
    // o widget sempre reapareça em cada carregamento do site.
    try {
      Object.keys(localStorage)
        .filter((k) => k.toLowerCase().includes("vlibras"))
        .forEach((k) => localStorage.removeItem(k));
      Object.keys(sessionStorage)
        .filter((k) => k.toLowerCase().includes("vlibras"))
        .forEach((k) => sessionStorage.removeItem(k));
    } catch {
      // ignore storage access errors
    }

    document.querySelector("[vw]")?.remove();

    const positionWidget = () => {
      const host = document.getElementById("vlibras-access-wrapper");
      const access = host?.shadowRoot?.getElementById("vlibras-access");
      if (!(access instanceof HTMLElement)) return false;

      if (window.innerWidth <= 768) {
        access.style.setProperty("top", "auto", "important");
        access.style.setProperty("right", "auto", "important");
        access.style.setProperty("bottom", "16px", "important");
        access.style.setProperty("left", "16px", "important");
      } else {
        access.style.setProperty("top", "calc(50vh - 20px)", "important");
        access.style.setProperty("right", "16px", "important");
        access.style.setProperty("bottom", "auto", "important");
        access.style.setProperty("left", "auto", "important");
      }

      return true;
    };

    const initializeVLibras = () => {
      const vlibras = (window as typeof window & {
        VLibras?: {
          Widget: new (rootPath?: string, configUrl?: string, avatar?: string, position?: "l" | "r") => unknown;
        };
      }).VLibras;

      if (vlibras?.Widget && !document.getElementById("vlibras-access-wrapper")) {
        new vlibras.Widget("https://vlibras.gov.br/app", undefined, undefined, "r");
      }

      requestAnimationFrame(positionWidget);
    };

    const existingScript = document.getElementById("vlibras-script") as HTMLScriptElement | null;

    if (existingScript) {
      initializeVLibras();
      existingScript.addEventListener("load", initializeVLibras, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = initializeVLibras;
      document.body.appendChild(script);
    }

    const observer = new MutationObserver(positionWidget);
    observer.observe(document.body, { childList: true, subtree: false });

    window.addEventListener("resize", positionWidget);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", positionWidget);
    };
  }, []);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <VLibrasLoader />
    </QueryClientProvider>
  );
}

