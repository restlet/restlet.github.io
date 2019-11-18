---
title: JavaMail
long-title: JavaMail extension
section: guide-extensions
version: '2.4'
nav_order: 17
---
# Introduction

This connector is based on
[JavaMail](http://www.oracle.com/technetwork/java/javamail/index.html)
that provides a platform-independent and protocol-independent framework
to build mail and messaging applications.

# Description

This connector supports the following protocols: SMTP, SMTPS.

The list of supported specific parameters is available in the Javadocs:

-   [JavaMail client Javadocs]({{ site.data.javadoc.baseUrl }}{{ page.version }}/jse/ext/org/restlet/ext/javamail/JavaMailClientHelper.html)

The mail and its properties (sender, recipient, subject, content, etc)
have to be specified as an XML representation.

For additional details, please consult the
[Javadocs]({{ site.data.javadoc.baseUrl }}{{ page.version }}/jse/ext/org/restlet/ext/javamail/package-summary.html).
