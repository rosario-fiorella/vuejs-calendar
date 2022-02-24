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
- VUE_APP_API_BOOKING=```string, example: booking```
- VUE_APP_API_CONTENTS=```string, example: contents```
- VUE_APP_API_DATA=```string, example: app```
- VUE_APP_API_ENTITIES=```string, example: entities```
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
![1-home-dialog](https://user-images.githubusercontent.com/41728059/155615448-485a4c97-3720-4c91-bb2d-faf201fc957e.png)
![2-home](https://user-images.githubusercontent.com/41728059/155615456-a1506fb9-fe77-4101-b852-2a61672f479c.png)
![3-home-selected](https://user-images.githubusercontent.com/41728059/155615467-61cd0777-b9e1-460d-bcd5-43c03002c050.png)
![4-home-booking](https://user-images.githubusercontent.com/41728059/155615473-7f0357db-602c-4716-ad89-abcac8d5dc32.png)
