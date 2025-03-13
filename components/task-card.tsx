"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"

type TaskStatus = "pendiente" | "en-progreso" | "completada" | "cancelada";


interface TaskCardProps{
    id: string
    name: string
    assignedDate: string
    assignedTo: string
    dueDate: string
    status: TaskStatus
    observations: string
    onDelete: (id: string) => void
}

const StatusBadge = ({status} : {status :TaskStatus})=>{
    const statusConfig ={
    pendiente: { class: "bg-yellow-500 hover:bg-yellow-600", label: "Pendiente" },
    "en-progreso": { class: "bg-blue-500 hover:bg-blue-600", label: "En Progreso" },
    completada: { class: "bg-green-500 hover:bg-green-600", label: "Completada" },
    cancelada: { class: "bg-red-500 hover:bg-red-600", label: "Cancelada" },
    }

    const config= statusConfig[status]

    return <Badge className={config.class}>{config.label}</Badge>
}

export function TaskCard ({
    id,
    name,
    assignedDate,
    assignedTo,
    dueDate,
    status,
    observations,
    onDelete,
} : TaskCardProps){
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString("es-ES", options)
    }

    return (
        <Card className="task-card">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{name}</CardTitle>
              <StatusBadge status={status} />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <div>
                <span className="font-medium text-muted-foreground">Asignada a:</span> {assignedTo}
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Fecha asignada:</span> {formatDate(assignedDate)}
              </div>
              <div className="col-span-2">
                <span className="font-medium text-muted-foreground">Fecha límite:</span> {formatDate(dueDate)}
              </div>
            </div>
            {observations && (
              <div className="mt-2">
                <span className="font-medium text-muted-foreground">Observaciones:</span>
                <p className="text-sm mt-1 line-clamp-2">{observations}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2 flex justify-end gap-2">
            <Link href={`/tasks/${id}`}>
              <Button variant="outline" size="sm" title="Ver detalles">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/tasks/${id}/edit`}>
              <Button variant="outline" size="sm" title="Editar">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => onDelete(id)} title="Eliminar">
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )
}