---
title: Setup
long-title: Setting up a project
parent: Google Web Toolkit
section: guide-editions
version: '2.2'
nav_order: 6
---
# Client-side configuration

To use Restlet on the client side of your GWT application:

​1) Create an application
[normally](http://code.google.com/webtoolkit/gettingstarted.html)
with the applicationCreator and/or projectCreator scripts supplied with
GWT, or using your favorite GWT design or IDE plugins.

​2) Add the Restlet JAR (org.restlet.jar) from the Restlet edition for
GWT to the project classpath *^[explain]^*

​3) Add the following to your application's module definition file
(*yourapp*.gwt.xml):

<pre class="language-markup"><code class="language-markup">    &lt;inherits name=&apos;org.restlet.Restlet&apos;/&gt;
</code></pre>

This will make the Restlet API available to your GWT compiled code.  The
Restlet module in turn inherits the GWT standard
[HTTP](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/http/client/package-summary.html).
Two Restlet extensions are also provided based on
the [JSON](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/json/client/package-summary.html),
and
[XML](http://google-web-toolkit.googlecode.com/svn/javadoc/2.0/com/google/gwt/xml/client/package-summary.html)
modules. You can also check the [full Javadocs of the API
online]({{ site.data.javadoc.preMavenCentral.baseUrl }}{{ page.version }}/gwt/api/index.html).

# Server-side configuration

If you would like to use Restlet on the server-side as well, you must
also modify GWT's `web.xml` file in the `war/WEB-INF` directory. 

​1) Add the org.restlet.jar, org.restlet.ext.servlet.jar and
org.restlet.ext.gwt.jar files from the Restlet edition for Java EE to
the project classpath. **The last file is necessary for the automatic
bean serialization to work**. Also, be sure to add any other Restlet
extension JARs necessary for extensions you plan to use on the server
side.

​2) Modify the web.xml:

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;web-app&gt;
    &lt;servlet&gt;
        &lt;servlet-name&gt;restlet&lt;/servlet-name&gt;
        &lt;servlet-class&gt;org.restlet.ext.servlet.ServerServlet&lt;/servlet-class&gt;
        &lt;init-param&gt;
          &lt;param-name&gt;org.restlet.application&lt;/param-name&gt;
          &lt;param-value&gt;application&lt;/param-value&gt;
        &lt;/init-param&gt;
    &lt;/servlet&gt;

    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;restlet&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/rest/*&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;

         ...
&lt;/web-app&gt;
</code></pre>

For *application*, supply the name of your Restlet Application, e.g.
`com.mycompany.server.TestApplication`.  You can also supply a
*component* via an `org.restlet.component` parameter, or any other
permitted ServerServlet configuration parameter.
