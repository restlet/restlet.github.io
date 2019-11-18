---
title: Google App Engine
long-title: Restlet edition for Google App Engine
section: guide-editions
version: '2.4'
nav_order: 2
---
# Introduction

Google provides a Java version of his App Engine solution (GAE). It is a
PaaS (Platform as a Service) solution that offers massive and flexible
scalability for your Web applications by hosting them on the Google
cloud (based on Google computing infrastructure). For more details, you
can read [our blog
post](http://blog.restlet.com/2009/04/11/restlet-in-the-cloud-with-google-app-engine/)
with the official announce.

Due to the restrictions of the GAE, we need to provide an adaptation of
Restlet for this environment. GAE is based on Java 6, with a restricted
list of APIs. See [GAE developers
documentation](https://developers.google.com/appengine/)
for details.

Modules availables:

-   Restlet core (API + Engine)
-   Restlet extension - Javamail (SMTP client)
-   Restlet extension - Net (HTTP and HTTPS client)
-   Restlet extension - Servlet (HTTP and HTTPS server)
-   Restlet extension - XML (DOM, SAX and XPath)

# Usage example

Create a new GAE project with the Eclipse plugin provided, add the
"org.restlet.jar" and the "org.restlet.ext.servlet.jar" files from the
[latest Restlet snapshots](/downloads/current?distribution=zip&release=unstable&edition=gae)(make
sure you download the edition for GAE) to your "/war/WEB-INF/lib/"
directory and to your project build path.

Here is the Restlet resource to create:

<pre class="language-java"><code class="language-java">package firstSteps;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

/**
 * Resource which has only one representation.
 *
 */
public class HelloWorldResource extends ServerResource {

    @Get
    public String represent() {
        return "hello, world (from the cloud!)";
    }

}
</code></pre>

Now here is the parent application:

<pre class="language-java"><code class="language-java">package firstSteps;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class FirstStepsApplication extends Application {

    /**
     * Creates a root Restlet that will receive all incoming calls.
     */
    @Override
    public Restlet createInboundRoot() {
        // Create a router Restlet that routes each call to a
        // new instance of HelloWorldResource.
        Router router = new Router(getContext());

        // Defines only one route
        router.attachDefault(HelloWorldResource.class);

        return router;
    }
}
</code></pre>

Finally, here is the Servlet configuration file:

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;!DOCTYPE web-app PUBLIC
 &quot;-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN&quot;
 &quot;http://java.sun.com/dtd/web-app_2_3.dtd&quot;&gt;

&lt;web-app xmlns=&quot;http://java.sun.com/xml/ns/javaee&quot; version=&quot;2.5&quot;&gt;
         &lt;display-name&gt;first steps servlet&lt;/display-name&gt;

         &lt;servlet&gt;
                 &lt;servlet-name&gt;RestletServlet&lt;/servlet-name&gt;
                 &lt;servlet-class&gt;org.restlet.ext.servlet.ServerServlet&lt;/servlet-class&gt;
                 &lt;init-param&gt;
                         &lt;param-name&gt;org.restlet.application&lt;/param-name&gt;
                         &lt;param-value&gt;firstSteps.FirstStepsApplication  &lt;/param-value&gt;
                 &lt;/init-param&gt;
         &lt;/servlet&gt;

    &lt;!-- Catch all requests --&gt;
    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;RestletServlet&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/*&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;
&lt;/web-app&gt;
</code></pre>

For more information on Restlet, please check our [documentation
pages]({{ site.data.javadoc.baseUrl }}{{ page.version }}/jse/index.html).

# Javadocs

The Javadocs of the Restlet edition for GAE are available online as
well:

-   [Restlet
    API]({{ site.data.javadoc.baseUrl }}{{ page.version }}/gae/api/index.html)
-   [Restlet
    Extensions]({{ site.data.javadoc.baseUrl }}{{ page.version }}/gae/ext/index.html)
-   [Restlet
    Engine]({{ site.data.javadoc.baseUrl }}{{ page.version }}/gae/engine/index.html)
