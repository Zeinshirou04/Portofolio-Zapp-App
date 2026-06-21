import { NextRequest, NextResponse } from 'next/server'

const API_BASE = process.env.API_BASE_URL!
const API_TOKEN = process.env.API_SECRET_KEY!

async function proxyLike(slug: string, method: 'GET' | 'POST' | 'DELETE') {
  const res = await fetch(`${API_BASE}/api/projects/${slug}/like`, {
    method,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      Accept: 'application/json',
    },
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return proxyLike(slug, 'GET')
}

export async function POST(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return proxyLike(slug, 'POST')
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return proxyLike(slug, 'DELETE')
}