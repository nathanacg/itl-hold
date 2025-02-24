export function formatNumbers(totalCount: number) {
   if (totalCount >= 1000 && totalCount <= 1000000) {
      const formattedNumber = (totalCount / 1000).toFixed(1) + 'k';
      return formattedNumber
   } else if (totalCount >= 1000000) {
      const formattedNumber = (totalCount / 1000000).toFixed(1) + 'M';
      return formattedNumber
   } else {
      return totalCount
   }
}