import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { estilos } from "./estilos"
import { FontAwesome } from "@expo/vector-icons"
import { HistoricoProps } from "./type"

const Historico = ({
	visible,
	fecharModal,
	historico,
	removerHistorico,
}: HistoricoProps) => {
	return (
		<Modal
			visible={visible}
			onRequestClose={() => fecharModal()}
			animationType="slide">
			<View style={estilos.container}>
				<TouchableOpacity style={estilos.voltarBtn} onPress={() => fecharModal()}>
					<FontAwesome name="close" size={20} color={"#fff"} />
				</TouchableOpacity>
				<Text style={estilos.titulo}>Histórico</Text>

				<View style={estilos.listaContainer}>
					<FlatList
						data={historico}
						renderItem={({ item }) => (
							<View style={estilos.itemContainer}>
								<View>
									<Text style={estilos.equacao}>{item.equacao}</Text>
									<Text style={estilos.resultado}>
										{item.resultado}
									</Text>
								</View>

								<TouchableOpacity
									onPress={() => removerHistorico({ id: item.id })}>
									<FontAwesome
										name="trash"
										size={28}
										color={"#ff0000"}
									/>
								</TouchableOpacity>
							</View>
						)}
						ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
					/>
				</View>
			</View>
		</Modal>
	)
}

export default Historico
