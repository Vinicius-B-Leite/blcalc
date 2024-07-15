import { FontAwesome } from "@expo/vector-icons"
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Tecla from "./src/components/Tecla"

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
	"",
	"0",
	",",
	"",
]
export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={"#000"} barStyle={"light-content"} />

			<TouchableOpacity style={styles.icon}>
				<FontAwesome name="history" size={20} color={"#ff"} />
			</TouchableOpacity>

			<View style={styles.visor}>
				<Text style={styles.equacao}>21+20</Text>
				<Text style={styles.resultado}>21+20</Text>
			</View>

			<FlatList
				style={styles.teclado}
				data={teclas}
				renderItem={({ item }) => <Tecla item={String(item)} />}
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
		left: "47%",
		top: "1%",
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
