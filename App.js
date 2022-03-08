import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});
export default function App() {
  const [pushToken, setPushToken] = useState();
  const triggerNotificationHandler = () => {
    /* Notifications.scheduleNotificationAsync({
      content: {
        title: 'First local notification',
        body: 'This is the first local notification...',
      },
      trigger: {
        seconds: 3,
      },
    }); */
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken,
        data: { extradData: 'Some Data' },
        title: 'Sent via app',
        body: 'Sent via apppppp',
      }),
    });
  };

  useEffect(() => {
    Notifications.getExpoPushTokenAsync().then((data) =>
      setPushToken(data.data)
    );
  }, []);
  useEffect(() => {
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (notifications) => {
        console.log(notifications);
      }
    );
    const subscription = Notifications.addNotificationReceivedListener(
      (notifications) => {
        console.log(notifications);
      }
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title='Trigger notification'
        onPress={triggerNotificationHandler}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
