export default function paginate(array: JSX.Element[], pageSize: number, pageNumber: number): JSX.Element[] {
  const startPage = (pageNumber - 1) * pageSize;
  const endPage = pageNumber * pageSize;
  return array.slice(startPage, endPage);
}
