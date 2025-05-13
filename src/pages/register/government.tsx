import GovernmentForm from '@/components/forms/GovernmentForm'

export default function GovernmentRegistration() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Government</h1>
      <GovernmentForm />
    </main>
  )
}
