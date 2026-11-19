---
id: install-client
title: Install Good2Manufacture Client
description: Put the Good2Manufacture agent on every Windows, Linux, or macOS machine that holds CAD or GD&T.
---

The Good2Manufacture Client is a small agent that runs next to your files. It speaks to the [Good2Manufacture Server](#what-is-gates/install) and fetches the latest CAD and GD&T revisions so the server can evaluate them.

A client without a server cannot evaluate files. Install the server first, then put this agent on each endpoint.

## Client Requirements

| Component | Specification |
| --- | --- |
| Required Package | `good2manufactured` |
| Windows | Windows 10 or 11 (64-bit), package `good2manufactured.exe` |
| Linux | x64 host, package `good2manufactured` |
| macOS | macOS 12 or newer, package `good2manufactured` |
| Memory | 4 GB RAM minimum |
| Network | Reachable from the server on TCP port 9997 |

## 1. Download the client

Log into the [Admin Panel](https://app.floating-gates.com/dashboard?menu=Admin) or open the [Good2Manufacture download page](https://floating-gates.com/good2manufacture) and take the binary for this operating system.

## 2. Open port 9997

The agent listens on port **9997**. Allow inbound TCP 9997 on the endpoint before you register it.

## 3. Start the agent

Platform-specific steps live in the client chapters:

- [Windows Install](#good2manufactured/install-good2manufactured-win)
- [Linux Install](#good2manufactured/install-good2manufactured)
- [macOS Install](#good2manufactured/install-good2manufactured-mac)

## 4. Register the endpoint

Open [Endpoint Setup](https://app.floating-gates.com/?menu=Endpoints), enter the IP of the machine, and set the root directory that holds the CAD library.

![Reachability test](../data/images/docs-images/reachable.png)

When the row is healthy, the server can see the files on that PC and will keep parsing the latest revision.
