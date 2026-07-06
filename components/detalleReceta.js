import React from 'react';
import {
  View,
  Text,
 Image,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
 Alert
} from 'react-native';
import { useContext,useEffect } from 'react';
import { AppContext } from '../provider/AppProvider';


export const DetalleReceta = ({ route, navigation }) => {

 const { id, origen } = route.params;

  const { misRecetas, recetas, eliminarReceta } = useContext(AppContext);

const receta =
  origen === 'mias'
    ? misRecetas.find(r => r.id === id)
    : recetas.find(r => r.id === id);

useEffect(() => {
  if (!receta) {
    navigation.goBack();
  }
}, [receta, navigation]);


  const esEditable = origen === 'mias';




if (!receta) {
  return null;
}

   const handleEliminar = () => {
      Alert.alert(
        'Eliminar receta',
        '¿Seguro que querés eliminar esta receta?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              await eliminarReceta(receta.id);

             //navigation.goBack();
            },
          },
        ]
      );
      };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: receta.imagen }}
          style={styles.image}
        />

        <View style={styles.imageOverlay} />

        <View style={styles.titleContainer}>
          <Text style={styles.titulo}>
            {receta.titulo}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.descripcion}>
          {receta.descripcion}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Categoría</Text>
            <Text style={styles.infoValue}>
              {receta.categoria}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Tiempo</Text>
            <Text style={styles.infoValue}>
              {receta.tiempo} min
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Porciones</Text>
            <Text style={styles.infoValue}>
              {receta.porciones}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Ingredientes
        </Text>

        {receta.ingredientes.map((ingrediente, index) => (
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

        {receta.pasos.map((paso, index) => (
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


      {esEditable && (
      <View style={styles.actionsContainer}>
        
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('editarReceta', { receta })}
        >
          <Text style={styles.editButtonText}>
            Editar receta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleEliminar}
        >
          <Text style={styles.deleteButtonText}>
            Eliminar receta
          </Text>
        </TouchableOpacity>

      </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  content: {
    paddingBottom: 0,
  },

  imageContainer: {
    height: 360,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },

  titleContainer: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    right: 24,
  },

  titulo: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 8,
    marginBottom: 10,
  },

  infoContainer: {
    backgroundColor: '#FFF',
    marginTop: -35,
    //borderTopLeftRadius: 34,
    //borderTopRightRadius: 34,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 40,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -3,
    },

    elevation: 10,
  },

  descripcion: {
    fontSize: 16,
    color: '#666',
    lineHeight: 25,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: '#b8926b',
    borderRadius: 18,
    marginHorizontal: 5,
    paddingVertical: 18,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  infoLabel: {
    fontSize: 13,
    color: '#888',
  },

  infoValue: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  sectionTitle: {
    marginTop: 34,
    marginBottom: 18,
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
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
  
  actionsContainer: {
  marginTop: 0,
  paddingVertical: 20,
  borderTopWidth: 1,
  borderTopColor: '#fffdfd',
  backgroundColor:"#ffffff",
  padding:20,
},

editButton: {
  backgroundColor: '#FF7A00',
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: 'center',
  marginBottom: 12,
},

editButtonText: {
  color: '#FFF',
  fontWeight: '700',
  fontSize: 16,
},

deleteButton: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#E74C3C',
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: 'center',
},

deleteButtonText: {
  color: '#E74C3C',
  fontWeight: '700',
  fontSize: 16,
},
});