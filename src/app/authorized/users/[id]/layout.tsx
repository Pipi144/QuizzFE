import BlurFade from "@/components/ui/blur-fade";
import { Card } from "@/components/ui/card";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
