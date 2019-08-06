---
title: JAXB
long-title: JAXB extension
section: guide-extensions
version: '2.2'
nav_order: 17
---
This extension provided an integration with JAXB.
[JAXB](https://jaxb.dev.java.net/)
is a convenient way to process XML content using Java objects by binding
XML schemas to Java classes.

The extension is composed of just one class, the JaxbRepresentation that
extends the OutputRepresentation and is able to both serialize and
deserialize a Java objects graph to/from an XML document.

For additional details, please consult the
[Javadocs](/documentation/javadocs/{{ page.version }}/jse/ext/org/restlet/ext/jaxb/package-summary.html).