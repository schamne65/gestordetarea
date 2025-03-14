import { sql } from "@vercel/postgres"

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    // Crear tabla de tareas si no existe
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        assigned_to VARCHAR(255) NOT NULL,
        assigned_date DATE NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        observations TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

    console.log("Base de datos inicializada correctamente")
    return { success: true }
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    return { success: false, error }
  }
}

// Función para obtener todas las tareas
export async function getTasks() {
  try {
    const { rows } = await sql`
      SELECT * FROM tasks ORDER BY created_at DESC
    `
    return { tasks: rows, error: null }
  } catch (error) {
    console.error("Error al obtener tareas:", error)
    return { tasks: [], error }
  }
}

// Función para obtener una tarea por ID
export async function getTaskById(id: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM tasks WHERE id = ${id}
    `

    if (rows.length === 0) {
      return { task: null, error: "Tarea no encontrada" }
    }

    return { task: rows[0], error: null }
  } catch (error) {
    console.error("Error al obtener tarea:", error)
    return { task: null, error }
  }
}

// Función para crear una nueva tarea
export async function createTask(taskData: {
  name: string
  assignedTo: string
  dueDate: string
  status: string
  observations?: string
}) {
  try {
    const { name, assignedTo, dueDate, status, observations } = taskData
    const currentDate = new Date().toISOString().split("T")[0]

    const { rows } = await sql`
      INSERT INTO tasks (name, assigned_to, assigned_date, due_date, status, observations)
      VALUES (${name}, ${assignedTo}, ${currentDate}, ${dueDate}, ${status}, ${observations || ""})
      RETURNING *
    `

    return { task: rows[0], error: null }
  } catch (error) {
    console.error("Error al crear tarea:", error)
    return { task: null, error }
  }
}

// Función para actualizar una tarea
export async function updateTask(
  id: string,
  taskData: {
    name: string
    assignedTo: string
    dueDate: string
    status: string
    observations?: string
  },
) {
  try {
    const { name, assignedTo, dueDate, status, observations } = taskData

    const { rows } = await sql`
      UPDATE tasks
      SET name = ${name},
          assigned_to = ${assignedTo},
          due_date = ${dueDate},
          status = ${status},
          observations = ${observations || ""},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (rows.length === 0) {
      return { task: null, error: "Tarea no encontrada" }
    }

    return { task: rows[0], error: null }
  } catch (error) {
    console.error("Error al actualizar tarea:", error)
    return { task: null, error }
  }
}

// Función para eliminar una tarea
export async function deleteTask(id: string) {
  try {
    const { rowCount } = await sql`
      DELETE FROM tasks WHERE id = ${id}
    `

    if (rowCount === 0) {
      return { success: false, error: "Tarea no encontrada" }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error al eliminar tarea:", error)
    return { success: false, error }
  }
}

