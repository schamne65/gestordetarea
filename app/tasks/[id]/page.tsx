"use client"

import { useEffect, useState } from "react"
import {  useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"



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

// Datos de ejemplo
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

const StatusBadge = ({status} : {status : TaskStatus}) => {
    const statusConfig = {
        pendiente: { class: "bg-yellow-500 hover:bg-yellow-600", label: "Pendiente" },
        "en-progreso": { class: "bg-blue-500 hover:bg-blue-600", label: "En Progreso" },
        completada: { class: "bg-green-500 hover:bg-green-600", label: "Completada" },
        cancelada: { class: "bg-red-500 hover:bg-red-600", label: "Cancelada" },
    }

    const config = statusConfig [status]

     return <Badge className={config.class}>{config.label}</Badge>
}

export default function TaskDetailPage ({params} : { params : {id : string}}){
    const router = useRouter()
    const [task , setTask] = useState <Task | null > (null)
    const [loading, setLoading]= useState(true)

    useEffect(() => {
        // Simular carga de datos
        
        const fetchTask = async () => {
          const {id} = await params
          try {
            // En un caso real, aquí harías una llamada a tu API
            const foundTask = tasks.find((t) => t.id === id)
    
            if (foundTask) {
              setTask(foundTask)
            } else {
              // Si no se encuentra la tarea, redirigir a la lista
              router.push("/tasks")
            }
          } catch (error) {
            console.error("Error al cargar la tarea:", error)
          } finally {
            setLoading(false)
          }
        }
    
        fetchTask()
      }, [params.id, router])

      const formatDate = (dateString : string) => {
        const options : Intl.DateTimeFormatOptions = {year: "numeric" , month : "long" , day : "numeric"}
        return new Date(dateString).toLocaleDateString("es-ES" , options)
      }

      const deleteTask = async () => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
          try {
            // Aquí normalmente harías una llamada a tu API para eliminar
            console.log("Eliminando tarea:", params.id)
    
            // Simular una llamada a la API
            await new Promise((resolve) => setTimeout(resolve, 500))
    
            // Redirigir a la lista de tareas
            router.push("/tasks")
          } catch (error) {
            console.error("Error al eliminar la tarea:", error)
            alert("Ocurrió un error al eliminar la tarea. Por favor, intenta de nuevo.")
          }
        }
      }

      if (loading) {
        return (
          <div className="container mx-auto py-8 px-4 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
          </div>
        )
      }

      if (!task) {
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Tarea no encontrada</h1>
              <Link href="/tasks">
                <Button>Volver a la lista de tareas</Button>
              </Link>
            </div>
          </div>
        )
      }

      return (
        <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/tasks">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Detalles de la Tarea</h1>
        </div>
        <Card className="max-w-2xl mx-auto">
            <CardHeader >
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl" > {task.name} </CardTitle>
                        <CardDescription> Creada el {formatDate(task.assignedDate)}</CardDescription>
                    </div>
                    <StatusBadge status={task.status}></StatusBadge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  
                <div>
                <h3 className="text-sm font-medium text-gray-500">Asignada a</h3>
                <p className="mt-1 text-lg">{task.assignedTo}</p>
                </div>

                <div>
                <h3 className="text-sm font-medium text-gray-500">Fecha límite</h3>
                <p className="mt-1 text-lg">{formatDate(task.dueDate)}</p>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-gray-500">Observaciones</h3>
                <p className="mt-1 whitespace-pre-line">{task.observations || "Sin observaciones"}</p>
            </div>
            </CardContent>
            <CardFooter>
                <Button
                variant="outline"
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={deleteTask}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                </Button>
                <Link href={`/tasks/${task.id}/edit`}>
                    <Button className="btn-brand">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                    </Button>
                </Link>
            </CardFooter>
        </Card>
       </div> 

      )


}