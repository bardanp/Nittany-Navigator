import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SettingsScreen() {
    return (
        <View style={styles.screenContainer}>
            <Text>Settings Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1,
    },
});

export default SettingsScreen;
