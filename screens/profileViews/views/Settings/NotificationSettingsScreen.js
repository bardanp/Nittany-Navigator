import React, { useState, useEffect } from 'react';
import { View, Switch, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { firestore } from '../../../../backend/firebase';
import { doc, updateDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [pushEventsEnabled, setPushEventsEnabled] = useState(false);
    const [pushReportsEnabled, setPushReportsEnabled] = useState(false);
    const [emailEventsEnabled, setEmailEventsEnabled] = useState(false);
    const [emailReportsEnabled, setEmailReportsEnabled] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const userInfo = await getUserInfo();
        if (userInfo && userInfo.preferences && userInfo.preferences.notifications) {
            const { notifications } = userInfo.preferences;
            setNotificationsEnabled(notifications.app || false);
            setPushEventsEnabled(notifications.eventsPush || false);
            setPushReportsEnabled(notifications.reportsPush || false);
            setEmailEventsEnabled(notifications.eventsEmail || false);
            setEmailReportsEnabled(notifications.reportsEmail || false);
        }
    };

    const getUserInfo = async () => {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        return userInfoString ? JSON.parse(userInfoString) : null;
    };

    const updateNotificationPreferences = async (app, eventsPush, reportsPush, eventsEmail, reportsEmail) => {
        const userInfo = await getUserInfo();
        if (!userInfo || !userInfo.email) return;

        const userRef = doc(firestore, "users", userInfo.email);
        const notificationUpdates = {
            "preferences.notifications.app": app,
            "preferences.notifications.eventsPush": eventsPush,
            "preferences.notifications.reportsPush": reportsPush,
            "preferences.notifications.eventsEmail": eventsEmail,
            "preferences.notifications.reportsEmail": reportsEmail,
        };

        try {
            await updateDoc(userRef, notificationUpdates);
            console.log("Notification settings updated");
        } catch (error) {
            console.error("Failed to update notification settings:", error);
        }
    };

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Test Notification",
                body: "This is just a test notification to confirm settings.",
                data: { withSome: 'data' },
            },
            trigger: null,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Notification Preferences</Text>
                <View style={styles.card}>
                    <Text style={styles.label}>Notifications</Text>
                    <Text style={styles.description}>Enable or disable all notifications.</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={(newValue) => {
                            setNotificationsEnabled(newValue);
                            updateNotificationPreferences(newValue, newValue ? pushEventsEnabled : false, newValue ? pushReportsEnabled : false, newValue ? emailEventsEnabled : false, newValue ? emailReportsEnabled : false);
                        }}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>Test Notification</Text>
                    <Text style={styles.description}>Send a test notification to the current device.</Text>
                    <TouchableOpacity style={styles.testButton} onPress={sendTestNotification}>
                        <Text style={styles.buttonText}>Send Test</Text>
                    </TouchableOpacity>
                </View>
                {notificationsEnabled && (
                    <>
                        <View style={styles.card}>
                            <Text style={styles.label}>Push Notifications for Events</Text>
                            <Text style={styles.description}>Enable push notifications specifically for events.</Text>
                            <Switch
                                value={pushEventsEnabled}
                                onValueChange={(newValue) => {
                                    setPushEventsEnabled(newValue);
                                    updateNotificationPreferences(notificationsEnabled, newValue, pushReportsEnabled, emailEventsEnabled, emailReportsEnabled);
                                }}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.label}>Push Notifications for Reports</Text>
                            <Text style={styles.description}>Enable push notifications specifically for reports.</Text>
                            <Switch
                                value={pushReportsEnabled}
                                onValueChange={(newValue) => {
                                    setPushReportsEnabled(newValue);
                                    updateNotificationPreferences(notificationsEnabled, pushEventsEnabled, newValue, emailEventsEnabled, emailReportsEnabled);
                                }}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.label}>Email Notifications for Events</Text>
                            <Text style={styles.description}>Enable email notifications specifically for events.</Text>
                            <Switch
                                value={emailEventsEnabled}
                                onValueChange={(newValue) => {
                                    setEmailEventsEnabled(newValue);
                                    updateNotificationPreferences(notificationsEnabled, pushEventsEnabled, pushReportsEnabled, newValue, emailReportsEnabled);
                                }}
                            />
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.label}>Email Notifications for Reports</Text>
                            <Text style={styles.description}>Enable email notifications specifically for reports.</Text>
                            <Switch
                                value={emailReportsEnabled}
                                onValueChange={(newValue) => {
                                    setEmailReportsEnabled(newValue);
                                    updateNotificationPreferences(notificationsEnabled, pushEventsEnabled, pushReportsEnabled, emailEventsEnabled, newValue);
                                }}
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 3,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
    },
    testButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default NotificationSettingsScreen;