# Offline Notes PWA

This is a simple learning project with NextJS

## Running Projects

Follow the instructions below to run the project and register the Service Worker properly in your local machine.

### MacOS/Linux

- Simply run `npm run dev:https`
- a local certificates directory will be generated in the project
- Read More at [`nextjs-using-https-during-development`](https://nextjs.org/docs/app/api-reference/cli/next#using-https-during-development)

### Windows with WSL

- Install `mkcert` with chocolatey on the Windows filesystem (`/mnt/<drive>/...`) using Windows terminal
- Run `mkcert -install` to Install the local CA in the system trust store.
- Generate https key and https cert for your particular project by running `mkcert <local project host>` on the selected directory in your Windows filesystem using Windows terminal
- Open new tab on your terminal and execute `wsl`
- Navigate to your project in the `wsl` filesystem
- Run the project by executing this command

```zsh
npx next dev --turbopack --experimental-https -H <local project host> --experimental-https-key <path to https key in windows filesystem> --experimental-https-cert <path to https cert in windows filesystem>
```
