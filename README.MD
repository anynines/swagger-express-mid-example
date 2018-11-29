# BFF Mock 2.0

> Mock BFF app using the swagger specification as a basis

## Getting started
### Prerequisites
* [Docker](https://www.docker.com/get-started)
* access to spec file(s)

### installation
```shell
$> # build docker image, replace `<version>` with current dev version or other tag
$> docker build -t bff-mock-2:<version>
$> # run the app in detach mode; replace `<version>` with image's one.
$> docker run -p 8000:8000 -d bff-mock-2:<version>
```

The image will look after the `spec.yaml` file and create the routes accordingly.
