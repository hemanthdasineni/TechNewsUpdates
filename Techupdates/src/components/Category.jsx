function Category({ name, active, count, onClick }) {
  return (
    <button type="button" className={active ? 'category active' : 'category'} onClick={onClick}>
      <span>{name}</span>
      <strong>{count}</strong>
    </button>
  )
}

export default Category
