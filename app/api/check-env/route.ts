import { NextResponse } from "next/server"

export async function GET() {
  const requiredEnvVars = [
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'POSTGRES_USER',
    'POSTGRES_HOST',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  const configuredVars = requiredEnvVars.filter(varName => !!process.env[varName])

  return NextResponse.json({
    success: missingVars.length === 0,
    configured: configuredVars,
    missing: missingVars,
    message: missingVars.length > 0 
      ? `Missing required environment variables: ${missingVars.join(', ')}` 
      : 'All required environment variables are configured'
  })
} 