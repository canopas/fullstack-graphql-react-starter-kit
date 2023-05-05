# omniDashboard

Dashboard for businesses

## Requirements

- Go 1.20

## Backend

- Start Go Server

  ```
  go run main.go
  ```

  If any dependency error is there, run

  ```
  go mod tidy
  ```

  You can access the APIs at `http://localhost:8080`.

### We are using go modules for go package dependency.

- Initialize go modules

  ```
  go mod init
  ```

- By running above command go.mod file created in project directory. It includes all packages required in project.

- Add package in project

  ```
  go get package_name
  ```

- Update package

  ```
  go get -u package_name
  ```

- sync dependency with go.mod

  ```
  go mod tidy
  ```

### For writing unit tests in golang :

- cd to package for which, you want to write test.

  ```
  cd package_name
  ```

- Create file with suffix test like packageName_test.go.

- Create function with prefix Test like TestFunctionName.

- Run test using

  ```
  go test .
  ```

  For cleaning test cache

  ```
  go clean -testcache
  ```

## To enable pre-commit hook

```
git config core.hooksPath .githooks
```

## LICENSE

Canopas is released under the [GNU V3](https://github.com/canopas/canopas-website/blob/master/LICENSE.md).

