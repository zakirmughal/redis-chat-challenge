// Import React and Component
import {View, Text, SafeAreaView,StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import { List, Divider } from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <FlatList
        data={[{id:1, name: 'Room1'}, {id:2, name: 'Room2'}]}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <List.Item
              title={item.name}
              description='Item description'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1
    },
    listTitle: {
      fontSize: 22
    },
    listDescription: {
      fontSize: 16
    }
  });
  
export default HomeScreen;