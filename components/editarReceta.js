import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { AppContext } from '../provider/AppProvider';

export const EditarReceta = ({ route, navigation }) => {
  const { receta } = route.params;
  const { editarReceta } = useContext(AppContext);

  const [titulo, setTitulo] = useState(receta.titulo);
  const [descripcion, setDescripcion] = useState(receta.descripcion);
  const [categoria, setCategoria] = useState(receta.categoria);
  const [tiempo, setTiempo] = useState(String(receta.tiempo));
  const [porciones, setPorciones] = useState(String(receta.porciones));
  const [imagen, setImagen] = useState(receta.imagen);

  const [ingredientes, setIngredientes] = useState(receta.ingredientes || []);
  const [ingredienteActual, setIngredienteActual] = useState('');

  const [pasos, setPasos] = useState(receta.pasos || []);
  const [pasoActual, setPasoActual] = useState('');

  const agregarIngrediente = () => {
    if (!ingredienteActual.trim()) return;

    setIngredientes([...ingredientes, ingredienteActual.trim()]);
    setIngredienteActual('');
  };

  const eliminarIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const agregarPaso = () => {
    if (!pasoActual.trim()) return;

    setPasos([...pasos, pasoActual.trim()]);
    setPasoActual('');
  };

  const eliminarPaso = (index) => {
    setPasos(pasos.filter((_, i) => i !== index));
  };

  const guardarCambios = () => {
    const recetaActualizada = {
      ...receta,
      titulo,
      descripcion,
      categoria,
      tiempo: Number(tiempo) || 0,
      porciones: Number(porciones) || 0,
      imagen,
      ingredientes,
      pasos,
    };

    editarReceta(recetaActualizada);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Text style={styles.title}>Editar receta</Text>

      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título"
        style={styles.input}
      />

      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción"
        multiline
        style={[styles.input, styles.textArea]}
      />

      <TextInput
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Categoría"
        style={styles.input}
      />

      <TextInput
        value={tiempo}
        onChangeText={setTiempo}
        placeholder="Tiempo (min)"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        value={porciones}
        onChangeText={setPorciones}
        placeholder="Porciones"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        value={imagen}
        onChangeText={setImagen}
        placeholder="URL de imagen"
        style={styles.input}
      />

      {/* INGREDIENTES */}
      <Text style={styles.sectionTitle}>Ingredientes</Text>

      <View style={styles.row}>
        <TextInput
          value={ingredienteActual}
          onChangeText={setIngredienteActual}
          placeholder="Agregar ingrediente"
          style={[styles.input, styles.rowInput]}
        />

        <TouchableOpacity style={styles.smallButton} onPress={agregarIngrediente}>
          <Text style={styles.smallButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {ingredientes.map((ing, index) => (
        <View key={index} style={styles.itemRow}>
          <Text style={styles.itemText}>{ing}</Text>

          <TouchableOpacity onPress={() => eliminarIngrediente(index)}>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* PASOS */}
      <Text style={styles.sectionTitle}>Preparación</Text>

      <View style={styles.row}>
        <TextInput
          value={pasoActual}
          onChangeText={setPasoActual}
          placeholder="Agregar paso"
          multiline
          style={[styles.input, styles.textArea, styles.rowInput]}
        />

        <TouchableOpacity style={styles.smallButton} onPress={agregarPaso}>
          <Text style={styles.smallButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {pasos.map((paso, index) => (
        <View key={index} style={styles.stepRow}>
          <Text style={styles.stepText}>{paso}</Text>

          <TouchableOpacity onPress={() => eliminarPaso(index)}>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* GUARDAR */}
      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#222',
  },

  input: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 14,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
    color: '#222',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowInput: {
    flex: 1,
    marginRight: 10,
  },

  smallButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },

  itemText: {
    flex: 1,
  },

  stepText: {
    flex: 1,
  },

  delete: {
    color: 'red',
    fontWeight: '700',
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});