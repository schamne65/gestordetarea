import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
   
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
        <h3>nicola</h3>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestor de Tareas</h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-gray-600">
            O{" "}
            <a href="/register" className="font-medium text-primary hover:text-primary/90">
              regístrate si no tienes una cuenta
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

