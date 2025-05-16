import { AppProvider } from "@/components/providers/AppProvider";

export default function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppProvider>{children}</AppProvider>;
}
