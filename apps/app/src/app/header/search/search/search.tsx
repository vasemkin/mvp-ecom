import styled from 'styled-components'

/* eslint-disable-next-line */
export interface SearchProps {
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const StyledInput = styled.input.attrs({ type: 'text' })`
	border: none;
	outline: none;
	width: 287px;
	::placeholder {
		color: ${(props) => props.theme.colors['secondary.200']};
	}
`

const Img = styled.img`
	width: 24px;
	height: 24px;
`

const StyledSearch = styled.div`
	padding: 8px 12px;
	border: 1px solid ${(props) => props.theme.colors['secondary.200']};
	border-radius: 8px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	transition: all 150ms;
`

export function Search({ onChange }: SearchProps) {
	return (
		<StyledSearch>
			<Img src="./icons/search.svg" />
			<StyledInput
				placeholder="Search among products"
				onChange={onChange}
			/>
		</StyledSearch>
	)
}

export default Search
