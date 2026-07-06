import React from 'react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../provider/AppProvider';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
 
} from 'react-native';


export const PantallaMisRecetas = ({ navigation }) => {
  const { misRecetas } = useContext(AppContext);
  const [busqueda, setBusqueda] = React.useState('');
  const verReceta = (receta) => {
    //navigation.navigate('DetalleReceta', { receta, origen:"mias" });
    navigation.navigate('DetalleReceta', {
      id: receta.id,
      origen: 'mias',
    });
  
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍳</Text>

      <Text style={styles.emptyTitle}>
        Todavía no tenés recetas
      </Text>

      <Text style={styles.emptyDescription}>
        Creá tu primera receta y empezá a guardar tus comidas favoritas.
      </Text>
    </View>
  );

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.imagen }}
      style={styles.image}
    />

    <View style={styles.cardBody}>
      <Text numberOfLines={1} style={styles.cardTitle}>
        {item.titulo}
      </Text>

      <Text numberOfLines={2} style={styles.cardDescription}>
        {item.descripcion}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {item.tiempo} min
        </Text>

        <Text style={styles.footerText}>
          {item.categoria}
        </Text>
      </View>

      <TouchableOpacity onPress={() => verReceta(item)}>
        <Text style={styles.cardBoton}>
          Ver receta →
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);


const recetasFiltradas = (misRecetas || []).filter((receta) => {
  const texto = busqueda.toLowerCase();

  return (
    receta.titulo.toLowerCase().includes(texto) ||
    receta.categoria.toLowerCase().includes(texto)
  );
});


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        

        <Text style={styles.subtitle}>
          Guardá y organizá todas las recetas que crees.
        </Text>
      </View>

      <TextInput
        placeholder="Buscar en tus recetas..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.searchInput}
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('pantallaCargarReceta')}
      >
        <Text style={styles.buttonText}>
          + Nueva receta
        </Text>
      </TouchableOpacity>

      <FlatList
  data={recetasFiltradas}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  ListEmptyComponent={renderEmpty}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 30,
    flexGrow: 1,
  }}
/>
    </View>
  );
};



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222',
  },

  subtitle: {
    marginTop: 8,
    color: '#111111',
    fontSize: 16,
    lineHeight: 22,
  },

  button: {
    backgroundColor: '#FF7A00',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 22,

    elevation: 4,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,

    elevation: 3,
  },

  image: {
    width: '100%',
    height: 180,
  },

  cardBody: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  cardDescription: {
    marginTop: 8,
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  footerText: {
    color: '#FF7A00',
    fontWeight: '700',
    fontSize: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },

  emptyDescription: {
    marginTop: 12,
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
    lineHeight: 24,
  },
  
  cardBoton: {
    marginTop: 10,
    color: '#FF6B35',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchInput: {

  


  backgroundColor: '#FFF',
  
    marginTop: 0,
    marginBottom: 25,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
      elevation: 2,
},

});