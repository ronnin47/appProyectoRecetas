import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { AppContext } from '../provider/AppProvider';

export const PantallaCargarReceta = ({ navigation }) => {
  const { agregarReceta } = useContext(AppContext);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [porciones, setPorciones] = useState('');
  const [imagen, setImagen] = useState('');

  const [ingredienteActual, setIngredienteActual] = useState('');
  const [ingredientes, setIngredientes] = useState([]);

  const [pasoActual, setPasoActual] = useState('');
  const [pasos, setPasos] = useState([]);

  const agregarIngrediente = () => {
    if (!ingredienteActual.trim()) return;

    setIngredientes([
      ...ingredientes,
      ingredienteActual.trim(),
    ]);

    setIngredienteActual('');
  };

  const agregarPaso = () => {
    if (!pasoActual.trim()) return;

    setPasos([
      ...pasos,
      pasoActual.trim(),
    ]);

    setPasoActual('');
  };

  const guardarReceta = async () => {
    if (!titulo.trim()) {
      Alert.alert('Atención', 'Ingresá un título.');
      return;
    }

    const nuevaReceta = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      categoria,
      tiempo: Number(tiempo) || 0,
      porciones: Number(porciones) || 0,
      imagen:
        imagen ||
        'https://via.placeholder.com/600x400.png?text=Receta',
      ingredientes,
      pasos,
      favorita: false,
    };

    await agregarReceta(nuevaReceta);

    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Nueva receta
      </Text>

      <Text style={styles.subtitle}>
        Completá la información principal de tu receta.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Título
        </Text>

        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Pastel de papas"
          style={styles.input}
        />

        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción breve..."
          multiline
          style={[styles.input, styles.multiline]}
        />

        <Text style={styles.label}>
          Categoría
        </Text>

        <TextInput
          value={categoria}
          onChangeText={setCategoria}
          placeholder="Ej: Almuerzo"
          style={styles.input}
        />

        <Text style={styles.label}>
          Tiempo (minutos)
        </Text>

        <TextInput
          value={tiempo}
          onChangeText={setTiempo}
          placeholder="40"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>
          Porciones
        </Text>

        <TextInput
          value={porciones}
          onChangeText={setPorciones}
          placeholder="4"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>
          URL de imagen
        </Text>

        <TextInput
          value={imagen}
          onChangeText={setImagen}
          placeholder="https://..."
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>
          Ingredientes
        </Text>

        <View style={styles.row}>
          <TextInput
            value={ingredienteActual}
            onChangeText={setIngredienteActual}
            placeholder="Agregar ingrediente"
            style={[styles.input, styles.rowInput]}
          />

          <TouchableOpacity
            style={styles.smallButton}
            onPress={agregarIngrediente}
          >
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {ingredientes.map((ingrediente, index) => (
          <View
            key={index}
            style={styles.itemRow}
          >
            <View style={styles.bullet} />

            <Text style={styles.itemText}>
              {ingrediente}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>
          Preparación
        </Text>

        <View style={styles.row}>
          <TextInput
            value={pasoActual}
            onChangeText={setPasoActual}
            placeholder="Agregar paso"
            multiline
            style={[
              styles.input,
              styles.multiline,
              styles.rowInput,
            ]}
          />

          <TouchableOpacity
            style={styles.smallButton}
            onPress={agregarPaso}
          >
            <Text style={styles.smallButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {pasos.map((paso, index) => (
          <View
            key={index}
            style={styles.stepRow}
          >
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.stepText}>
              {paso}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={guardarReceta}
      >
        <Text style={styles.buttonText}>
          Guardar receta
        </Text>
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
    fontSize: 30,
    fontWeight: '800',
    color: '#222',
  },

  subtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 18,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
  },

  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  rowInput: {
    flex: 1,
    marginRight: 12,
  },

  smallButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  smallButtonText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: -2,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF7A00',
    marginRight: 14,
  },

  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
  },

  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  stepNumber: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },

  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    paddingTop: 5,
  },

  button: {
    backgroundColor: '#FF7A00',
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 4,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});