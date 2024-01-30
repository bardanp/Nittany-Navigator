// Notification Page
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function NotificationsScreen() {
    return ( 
        <View style={styles.screenContainer}>
            <Text>Notifications Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: 'black',


  },
});

export default NotificationsScreen;
