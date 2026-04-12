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

  //estados generales
  // Controla qué pantalla se muestra (principal o formulario)
  const [vistaActual, setVistaActual] = useState('principal');

  // Guarda la pieza seleccionada para mostrar sus detalles
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);

  // Controla la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  // Lista de piezas registradas en la aplicación
  const [listaPiezas, setListaPiezas] = useState([
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

 
  //estados para el formulario de registro de piezas
  // Tipo de pieza seleccionada
  const [tipo, setTipo] = useState('Bujía');

  // Campos del formulario
  const [marca, setMarca] = useState('');
  const [noSerie, setNoSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  
  //funciones auxiliares
  // Limpia todos los campos del formulario
  const limpiarFormulario = () => {
    setTipo('Bujía');
    setMarca('');
    setNoSerie('');
    setPrecio('');
    setFecha('');
  };

  // Valida si la fecha ingresada es correcta
  const esFechaValida = (fecha) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica el formato YYYY-MM-DD
    if (!regex.test(fecha)) return false;

    const fechaObj = new Date(fecha);

    // Verifica que la fecha exista realmente
    if (isNaN(fechaObj.getTime())) return false;

    // Evita fechas futuras
    if (fechaObj > new Date()) return false;

    return true;
  };

  //validaciones de input
  // Formatea automáticamente la fecha mientras el usuario escribe
  const validarFecha = (valor) => {
    const soloNumeros = valor.replace(/[^0-9]/g, '');

    let formateado = soloNumeros;

    if (soloNumeros.length >= 5) {
      formateado = soloNumeros.slice(0, 4) + '-' + soloNumeros.slice(4);
    }
    if (soloNumeros.length >= 7) {
      formateado =
        soloNumeros.slice(0, 4) +
        '-' +
        soloNumeros.slice(4, 6) +
        '-' +
        soloNumeros.slice(6, 8);
    }

    setFecha(formateado);
  };

  // Permite solo letras y números en el número de serie
  const validarNoSerie = (valor) => {
    setNoSerie(valor.replace(/[^a-zA-Z0-9]/g, ''));
  };

  // Permite solo números y un punto decimal en el precio
  const validarPrecio = (valor) => {
    const limpio = valor.replace(/[^0-9.]/g, '');
    const partes = limpio.split('.');

    // Evita múltiples puntos decimales
    if (partes.length > 2) return;

    setPrecio(limpio);
  };

  // Permite solo letras en la marca
  const validarMarca = (valor) => {
    setMarca(valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, ''));
  };

  //funciones principales
  // Elimina una pieza del historial usando su ID
  const eliminarPieza = (id) => {
    setListaPiezas(listaPiezas.filter((p) => p.id !== id));
  };

  // Muestra el modal con los detalles de la pieza seleccionada
  const verDetalle = (pieza) => {
    setPiezaSeleccionada(pieza);
    setModalVisible(true);
  };

  // Guarda una nueva pieza después de validar los datos
  const guardarPieza = () => {

    // Validación de campos vacíos
    if (!marca || !noSerie || !precio || !fecha) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validación de fecha
    if (!esFechaValida(fecha)) {
      alert('Fecha inválida. Usa formato YYYY-MM-DD');
      return;
    }

    // Validación de precio
    if (parseFloat(precio) <= 0 || isNaN(parseFloat(precio))) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    // Validación de número de serie
    if (noSerie.length < 4) {
      alert('El número de serie debe tener al menos 4 caracteres');
      return;
    }

    // Validación de marca
    if (marca.trim().length < 2) {
      alert('La marca debe tener al menos 2 caracteres');
      return;
    }

    // Creación del objeto nueva pieza
    const nuevaPieza = {
      id: Date.now().toString(),
      tipo,
      marca: marca.trim(),
      noSerie,
      precio,
      fecha,
    };

    // Se agrega la nueva pieza a la lista
    setListaPiezas([...listaPiezas, nuevaPieza]);

    // Limpia el formulario y vuelve a la pantalla principal
    limpiarFormulario();
    setVistaActual('principal');
  };

  // Ordena las piezas por fecha (más reciente primero)
  const piezasOrdenadas = [...listaPiezas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  
  //render de componentes
  // Renderiza cada tarjeta de pieza
  const renderPieza = ({ item }) => (
    <TouchableHighlight
      underlayColor="#e0e0e0"
      onPress={() => verDetalle(item)}
      style={styles.tarjeta}
    >
      <View style={styles.tarjetaContenido}>
        <View>
          <Text style={styles.tarjetaTipo}>{item.tipo}</Text>
          <Text>Marca: {item.marca}</Text>
          <Text>📅 {item.fecha}</Text>
          <Text>💲 {item.precio}</Text>
        </View>

        <TouchableHighlight
          underlayColor="#ff6b6b"
          onPress={() => eliminarPieza(item.id)}
          style={styles.botonEliminar}
        >
          <Text style={styles.botonEliminarTexto}>🗑</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );

  // Renderiza el modal con los detalles
  const renderModal = () => (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalFondo}>
        <View style={styles.modalContenido}>

          <Text style={styles.modalTitulo}>Detalle de la pieza</Text>

          <Text>🔧 {piezaSeleccionada?.tipo}</Text>
          <Text>🏷 {piezaSeleccionada?.marca}</Text>
          <Text>🔢 {piezaSeleccionada?.noSerie}</Text>
          <Text>💲 {piezaSeleccionada?.precio}</Text>
          <Text>📅 {piezaSeleccionada?.fecha}</Text>

          <TouchableHighlight
            onPress={() => setModalVisible(false)}
            style={styles.botonCerrar}
          >
            <Text style={styles.botonCerrarTexto}>Cerrar</Text>
          </TouchableHighlight>

        </View>
      </View>
    </Modal>
  );


  // Vista del formulario para agregar una nueva pieza
  if (vistaActual === 'formulario') {
    return (
      <SafeAreaView style={styles.contenedor}>
        <Text style={styles.titulo}>Registrar pieza</Text>

        <ScrollView>

          <Text style={styles.label}>Pieza</Text>
          <View style={styles.pickerContenedor}>
            <Picker selectedValue={tipo} onValueChange={setTipo}>
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
          <TextInput style={styles.input} value={marca} onChangeText={validarMarca} />

          <Text style={styles.label}>No Serie</Text>
          <TextInput style={styles.input} value={noSerie} onChangeText={validarNoSerie} />

          <Text style={styles.label}>Precio</Text>
          <TextInput style={styles.input} value={precio} onChangeText={validarPrecio} />

          <Text style={styles.label}>Fecha</Text>
          <TextInput style={styles.input} value={fecha} onChangeText={validarFecha} />

          <View style={styles.botonesFormulario}>

            <TouchableHighlight
              onPress={guardarPieza}
              style={styles.botonGuardar}
            >
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => setVistaActual('principal')}
              style={styles.botonCancelar}
            >
              <Text style={styles.botonTexto}>Cancelar</Text>
            </TouchableHighlight>

          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

  //vista principal (historial de piezas)
  return (
    <SafeAreaView style={styles.contenedor}>

      {renderModal()}

      <Text style={styles.titulo}>Historial de piezas</Text>

      <TouchableHighlight
        onPress={() => setVistaActual('formulario')}
        style={styles.botonAgregar}
      >
        <Text style={styles.botonAgregarTexto}>+ Agregar Pieza</Text>
      </TouchableHighlight>

      <FlatList
        data={piezasOrdenadas}
        keyExtractor={(item) => item.id}
        renderItem={renderPieza}
      />

    </SafeAreaView>
  );
}