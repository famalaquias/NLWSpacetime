import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

import { 
  View, 
  Text, 
  TouchableOpacity } 
from 'react-native';
import { useEffect } from 'react';

import { styled } from 'nativewind';

import { api } from '../src/lib/api';

import Stripes from '../src/assets/stripes.svg';
import NLWLogo from '../src/assets/logo-nlw.svg';

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 
    'https://github.com/settings/connections/applications/d772e039d8c119de0285',
};

export default function App() {
  const router = useRouter();

  const [_request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'd772e039d8c119de0285',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery,
  );

  async function handleGithubOAuthCode(code: string) {
    const response =  await api.post('/register', {
      code,
    });

    const { token } = response.data;
  
    await SecureStore.setItemAsync('token', token); 

    router.push('/memories');
  }

  useEffect(() => {
    /* 
    console usado para pegar a redirect URL de autorização do
    git hub:
    console.log(
      makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    ); 
    */

    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />  

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se quiser) 
            com o mundo!
          </Text>
        </View> 

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text
            className="font-alt text-sm uppercase text-black"
          >
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com ❤️ por Fabiane Malaquias
      </Text>
    </View>
  );
}
