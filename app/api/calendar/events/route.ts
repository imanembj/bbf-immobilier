import { NextResponse } from 'next/server'

// Parser iCal simple pour extraire les dates des événements
function parseICalEvents(icalData: string): { start: string; end: string }[] {
  const events: { start: string; end: string }[] = []
  const lines = icalData.split('\n')
  
  let currentEvent: { start?: string; end?: string } = {}
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine === 'BEGIN:VEVENT') {
      currentEvent = {}
    } else if (trimmedLine.startsWith('DTSTART')) {
      const match = trimmedLine.match(/DTSTART[^:]*:(\d{8})/)
      if (match) {
        const dateStr = match[1]
        currentEvent.start = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
      }
    } else if (trimmedLine.startsWith('DTEND')) {
      const match = trimmedLine.match(/DTEND[^:]*:(\d{8})/)
      if (match) {
        const dateStr = match[1]
        currentEvent.end = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
      }
    } else if (trimmedLine === 'END:VEVENT') {
      if (currentEvent.start && currentEvent.end) {
        events.push({
          start: currentEvent.start,
          end: currentEvent.end
        })
      }
    }
  }
  
  return events
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const calendarId = searchParams.get('calendarId')
    
    if (!calendarId) {
      return NextResponse.json({ error: 'Calendar ID required' }, { status: 400 })
    }
    
    // Construire l'URL iCal
    const icalUrl = `https://calendar.google.com/calendar/ical/${calendarId}@group.calendar.google.com/public/basic.ics`
    
    // Récupérer le fichier iCal
    const response = await fetch(icalUrl, {
      cache: 'no-store' // Ne pas mettre en cache pour avoir les données à jour
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 })
    }
    
    const icalData = await response.text()
    
    // Parser les événements
    const events = parseICalEvents(icalData)
    
    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
