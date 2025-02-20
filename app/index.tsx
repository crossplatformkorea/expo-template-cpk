import styled, {css} from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, SwitchToggle, useCPK} from 'cpk-ui';
import {Stack, useRouter} from 'expo-router';

import {t} from '../src/STRINGS';
import {AsyncStorageKey} from '../src/utils/constants';

const Container = styled.View`
  background-color: ${({theme}) => theme.bg.basic};

  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding: 16px;

  justify-content: center;
  align-items: center;
`;

export default function Index(): JSX.Element {
  const {themeType, changeThemeType} = useCPK();
  const {push} = useRouter();

  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('home.title'),
        }}
      />
      <Content>
        <SwitchToggle
          isOn={themeType === 'dark'}
          onPress={() => {
            const nextTheme = themeType === 'dark' ? 'light' : 'dark';
            AsyncStorage.setItem(
              AsyncStorageKey.DarkMode,
              themeType === 'dark' ? 'false' : 'true',
            );
            changeThemeType(nextTheme);
          }}
        />
        <Button
          onPress={() => push('/details')}
          style={css`
            margin-top: 28px;
            margin-bottom: 40px;
          `}
          styles={{
            text: css`
              font-family: Pretendard-Bold;
            `,
          }}
          text={t('home.seeDetails')}
        />
      </Content>
    </Container>
  );
}
