---
title: Connector service
parent: Service package
section: guide-core
version: '2.6'
nav_order: 3
---
# Introduction

This service declares client and server connectors. This is useful at
deployment time to know which connectors an application expects to be
able to use. Implementation note: the parent component will ensure that
client connectors won't automatically follow redirections. This will
ensure a consistent behavior and portability of applications.
