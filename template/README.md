# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification (webpack)
yarn build
```

or

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification (webpack)
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Install wiwi on web OpenGate UX

> Use axios: https://github.com/axios/axios

Installation and management wiwi on the web OpenGate UX is done through the following commands:

**Register**

``` bash
$ yarn register
```

or

``` bash
$ npm run register
```

**Update**

``` bash
$ yarn update
```

or

``` bash
$ npm run update
```

**Delete**

``` bash
$ yarn delete
```

or 

``` bash
$ npm run delete
```

They will ask for the following information:

1. Type url of api-web (http://localhost:3977): default http://localhost:3977
2. domain: domain of user that exists in the platform OpenGate
3. user name: user that exists in the platform OpenGate
4. password: password of user

## Generate version

This project offers the following script that version the project using [npm-version](https://docs.npmjs.com/cli/version)

``` shell
$ npm version [ major | minor | patch ]
```

## Important: data property

WIWI can be created to overwrite the actions of the web. In other words, overwrite the web assistants themselves.

In the case of overwriting editing actions, the web will pass the necessary data to the wiwi through the data property

The following code is an example of how to configure a WIWI to receive the `data` property (include on example code):

```javascript

<template>
  <v-card flat>
    <v-card-subtitle>Data from web:</v-card-subtitle>
    <v-card-text>{{data}}</v-card-text>
  </v-card>
</template>

<script>
/* IMPORTANT: if you need babel-polyfill, please don't remove the following import */
import '../utils/require-babel-polyfill.js'

export default {
  //https://kazupon.github.io/vue-i18n/guide/component.html#component-based-localization
  i18n: {
    messages: {
      en: {},
      es: {}
    }
  },
  name: "MyWiwi",
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  components: {
  },
  data() {
  },
  computed: {},
  watch: {},
  methods: {
  }
};
</script>
<style scoped>
</style>

```

## Utils for development

The project contains some tools (components and plugins) contained in the web where the wiwi will be installed.

This facilitates the autonomous development of the wiwi.

Listed below are these tools with examples of how to use them in our wiwi.

### $jsonPath

``` javascript
export default {
  name: 'exampleJsonPath',
  data() {
    return {
      example: {
        one: '1',
        two: '2'
      }
    }
  }
  computed: {
    return this.$jsonPath(this.example, '$.one')[0]
    //return 1
  }
}
```

### $api 

> https://github.com/amplia-iiot/opengate-js

1. Configure 

``` javascript
// src/plugins/store.js
{
  apiKey: '@@API_KEY@@',
  url: '@@NORTH_API@@',
  timeout: 60000,
  south: {
    url: '@@SOUTH_API@@'
  }
}

```

2. Use

``` javascript
import { mapGetters } from "vuex";

export default {
  name: 'exampleApi',
  data() {
    return {
      entries: []
    }
  },
  methods: {
    async search(){
      this.entries.splice(0, this.entries.length);
      try {
        const result = await this.builder.build().execute();
        if (result.statusCode !== 204) {
          this.entries = result.data.entities;
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  },
  computed: {
    //https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper
    ...mapGetters({ api: "$api" }),
    builder() {
      return this.api.entitiesSearchBuilder();
    }
  }
}
```

