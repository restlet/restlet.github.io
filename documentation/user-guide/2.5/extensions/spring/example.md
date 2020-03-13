---
title: A complete example
long-title: Spring extension - A complete example
parent: Spring
section: guide-extensions
version: '2.5'
nav_order: 3
---
# Introduction

This example is a Spring-enabled but otherwise functionally equivalent
version of the [bookmarks
example](http://examples.oreilly.com/9780596529260/)
from chapter 7 of [RESTful Web
Services](http://www.oreilly.com/catalog/9780596529260/)
by Richardson and Ruby. The complete code for this version is available
through CVS from :pserver:anonymous@cvs.cs.luc.edu:/root/laufer/433,
module BookmarksRestletSpring. Project dependencies are managed using
[Apache
Maven](http://maven.apache.org/),
and the example illustrates standalone and servlet-container deployment.

In a nutshell, Spring handles the configuration of the top-level Restlet
Component and Router beans. The Restlet Resources had to be modified to
support the init method and the injection of the dependency on the
[db4o](http://supportservices.actian.com/versant/default.html)
ObjectContainer, which is also configured in Spring. As expected, the
domain objects User and Bookmark remained unchanged.

# Description

First, we show the configuration of the Restlet Component and top-level
Router beans. The top-level Router is necessary only if an non-root
context path is required for standalone deployment.

<pre class="language-markup"><code class="language-markup">&lt;bean id=&quot;top&quot; class=&quot;org.restlet.ext.spring.SpringComponent&quot;&gt;
    &lt;property name=&quot;server&quot;&gt;
        &lt;bean class=&quot;org.restlet.ext.spring.SpringServer&quot;&gt;
            &lt;constructor-arg value=&quot;http&quot; /&gt;
            &lt;constructor-arg value=&quot;3000&quot; /&gt;
        &lt;/bean&gt;
    &lt;/property&gt;
    &lt;property name=&quot;defaultTarget&quot; ref=&quot;default&quot; /&gt;
&lt;/bean&gt;

&lt;bean id=&quot;default&quot; class=&quot;org.restlet.ext.spring.SpringRouter&quot;&gt;
    &lt;property name=&quot;attachments&quot;&gt;
        &lt;map&gt;
            &lt;entry key=&quot;/v1&quot; value-ref=&quot;root&quot; /&gt;
        &lt;/map&gt;
    &lt;/property&gt;
&lt;/bean&gt;
</code></pre>

As a result, the main method has become very simple. It loads a Spring
context based on two configuration metadata files, one for the preceding
top-level beans, and one for the application-specific beans shown below.
It then starts up the top-level Restlet Component.

<pre class="language-java"><code class="language-java">    public static void main(String... args) throws Exception {
    // load the Spring application context
    ApplicationContext springContext = new ClassPathXmlApplicationContext(
        new String[] { "applicationContext-router.xml", "applicationContext-server.xml" });

    // obtain the Restlet component from the Spring context and start it
    ((Component) springContext.getBean("top")).start();
    }
</code></pre>

Next, we look at the configuration of the application-specific Router.
We use a SpringRouter for this purpose, which is configured using a map
of URI patterns to resources. The SpringFinder beans provide the extra
level of indirection required to create Resource instances lazily on a
per-request basis.

In this example, the last URI pattern has to be customized to accept
complete URIs (possibly including slashes) as the last component of the
pattern. We use Spring's nested properties to drill into the
configuration of the URI pattern along with Spring's mechanism for
accessing a static field in a class.

<pre class="language-markup"><code class="language-markup">&lt;bean id=&quot;root&quot; class=&quot;org.restlet.ext.spring.SpringRouter&quot;&gt;
    &lt;property name=&quot;attachments&quot;&gt;
        &lt;map&gt;
            &lt;entry key=&quot;/users/{username}&quot;&gt;
                &lt;bean class=&quot;org.restlet.ext.spring.SpringFinder&quot;&gt;
                    &lt;lookup-method name=&quot;create&quot;
                        bean=&quot;userResource&quot; /&gt;
                &lt;/bean&gt;
            &lt;/entry&gt;
            &lt;entry key=&quot;/users/{username}/bookmarks&quot;&gt;
                &lt;bean class=&quot;org.restlet.ext.spring.SpringFinder&quot;&gt;
                    &lt;lookup-method name=&quot;create&quot;
                        bean=&quot;bookmarksResource&quot; /&gt;
                &lt;/bean&gt;
            &lt;/entry&gt;
            &lt;entry key=&quot;/users/{username}/bookmarks/{URI}&quot;&gt;
                &lt;bean class=&quot;org.restlet.ext.spring.SpringFinder&quot;&gt;
                    &lt;lookup-method name=&quot;create&quot;
                        bean=&quot;bookmarkResource&quot; /&gt;
                &lt;/bean&gt;
            &lt;/entry&gt;
        &lt;/map&gt;
    &lt;/property&gt;
    &lt;property name=&quot;routes[2].template.variables[URI]&quot;&gt;
        &lt;bean class=&quot;org.restlet.util.Variable&quot;&gt;
            &lt;constructor-arg ref=&quot;org.restlet.util.Variable.TYPE_URI_ALL&quot; /&gt;
        &lt;/bean&gt;
    &lt;/property&gt;
&lt;/bean&gt;

&lt;bean id=&quot;org.restlet.util.Variable.TYPE_URI_ALL&quot;
    class=&quot;org.springframework.beans.factory.config.FieldRetrievingFactoryBean&quot; /&gt;
</code></pre>

Unlike the preceding singleton beans, we define the ServerResources as
prototype beans so that they get instantiated separately for each
request. All of the Resource beans depend on the
[db4o](http://supportservices.actian.com/versant/default.html)
ObjectContainer and are configured analogously, so we show only
UserResource here.

<pre class="language-markup"><code class="language-markup">&lt;bean id=&quot;userResource&quot;
    class=&quot;org.restlet.example.book.rest.ch7.spring.UserResource&quot;
    scope=&quot;prototype&quot;&gt;
    &lt;property name=&quot;container&quot; ref=&quot;db4oContainer&quot; /&gt;
&lt;/bean&gt;
</code></pre>

Using the
[db4o](http://supportservices.actian.com/versant/default.html)
[Spring Module](http://community.versant.com/Projects/html/projectspaces/db4o-spring.html),
configuring the ObjectContainer is straightforward.

<pre class="language-markup"><code class="language-markup">&lt;bean id=&quot;db4oContainer&quot;
    class=&quot;org.springmodules.db4o.ObjectContainerFactoryBean&quot;&gt;
    &lt;property name=&quot;configuration&quot; ref=&quot;db4oConfiguration&quot; /&gt;
    &lt;property name=&quot;databaseFile&quot; value=&quot;file://${user.home}/restbook.dbo&quot; /&gt;
&lt;/bean&gt;

&lt;bean id=&quot;db4oConfiguration&quot;
    class=&quot;org.springmodules.db4o.ConfigurationFactoryBean&quot;&gt;
    &lt;property name=&quot;updateDepth&quot; value=&quot;2&quot; /&gt;
    &lt;property name=&quot;configurationCreationMode&quot; value=&quot;NEW&quot; /&gt;
&lt;/bean&gt;
</code></pre>

As mentioned above, we added the following elements to each
application-specific Resource:

-   An empty default constructor.
-   An init method containing the code originally in the non-default
    constructor. That constructor now simply invokes the init method,
    although it is no longer used in this context.
-   An instance variable and getter/setter pair for the db4o
    ObjectContainer.

The following code fragment summarizes these changes.

<pre class="language-java"><code class="language-java">public class UserResource extends ServerResource {

    private ObjectContainer container;

    // other instance variables

    public UserResource() { }

    @Override
    public void init(Context context, Request request, Response response) {
        super.init(context, request, response);
        // code originally in non-default constructor
    }

    public UserResource(Context context, Request request, Response response) {
        super(context, request, response);
        init(context, request, response);
    }

    public ObjectContainer getContainer() {
        return container;
    }

    public void setContainer(ObjectContainer container) {
        this.container = container;
    }

    // other methods
}
</code></pre>
