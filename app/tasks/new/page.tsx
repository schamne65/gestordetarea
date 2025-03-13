'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"


export default function NewTaskPage(){
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData , setFormData] = useState ({
        name: "",
        assignedTo: "",
        dueDate: "",
        status: "pendiente",
        observations: "",
    })

    const handleChange = (e :React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        const {name , value} = e.target 
        setFormData((prev) => ({...prev, [name] : value}))
    }

    const handleSelectChange =(name: string , value: string) =>{
        setFormData((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Aquí normalmente enviarías los datos a tu API
            console.log("Enviando datos de la tarea:", formData)
      
            // Simular una llamada a la API
            await new Promise((resolve) => setTimeout(resolve, 1000))
      
            // Redirigir a la lista de tareas
            router.push("/tasks")
          } catch (error) {
            console.error("Error al crear la tarea:", error)
            alert("Ocurrió un error al crear la tarea. Por favor, intenta de nuevo.")
          } finally {
            setIsSubmitting(false)
          }
    }

    return(
        <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tasks">
          <Button variant="outline" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nueva Tarea</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Tarea</CardTitle>
          <CardDescription>Completa el formulario para crear una nueva tarea.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la tarea</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Diseñar página de inicio"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Asignar a</Label>
              <Input
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Fecha límite</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en-progreso">En Progreso</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observations">Observaciones</Label>
              <Textarea
                id="observations"
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                placeholder="Detalles adicionales sobre la tarea..."
                rows={4}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
            <Link href="/tasks">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="btn-brand">
              {isSubmitting ? (
                "Guardando..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Tarea
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    )

}