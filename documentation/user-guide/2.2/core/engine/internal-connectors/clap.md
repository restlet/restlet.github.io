---
title: CLAP
long-title: CLAP connector
parent: Internal Connectors
section: guide-core
version: '2.2'
nav_order: 2
---
CLAP (ClassLoader Access Protocol) is a custom scheme to access to
representations via classloaders (e.g.:
clap://thread/org/restlet/Restlet.class). This protocol accepts three
kinds of authority :

-   class: the resources will be resolved from the classloader
    associated with the local class.
-   system: the resources will be resolved from the system's
    classloader.
-   thread: the resources will be resolved from the current thread's
    classloader.

[CLAP client commons
parameters]({{ site.data.javadoc.preMavenCentral.baseUrl }}{{ page.version }}/jse/engine/index.html?org/restlet/engine/local/ClapClientHelper.html)
