// styled.d.ts
import 'styled-components'

interface IObject {
	[key: string]: string
}

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: IObject
		padding: IObject
	}
}
