import Header from './header/header'
import Products from './products/products'
import Filters from './filters/filters'
import '../../public/reset.css'
import '../../public/globals.css'
import styled from 'styled-components'

const Wrapper = styled.div`
	margin-top: 18px;
	border-radius: 16px;
	padding: ${(props) => props.theme.padding['section']};
	// this is not necessary here, but we assume that
	// all sections will have the same margins
	display: grid;
	grid-template-columns: '1fr';
	grid-gap: 40px;
`

export function App() {
	return (
		<>
			<Header />

			<Wrapper>
				<Filters />
				<Products />
			</Wrapper>
		</>
	)
}

export default App
