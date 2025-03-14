import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

// GET /api/tasks - Obtener todas las tareas
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM tasks ORDER BY created_at DESC
    `

    return NextResponse.json({ tasks: rows }, { status: 200 })
  } catch (error) {
    console.error("Error al obtener tareas:", error)
    return NextResponse.json({ error: "Error al obtener las tareas" }, { status: 500 })
  }
}

// POST /api/tasks - Crear una nueva tarea
export async function POST(request: Request) {
  try {
    const { name, assignedTo, dueDate, status, observations } = await request.json()

    // Validar datos
    if (!name || !assignedTo || !dueDate || !status) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const currentDate = new Date().toISOString().split("T")[0]

    const { rows } = await sql`
      INSERT INTO tasks (name, assigned_to, assigned_date, due_date, status, observations)
      VALUES (${name}, ${assignedTo}, ${currentDate}, ${dueDate}, ${status}, ${observations || ""})
      RETURNING *
    `

    return NextResponse.json({ task: rows[0] }, { status: 201 })
  } catch (error) {
    console.error("Error al crear tarea:", error)
    return NextResponse.json({ error: "Error al crear la tarea" }, { status: 500 })
  }
}

