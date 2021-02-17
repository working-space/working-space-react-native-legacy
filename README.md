# 작업공간 w/ React Native

## 시작

```bash
# 패키지 의존성 설치
yarn
# 안드로이드 실행
yarn run android
```

## 주요 라이브러리 및 프레임워크

- React Native
- [react-navigation v5](https://github.com/react-navigation)
- [Emotion](https://emotion.sh/docs/introduction)
- [MobX 6](https://github.com/mobxjs/mobx)
  - 데코레이터 문법은 사용하지 않는다.
- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)
- [react-native-config](https://github.com/luggit/react-native-config)
- [react-native-naver-map](https://github.com/QuadFlask/react-native-naver-map)

## 팁

- `babel-plugin-root-import`을 적용하였고 `src` 디렉터리를 root로 지정했다. root 디렉터리인 `src`에 접근할 때는 `~`를 사용한다.
  - 예시 : `~/components/Button/Button`
