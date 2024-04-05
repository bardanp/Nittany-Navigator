import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Routes = {
    ADD_NEW_EVENT: 'addNewEvent',
    ADD_NEW_REPORT: 'addNewReport',
    HOME: 'Home',
};

const OptionCard = ({ title, description, onPress }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
);

const AddPage = () => {
    const navigation = useNavigation();

    const navigateTo = (routeName) => () => {
        navigation.navigate(routeName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Add New</Text>
                </View>
                <OptionCard
                    title="Add an Event"
                    description="Create and share new events with details like title, description, and more."
                    onPress={navigateTo(Routes.ADD_NEW_EVENT)}
                />
                <OptionCard
                    title="Add a Report"
                    description="Report incidents with details like title, urgency level, location, and more."
                    onPress={navigateTo(Routes.ADD_NEW_REPORT)}
                />
                <TouchableOpacity style={styles.backButton} onPress={navigateTo(Routes.HOME)}>
                    <Text style={styles.backButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EAEFF7',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    headerContainer: {
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#334155',
        textAlign: 'center',
    },
    optionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        width: '85%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 16,
        color: '#64748B',
    },
    backButton: {
        marginTop: 20,
        backgroundColor: '#475569',
        padding: 15,
        borderRadius: 30,
        width: '50%',
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddPage;
