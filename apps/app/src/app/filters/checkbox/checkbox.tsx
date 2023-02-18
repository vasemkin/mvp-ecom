import { ChangeEventHandler, FC } from 'react'
import styled from 'styled-components'
/* eslint-disable-next-line */
export interface CheckboxProps {
	checked: boolean
	onChange: ChangeEventHandler<HTMLInputElement>
}

const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`

const Icon = styled.svg`
	fill: none;
	stroke: ${(props) => props.theme.colors['primary.600']};
	stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
	display: inline-block;
	width: 20px;
	height: 20px;
	border-radius: 4px;
	border: 1px solid ${(props) => props.theme.colors['surface.low']};
	transition: all 150ms;

	${HiddenCheckbox}:focus + & {
		box-shadow: 0 0 0 3px ${(props) => props.theme.colors['primary.100']};
	}

	${Icon} {
		visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
	}
`

const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
	return (
		<CheckboxContainer>
			<HiddenCheckbox checked={checked} onChange={onChange} />
			<StyledCheckbox checked={checked}>
				<Icon viewBox="0 0 24 24">
					<polyline points="20 6 9 17 4 12" />
				</Icon>
			</StyledCheckbox>
		</CheckboxContainer>
	)
}

export default Checkbox
