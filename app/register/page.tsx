import { Button } from "@/components/ui/button";
import { Card, CardContent , CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";


export default function RegisterPage() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestor de Tareas</h1>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">Crear una cuenta</h2>
            <p className="mt-2 text-sm text-gray-600">
              O{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                inicia sesión si ya tienes una cuenta
              </Link>
            </p>
          </div>
            <Card>
                <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Registrase</CardTitle>
                    <CardDescription>Crea una cuenta para comenzar a gestionar tus tareas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre </Label>
                        <Input id="name" type="text" placeholder="Juan Perez"></Input>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" placeholder="tu@ejemplo.com" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" >Crear una cuenta</Button>
                </CardFooter>
            </Card>
        
          <div className="text-center text-sm text-gray-600">
            Al registrarte, aceptas nuestros{" "}
            <Link href="/terms" className="font-medium text-primary hover:text-primary/90">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary/90">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    )
  }