import { ProductsDto } from 'apps/app/src/store/api'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Status as IStatus } from 'apps/app/src/store/products.slice'

/* eslint-disable-next-line */
export interface CardProps extends ProductsDto {
	_id: string
}

const StyledCard = styled.div`
	background-color: grey;
	display: flex;
	box-shadow: ${(props) => props.theme.shadows['base']};
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

const ImageWrapper = styled.div`
	max-width: 116px;
	position: relative;
	overflow: hidden;
`

const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Category = styled.div`
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	color: ${(props) => props.theme.colors['secondary.200']};
`

const Status = styled.div<{ status: IStatus }>`
	border-radius: 12px;
	padding: 0px 8px;
	font-weight: 600;
	font-size: 10px;
	line-height: 20px;
	margin-right: 8px;
	:last-child {
		margin-right: 0;
	}
	${(props) => {
		switch (props.status) {
			case 'New':
				return `
					color: ${props.theme.colors['accent.approving']};
					background-color: ${props.theme.colors['bg.approved']};
				`

			default:
				return `
					color: ${props.theme.colors['secondary.300']};
					background-color: ${props.theme.colors['secondary.50']};
				`
		}
	}}
`

const Body = styled.div`
	margin-top: 4px;
	color: ${(props) => props.theme.colors['black.main']};
`

const Title = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
`

const Description = styled.p`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`

const Footer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 4px;
`

const Price = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 24px;
`

const Discount = styled.p`
	color: ${(props) => props.theme.colors['accent.notify']};
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	margin-left: 4px;
`

const StatusWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

export const Card: FC<CardProps> = ({
	name,
	description,
	image,
	discount,
	status,
	category,
	price,
	_id,
}) => {
	return (
		<StyledCard>
			<ImageWrapper>
				<Img src={`http://localhost:4200/api/public/${image}`} />
			</ImageWrapper>
			<Wrapper>
				<div>
					<Header>
						<Category>{category}</Category>

						<StatusWrapper>
							{!!status &&
								status.map((el, index) => (
									<Status
										//@ts-ignore
										status={el}
										key={`${_id}-${status}-${index}`}
									>
										{el}
									</Status>
								))}
						</StatusWrapper>
					</Header>

					<Body>
						<Title>{name}</Title>
						<Description>{description}</Description>
					</Body>
				</div>

				<Footer>
					<Price>${price}</Price>
					{!!discount && (
						<Discount>Discount ${discount} per bag</Discount>
					)}
				</Footer>
			</Wrapper>
		</StyledCard>
	)
}

export default Card
