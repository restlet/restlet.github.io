---
title: First client
parent: First steps
section: guide-introduction
version: '2.6'
nav_order: 2
---
# Introduction

As we mentioned in the [introduction](/documentation/user-guide/{{ page.version }}/introduction/overview "Part I - Introduction"),
the Restlet Framework is at the same time a client and a server
framework. For example, you can easily work with remote resources using
its HTTP client connector.

A connector in REST is a software element that enables the communication
between components, typically by implementing one side of a network
protocol. Restlet provides several implementations of client connectors
based on existing open-source projects. The
[connectors](/documentation/user-guide/{{ page.version }}/core/base/connectors "Connectors")
section lists all available client and server connectors and explain how
to use and configure them.

Here we will retrieve the representation of an existing resource and
output it in the JVM console:


<pre class="language-java"><code class="language-java">// Outputting the content of a Web page  
new ClientResource("https://restlet.talend.com").get().write(System.out);  
</code></pre>


If you are running your client behind a proxy, please [check this
page](/documentation/user-guide/{{ page.version }}/core/base/connectors) to
pick an HTTP client that can be configured. The internal HTTP client
doesn't support proxies at the moment.

The next example sets some preferences in your client call, like a
referrer URI:

<pre class="language-java"><code class="language-java">// Create the client resource  
ClientResource resource = new ClientResource("https://restlet.talend.com");  

// Customize the referrer property  
resource.setReferrerRef("http://www.mysite.org");  

// Write the response entity on the console
resource.get().write(System.out);  
</code></pre>


After those first two steps, [let's now develop a more complete Restlet
application](/documentation/user-guide/{{ page.version }}/introduction/first-steps/first-application "First application"),
taking advantage of the various editions of the Restlet Framework.
