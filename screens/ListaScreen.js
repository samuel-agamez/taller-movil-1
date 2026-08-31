import React from "react";
import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

function ListaScreen(props) {
  const navigation = props.navigation;

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(function () {
    const referenciaColeccion = collection(db, "contactos");

    const dejarDeEscuchar = onSnapshot(referenciaColeccion, function (snapshot) {
      const listaNueva = [];

      snapshot.docs.forEach(function (documento) {
        const datosDelContacto = documento.data();

        listaNueva.push({
          id: documento.id,
          nombre: datosDelContacto.nombre,
          telefono: datosDelContacto.telefono,
          ciudad: datosDelContacto.ciudad,
        });
      });

      setContactos(listaNueva);
      setCargando(false);
    });

    return function () {
      dejarDeEscuchar();
    };
  }, []);

  function irADetalle(contacto) {
    navigation.navigate('Detalle', { id: contacto.id, nombre: contacto.nombre });
  }

  function irANuevo() {
    navigation.navigate('Nuevo');
  }

  function renderizarContacto(datos) {
    const contacto = datos.item;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={function () {
          irADetalle(contacto);
        }}
      >
        <Text style={styles.nombre}>{contacto.nombre}</Text>
      </TouchableOpacity>
    );
  }

  if (cargando === true) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando contactos...</Text>
      </View>
    );
  }

  if (contactos.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text>No hay contactos todavía. Agrega uno.</Text>
        <TouchableOpacity style={styles.boton} onPress={irANuevo}>
          <Text style={styles.textoBoton}>+ Agregar contacto</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={contactos}
        keyExtractor={function (item) {
          return item.id;
        }}
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
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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