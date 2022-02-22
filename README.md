# calendar-api

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## API Services
### Mock API request/response model
The default settings use a simulated api response template, if you want to use a real API request/response you need to edit the ".env" file and enter the api URL which implements the data model suggested by the file "doc/openapi.3.0.2.yml". 
> This project does not implement server side backend api services 

### Environment
- VUE_APP_NODE_ENV: see "src/common/enum.js", use "demo" to use mock api
- VUE_APP_TITLE=```string```
- VUE_APP_API_BASE_URL=```url, example: http://localhost/api/```
- VUE_APP_API_ENTITIES=```string, example: entities```
- VUE_APP_API_BOOKING=```string, example: booking```
- VUE_APP_LINK_PRIVACY_TERM=```url```
- VUE_APP_LINK_PRIVACY_CONDITION=```url```
- VUE_APP_LINK_PRIVACY_POLICY=```url```
- VUE_APP_API_PER_PAGE=```number```
- VUE_APP_API_KEY=```string```

## Icons
- https://pictogrammers.github.io/@mdi/font/5.4.55/
- https://jossef.github.io/material-design-icons-iconfont/

## Post build
- https://cli.vuejs.org/guide/deployment.html

## CHANGE THEME COLOR
- Edit file: "src/common/colors.js"

## DEMO TEMPLATE
![1-home-dialog](https://user-images.githubusercontent.com/41728059/155183988-7f52c1be-1e30-4d11-b44f-657a28094d5c.png)
![2-home](https://user-images.githubusercontent.com/41728059/155184021-4eb84f81-66a4-474b-8086-e7693b12b393.png)
![3-home-selected](https://user-images.githubusercontent.com/41728059/155184040-6bee4e7e-b892-481f-9c60-0419ca3076d4.png)
![4-home-booking](https://user-images.githubusercontent.com/41728059/155184052-8678421b-c824-449f-8d6e-5a4ddbf5903b.png)