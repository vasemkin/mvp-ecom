import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { productsActions } from '../../store/products.slice'
import Checkbox from './checkbox/checkbox'
import { Status, Category as ICategory } from 'libs/products/src'

/* eslint-disable-next-line */
export interface FiltersProps {}

const StyledFilters = styled.section`
	display: grid;
	grid-template-columns: 2fr 1fr;
	// here we adjust the gap for the grid that actually has 3 elements
	grid-gap: calc(24px / 3);

	@media (max-width: 1440px) {
		grid-template-columns: 1fr;
		grid-gap: 0;
	}
`

const Wrapper = styled.div`
	padding: 22px 20px;
	background-color: ${(props) => props.theme.colors['white']};
	box-shadow: ${(props) => props.theme.shadows['base']};
	border-radius: 16px;
`

const Header = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const Icon = styled.img`
	width: 24px;
	height: 24px;
`

const Title = styled.h4`
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	color: ${(props) => props.theme.colors['primary.600']};
	margin-left: 8px;
`

const SubTitle = styled.h5`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	text-transform: uppercase;
	color: ${(props) => props.theme.colors['secondary.200']};
	margin-bottom: 16px;
`

const Inputs = styled.div`
	margin-top: 18px;
	display: grid;
	grid-template-columns: 4fr 1fr;
	align-items: center;
	grid-gap: 24px;
`

const Category = styled.button<{ active: boolean }>`
	padding: 4px 16px;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: ${(props) => props.theme.colors['primary.600']};
	border: 1px solid ${(props) => props.theme.colors['primary.600']};
	background-color: ${(props) => props.theme.colors['white']};
	border-radius: 8px;
	width: fit-content;
	margin-right: 16px;
	font-style: normal;
	:last-child {
		margin-right: 0;
	}
	cursor: pointer;
	background: none;
	font-family: 'Montserrat', sans-serif;
	${(props) => {
		if (props.active) {
			return `
					color: ${props.theme.colors['white']};
					border: 1px solid ${props.theme.colors['primary.600']};
					background-color: ${props.theme.colors['primary.600']};
				`
		}

		return `
			color: ${props.theme.colors['primary.600']};
			border: 1px solid ${props.theme.colors['primary.600']};
			background-color: ${props.theme.colors['white']};
		`
	}}
`

const Categories = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const Label = styled.label`
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
	grid-gap: 10px;
	margin-right: 14px;
	:last-child {
		margin-right: 0;
	}
`

const Boxes = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

export function Filters(props: FiltersProps) {
	const dispatch = useDispatch()
	const [category, setCategory] = useState<ICategory | null>(null)
	const categories = Object.values(ICategory)
	const statuses = Object.values(Status)
	const [selected, setSelected] = useState<boolean[]>(
		Object.values(statuses).map((_) => false)
	)
	const selectedStatuses = statuses.filter((_, i) => !!selected[i])

	useEffect(() => {
		if (selectedStatuses.length > 0) {
			dispatch(productsActions.setStatuses({ status: selectedStatuses }))
			return
		}

		dispatch(productsActions.setStatuses({ status: null }))
	}, [selectedStatuses])
	return (
		<StyledFilters>
			<Wrapper>
				<Header>
					<Icon src="./icons/filters.svg" />
					<Title>Filters</Title>
				</Header>

				<Inputs>
					<SubTitle>Category</SubTitle>
					<SubTitle>Status</SubTitle>

					<Categories>
						<Category
							onClick={() => {
								setCategory(null)
								dispatch(
									productsActions.setCategory({
										category: null,
									})
								)
							}}
							active={category === null}
						>
							All
						</Category>
						{categories.map((el, index) => (
							<Category
								key={`category-${index}`}
								onClick={() => {
									setCategory(el)
									dispatch(
										productsActions.setCategory({
											category: el,
										})
									)
								}}
								active={category === el}
							>
								{el}
							</Category>
						))}
					</Categories>

					<Boxes>
						{statuses.map((el, index) => (
							<Label key={`checkbox-${index}`}>
								<Checkbox
									onChange={(evt) => {
										if (evt.target.checked) {
											setSelected(
												selected.map((el, i) =>
													i === index ? true : el
												)
											)
											return
										}

										setSelected(
											selected.map((el, i) =>
												i === index ? false : el
											)
										)
									}}
									checked={selected[index]}
								/>
								<span>{el}</span>
							</Label>
						))}
					</Boxes>
				</Inputs>
			</Wrapper>
		</StyledFilters>
	)
}

export default Filters
