---
title: HTTP Client
long-title: Apache HTTP Client extension
section: guide-extensions
version: '2.5'
nav_order: 14
---
# Introduction

This connector is based on [Apache Commons HTTP
client](https://hc.apache.org/httpcomponents-client-ga/index.html).
It provides an HTTP and HTTPS client connector with advanced
multi-threading and connection reuse support.

# Description

As pointed out by the Apache HTTPClient tutorial it is crucial to read
entirely each response. It allows to release the underlying connection.
Not doing so may cause future requests to block.

This connector supports the following protocols: HTTP, HTTPS. The list
of supported specific parameters is available in the Javadocs:

-   [HTTP client
    parameters](https://javadoc.io/static/org.restlet/org.restlet.ext.httpclient/2.5.1/org/restlet/ext/httpclient/HttpClientHelper.html)

For additional details, please consult [the
Javadocs](https://javadoc.io/doc/org.restlet/org.restlet.ext.httpclient/{{ page.version }}/org/restlet/ext/httpclient/package-summary.html).
