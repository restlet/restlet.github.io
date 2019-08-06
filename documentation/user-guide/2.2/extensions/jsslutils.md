---
title: jSSLutils
long-title: jSSLutils extension
section: guide-extensions
version: '2.2'
nav_order: 23
---
# Introduction

The SSL extension provides concrete implementations of the
[SslContextFactory](/documentation/javadocs/{{ page.version }}/jse/engine/org/restlet/engine/ssl/SslContextFactory.html)
that rely on
[jSSLutils](http://code.google.com/p/jsslutils/).

For additional details, please consult the
[Javadocs](/documentation/javadocs/{{ page.version }}/jse/ext/org/restlet/ext/jsslutils/package-summary.html).

# Description

## JsslutilsSslContextFactory

The JsslutilsSslContextFactory class is a wrapper for
`jsslutils.sslcontext.SSLContextFactory`. It has to be constructed with
the instance to wrap and is therefore only suitable to be used in the
context `sslContextFactory` *attribute*, not *parameter*. This is more
likely to be used for more specialised features such as the key or trust
manager wrappers of jSSLutils.

## PkixSslContextFactory

The PkixSslContextFactory class is a class that uses
`jsslutils.sslcontext.PKIXSSLContextFactory`. It provides a way to
configure the key store, the trust store (required for client-side
authentication) and the server alias. As part of its trust manager
configuration, it provides a way to set up certificate revocation lists
(CRLs).

### Example using the Component XML configuration:

<pre class="language-markup"><code class="language-markup">&lt;component xmlns=&quot;http://www.restlet.org/schemas/1.1/Component&quot;
    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
    xsi:schemaLocation=&quot;http://www.restlet.org/schemas/1.1/Component&quot;&gt;

    &lt;client protocol=&quot;FILE&quot; /&gt;

    &lt;server protocol=&quot;HTTPS&quot; port=&quot;8183&quot;&gt;
        &lt;parameter name=&quot;sslContextFactory&quot; value=&quot;org.restlet.engine.ssl.DefaultSslContextFactory&quot; /&gt;
        &lt;parameter name=&quot;keystorePath&quot; value=&quot;/path/to/keystore.p12&quot; /&gt;
        &lt;parameter name=&quot;keystoreType&quot; value=&quot;PKCS12&quot; /&gt;
        &lt;parameter name=&quot;keystorePassword&quot; value=&quot;testtest&quot; /&gt;
        &lt;parameter name=&quot;keyPassword&quot; value=&quot;testtest&quot; /&gt;
        &lt;parameter name=&quot;truststorePath&quot; value=&quot;/path/to/truststore.jks&quot; /&gt;
        &lt;parameter name=&quot;truststoreType&quot; value=&quot;JKS&quot; /&gt;
        &lt;parameter name=&quot;truststorePassword&quot; value=&quot;testtest&quot; /&gt;
        &lt;parameter name=&quot;crlUrl&quot; value=&quot;file:///path/to/crl.crl&quot; /&gt;
        &lt;parameter name=&quot;wantClientAuthentication&quot; value=&quot;true&quot; /&gt;
    SslConte&lt;/server&gt;

    &lt;defaultHost&gt;
        &lt;attach uriPattern=&quot;&quot; targetClass=&quot;org.restlet.example.tutorial.Part12&quot; /&gt;
    &lt;/defaultHost&gt;
&lt;/component&gt;
</code></pre>

There can be multiple `crlUrl` parameters. In addition, two other
parameters can be set:

-   `sslServerAlias`, which will use a particular alias from the key
    store.
-   `disableCrl`, which should be set to "true" if CRLs are not to be
    used.

The `wantClientAuthentication` parameter is handled by this the
SslContextFactory, but is often used in conjunction with it.

### Example embedded within the program, using two connectors:

<pre class="language-java"><code class="language-java">Component component = new Component();

Server server1 = component.getServers().add(Protocol.HTTPS,
   "host1.example.org", 8083);
Series<Parameter> param1 = server1.getContext().getParameters();

param1.add("sslContextFactory","org.restlet.engine.ssl.PkixSslContextFactory");
param1.add("keystorePath","/path/to/keystore1.p12");
param1.add("keystorePassword","...");
param1.add("keystoreType","PKCS12");
//...

Server server2 = component.getServers().add(Protocol.HTTPS,
   "host2.example.com", 8083);
Series<Parameter> param2 = server2.getContext().getParameters();

param2.add("sslContextFactory","org.restlet.engine.ssl.PkixSslContextFactory");
param2.add("keystorePath","/path/to/keystore2.p12");
//...
</code></pre>

This example uses two certificates depending on which server connector
(and thus which listening socket) is used.
