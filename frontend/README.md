# Hackaton Test Task [Frontend]

This is a test task for the hackaton. 
---
### How tu run the project:

In **DEV mode**:

```bash
npm install
npm run dev
```

In **PROD mode**:

```bash
docker-compose up --build
```

After that you can open the project in your browser by going to the following link: [http://localhost:3000](http://localhost:3000)


---

Troubleshooting:

(Windows)
```bash
If Docker Desktop isnt prompting you for permission, you might need to manually grant it access to your project directory. You can do this by going to Docker Desktop settings:
- Open Docker Desktop.
- Go to "Settings" from the Docker Desktop menu.
- Navigate to the "Resources" section.
- Select "File Sharing" or a similar option.
- Add your project directory (absolute\path\hackathon-test-task\frontend) to the list of shared directories.
- Save your changes and try running `docker-compose up --build` again.
```
