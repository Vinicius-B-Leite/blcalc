import { FontAwesome } from "@expo/vector-icons"
import {
	FlatList,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Tecla from "./src/components/Tecla"
import { useState } from "react"

const teclas = [
	"C",
	"(",
	")",
	"/",
	9,
	8,
	7,
	"x",
	6,
	5,
	4,
	"-",
	3,
	2,
	1,
	"+",
	"<=",
	0,
	",",
	"=",
]

/**
 * 0. Deve remover o ultimo digito
 * 1. Dps de um operador não pode ter outro operador tipo 2++1
 * 2. Dps de abrir parentese não pode ter operador e nem ponto 1+(.2)
 * 3. O primeiro digito não pode ser um operador
 * 4. O ultimo digito não pode ser um operador ao calcular
 * 5. Não pode ter dois pontos seguidos 2..1
 * 6. Não pode ter dois parenteses seguidos 2+()
 * 7. Não pode ter um ponto dps de um operador 2+.
 * 8. Não pode ter um ponto dps de um parentese 2+(.
 * 9. Não pode ter um operador dps de um ponto 2+.
 */

export default function App() {
	const [equacao, setEquacao] = useState("")
	const [resultado, setResultado] = useState("")

	const formtaEquacao = (e: string) => {
		return e.replace(/x/g, "*").replace(/,/g, ".")
	}

	const calcular = (e: string) => {
		const equacaoFormatada = formtaEquacao(e)

		try {
			const resultado = eval(equacaoFormatada)
			setResultado(String(resultado))
		} catch (error) {}
	}

	const adicionarValorAEquacao = (valor: string | number) => {
		if (valor == "") return
		const proxValorEOperador = ["+", "-", "/", "x"].includes(String(valor))

		if (equacao == "" && proxValorEOperador) return
		const ultimoDigito = equacao[equacao.length - 1]

		if (valor === "<=") {
			setEquacao((equacaoAntiga) => equacaoAntiga.slice(0, -1))
			return
		}

		if (valor === "C") {
			setEquacao("")
			setResultado("")
			return
		}

		const ultimoDigitoEOperador = ["+", "-", "/", "x"].includes(ultimoDigito)
		if (ultimoDigitoEOperador) {
			if (proxValorEOperador) return
			if (valor == ",") return
		}

		const ultimoDigitoEParentese = ["(", ")"].includes(ultimoDigito)
		if (ultimoDigitoEParentese) {
			if (proxValorEOperador && valor != "-") return
			if (valor == "(" || valor == ")") return
			if (valor == ",") return
		}

		const ultimoDigitoEVirgula = "," == ultimoDigito
		if (ultimoDigitoEVirgula) {
			if (valor === ",") return
		}

		if (valor == "=") {
			if (ultimoDigitoEOperador) return
			calcular(equacao)

			return
		}

		setEquacao((equaacaoAntiga) => equaacaoAntiga + valor)
	}

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

			<TouchableOpacity style={styles.icon}>
				<FontAwesome name="history" size={20} color={"#fff"} />
			</TouchableOpacity>

			<View style={styles.visor}>
				<Text style={styles.equacao}>{equacao}</Text>
				<Text style={styles.resultado}>{resultado}</Text>
			</View>

			<FlatList
				style={styles.teclado}
				data={teclas}
				renderItem={({ item }) => (
					<Tecla
						item={String(item)}
						onPress={() => adicionarValorAEquacao(item)}
					/>
				)}
				numColumns={4}
			/>
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
		top: "8%",
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
		color: "#fff",
		fontSize: 35,
	},
	teclado: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: "#101010",
		padding: "8%",
		flex: 1,
	},
})
