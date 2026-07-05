import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../provider/AppProvider';



//Esto es un componente para representar cada tarjeta de libro
const Card = ({ nombre, imagenUrl }) => {





  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{nombre}</Text>
      <Image
        style={styles.cardImage}
        source={{ uri: imagenUrl }}
        resizeMode="cover"
      />
    </View>
  );
};










export const PantallaHome = () => {


const { usuario, setUsuario, recetas, setRecetas, loading, setLoading } = useContext(AppContext);




  return (
    <View style={styles.container}>
      
       <Text style={styles.texto}>{usuario}</Text>

  
      {
       recetas.length > 0 ? (
        recetas.map(

        (receta,index)=>(
           <Card key={index} nombre={receta.titulo}  imagenUrl={receta.imagen}></Card>
        )
        )
       ):(

        <Text style={styles.texto}>No hay recetas disponibles</Text>
       )

      }



    </View>
  );
};





//  styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'black',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 3, // Android
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  cardImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
});