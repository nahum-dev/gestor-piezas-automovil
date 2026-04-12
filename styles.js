import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 
  //contenedor principal
  contenedor: {
    flex: 1,
    backgroundColor: '#f1f5f9', // más suave que gris plano
    padding: 16,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f172a',
    letterSpacing: 1,
  },

 
  //boton agregar 
  botonAgregar: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,

    // sombra moderna
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  botonAgregarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  mensajeVacio: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 50,
    fontSize: 15,
  },

  lista: {
    flex: 1,
  },
 
  //tarjetas
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 14,

    // sombra más elegante
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  tarjetaContenido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  tarjetaTipo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
  },

  tarjetaMarca: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },

  tarjetaFecha: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  tarjetaPrecio: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginTop: 4,
  },

  botonEliminar: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 50, // botón circular
    justifyContent: 'center',
    alignItems: 'center',
  },

  botonEliminarTexto: {
    color: '#fff',
    fontSize: 16,
  },

  //formulario
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,

    // ligera sombra
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },

  pickerContenedor: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  botonesFormulario: {
    flexDirection: 'row',
    marginTop: 26,
    marginBottom: 40,
    gap: 12,
  },

  botonGuardar: {
    flex: 1,
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  botonCancelar: {
    flex: 1,
    backgroundColor: '#64748b',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  //modal
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContenido: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '85%',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 18,
    textAlign: 'center',
  },

  modalFila: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  modalEtiqueta: {
    fontWeight: 'bold',
    color: '#334155',
    width: 110,
    fontSize: 14,
  },

  modalValor: {
    color: '#475569',
    fontSize: 14,
    flex: 1,
  },

  botonCerrar: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  botonCerrarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default styles;