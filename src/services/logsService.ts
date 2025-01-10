// logsService.ts
// Placeholder for storing logs of users/transactions in the future

const logs: any[] = [];

export function addLogEntry(entry: any) {
  logs.push(entry);
}

export function getAllLogs() {
  return logs;
}
