# Passing the parent context

One frequent issue that developers encounter when configuring their
Restlet beans with Spring XML is that it is not easy to find a way to
pass the Context instance to the Restlet subclasses such as Application,
Directory or Router. What we actually need to do is to extract the
context property from the parent Restlet (typically a Component or an
Application) and pass it by reference to the constructor method.

Spring provides two mechanism to achieve this: either using the
PropertyPathFactoryBean class to create a context bean such as:

<pre class="language-markup"><code class="language-markup">&lt;!-- Restlet Component bean --&gt;
&lt;bean id=&quot;component&quot; class=&quot;org.restlet.ext.spring.SpringComponent&quot;&gt;
    ...
&lt;/bean&gt;

&lt;!-- Component&apos;s Context bean --&gt;
&lt;bean id=&quot;component.context&quot; class=&quot;org.springframework.beans.factory.config.PropertyPathFactoryBean&quot;/&gt;

&lt;!-- Application bean --&gt;
&lt;bean id=&quot;application&quot; class=&quot;org.restlet.Application&quot;&gt;
    &lt;constructor-arg ref=&quot;component.context&quot; /&gt;
    ...
&lt;/bean&gt;
</code></pre>

The second mechanism is based on the Spring utilities schema and is
actually more compact:

<pre class="language-markup"><code class="language-markup">&lt;!-- Restlet Component bean --&gt;
&lt;bean id=&quot;component&quot; class=&quot;org.restlet.ext.spring.SpringComponent&quot;&gt;
    ...
&lt;/bean&gt;

&lt;!-- Application bean --&gt;
    &lt;constructor-arg&gt;
        &lt;util:property-path path=&quot;component.context&quot; /&gt;
    &lt;/constructor-arg&gt;
    ...
&lt;/bean&gt;
</code></pre>

You also have to make sure that the util namespace is properly declared
in your XML configuration header. Here is a snippet for Spring 2.5:

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;
       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
       xmlns:util=&quot;http://www.springframework.org/schema/util&quot;
       xsi:schemaLocation=&quot;
http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-2.5.xsd&quot;&gt;

&lt;!-- Add you &lt;bean/&gt; definitions here --&gt;

&lt;/beans&gt;
</code></pre>

This utilities mechanism is quite powerful and flexible, for more
information [check this
page](http://static.springframework.org/spring/docs/2.5.x/reference/xsd-config.html#xsd-config-body-schemas-util-property-path).
