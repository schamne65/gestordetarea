"use client"

import { useState } from "react"
import { TaskCard } from "@/components/task-card"

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

  export default function TaskGrid() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
  
    // Función para eliminar una tarea
    const deleteTask = (id: string) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        setTasks(tasks.filter((task) => task.id !== id))
      }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                assignedDate={task.assignedDate}
                assignedTo={task.assignedTo}
                dueDate={task.dueDate}
                status={task.status}
                observations={task.observations}
                onDelete={deleteTask}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-card rounded-lg shadow">
              <p className="text-muted-foreground mb-4">No hay tareas disponibles.</p>
            </div>
          )}
        </div>
      )
    }