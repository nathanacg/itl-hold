export function handleSearch(text: string, data: any, fields: string | string[], exact: boolean = false) {
  const formattedQuery = text
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const filteredData = data.filter(item => {
    for (const field of fields) {
      if (item[field]) {
        const fieldValue = item[field].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (exact) {
          if (fieldValue === formattedQuery) {
            return true;
          }
        } else {
          if (fieldValue.indexOf(formattedQuery) > -1) {
            return true;
          }
        }
      }
    }
    return false;
  });

  return filteredData;
}
