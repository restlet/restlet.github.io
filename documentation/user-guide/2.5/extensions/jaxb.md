---
title: JAXB
long-title: JAXB extension
section: guide-extensions
version: '2.5'
nav_order: 18
---
This extension provided an integration with JAXB.
[JAXB](https://jaxb.dev.java.net/)
is a convenient way to process XML content using Java objects by binding
XML schemas to Java classes.

The extension is composed of just one class, the JaxbRepresentation that
extends the OutputRepresentation and is able to both serialize and
deserialize a Java objects graph to/from an XML document.

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.jaxb/{{ page.version }}/org/restlet/ext/jaxb/package-summary.html).
