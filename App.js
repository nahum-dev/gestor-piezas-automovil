import { useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

export default function App() {
  const [pantalla, setPantalla] = useState('principal');
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const verDetalle = (pieza) => {
    setPiezaSeleccionada(pieza);
    setModalVisible(true);
  };

  const validarFecha = (valor) => {
    // Quitamos todo lo que no sea número
    const soloNumeros = valor.replace(/[^0-9]/g, '');

    // Insertamos guiones automáticamente
    let formateado = soloNumeros;
    if (soloNumeros.length >= 5) {
      formateado = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4);
    }
    if (soloNumeros.length >= 7) {
      formateado = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4, 6) + '-' + soloNumeros.slice(6, 8);
    }

    setFecha(formateado);
  };

  const validarNoSerie = (valor) => {
    const soloValido = valor.replace(/[^a-zA-Z0-9]/g, '');
    setNoSerie(soloValido);
  };

  const validarPrecio = (valor) => {
    const soloValido = valor.replace(/[^0-9.]/g, '');
    const partes = soloValido.split('.');
    if (partes.length > 2) return;
    setPrecio(soloValido);
  };

  const validarMarca = (valor) => {
    const soloValido = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    setMarca(soloValido);
  };

  const guardarPieza = () => {
    if (!marca || !noSerie || !precio || !fecha) {
      alert('Por favor completa todos los campos');
      return;
    }

    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexFecha.test(fecha)) {
      alert('La fecha debe tener el formato YYYY-MM-DD\nEjemplo: 2024-03-15');
      return;
    }

    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
      alert('La fecha ingresada no es válida');
      return;
    }

    if (fechaObj > new Date()) {
      alert('La fecha de cambio no puede ser en el futuro');
      return;
    }

    if (parseFloat(precio) <= 0 || isNaN(parseFloat(precio))) {
      alert('El precio debe ser un número mayor a 0');
      return;
    }

    if (noSerie.length < 4) {
      alert('El número de serie debe tener al menos 4 caracteres');
      return;
    }

    if (marca.trim().length < 2) {
      alert('La marca debe tener al menos 2 caracteres');
      return;
    }

    const nueva = {
      id: Date.now().toString(),
      tipo,
      marca: marca.trim(),
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
      onPress={() => verDetalle(item)}
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

  const renderModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalFondo}>
        <View style={styles.modalContenido}>
          <Text style={styles.modalTitulo}>Detalle de la pieza</Text>

          <View style={styles.modalFila}>
            <Text style={styles.modalEtiqueta}>Pieza:</Text>
            <Text style={styles.modalValor}>{piezaSeleccionada?.tipo}</Text>
          </View>
          <View style={styles.modalFila}>
            <Text style={styles.modalEtiqueta}>Marca:</Text>
            <Text style={styles.modalValor}>{piezaSeleccionada?.marca}</Text>
          </View>
          <View style={styles.modalFila}>
            <Text style={styles.modalEtiqueta}>No Serie:</Text>
            <Text style={styles.modalValor}>{piezaSeleccionada?.noSerie}</Text>
          </View>
          <View style={styles.modalFila}>
            <Text style={styles.modalEtiqueta}>Precio:</Text>
            <Text style={styles.modalValor}>${piezaSeleccionada?.precio}</Text>
          </View>
          <View style={styles.modalFila}>
            <Text style={styles.modalEtiqueta}>Fecha de Cambio:</Text>
            <Text style={styles.modalValor}>{piezaSeleccionada?.fecha}</Text>
          </View>

          <TouchableHighlight
            underlayColor="#2563eb"
            onPress={() => setModalVisible(false)}
            style={styles.botonCerrar}
          >
            <Text style={styles.botonCerrarTexto}>Cerrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
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
            onChangeText={validarMarca}
            placeholder="Ej: Bosch"
            maxLength={30}
          />

          <Text style={styles.label}>No. Serie</Text>
          <TextInput
            style={styles.input}
            value={noSerie}
            onChangeText={validarNoSerie}
            placeholder="Ej: S013523"
            maxLength={20}
            autoCapitalize="characters"
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={validarPrecio}
            placeholder="Ej: 15.00"
            keyboardType="decimal-pad"
            maxLength={10}
          />

          <Text style={styles.label}>Fecha de Cambio</Text>
          <TextInput
            style={styles.input}
            value={fecha}
            onChangeText={validarFecha}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
            maxLength={10}
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
      {renderModal()}

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