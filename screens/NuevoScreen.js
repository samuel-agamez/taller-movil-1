import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";

function NuevoScreen(props) {
  const navigation = props.navigation;

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const guardarContacto = () => {
    if (nombre === "" || telefono === "" || ciudad === "") {
      Alert.alert("Faltan datos", "Todos los campos son obligatorios");
      return;
    }

    
    console.log("Contacto a guardar:", { nombre, telefono, ciudad });

    navigation.navigate('Lista');
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del contacto"
      />

      <Text style={styles.etiqueta}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
      />

      <Text style={styles.etiqueta}>Ciudad</Text>
      <TextInput
        style={styles.input}
        value={ciudad}
        onChangeText={setCiudad}
        placeholder="Ciudad"
      />

      <TouchableOpacity style={styles.boton} onPress={guardarContacto}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NuevoScreen;