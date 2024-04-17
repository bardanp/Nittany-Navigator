import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const About = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>About</Text>
            
            <View style={styles.section}>
                <Text style={styles.description}>
                    Nittany Navigator enhances your campus life at Penn State Harrisburg with detailed navigation, event tracking, and vital resources.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Key Features</Text>
                <View style={styles.featuresList}>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <MaterialIcons name={feature.iconName} size={24} color="#007AFF" />
                            <Text style={styles.featureText}>{feature.text}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Meet the Team</Text>
                {teamMembers.map((member, index) => (
                    <Text key={index} style={styles.teamMember}>{member.role} - {member.name}</Text>
                ))}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 100,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'left',
        lineHeight: 24,
    },
    subHeader: {
        fontSize: 24,
        fontWeight: '600',
        color: '#3b3b3b',
        marginBottom: 10,
    },
    featuresList: {
        marginTop: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureText: {
        marginLeft: 10,
        fontSize: 18,
    },
    teamMember: {
        fontSize: 18,
        marginLeft: 10,
    },
    backButton: {
        backgroundColor: '#007AFF',
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

const features = [
    { iconName: 'map', text: 'Turn-by-turn directions' },
    { iconName: 'event', text: 'Campus event tracking' },
    { iconName: 'security', text: 'Campus safety features' },
];

const teamMembers = [
    { name: 'Siri Hegde', role: 'Front-end Developer' },
    { name: 'Bardan Phuyel', role: 'Full-stack Developer' },
    { name: 'Vy Dinh', role: 'Database Management' },
    { name: 'Maliha Doria', role: 'Front-end Developer' },
];

export default About;
