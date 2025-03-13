"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Definir tipos
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
const initialTasks: Task[] = [
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

// Componente para mostrar el estado con colores
const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const statusConfig = {
    pendiente: { class: "bg-yellow-500 hover:bg-yellow-600", label: "Pendiente" },
    "en-progreso": { class: "bg-blue-500 hover:bg-blue-600", label: "En Progreso" },
    completada: { class: "bg-green-500 hover:bg-green-600", label: "Completada" },
    cancelada: { class: "bg-red-500 hover:bg-red-600", label: "Cancelada" },
  }

  const config = statusConfig[status]

  return <Badge className={config.class}>{config.label}</Badge>
}

// Componente principal de la tabla
export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  // Función para eliminar una tarea
  const deleteTask = (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Nombre de la tarea</TableHead>
            <TableHead className="font-bold">Fecha asignada</TableHead>
            <TableHead className="font-bold">Asignada a</TableHead>
            <TableHead className="font-bold">Fecha límite</TableHead>
            <TableHead className="font-bold">Estado</TableHead>
            <TableHead className="font-bold">Observaciones</TableHead>
            <TableHead className="font-bold text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{formatDate(task.assignedDate)}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{formatDate(task.dueDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="max-w-xs truncate" title={task.observations}>
                  {task.observations}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/tasks/${task.id}`}>
                      <Button variant="outline" size="icon" title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/tasks/${task.id}/edit`}>
                      <Button variant="outline" size="icon" title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)} title="Eliminar">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No hay tareas disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
