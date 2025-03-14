import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { initializeDatabase } from "@/lib/db"

export async function GET() {
  try {
    // Test 1: Basic connection
    const connectionTest = await sql`SELECT NOW();`
    
    // Test 2: Initialize database (creates tables)
    const initResult = await initializeDatabase()
    
    // Test 3: Check if tables exist
    const tablesTest = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `

    return NextResponse.json({
      success: true,
      connection: {
        success: true,
        timestamp: connectionTest.rows[0].now
      },
      initialization: initResult,
      tables: tablesTest.rows.map(row => row.table_name)
    })
  } catch (error) {
    console.error("Error testing database:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Error connecting to database"
    }, { 
      status: 500 
    })
  }
}