---
id: install-good2manufactured-mac
title: macOS Install
description: Install the Good2Manufacture Client on macOS and allow the server to reach it on port 9997.
---

On macOS the client is the UNIX binary `good2manufactured`. Download it from the [Admin Panel](https://app.floating-gates.com/dashboard?menu=Admin) or the [Good2Manufacture download page](https://floating-gates.com/good2manufacture).

## Allow the binary to run

macOS may quarantine a binary that arrived from the browser. Clear that flag, then make it executable:

```sh
xattr -d com.apple.quarantine ./good2manufactured
chmod +x ./good2manufactured
```

If the application firewall is on, allow incoming connections for the binary, or open TCP **9997**.

## Start the agent

```sh
./good2manufactured
```

The process listens on port 9997 and starts checking the directory you later register as the endpoint root:

```sh
Server listening on port 9997 (UNIX Mode)...
[CODE 4] Checking library presence at: /Users/you/CAD
```

## Register the endpoint

Open [Endpoint Setup](https://app.floating-gates.com/?menu=Endpoints), enter the IP of this Mac, and set the root directory that holds the CAD library.

You should reach this scenario:

![Reachability test](../data/images/docs-images/reachable.png)

## Keep it running

For a lasting install, run the binary as a launchd job so it comes back after login. The agent only needs network access to the server and read access to the CAD directory.
