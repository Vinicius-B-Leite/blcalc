import AsyncStorage from "@react-native-async-storage/async-storage"

type Chave = "@historico" | "tema"

type SalvarNoStorageProps<T> = {
	chave: Chave
	valor: T
}
export async function salvarNoStorage<T>(props: SalvarNoStorageProps<T>) {
	const { chave, valor } = props

	await AsyncStorage.setItem(chave, JSON.stringify(valor))
}

export async function carregarDoStorage<TipoRetorno>(
	chave: Chave
): Promise<null | TipoRetorno> {
	const valor = await AsyncStorage.getItem(chave)

	if (!valor) return null

	const valorFormatado = JSON.parse(valor) as TipoRetorno
	return valorFormatado
}
