import React from "react";
import { View, Text, StyleSheet } from "react-native";

const contactosTest = [
  {id: "1", nombre: "saul godman", telefono: "3006784931", ciudad: "Medellin"},
  {id: "2", nombre: "paul greyrat", telefono: "3014547971", ciudad: "Barranquilla"},
  {id: "3", nombre: "sara pastrana", telefono: "3006789933", ciudad: "Bogota"},
];

function DetalleScreen(props) {
  const route = props.route;
  const idRecibido = route.params.id;

  const contacto = contactosTest.find((c) => c.id === idRecibido);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Nombre</Text>
      <Text style={styles.valor}>{contacto.nombre}</Text>

      <Text style={styles.etiqueta}>Teléfono</Text>
      <Text style={styles.valor}>{contacto.telefono}</Text>

      <Text style={styles.etiqueta}>Ciudad</Text>
      <Text style={styles.valor}>{contacto.ciudad}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  etiqueta: {
    fontSize: 13,
    color: '#888',
    marginTop: 16,
  },
  valor: {
    fontSize: 18,
  },
});

export default DetalleScreen;