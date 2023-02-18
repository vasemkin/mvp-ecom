import { ProductsDto } from 'apps/app/src/store/api'
import type { FC } from 'react'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface CardProps extends ProductsDto {
	_id: string
}

const StyledCard = styled.div`
	background-color: grey;
	display: flex;
	box-shadow: 0px 16px 24px 0px
		${(props) => props.theme.colors['black.shadow']};
	background: ${(props) => props.theme.colors.white};
	border-radius: 12px;
	overflow: hidden;
	min-height: 145px;
`

const Wrapper = styled.div`
	padding: 12px 16px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const ImageSkeleton = styled.div`
	width: 116px;
	position: relative;
	overflow: hidden;
	background-color: ${(props) => props.theme.colors['secondary.50']};
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const CategorySkeleton = styled.div`
	width: 47px;
	height: 20px;
	background-color: ${(props) => props.theme.colors['secondary.50']};
`

const Body = styled.div`
	margin-top: 4px;
	color: ${(props) => props.theme.colors['black.main']};
`

const TitleSkeleton = styled.p`
	background-color: ${(props) => props.theme.colors['secondary.50']};
	width: 107px;
	height: 24px;
`

const DescriptionSkeleton = styled.p`
	background-color: ${(props) => props.theme.colors['secondary.50']};
	width: 200px;
	height: 24px;
`

const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 4px;
`

const PriceSkeleton = styled.p`
	width: 50px;
	height: 24px;
	background-color: ${(props) => props.theme.colors['secondary.50']};
`

export const CardSkeleton: FC = () => {
	return (
		<StyledCard>
			<ImageSkeleton />
			<Wrapper>
				<div>
					<Header>
						<CategorySkeleton />
					</Header>

					<Body>
						<TitleSkeleton />
						<DescriptionSkeleton />
					</Body>
				</div>

				<Footer>
					<PriceSkeleton />
				</Footer>
			</Wrapper>
		</StyledCard>
	)
}

export default CardSkeleton
