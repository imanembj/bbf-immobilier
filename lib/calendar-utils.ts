// Vérifier si deux périodes se chevauchent
export function datesOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const s1 = new Date(start1)
  const e1 = new Date(end1)
  const s2 = new Date(start2)
  const e2 = new Date(end2)
  
  return s1 < e2 && s2 < e1
}

// Vérifier si une période chevauche des événements existants
export function checkAvailability(
  checkIn: string,
  checkOut: string,
  bookedEvents: { start: string; end: string }[]
): { available: boolean; conflictingDates?: string[] } {
  const conflicts: string[] = []
  
  for (const event of bookedEvents) {
    if (datesOverlap(checkIn, checkOut, event.start, event.end)) {
      conflicts.push(`${event.start} au ${event.end}`)
    }
  }
  
  return {
    available: conflicts.length === 0,
    conflictingDates: conflicts.length > 0 ? conflicts : undefined
  }
}

// Récupérer les événements depuis l'API
export async function getCalendarEvents(calendarId: string): Promise<{ start: string; end: string }[]> {
  try {
    const response = await fetch(`/api/calendar/events?calendarId=${encodeURIComponent(calendarId)}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      console.error('Failed to fetch calendar events')
      return []
    }
    
    const data = await response.json()
    return data.events || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}
