import { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [piezas, setPiezas] = useState([
    {
      id: '1',
      tipo: 'Bujía',
      marca: 'Bosch',
      noSerie: 'S013523',
      precio: '15.00',
      fecha: '2023-09-29',
    },
    {
      id: '2',
      tipo: 'Filtro de aceite',
      marca: 'Fram',
      noSerie: 'F002211',
      precio: '8.50',
      fecha: '2023-08-15',
    },
  ]);

  const eliminarPieza = (id) => {
    setPiezas(piezas.filter((p) => p.id !== id));
  };

  const piezasOrdenadas = [...piezas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const renderPieza = ({ item }) => (
    <TouchableHighlight
      underlayColor="#e0e0e0"
      onPress={() => console.log('Ver detalle de:', item.tipo)}
      style={styles.tarjeta}
    >
      <View style={styles.tarjetaContenido}>
        <View style={styles.tarjetaInfo}>
          <Text style={styles.tarjetaTipo}>{item.tipo}</Text>
          <Text style={styles.tarjetaFecha}>Fecha de cambio: {item.fecha}</Text>
        </View>
        <TouchableHighlight
          underlayColor="#ff6b6b"
          onPress={() => eliminarPieza(item.id)}
          style={styles.botonEliminar}
        >
          <Text style={styles.botonEliminarTexto}>Eliminar</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Piezas</Text>

      <TouchableHighlight
        underlayColor="#2563eb"
        onPress={() => console.log('Abrir formulario')}
        style={styles.botonAgregar}
      >
        <Text style={styles.botonAgregarTexto}>Agregar Pieza</Text>
      </TouchableHighlight>

      {piezasOrdenadas.length === 0 ? (
        <Text style={styles.mensajeVacio}>No hay piezas. Agregue una</Text>
      ) : (
        <FlatList
          data={piezasOrdenadas}
          keyExtractor={(item) => item.id}
          renderItem={renderPieza}
          style={styles.lista}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1e293b',
  },
  botonAgregar: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonAgregarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mensajeVacio: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 40,
    fontSize: 15,
  },
  lista: {
    flex: 1,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tarjetaContenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  tarjetaInfo: {
    flex: 1,
  },
  tarjetaTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  tarjetaFecha: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  botonEliminar: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  botonEliminarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});