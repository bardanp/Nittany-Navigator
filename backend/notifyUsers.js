import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../backend/firebase';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const scheduleNotification = async (event) => {
    const trigger = new Date(event.dateTime.seconds * 1000 - 30 * 60 * 1000);
    if (trigger > new Date()) {
        return await Notifications.scheduleNotificationAsync({
            content: {
                title: "Upcoming Event",
                body: `Event ${event.title} is starting soon!`,
                data: { id: event.id },
            },
            trigger,
        });
    }
};

const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            console.error('Failed to get push token for push notification!');
            return;
        }

        const config = Constants.expoConfig;




        // Ensure the projectId is set correctly in app.json under extra.
        const projectId = config.extra.eas.projectId;
        if (!projectId) {
            console.error("Project ID is not set in app.json");
            return;
        }


        // Modify the token retrieval to include projectId
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

    } else {
        console.warn('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
};

const fetchEventsAndScheduleNotifications = async () => {
    const q = query(collection(firestore, 'events'), where('dateTime', '>=', new Date()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const event = doc.data();
        event.id = doc.id;
        scheduleNotification(event);
    });
};

export const setupNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
        await fetchEventsAndScheduleNotifications();
    }
};