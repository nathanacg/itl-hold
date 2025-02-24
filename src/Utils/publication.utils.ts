export const getUniqueItems = (items: any[]) => {
  return items.reduce(
    (acc: { items: any[]; items_ids: string[] }, curr: any) => {
      if (!acc.items_ids.includes(curr.id)) {
        acc.items.push(curr);
        acc.items_ids.push(curr.id);
      }
      return acc;
    },
    { items: [], items_ids: [] },
  );
};
