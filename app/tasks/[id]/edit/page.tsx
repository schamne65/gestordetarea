"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

type TaskStatus = "pendiente" | "en-progreso" | "completada" | "cancelada"

interface Task {
  id: string
  name: string
  assignedDate: string
  assignedTo: string
  dueDate: string
  status: TaskStatus
  observations: string
}

const tasks: Task[] = [
  {
    id: "1",
    name: "Diseñar página de inicio",
    assignedDate: "2023-05-10",
    assignedTo: "Juan Pérez",
    dueDate: "2023-05-20",
    status: "completada",
    observations: "Incluir sección de testimonios",
  },
  {
    id: "2",
    name: "Implementar autenticación",
    assignedDate: "2023-05-12",
    assignedTo: "María García",
    dueDate: "2023-05-25",
    status: "en-progreso",
    observations: "Usar NextAuth.js",
  },
  {
    id: "3",
    name: "Optimizar rendimiento",
    assignedDate: "2023-05-15",
    assignedTo: "Carlos Rodríguez",
    dueDate: "2023-05-30",
    status: "pendiente",
    observations: "Enfocarse en tiempo de carga inicial",
  },
  {
    id: "4",
    name: "Crear documentación",
    assignedDate: "2023-05-18",
    assignedTo: "Ana Martínez",
    dueDate: "2023-06-05",
    status: "pendiente",
    observations: "Incluir diagramas de flujo",
  },
  {
    id: "5",
    name: "Pruebas de integración",
    assignedDate: "2023-05-20",
    assignedTo: "Juan Pérez",
    dueDate: "2023-06-10",
    status: "cancelada",
    observations: "Usar Jest y Testing Library",
  },
]

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    assignedTo: "",
    dueDate: "",
    status: "pendiente" as TaskStatus,
    observations: ""
  })

  useEffect(() => {
    
    const fetchTask = async () => {
      try {
        const {id}= await params
        const foundTask = tasks.find(t => t.id === id)
        if (foundTask) {
          setFormData({
            name: foundTask.name,
            assignedTo: foundTask.assignedTo,
            dueDate: foundTask.dueDate,
            status: foundTask.status,
            observations: foundTask.observations,
          })
        } else {
          router.push("/tasks")
        }
      } catch (error) {
        console.error("Error al cargar la tarea ", error)
      } finally {
        setLoading(false)
      }
    }
    if (tasks) fetchTask() // ✅ Solo ejecuta la función si `params.id` existe
  }, [tasks, router]) // ✅ Agrega `params.id` como dependencia

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      //aca va a la base de datos
      console.log("tarea actualiada")

      await new Promise((resolve) => setTimeout(resolve, 1000))


      router.push("/tasks")

    } catch (error) {
      console.error("no se actualizo", error)
      alert("ocurrio un error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link href="/tasks">
          <Button variant="outline" className="mr-4">
            <ArrowLeft></ArrowLeft>
            Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Editar Tarea</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle> Actualiza la información de la tarea. </CardTitle>
        </CardHeader>
  

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="name"> Nombre de la tarea</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ej. diseñar pagia de inicio"
            >
            </Input>
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
          <div>
            <Label htmlFor="status"> Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value as TaskStatus)}
              >
              <SelectTrigger>
                <SelectValue placeholder="seleccione un estado"></SelectValue>
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

          <CardFooter  className="flex justify-end space-x-4">
            <Link href="/tasks">
              <Button type="submit" disabled={isSubmitting} className="btn-brand">
              {isSubmitting ? (
                  "Guardando..."
                ) : (
                  <>
                  <Save className="mr-2 h-4 w-4"  />
                  </>
                )
              }
              </Button >
            </Link>
          </CardFooter>
       </form>
      </Card>
    </div>
  )

}

