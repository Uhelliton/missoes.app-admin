/**
 * Remove todos as strings mantendo apenas numeros
 * @param {String} str
 */
export const numberOnly = (str: string): string => {
  const strReplace = str.replace(/[^0-9]+/g, '');
  return strReplace ?? null;
}

/**
 * Mantem apenas string de um texto
 * @param {String} str
 */
export const stringOnly = (str: string): string => {
  return str.replace(/\d+/g, '');
}

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

export const formatDateToPtBr = (dateString: string): string => {
  let date: Date;

  // Se vier no formato simples "YYYY-MM-DD", evitar fuso criando via UTC
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-').map(Number);
    date = new Date(Date.UTC(year, month - 1, day));
  } else {
    // Para ISO completo "YYYY-MM-DDTHH:mm:ss.sssZ", cria direto
    date = new Date(dateString);
  }

  // Pegar a data em UTC para evitar erros de fuso horário
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export const wait = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export function getAgeFromDate(dateString: string | Date): number {
  const birthDate = new Date(dateString)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  return age
}

export function getAgeCategory(value: string | Date | number): 'Criança' | 'Adolescente' | 'Jovem' | 'Adulto' {
  let age: number;

  (typeof value === 'number')
    ?  age = value
    :  age = getAgeFromDate(String(value));

  if (age < 10) return 'Criança'
  if (age >= 10 && age <= 16) return 'Adolescente'
  if (age >= 17 && age <= 22) return 'Jovem'
  return 'Adulto'
}

export function getClassBadgeAgeCategory(value: string | Date | number): string {
  let age: number;

  (typeof value === 'number')
    ?  age = value
    :  age = getAgeFromDate(String(value));

  if (age < 10) return 'bg-warning-subtle text-warning'
  if (age >= 10 && age <= 16) return 'bg-info-subtle text-info'
  if (age >= 17 && age <= 22) return 'bg-primary-subtle text-primary'
  return 'bg-purple-subtle text-purple'
}

export const ageCategoryClasses: Record<string, string> = {
  'Criança': 'bg-warning-subtle text-warning',
  'Adolescente': 'bg-info-subtle text-info',
  'Jovem': 'bg-primary-subtle text-primary',
  'Adulto': 'bg-purple-subtle text-purple',
  'Idoso': 'bg-purple-subtle text-purple',
};

