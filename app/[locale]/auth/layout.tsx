import { cn } from "@/src/lib/utils";
import { atten_new, hatton } from "@/src/utils/fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn(hatton.variable, atten_new.variable, "h-full bg-gray-300")}>
      <div className="flex justify-center items-center">
        {children}
      </div>
    </main>
  );
}