---
title: OSGi
long-title: OSGi extension
section: guide-extensions
version: '2.5'
nav_order: 30
---
Support for highly dynamic web APIs.

This extension contains support for the OBAP (OSGi Bundle Access Protocol) pseudo-protocol. It includes a client connector that lets you access to resources from other OSGi bundles in a RESTful way. Just use this syntax:

    obap://{bundleSymbolicName}/{pathToResource}

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.osgi/{{ page.version }}/org/restlet/ext/osgi/package-summary.html).
