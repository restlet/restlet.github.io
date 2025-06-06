---
title: Overview
parent: Java EE
section: guide-editions
version: '2.2'
nav_order: 0
---
# Introduction

This chapter presents the Restlet Framework edition for Java EE (Java
Enterprise Edition).

This edition is aimed for development and deployment of Restlet
applications inside Java EE application server, or more precisely inside
Servlet containers such as [Apache
Tomcat](http://tomcat.apache.org/).

# Getting started

The rest of this page should get you started with the Restlet Framework,
Java EE edition, in less than 10 minutes. It explains how to create a
resource that says "hello, world" and run it.

1.  [What do I need?](#what-do-i-need)
2.  [The "hello, world" application](#the-hello-world-application)
3.  [Run in a Servlet container](#run-in-a-servlet-container)
4.  [Run as a standalone application](#run-as-a-standalone-java-application)
5.  [Conclusion](#conclusion)

## <a name="what-do-i-need"></a>What do I need?

We assume that you have a development environment set up and
operational, and that you already have installed the Java 1.5 (or
higher). In case you haven't downloaded the Restlet Framework yet,
select one of the available distributions of the [Restlet Framework
{{ page.version }}](/downloads/current).

## <a name="the-hello-world-application"></a>The "hello, world" application

Let's start with the core of a REST application: the Resource. Here is
the code of the single resource defined by the sample application.
Copy/paste the code in your "HelloWorldResource" class.

<pre class="language-java"><code class="language-java">package firstSteps;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Resource which has only one representation.
 */
public class HelloWorldResource extends ServerResource {

    @Get
    public String represent() {
        return "hello, world";
    }

}
</code></pre>

Then, create the sample application. Let's call it
"FirstStepsApplication" and copy/paste the following code:

<pre class="language-java"><code class="language-java">package firstSteps;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class FirstStepsApplication extends Application {

    /**
     * Creates a root Restlet that will receive all incoming calls.
     */
    @Override
    public synchronized Restlet createInboundRoot() {
        // Create a router Restlet that routes each call to a new instance of HelloWorldResource.
        Router router = new Router(getContext());

        // Defines only one route
        router.attach("/hello", HelloWorldResource.class);

        return router;
    }

}
</code></pre>

## <a name="run-in-a-servlet-container"></a>Run in a Servlet container

Let's now deploy this Restlet application inside your favorite Servlet
container. Create a new Servlet Web application as usual, add a
"firstStepsServlet" package and put the resource and application classes
in. Add the archives listed below into the directory of librairies
(/WEB-INF/lib):

-   org.restlet.jar
-   org.restlet.ext.servlet.jar

Then, update the "web.xml" configuration file as follow:

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;  
&lt;web-app id=&quot;WebApp_ID&quot; version=&quot;2.4&quot;  
            xmlns=&quot;http://java.sun.com/xml/ns/j2ee&quot;  
            xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;  
            xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/j2ee  
                 http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd&quot;&gt;  
   &lt;display-name&gt;first steps servlet&lt;/display-name&gt;  

   &lt;!-- Restlet adapter --&gt;  
   &lt;servlet&gt;  
      &lt;servlet-name&gt;RestletServlet&lt;/servlet-name&gt;  
      &lt;servlet-class&gt;org.restlet.ext.servlet.ServerServlet&lt;/servlet-class&gt;
      &lt;init-param&gt;
            &lt;!-- Application class name --&gt;
            &lt;param-name&gt;org.restlet.application&lt;/param-name&gt;
            &lt;param-value&gt;firstSteps.FirstStepsApplication&lt;/param-value&gt;
      &lt;/init-param&gt;
   &lt;/servlet&gt;  

   &lt;!-- Catch all requests --&gt;  
   &lt;servlet-mapping&gt;  
      &lt;servlet-name&gt;RestletServlet&lt;/servlet-name&gt;  
      &lt;url-pattern&gt;/*&lt;/url-pattern&gt;  
   &lt;/servlet-mapping&gt;  
&lt;/web-app&gt;  
</code></pre>

Finally, package the whole as a WAR file called for example
"firstStepsServlet.war" and deploy it inside your Servlet container.
Once you have launched the Servlet container, open your favorite web
browser, and enter the following URL:

<pre class="language-bash"><code class="language-bash">http://&lt;your server name&gt;:&lt;its port number&gt;/firstStepsServlet/hello
</code></pre>

The server will happily welcome you with the expected "hello, world"
message. You can find the WAR file (packaged with archives taken from
Restlet Framework 2.0 Milestone 5) in the "First steps application"
files.

## <a name="run-as-a-standalone-java-application"></a>Run as a standalone Java application

A Restlet application cannot only run inside a Servlet container, but
can also be run as a standalone Java application using a single
"org.restlet.jar" JAR.

Create also a main class, copy/paste the following code wich aims at
defining a new HTTP server listening on port 8182 and delegating all
requests to the "FirstStepsApplication".

<pre class="language-java"><code class="language-java">public static void main(String[] args) throws Exception {  
    // Create a new Component.  
    Component component = new Component();  

    // Add a new HTTP server listening on port 8182.  
    component.getServers().add(Protocol.HTTP, 8182);  

    // Attach the sample application.  
    component.getDefaultHost().attach("/firstSteps",  
            new FirstStepsApplication());  

    // Start the component.  
    component.start();  
}      
</code></pre>

Once you have launched the main class, if you can open your favorite web
browser, and gently type the following URL:
http://localhost:8182/firstSteps/hello, the server will happily welcome
you with a nice "hello, world". Otherwise, make sure that the classpath
is correct and that no other program is currently using the port 8182.

You can find the sources of this sample application in the "First steps
application" files.

## <a name="conclusion"></a>Conclusion

We hope you that enjoyed these first steps and encourage you to check
[the equivalent page in the Java SE edition](../jse/overview "Restlet edition for Java SE")
for standalone deployments of the same application. This can also be a
convenient way to develop and test your Restlet application before
actually deploying it in a Java EE application server.

# Notes

-   Thanks to [Didier Girard](http://www.ongwt.com/)
    for suggesting this page.
