import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function DetalleScreen(props) {
  const route = props.route;
  const idRecibido = route.params.id;

  const [contacto, setContacto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(function () {
    async function buscarContacto() {
      const referenciaDocumento = doc(db, "contactos", idRecibido);
      const resultado = await getDoc(referenciaDocumento);

      if (resultado.exists()) {
        setContacto(resultado.data());
      }

      setCargando(false);
    }

    buscarContacto();
  }, []);

  if (cargando === true) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (contacto === null) {
    return (
      <View style={styles.centrado}>
        <Text>No se encontró el contacto</Text>
      </View>
    );
  }

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
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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