import InvestorForm from '@/components/forms/InvestorForm'

export default function InvestorRegistration() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Investor</h1>
      <InvestorForm />
    </main>
  )
}
