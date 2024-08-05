import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}
