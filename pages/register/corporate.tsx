'use client'
import CorporateForm from '../../components/forms/CorporateForm'

export default function CorporateRegistrationPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-6">Register as Corporate</h1>
      <CorporateForm />
    </main>
  )
}
