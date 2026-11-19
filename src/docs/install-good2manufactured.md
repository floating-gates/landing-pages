---
id: install-good2manufactured
title: Linux Install
description: Install the Good2Manufacture Client on Linux and open it to the server on port 9997.
---

Before starting the agent, open port **9997** so the Good2Manufacture server can reach this machine.

```sh
sudo apt install firewalld
sudo firewall-cmd --permanent --add-port=9997/tcp
sudo firewall-cmd --reload
```

On Fedora or RHEL the firewall is already `firewalld`. On a host that uses `nftables` or `ufw` instead, allow TCP 9997 with that tool.

## Download and run

Log into the [Admin Panel](https://app.floating-gates.com/dashboard?menu=Admin) or the [Good2Manufacture download page](https://floating-gates.com/good2manufacture) and take the Linux x64 binary `good2manufactured`.

```sh
chmod +x ./good2manufactured
./good2manufactured
```

The process listens on port 9997 and starts checking the directory you later register as the endpoint root:

```sh
Server listening on port 9997 (UNIX Mode)...
[CODE 4] Checking library presence at: /home/mattia/Downloads
```

## Register the endpoint

Open [Endpoint Setup](https://app.floating-gates.com/?menu=Endpoints), enter the IP of this computer, and set the root directory that holds the CAD library.

You should reach this scenario:

![Reachability test](../data/images/docs-images/reachable.png)

## Keep it running

For a lasting install, run the binary under systemd as a user service, then enable it so it comes back after reboot. The agent only needs network access to the server and read access to the CAD directory.
