import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const contactosTest = [
  {id: "1", nombre: "saul godman", telefono: "3006784931", ciudad: "Medellin"},
  {id: "2", nombre: "paul greyrat", telefono: "3014547971", ciudad: "Barranquilla"},
  {id: "3", nombre: "sara pastrana", telefono: "3006789933", ciudad: "Bogota"},
];

function ListaScreen(props) {
  const navigation = props.navigation;

  const irADetalle = (idDelContacto) => navigation.navigate('Detalle', { id: idDelContacto });

  const irANuevo = () => navigation.navigate('Nuevo');

  const renderizarContacto = (datos) => {
    const contacto = datos.item;

    return (
      <TouchableOpacity style={styles.item} onPress={() => irADetalle(contacto.id)}>
        <Text style={styles.nombre}>{contacto.nombre}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={contactosTest}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContacto}
      />

      <TouchableOpacity style={styles.boton} onPress={irANuevo}>
        <Text style={styles.textoBoton}>+ Agregar contacto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nombre: {
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListaScreen;