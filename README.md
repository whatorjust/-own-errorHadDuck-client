# ERRORHADDUCK - CLIENT

> http://mysterious-journey.surge.sh > **코딩을 하면서 겪는 에러를 기록하고, 공부할 수 있는 웹 어플리케이션**

> '에러해결했덕'은 개발을 하면서 마주치게 되는 문제 상황에서 재밌게 디버깅을 하며, 스스로 해결할 수있게 도와줍니다. 또한, 그 과정을 각 요소별로 기록(검색키워드,url,에러코드)할 수 있고 그 내용들을 나중에 다시 볼 수 있게 도와주는 서비스입니다. 모든 기록 내용은 각 계정별로 한정됩니다.

## **Getting Started**

### **Prerequisites**

- Node, npm

### **Installing**

```shell
- on your root dir
$ npm install
$ npm install --global surge
```

- [surge](https://surge.sh/help/getting-started-with-surge)

### Create `.env` file on your root dir

```
REACT_APP_API_KEY=http://13.125.254.202:5000
```

- Back-end Repository : [errorHadDuck-server](https://github.com/codestates/errorHadDuck-server)

### **Deployment**

```shell
- on your root dir
$ npm run build
$ cd build
$ surge
```

- then sign up/in to surge
- to see the list of deployed projects `surge list`
- to redeploy with the same domain `surge --domain SOME_DOMAIN_NAME`

### **Built With**

- REACT : 웹 라이브러리
- REACT_ROUTER_DOM : 라우팅 라이브러리
- ANT DESIGN : 디자인 컴포넌트 라이브러리

---

## **Component Design**

![component](https://i.imgur.com/G8M1yq4.jpg)

---

###### features
[![errhadduck_features](http://img.youtube.com/vi/CjWOggbV8aA/0.jpg)](http://www.youtube.com/watch?v=CjWOggbV8aA)

- signup & login
  ![signup](https://i.imgur.com/nr60mgF.gif)

- write
  ![write](https://i.imgur.com/TixfFle.gif)

- Debugging with rubber-duck
  ![Debugging](https://i.imgur.com/mk9sZp6.gif)

---

## **We Are 'TEAM QUACK'**

| 이름   | 스택      | TIL blog                          | github username                                |
| ------ | --------- | --------------------------------- | ---------------------------------------------- |
| 조아라 | front-end | https://grin-quokka.tistory.com/  | [grin-quokka ](https://github.com/grin-quokka) |
| 박강호 | front-end | https://medium.com/@whatorjust/   | [whatorjust](https://github.com/whatorjust)    |
| 이해준 | back-end  | https://medium.com/@0oooceanhigh/ | [liftingturn](https://github.com/liftingturn)  |
