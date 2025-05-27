---
title: Serve static files
section: tutorials
version: '2.4'
nav_order: 5
---
Do you have a part of your web application that serves static pages like
Javadocs? Well, no need to setup an Apache server just for that, use
instead the dedicated Directory class. See how simple it is to use it:

<pre class="language-java"><code class="language-java">// URI of the root directory.
public static final String ROOT_URI = "file:///c:/restlet/docs/api/";

[...]

// Create a component
Component component = new Component();
component.getServers().add(Protocol.HTTP, 8182);
component.getClients().add(Protocol.FILE);

// Create an application
Application application = new Application() {
    @Override
    public Restlet createInboundRoot() {
            return new Directory(getContext(), ROOT_URI);
    }
};

// Attach the application to the component and start it
component.getDefaultHost().attach(application);
component.start();
</code></pre>

In order to run this example, you need to specify a valid value for
ROOT\_URI, In this case, it is set to "file:///c:/restlet/docs/api/".
Note that no additional configuration is needed. If you want to
customize the mapping between file extensions and metadata (media type,
language or encoding) or if you want to specify a different index name,
you can use the Application's
["metadataService"]({{ site.data.javadoc.preMavenCentral.baseUrl }}{{ page.version }}/jse/api/org/restlet/service/MetadataService.html)
property.
