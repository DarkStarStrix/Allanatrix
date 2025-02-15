// src/app/components/FormattedDate.tsx
'use client'

export default function FormattedDate({ date }: { date: string }) {
  // Use a stable date format that won't change between server and client
  const formattedDate = new Date(date).toISOString().split('T')[0]
  return <time dateTime={date}>{formattedDate}</time>
}
