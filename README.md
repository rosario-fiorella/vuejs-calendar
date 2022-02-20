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
![1-home-dialog](https://user-images.githubusercontent.com/41728059/154848895-3b879e5d-027e-4655-b0b7-e9029bb65466.png)
![2-home-products](https://user-images.githubusercontent.com/41728059/154848913-f07b61c9-cc7c-4ad1-815c-3e3e0803042b.png)
![3-home-selected](https://user-images.githubusercontent.com/41728059/154848922-98409dbe-c628-46e6-af38-fb1dccd793a2.png)
![4-home-detail](https://user-images.githubusercontent.com/41728059/154848929-3ec20670-2f21-4c08-a982-88da7654b77d.png)
