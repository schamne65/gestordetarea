import { Button } from "@/components/ui/button"
import TaskGrid from "@/components/task-grid"
import { TaskDialog } from "@/components/task-dialog"
import Link from "next/link"
import { TableIcon, GridIcon } from "lucide-react"

export default function TasksGridPage() {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mis Tareas</h1>
          <div className="flex gap-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Link href="/tasks">
                <Button variant="ghost" className="rounded-none border-r" title="Vista de tabla">
                  <TableIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tasks/grid">
                <Button variant="ghost" className="rounded-none bg-accent" title="Vista de cuadrícula">
                  <GridIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <TaskDialog onSave={(data) => console.log("Nueva tarea:", data)} buttonText="Agregar Tarea" />
          </div>
        </div>
  
        <TaskGrid />
      </div>
    )
  }
  