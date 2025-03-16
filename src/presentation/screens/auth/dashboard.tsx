import AppWalletCard from "../../components/atoms/app-wallet-card";
import PricesControlCard from "../../components/atoms/prices-card";
import AuthLayout from "../../layouts/auth-layout";

export default function DashboardPage() {
  return (
    <AuthLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppWalletCard />
          <PricesControlCard />
        </div>
      </div>
    </AuthLayout>
  )
}
