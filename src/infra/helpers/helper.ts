export const parseDateBrToDefaultFormat = (date: string) => {
  const [dia, mes, ano] = date.split("/")
  return `${ano}-${mes}-${dia}`
}

export  const isValidISODate = (dateString: string)  => {
  // Regex to check for yyyy-mm-dd format
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateString.match(regex);
  if (!match) return false;

  // Extract year, month, day as numbers
  const [ , year, month, day ] = match.map(Number);

  // Create a Date object (month - 1 because months are zero-indexed)
  const date = new Date(year, month - 1, day);

  // Check if the created date matches the input values exactly
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export const wait = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export function getAgeFromDate(dateString: string | Date): number {
  const birthDate = new Date(dateString)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  return age
}

export function getAgeCategory(dateString: string | Date): 'Adolescente' | 'Jovem' | 'Adulto' {
  const age = getAgeFromDate(dateString)

  if (age < 10) return 'Criança'
  if (age >= 10 && age <= 16) return 'Adolescente'
  if (age >= 17 && age <= 22) return 'Jovem'
  return 'Adulto'
}

export function getClassBadgeAgeCategory(dateString: string | Date): string {
  const age = getAgeFromDate(dateString)

  if (age < 10) return 'bg-warning-subtle text-warning'
  if (age >= 10 && age <= 16) return 'bg-info-subtle text-info'
  if (age >= 17 && age <= 22) return 'bg-primary-subtle text-primary'
  return 'bg-purple-subtle text-purple'
}
