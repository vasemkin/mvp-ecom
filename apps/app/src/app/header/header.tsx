import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { productsActions } from '../../store/products.slice'
import Search from './search/search/search'

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled.div`
	background: #fff;
	margin: 0;
	padding: ${(props) => props.theme.padding.section};
	position: sticky;
	top: 0px;
	z-index: 999;
	box-shadow: ${(props) => props.theme.shadows['base']};
`
const Logo = styled.h1`
	font-weight: 600;
	font-size: 24px;
`

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export function Header(props: HeaderProps) {
	const dispatch = useDispatch()
	const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(productsActions.setQuery(evt.currentTarget.value))
	}

	return (
		<StyledHeader>
			<Wrapper>
				<Logo>Products</Logo>
				<Search onChange={onChange} />
			</Wrapper>
		</StyledHeader>
	)
}

export default Header
