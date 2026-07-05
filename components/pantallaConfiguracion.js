import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PantallaConfiguracion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pantalla 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'black',
  },
});