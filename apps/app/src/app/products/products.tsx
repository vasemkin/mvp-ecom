import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useProductsControllerGetAllQuery } from '../../store/api'
import { useTypedSelector } from '../../store/store'
import CardSkeleton from './card-skeleton/cardSkeleton'
import Card from './card/card'

/* eslint-disable-next-line */
export interface ProductsProps {}

const StyledProducts = styled.div``

const ProductsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 24px;
	z-index: 1;

	@media (max-width: 1440px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

export function Products(props: ProductsProps) {
	const query = useTypedSelector((state) => state.products.queryString)
	const status = useTypedSelector((state) => state.products.status)
	const category = useTypedSelector((state) => state.products.category)
	const { data, isLoading } = useProductsControllerGetAllQuery({
		query: query || undefined,
		status: status?.join(',') || undefined,
		category: category || undefined,
	})
	const skeletons = Array.from({ length: 30 })

	if (isLoading) {
		return (
			<StyledProducts>
				<ProductsWrapper>
					{skeletons.map((_, index) => (
						<CardSkeleton key={`cardSkeleton-${index}`} />
					))}
				</ProductsWrapper>
			</StyledProducts>
		)
	}

	if (data?.length === 0) {
		return (
			<StyledProducts>
				<ProductsWrapper>
					<p>No products found</p>
				</ProductsWrapper>
			</StyledProducts>
		)
	}

	return (
		<StyledProducts>
			<ProductsWrapper>
				{data?.map((product, index) => (
					<Card
						{...product}
						//@ts-ignore
						_id={product._id}
						key={`card-${index}`}
					/>
				))}
			</ProductsWrapper>
		</StyledProducts>
	)
}

export default Products
