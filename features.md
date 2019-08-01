---
title: Features
layout: homepage
---
# Native REST Support
Restlet Framework provides a reusable and extensible set of classes and interfaces that serves as a foundation on which you can construct your own API-driven applications more efficiently. Mapped to the REST and HTTP concepts, the framework can be used for both client and server-side development, using the same Java API which reduces both the learning curve and the software footprint.

# Secure and Scalable
You should never have to make a tradeoff between security and scalability for your APIs. Restlet Framework supports standard security and authentication methods. A fully multi-threaded design with per-request resource instances reduces thread-safety issues, and ensures that APIs will scale no matter how many requests.

# Broad Use Case Support
APIs you build with Restlet Framework can be deployed to all common environments. An extensible set of representations, support for standards, and numerous connectors lets you build and call any type of web API, and connect to any backend process or data source.

# A Complete Web Server
Restlet Framework is not only a framework for building APIs but also for running them. Its built-in web server provides:
- Automated content negotiation based on client preferences.
- Encoding and decoding service that transparently compresses or uncompresses representations exchanged.
- Log service to write all accesses to applications in a standard fully customizable Web log file following the [W3C Extended Log File Format](http://www.w3.org/TR/WD-logfile.html).
- Conditional requests automatically supported for resources.
- Partial requests automatically supported for resources to retrieve or update a range of a representation.
- Static file serving, like the Apache HTTP Server, with metadata association based on file extensions and URI-based redirection.
- Remote edition of files based on PUT and DELETE methods (WebDAV mode).

# Extensive Connectors Set
With its connectors, Restlet Framework covers numerous use cases. Connectors available by default include:

Multiple HTTP connectors, based on either Eclipse Jetty, Simple framework, JDK HttpURLConnection class or on Apache HTTP Client.
- Client FILE connector supporting GET, PUT and DELETE methods on files and directories, supporting also directory listings.
- Client CLAP connector to access to the Classloader resources.
- Client RIAP connector to access to the Restlet internal resources, directly inside the JVM.
- Client SMTP, SMTPS, POP v3 and POPS v3 connectors, based on JavaMail and custom email XML format.
- Client SOLR connector to call embedded Apache Solr search and indexing engine.

# Available Representations
Fully aligned with Web standards, Restlet Framework provides the following representations out of the box:

Automated marshalling and unmarshalling between POJOs and representations based on an extensible converter service. Uses Jackson for JSON, XML, YAML, CSV and more or GSON. Also works with a GWT and Java object serialization.
- XML representations (JAXB, DOM or SAX based) with a simple XPath API based on JDK's built-in XPath engine.
- Integration with the FreeMarker, Velocity and Thymeleaf template engines.
- Integration with Apache FileUpload to support multi-part forms and easily handle large file uploads from browsers.
- Transformer filter to easily apply XSLT stylesheets on XML representations. It is based on JDK's built-in XSLT engine.
- Extensible set of core representations based on NIO and BIO classes. Support for Atom standard via a dedicated extension.
- Support for Atom standard via a dedicated extension.
- Integration with Apache Lucene Tika to support metadata extraction from any representation.
- Full RDF reading and writing support make Restlet Framework ready for the Semantic Web (Web 3.0).

# Flexible Configuration
Restlet Framework can be entirely configured in Java via the Restlet API. Configuration standards supported include:

- Extensive integration with popular Guice and Spring IoC frameworks.
- Logging based on JULI (java.util.logging) with an extensibility system, including an adapter for SLF4J.
