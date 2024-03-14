export default function paginate(array, pageSize, pageNumber) {
  const startPage = (pageNumber - 1) * pageSize;
  const endPage = pageNumber * pageSize;
  return array.slice(startPage, endPage);
}
