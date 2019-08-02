# Introduction

It is possible to declare client connectors when the application is
hosted on a Servlet container. The Javadocs of the Servlet adapter
([ServerServlet](javadocs://jee/ext/org/restlet/ext/servlet/ServerServlet.html)
class) answers this question and others related to the configuration of
Restlet based applications.

The web.xml file declares the client connectors in a dedicated
"org.restlet.clients" parameter:

<pre class="language-markup"><code class="language-markup">&lt;servlet&gt;
    &lt;servlet-name&gt;RestletAdapter&lt;/servlet-name&gt;
    [...]
    &lt;!-- List of supported client protocols (Optional - Only in mode 3) --&gt;
    &lt;init-param&gt;
        &lt;param-name&gt;org.restlet.clients&lt;/param-name&gt;
        &lt;param-value&gt;HTTP HTTPS FILE&lt;/param-value&gt;
    &lt;/init-param&gt;
    [...]
&lt;/servlet&gt;
</code></pre>
