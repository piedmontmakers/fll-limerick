export interface Team {
  teamNumber: string;
  teamName: string;
  displayName: string;
}

export async function fetchTeamsFromSheet(sheetId: string): Promise<Team[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch team data from Google Sheet');
  }

  const csvText = await response.text();
  const lines = csvText.split('\n');

  // Skip header row, parse remaining rows
  const teams: Team[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV - handle quoted values
    const values = parseCSVLine(line);
    const teamNumber = values[0]?.replace(/"/g, '').trim();
    const teamName = values[1]?.replace(/"/g, '').trim();

    if (teamNumber && teamName) {
      teams.push({
        teamNumber,
        teamName,
        displayName: `${teamNumber} - ${teamName}`
      });
    }
  }

  // Sort by team number (numeric)
  teams.sort((a, b) => parseInt(a.teamNumber) - parseInt(b.teamNumber));

  return teams;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);

  return values;
}
