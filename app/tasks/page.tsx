'use client'

import TaskTable from "@/components/task-table"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "@/components/task-dialog"
import Link from "next/link"
import { TableIcon, GridIcon } from "lucide-react"

export default function TasksPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Tareas</h1>
        <div className="flex gap-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Link href="/tasks">
              <Button variant="ghost" className="rounded-none bg-accent" title="Vista de tabla">
                <TableIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/tasks/grid">
              <Button variant="ghost" className="rounded-none border-l" title="Vista de cuadrícula">
                <GridIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <TaskDialog onSave={(data) => console.log("Nueva tarea:", data)} buttonText="Agregar Tarea" />
        </div>
      </div>

      <TaskTable />
    </div>
  )
}