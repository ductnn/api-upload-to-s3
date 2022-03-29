# Build API Server for upload files to AWS S3
[![CI](https://github.com/ductnn/api-upload-to-s3/actions/workflows/ci.yml/badge.svg)](https://github.com/ductnn/api-upload-to-s3/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/ductnn/api-upload-to-s3/pulls)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


<p align="center">
    <img src="./assets/node-s3.png">
    <br><br> 
    <h3 align="center">Upload files to AWS S3 using simple API server with Nodejs by the hard way.</h3>
</p>

## Project structure

**Overview**:

```sh
.
├── ./src
├── ./Dockerfile
├── ./README.md
├── ./package-lock.json
├── ./package.json
└── ./tsconfig.json
```

**Detail**:

```sh
src
├── config
│   ├── config.ts
│   └── index.ts
├── main.ts
├── routes
│   ├── index.ts
│   └── upload-to-S3.ts
├── services
│   ├── api.ts
│   └── index.ts
└── utils
    ├── index.ts
    └── utils.ts
```

## Install and build

### With manual

Clone this repo:

```sh
git clone https://github.com/ductnn/api-upload-to-s3.git
cd api-upload-to-s3
```

Set the enviroment variables:

```sh
cp .env.example .env

# open .env and modify the environment variables
## AWS_ACCESS_KEY=
## AWS_SECRET_KEY=
## AWS_REGION_DEFAULT=
## AWS_BUCKET_NAME=
```

Install the dependencies:

```sh
npm install
```

Finally, run API and use postman with method `PUT` for upload to AWS S3:

```sh
npm start
```

### With Dockerfile

Easy to build API with [Dockerfile](./Dockerfile):

```sh
# Build images
docker build -t <YOUR-DOCKER-ID>/api-upload-to-s3:v1 -f Dockerfile .

# Push to your registry
docker push <YOUR-DOCKER-ID>/api-upload-to-s3:v1

# And run this docker image
docker run -itd -p 5000:5000 <YOUR-DOCKER-ID>/api-upload-to-s3:v1
```

## Contribution
Contributions are more than welcome in this project!

## License
The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
