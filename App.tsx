import { FontAwesome } from "@expo/vector-icons"
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	Platform,
} from "react-native"
import Tecla from "./src/components/Tecla"
import { useState } from "react"
import { useCalc } from "./useCalc"
import { operadores, teclas } from "./src/constants/teclas"

/**
 * 0. Deve remover o ultimo digito OK
 * 1. Dps de um operador não pode ter outro operador tipo 2++1 OK
 * 2. Dps de abrir parentese não pode ter operador e nem ponto 1+(.2) OK
 * 3. O primeiro digito não pode ser um operador
 * 4. O ultimo digito não pode ser um operador ao calcular
 * 5. Não pode ter dois pontos seguidos 2..1
 * 6. Não pode ter dois parenteses seguidos 2+()
 * 7. Não pode ter um ponto dps de um operador 2+.
 * 8. Não pode ter um ponto dps de um parentese 2+(.
 * 9. Não pode ter um operador dps de um ponto 2+.
 */

const LARGURA = Dimensions.get("window").width
const ALTURA = Dimensions.get("window").height
const eIOS = Platform.OS == "ios"

const TECLA_COLUNA_LINHA_MARGEM = LARGURA * 0.02

export default function App() {
	const { adicionaDigito, equacao, erro, resultado } = useCalc()
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

			<TouchableOpacity style={styles.icon}>
				<FontAwesome name="history" size={20} color={"#fff"} />
			</TouchableOpacity>

			<View style={styles.visor}>
				<Text style={styles.equacao}>{equacao}</Text>
				<Text style={[styles.resultado, { color: erro ? "red" : "#fff" }]}>
					{erro || resultado}
				</Text>
			</View>

			<View>
				<FlatList
					style={styles.teclado}
					columnWrapperStyle={{
						gap: TECLA_COLUNA_LINHA_MARGEM,
						justifyContent: "space-between",
					}}
					contentContainerStyle={{
						gap: TECLA_COLUNA_LINHA_MARGEM,
					}}
					data={teclas}
					renderItem={({ item }) => (
						<Tecla
							item={String(item)}
							onPress={() => adicionaDigito(String(item))}
						/>
					)}
					numColumns={4}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	icon: {
		position: "absolute",
		top: ALTURA * 0.02 + (eIOS ? ALTURA * 0.04 : 0),
		alignSelf: "center",
	},
	visor: {
		padding: "5%",
		height: "30%",
		width: "100%",
		justifyContent: "flex-end",
		flex: 1,
	},
	equacao: {
		textAlign: "right",
		color: "#fff",
		fontSize: 15,
	},
	resultado: {
		textAlign: "right",

		fontSize: 35,
	},
	teclado: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: "#101010",
		padding: "8%",
	},
})
