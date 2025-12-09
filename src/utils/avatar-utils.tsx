export const colors = [
  '#d6f782',
  '#4f58b5',
  '#fe7b5e',
  '#fff88e',
  '#eb697d',
  '#ffd2d3',
  '#dbffe1',
];

export const getTextColor = (bgColor: string) => {
  const color = bgColor.replace('#', '');
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#000000' : '#FFFFFF';
};
