import { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

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