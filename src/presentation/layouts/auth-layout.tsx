import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen relative">
      {children}
    </div>
  )
}
