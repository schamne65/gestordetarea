import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/db"

// POST /api/seed - Inicializar la base de datos y agregar datos de ejemplo
export async function POST() {
  try {
    // Inicializar la base de datos (crear tablas)
    const initResult = await initializeDatabase()

    if (!initResult.success) {
      return NextResponse.json({ error: "Error al inicializar la base de datos" }, { status: 500 })
    }

    // Verificar si ya hay datos en la tabla
    const { rows: existingRows } = await sql`SELECT COUNT(*) FROM tasks`
    const count = Number.parseInt(existingRows[0].count)

    // Si ya hay datos, no insertar datos de ejemplo
    if (count > 0) {
      return NextResponse.json({ message: "La base de datos ya contiene datos", count }, { status: 200 })
    }

    // Insertar datos de ejemplo
    await sql`
      INSERT INTO tasks (name, assigned_to, assigned_date, due_date, status, observations)
      VALUES 
        ('Nicolas', 'Juan Pérez', '2023-05-10', '2023-05-20', 'completada', 'Incluir sección de testimonios'),
        ('Implementar autenticación', 'María García', '2023-05-12', '2023-05-25', 'en-progreso', 'Usar NextAuth.js'),
        ('Optimizar rendimiento', 'Carlos Rodríguez', '2023-05-15', '2023-05-30', 'pendiente', 'Enfocarse en tiempo de carga inicial'),
        ('Crear documentación', 'Ana Martínez', '2023-05-18', '2023-06-05', 'pendiente', 'Incluir diagramas de flujo'),
        ('Pruebas de integración', 'Juan Pérez', '2023-05-20', '2023-06-10', 'cancelada', 'Usar Jest y Testing Library'),
        ('nicolas el mejor' , 'Vanesa' , '2025-02-04', '2025-03-04', 'pendiente', 'probando')
    `

    return NextResponse.json({ message: "Base de datos inicializada con datos de ejemplo" }, { status: 200 })
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    return NextResponse.json({ error: "Error al inicializar la base de datos" }, { status: 500 })
  }
}

