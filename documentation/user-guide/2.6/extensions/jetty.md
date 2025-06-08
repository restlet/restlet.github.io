---
title: Jetty
long-title: Eclipse Jetty extension
section: guide-extensions
version: '2.6'
nav_order: 21
---
# Introduction

This connector is based on the [Eclipse Jetty](http://www.eclipse.org/jetty/)
open-source web server. Jetty is popular alternative to Tomcat developed
by WebTide and has a nice separation between its HTTP
protocol implementation and its support for the Servlet API which led to
the first HTTP server connector developed for the Restlet Framework.

# Description

This connector supports the following protocols: HTTP (with or without TLS, aka HTTPS), HTTP2 (with or without TLS), HTTP3 on the server-side and client-side.

The list of supported specific parameters is available in the javadocs:

-   [Jetty server common parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{ page.version }}/org/restlet/ext/jetty/JettyServerHelper.html)
-   [HTTP server specific parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{ page.version }}/org/restlet/ext/jetty/HttpServerHelper.html)
-   [HTTPS server specific parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{ page.version }}/org/restlet/ext/jetty/HttpsServerHelper.html)
-   [Jetty client common parameters](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{ page.version }}/org/restlet/ext/jetty/HttpClientHelper.html)

Here is the list of dependencies of this connector:

-   [Jetty](http://www.eclipse.org/jetty/)
-   [Java Servlet](http://www.oracle.com/technetwork/java/javaee/servlet/index.html)

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.jetty/{{ page.version }}/org/restlet/ext/jetty/package-summary.html).

# Usage example

Please consult [connector configuration documentation](/documentation/user-guide/{{ page.version }}/core/base/connectors)

## HTTPS

For general information on Jetty HTTPS/SSL configuration, please read
[this document](http://wiki.eclipse.org/Jetty/Howto/Configure_SSL).
For configuration of the connector in a Restlet component, you will need
to set some of the HTTPS parameters listed above, for example:

<pre><code class="language-java">Server server = myComponent.getServers().add(Protocol.HTTPS, 8183);
server.getContext().getParameters().add("keystorePath", "&lt;your-path&gt;");
server.getContext().getParameters().add("keystorePassword", "&lt;your-password&gt;");
server.getContext().getParameters().add("keyPassword", "&lt;your-password&gt;");
</code></pre>

## HTTP2, HTTP3 on server side

The support for HTTP2 and HTTP3 is disabled by default. In order to use it, you need to complete the server configuration.

There are two cases, according you are configuring a HTTP or a HTTP server

### HTTP server

In this case, HTTP3 is not supported. Just provide the `HTTP2` value to the `http.transport.mode` to the server's configuration.

<pre><code class="language-java">Server server = myComponent.getServers().add(Protocol.HTTP, 8182);
server.getContext().getParameters().add("http.transport.mode", "HTTP2");
</code></pre>


HTTP1.1 will be still be supported.

### HTTPS server

In this case, HTTP3 is supported. The `http.transport.protocols` parameter allows to specify the list of protocol versions supported.

<pre><code class="language-java">Server server = myComponent.getServers().add(Protocol.HTTPS, 8183);
server.getContext().getParameters().add("http.transport.protocols", "HTTP1_1,HTTP2,HTTP3");
</code></pre>

## HTTP2, HTTP3 on client side

In this case, you can either ask to support only HTTP1.1, HTTP2, HTTP3, or support all of them using the DYNAMIC value, as follow:

<pre><code class="language-java">CLient client = myComponent.getClient().add(Protocol.HTTPS);
client.getContext().getParameters().add("httpClientTransportMode", "DYNAMIC");
</code></pre>
