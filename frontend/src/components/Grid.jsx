import ProductGrid from './ProductGrid'
import { useGetProductsQuery } from '../slices/productSlice'

const Grid = ({ products: propProducts }) => {
  const { data, isLoading, error } = useGetProductsQuery(undefined, {
    skip: !!propProducts,
  })

  if (!propProducts && isLoading) {
    return <div className="text-white text-center py-10">Loading...</div>
  }
  if (!propProducts && error) {
    return <div className="text-red-500 text-center py-10">Error: {error.message}</div>
  }

  const rawList = propProducts || (Array.isArray(data) ? data : data?.products) || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-5 py-15">
      {rawList.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Grid
