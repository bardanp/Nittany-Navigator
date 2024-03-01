import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { Ionicons } from '@expo/vector-icons';
import keys from '../../keys.json';
import { jwtDecode } from 'jwt-decode'; 
import { decode, encode } from "base-64";

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}


WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({ navigation }) => {
  const tenantId = keys.tenantId;
  const clientId = keys.clientId;

  // Auto-discovery for Microsoft's OpenID configuration
  const discovery = useAutoDiscovery(`https://login.microsoftonline.com/${tenantId}/v2.0`);

  // Dynamic redirectUri based on the environment
  const redirectUri = makeRedirectUri({
    scheme: 'nittany-navigator', // Ensure this matches your scheme configured in app.json
  });

  // State to store the token
  const [token, setToken] = useState(null);

  // AuthRequest hook
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery
  );

  const handleLoginPress = () => {
    promptAsync().then((codeResponse) => {
      if (request && codeResponse?.type === 'success' && discovery) {
        exchangeCodeAsync(
          {
            clientId,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery,
        ).then((res) => {
          if (res.accessToken) {
            setToken(res.accessToken); // Store the token in state
            // Decode the ID token if needed
            const userInfo = jwtDecode(res.idToken);
            console.log('User Info:', userInfo);
            // Navigate or further process token as needed
            navigation.navigate('MainMenu');
          }
        }).catch(error => console.error('Exchange code async error:', error));
      }
    }).catch(error => console.error('Prompt async error:', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="school" size={100} color="#2f80ed" style={styles.logo} />
      <Text style={styles.title}>Welcome to Nittany Navigator</Text>
      <Text style={styles.description}>Your go-to for a connected, informed, and safe campus journey.</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress} disabled={!request}>
        <Text style={styles.buttonText}>Sign In with PSU Login</Text>
      </TouchableOpacity>
      {token && <Text>Token: {token.substring(0, 10)}...</Text>}
    </SafeAreaView>
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
