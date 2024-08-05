import { StyleSheet } from "react-native"

export const estilos = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		paddingHorizontal: 20,
		paddingTop: 70,
	},
	voltarBtn: {
		borderColor: "#fff",
		borderWidth: 1.3,
		alignSelf: "flex-start",
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 99999,
	},
	titulo: {
		fontSize: 28,
		color: "#fff",
		fontWeight: "bold",
		marginTop: 18,
	},
	listaContainer: {
		marginTop: 32,
		paddingBottom: 150,
	},

	itemContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	equacao: {
		fontSize: 18,
		color: "#fff",
	},
	resultado: {
		fontSize: 24,
		color: "#fff",
	},
})
