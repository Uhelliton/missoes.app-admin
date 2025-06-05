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
