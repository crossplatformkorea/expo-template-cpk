# Expo Template CPK

[![CI](https://github.com/crossplatformkorea/expo-template-cpk/actions/workflows/ci.yml/badge.svg)](https://github.com/crossplatformkorea/expo-template-cpk/actions/workflows/ci.yml)

크로스플랫폼 코리아에서 관리하는 [Expo](https://expo.dev) 프로젝트 템플릿입니다.

## 사용 방법

```bash
npx create-expo-app my-app --template expo-template-cpk
```

## 사용된 스택

- [Expo SDK 55](https://expo.dev) / [React Native 0.83](https://github.com/facebook/react-native)
- [expo-router](https://docs.expo.dev/router/introduction)
- [kstyled](https://github.com/niceplugin/kstyled) (CSS-in-JS)
- [cpk-ui](https://github.com/crossplatformkorea/cpk-ui)
- [i18n-js](https://github.com/fnando/i18n) + [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization)
- [jest](https://github.com/facebook/jest) + [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [prettier](https://prettier.io) + [eslint](https://eslint.org)
- [react-native-web](https://github.com/necolas/react-native-web)

## 주요 특징

- [cpk-ui](https://github.com/crossplatformkorea/cpk-ui) UI 프레임워크가 사전 설치되어 있습니다.
- [bun](https://bun.sh)이 기본 패키지 매니저로 설정되어 있습니다.
- New Architecture 기본 활성화
- 다크모드 지원 (AsyncStorage 기반 테마 저장)
- 한국어/영어 i18n 기본 설정
- State/Reducer Provider 패턴 예제 포함

## 명령어

```bash
bun install          # 의존성 설치
bun start            # 개발 서버 실행
bun run ios          # iOS 빌드
bun run android      # Android 빌드
bun run web          # 웹 실행
bun lint             # ESLint 실행
bun typecheck        # TypeScript 타입 체크
bun test             # 테스트 실행
```
