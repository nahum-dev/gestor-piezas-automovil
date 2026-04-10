import { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [pantalla, setPantalla] = useState('principal');
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

  // Estado del formulario
  const [tipo, setTipo] = useState('Bujía');
  const [marca, setMarca] = useState('');
  const [noSerie, setNoSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  const eliminarPieza = (id) => {
    setPiezas(piezas.filter((p) => p.id !== id));
  };

  const guardarPieza = () => {
    if (!marca || !noSerie || !precio || !fecha) {
      alert('Por favor completa todos los campos');
      return;
    }
    const nueva = {
      id: Date.now().toString(),
      tipo,
      marca,
      noSerie,
      precio,
      fecha,
    };
    setPiezas([...piezas, nueva]);
    // Limpiar formulario
    setTipo('Bujía');
    setMarca('');
    setNoSerie('');
    setPrecio('');
    setFecha('');
    setPantalla('principal');
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

  // ── PANTALLA FORMULARIO ──
  if (pantalla === 'formulario') {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Text style={styles.titulo}>Registro de piezas</Text>
        <ScrollView>

          <Text style={styles.label}>Pieza</Text>
          <View style={styles.pickerContenedor}>
            <Picker
              selectedValue={tipo}
              onValueChange={(value) => setTipo(value)}
            >
              <Picker.Item label="Bujía" value="Bujía" />
              <Picker.Item label="Filtro de aceite" value="Filtro de aceite" />
              <Picker.Item label="Filtro de aire" value="Filtro de aire" />
              <Picker.Item label="Pastillas de freno" value="Pastillas de freno" />
              <Picker.Item label="Batería" value="Batería" />
              <Picker.Item label="Correa de distribución" value="Correa de distribución" />
              <Picker.Item label="Amortiguador" value="Amortiguador" />
              <Picker.Item label="Alternador" value="Alternador" />
            </Picker>
          </View>

          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
            placeholder="Ej: Bosch"
          />

          <Text style={styles.label}>No. Serie</Text>
          <TextInput
            style={styles.input}
            value={noSerie}
            onChangeText={setNoSerie}
            placeholder="Ej: S013523"
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={setPrecio}
            placeholder="Ej: 15.00"
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Fecha de Cambio</Text>
          <TextInput
            style={styles.input}
            value={fecha}
            onChangeText={setFecha}
            placeholder="YYYY-MM-DD"
          />

          <View style={styles.botonesFormulario}>
            <TouchableHighlight
              underlayColor="#16a34a"
              onPress={guardarPieza}
              style={styles.botonGuardar}
            >
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="#9ca3af"
              onPress={() => setPantalla('principal')}
              style={styles.botonCancelar}
            >
              <Text style={styles.botonTexto}>Cancelar</Text>
            </TouchableHighlight>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── PANTALLA PRINCIPAL ──
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Piezas</Text>

      <TouchableHighlight
        underlayColor="#2563eb"
        onPress={() => setPantalla('formulario')}
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  pickerContenedor: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
  },
  botonesFormulario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
    gap: 12,
  },
  botonGuardar: {
    flex: 1,
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCancelar: {
    flex: 1,
    backgroundColor: '#6b7280',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});