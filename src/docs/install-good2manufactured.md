# Linux

Before setting up an agent open the port 9997 to allow communication with server.

```sh
➜ sudo firewall-cmd --permanent --add-port=9997/tcp
success
➜ sudo firewall-cmd --reload
```

### Ephimeral test

Clicking via [Enpoint Setup](https://app.floating-gates.com/?menu=Endpoints) page:

You should be able to arrive with the IP of your computer to this scenario.

![Reachably test](../data/images/docs-images/reachable.png)

Likely finding those pseudo output on the good2manufactured standard output:

```sh
➜ ./good2manufactured.exe 
Server listening on port 9997 (UNIX Mode)...
[CODE 4] Checking library presence at: /home/mattia/Downloads
```
