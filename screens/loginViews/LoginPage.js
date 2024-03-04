import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Ionicons } from '@expo/vector-icons';
import keys from '../../keys.json';
import { jwtDecode } from 'jwt-decode'; 
import { decode, encode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const discovery = useAutoDiscovery(`https://login.microsoftonline.com/${tenantId}/v2.0`);
  const redirectUri = makeRedirectUri({
    scheme: 'nittany-navigator', 
  });

  const [token, setToken] = useState(null);
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
      redirectUri,
    },
    discovery
  );

  const saveUserInfo = async (accessToken) => {
    try {
      const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me?$select=displayName,givenName,surname,mail,userPrincipalName,extension_d5d2dec11315480f87b23402ce132717_primaryAffiliation', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      const userInfo = await graphResponse.json();
      console.log('User info from Graph API:', userInfo);
  
      const formattedUserInfo = {
        email: userInfo.mail || userInfo.userPrincipalName,
        firstName: userInfo.givenName,
        lastName: userInfo.surname,
        primaryAffiliation: userInfo.jobTitle || 'Not specified', 
      };
  
      await AsyncStorage.setItem('userInfo', JSON.stringify(formattedUserInfo));
    } catch (e) {
      console.error('Fetching user info from Microsoft Graph API failed', e);
    }
  };
  
  
  

  const handleLoginPress = () => {
    // navigation.navigate('MainMenu');

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
            setToken(res.accessToken);
            saveUserInfo(res.accessToken);
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
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default LoginPage;
