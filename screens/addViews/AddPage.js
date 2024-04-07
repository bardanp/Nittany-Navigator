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
  <Button onPress={onPress} variant="ghost" _text={{ color: 'primary.500' }} p="5" my="2" borderColor="primary.500" borderWidth="1">
    <VStack space={2}>
      <Text color="coolGray.800" bold fontSize="md">{title}</Text>
      <Text color="coolGray.600" fontSize="sm">{description}</Text>
    </VStack>
  </Button>
);

const AddPage = () => {
  const navigation = useNavigation();

  const navigateTo = (routeName) => () => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ width: '100%' }}>
        <VStack space={5} alignItems="center" px="3" pt="5" mt="4">
          <Text fontSize="2xl" color="coolGray.800" bold>Add New</Text>
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
          <Button onPress={navigateTo(Routes.HOME)} variant="subtle" colorScheme="primary" size="sm">
            Back to Home
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPage;
