import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { startLiveness } from '@valifysolutions/react-native-vidvliveness';

// Unified credentials
const creds = {
  baseURL: 'https://www.valifystage.com/', // Update with your actual base URL
  bundleKey: 'ad44eb94ca6747beaf99eef02407221f',
  userName: 'mobileusername', // Replace with actual credentials
  password: 'q5YT54wuJ2#mbanR',
  clientID: 'aKM21T4hXpgHFsgNJNTKFpaq4fFpoQvuBsNWuZoQ',
  clientSecret: 'r0tLrtxTue8c4kNmPVgaAFNGSeCWvL4oOZfBnVXoQe2Ffp5rscXXAAhX50BaZEll8ZRtr2BlgD3Nk6QLOPGtjbGXYoCBL9Fn7QCu5CsMlRKDbtwSnUAfKEG30cIv8tdW',
};

const getToken = async () => {
  const url = `${creds.baseURL}/api/o/token/`;

  const body = `username=${creds.userName}&password=${creds.password}&client_id=${creds.clientID}&client_secret=${creds.clientSecret}&grant_type=password`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.access_token;
    } else {
      throw new Error('Failed to retrieve token');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Could not generate token');
    return null;
  }
};

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleStartValify = async () => {
    setLoading(true);

    const token = await getToken();

    if (token) {
                const livenessParams = {
                  access_token: token,
                  base_url: creds.baseURL,
                  bundle_key: creds.bundleKey,
                  language: 'en'
                                  };

                startLiveness(livenessParams)
                  .then((livenessValue) => {
                    console.log('Liveness Result:', livenessValue);
                    Alert.alert('Success', 'Liveness completed successfully');
                  })
                  .catch((livenessError) => {
                    console.error('Liveness Error:', livenessError);
                    Alert.alert('Error', 'Liveness failed');
                  });
    }else{
            Alert.alert('Error', 'Token failed');

        }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Start Valify" onPress={handleStartValify} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
});

export default App;
