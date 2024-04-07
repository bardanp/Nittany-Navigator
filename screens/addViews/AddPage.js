import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { VStack, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Routes = {
  ADD_NEW_EVENT: 'addNewEvent',
  ADD_NEW_REPORT: 'addNewReport',
  HOME: 'Home',
};

const OptionCard = ({ title, description, onPress }) => (
  <Button onPress={onPress} variant="ghost" size="lg" my="3">
    <VStack space={2}>
      <Text bold fontSize="xl">{title}</Text>
      <Text fontSize="md">{description}</Text>
    </VStack>
  </Button>
);

const AddPage = () => {
  const navigation = useNavigation();

  const navigateTo = (routeName) => () => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ width: '100%' }}>
        <VStack space={5} alignItems="center" px="5" pt="10">
          <Text fontSize="2xl" bold>Add New</Text>
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
          <Button onPress={navigateTo(Routes.HOME)} variant="solid" size="sm" colorScheme="primary">
            Back to Home
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPage;
