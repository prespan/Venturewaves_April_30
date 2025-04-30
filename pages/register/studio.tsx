import StudioForm from '@/components/forms/StudioForm'

export default function StudioRegistration() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Studio</h1>
      <StudioForm />
    </main>
  )
}
