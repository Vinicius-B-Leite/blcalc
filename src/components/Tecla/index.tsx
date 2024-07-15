import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { estilos } from "./styles"

type TeclaProps = {
	item: string
	onPress: () => void
}
const Tecla = ({ item, onPress }: TeclaProps) => {
	const cor = ["C", "(", ")"].includes(item)
		? "#00ff59"
		: ["/", "x", "-", "+", "=", "<="].includes(item)
		? "#ff0077"
		: "#fff"

	const backgroundColor = item === "" ? "transparent" : "#000"
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[estilos.container, { backgroundColor }]}>
			<Text style={[estilos.digito, { color: cor }]}>{item}</Text>
		</TouchableOpacity>
	)
}

export default Tecla
