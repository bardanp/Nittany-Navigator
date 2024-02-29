import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Ionicons } from '@expo/vector-icons';

import keys from '../../keys.json';
import jwtDecode from 'jwt-decode'; // You might need to install jwt-decode


const tenantId = keys.tenantId;
const clientId = keys.clientId;
const redirectUri = AuthSession.makeRedirectUri({ 
  scheme: 'nittany-navigator',
 });

const LoginPage = ({ navigation }) => {
  const [discovery, setDiscovery] = useState(null);
  const [authRequest, setAuthRequest] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const initAuthSession = async () => {
      WebBrowser.maybeCompleteAuthSession();

      const discoveryData = await AuthSession.fetchDiscoveryAsync(`https://login.microsoftonline.com/${tenantId}/v2.0`);
      setDiscovery(discoveryData);

      const request = new AuthSession.AuthRequest({
        clientId,
        scopes: [
          'openid', 
          'profile', 
          'api://d5d2dec1-1315-480f-87b2-3402ce132717/User.Read' // Custom scope
        ],
        redirectUri,
      });
      
      
      
      setAuthRequest(request);
    };

    initAuthSession();
  }, []);

  const handleLoginPress = async () => {
    // navigation.navigate('MainMenu');

    // This is for PSU WebSSO login
    if (authRequest && discovery) {
      const result = await authRequest.promptAsync(discovery, { useProxy: true });
      console.log(result);
      setResult(result);
      navigation.navigate('MainMenu');
  
      if (result?.type === 'success') {
        // Decode the ID token if needed
        const userInfo = jwtDecode(result.params.id_token);
        console.log("User Info from ID Token:", userInfo);
  
        // Use the access token to call Microsoft Graph API
        fetchUserInfo(result.authentication.accessToken);
      } else {
        console.error("Authentication failed:", result);
      }
    }
  };
  
    
    const fetchUserInfo = async (accessToken) => {
      const graphApiUrl = 'https://graph.microsoft.com/v1.0/me';
      try {
        const response = await fetch(graphApiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userInfo = await response.json();
        console.log("User Info from Graph API:", userInfo);
      } catch (error) {
        console.error("Failed to fetch user info from Graph API:", error);
      }
    };
    
  
  

  return (
    <View style={styles.container}>
      <Ionicons name="school" size={100} color="#2f80ed" style={styles.logo} />
      <Text style={styles.title}>Welcome to Nittany Navigator</Text>
      <Text style={styles.description}>Your go-to for a connected, informed, and safe campus journey.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Sign In with PSU Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#2f80ed',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
