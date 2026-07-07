import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Modal,
  TextInput,
} from 'react-native';
import { AppContext } from '../provider/AppProvider';

export const PantallaConfiguracion = () => {

  const {
    usuario,
    cambiarUsuario,
    borrarMisRecetas,
    limpiarUltimasBusquedas
  } = useContext(AppContext);

  const [modalUsuario, setModalUsuario] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState(usuario);

  const fondoPantallaConfiguracion =
    "https://res.cloudinary.com/dzul1hatw/image/upload/v1783266417/94d1773e907d13b8eefabbc9f6d3886b_sttwfp.jpg";


  const confirmarBorrarRecetas = () => {
    Alert.alert(
      'Borrar mis recetas',
      '¿Estás seguro de que querés eliminar todas tus recetas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: borrarMisRecetas,
        },
      ]
    );
  };


  const guardarNuevoUsuario = () => {

    if (nuevoUsuario.trim() !== '') {
      cambiarUsuario(nuevoUsuario);
      setModalUsuario(false);
    }

  };


  const confirmarLimpiarBusquedas = () => {
    Alert.alert(
      'Limpiar búsquedas',
      '¿Querés eliminar el historial de búsquedas recientes?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpiar',
          onPress: limpiarUltimasBusquedas,
        },
      ]
    );
  };


  const mostrarAcercaDe = () => {
    Alert.alert(
      'Acerca de la aplicación',
      'Esta aplicación fue desarrollada con React Native y permite explorar recetas, crear tus propias recetas y guardarlas en el dispositivo.\n\nVersión 1.0'
    );
  };


  return (

    <ImageBackground
      source={{ uri: fondoPantallaConfiguracion }}
      style={styles.background}
      imageStyle={{
        resizeMode: 'cover',
        opacity: 0.4
      }}
    >

      <View style={styles.container}>



        <TouchableOpacity
          style={styles.opcion}
          onPress={() => setModalUsuario(true)}
        >
          <Text style={styles.textoOpcion}>
            👤 Usuario: {usuario}
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.opcion}
          onPress={confirmarBorrarRecetas}
        >
          <Text style={styles.textoOpcion}>
            🗑 Borrar mis recetas
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.opcion}
          onPress={confirmarLimpiarBusquedas}
        >
          <Text style={styles.textoOpcion}>
            🕘 Limpiar búsquedas recientes
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.opcion}
          onPress={mostrarAcercaDe}
        >
          <Text style={styles.textoOpcion}>
            ℹ Acerca de la aplicación
          </Text>
        </TouchableOpacity>


        <View style={styles.info}>
          <Text style={styles.version}>
            Versión 1.0
          </Text>
        </View>


      </View>


      <Modal
        visible={modalUsuario}
        transparent
        animationType="fade"
      >

        <View style={styles.modalFondo}>

          <View style={styles.modalCaja}>

            <Text style={styles.modalTitulo}>
              Cambiar usuario
            </Text>


            <TextInput
              style={styles.input}
              value={nuevoUsuario}
              onChangeText={setNuevoUsuario}
              placeholder="Nuevo nombre"
            />


            <View style={styles.botones}>


              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => setModalUsuario(false)}
              >
                <Text>
                  Cancelar
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.botonGuardar}
                onPress={guardarNuevoUsuario}
              >
                <Text style={{color:'white'}}>
                  Guardar
                </Text>
              </TouchableOpacity>


            </View>

          </View>

        </View>

      </Modal>


    </ImageBackground>

  );
};


const styles = StyleSheet.create({

  background:{
    flex:1,
  },


  container:{
    flex:1,
    padding:20,
    backgroundColor:'rgba(255,255,255,0.35)',
  },


  titulo:{
    fontSize:30,
    fontWeight:'bold',
    color:'#222',
    marginBottom:25,
    textAlign:'center',
  },


  opcion:{
    backgroundColor:'rgba(255,255,255,0.92)',
    borderRadius:14,
    paddingVertical:18,
    paddingHorizontal:18,
    marginBottom:15,

    elevation:4,

    shadowColor:'#000',
    shadowOpacity:0.15,
    shadowRadius:5,
    shadowOffset:{
      width:0,
      height:2,
    },
  },


  textoOpcion:{
    fontSize:18,
    color:'#333',
    fontWeight:'500',
  },


  info:{
    marginTop:'auto',
    marginBottom:20,
    alignItems:'center',
  },


  version:{
    fontSize:15,
    color:'#555',
    backgroundColor:'rgba(255,255,255,0.8)',
    paddingHorizontal:15,
    paddingVertical:8,
    borderRadius:20,
  },


  modalFondo:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.5)',
  },


  modalCaja:{
    width:'85%',
    backgroundColor:'white',
    borderRadius:15,
    padding:20,
  },


  modalTitulo:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:20,
  },


  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:10,
    padding:12,
    fontSize:16,
  },


  botones:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:20,
  },


  botonCancelar:{
    padding:12,
    marginRight:10,
  },


  botonGuardar:{
    backgroundColor:'#333',
    padding:12,
    borderRadius:10,
  },

});