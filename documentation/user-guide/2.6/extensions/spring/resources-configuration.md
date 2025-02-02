---
title: Configuration of Restlet resources
long-title: Spring extension - Configuration of Restlet resources
parent: Spring
section: guide-extensions
version: '2.6'
nav_order: 4
---
# Configuration of basic properties

Restlet resources support only limited configuration beyond injecting
custom dependencies such as the ObjectContainer in the example above. To
make specific ServerResource classes more reusable, it would be helpful
if their basic properties could be configured through Spring:

-   available
-   modifiable
-   negotiateContent
-   readable

Currently, the init method resets these properties to their default
values but, in the Spring component life cycle, is invoked after Spring
sets the properties. An obvious workaround is to refine the init method
like so:

<pre class="language-java"><code class="language-java">    @Override
    public void init(Context context, Request request, Response response) {
        final ResourcePropertyHolder backup = new ResourcePropertyHolder(); 
        BeanUtils.copyProperties(this, backup);
        super.init(context, request, response);
        BeanUtils.copyProperties(backup, this);
    }
</code></pre>

# Configuration of representation templates

In addition, it would be quite useful if one could map media types to
representation templates in Spring. In the following example, we explore
this idea further by mapping different media types to different
Freemarker and JSON representation factories. Whenever a Resource
creates a concrete representation, it passes a uniform data model to the
representation factory, which then instantiates the template with the
data model and returns the resulting representation. (The Freemarker
configuration is also handled by Spring.)

<pre class="language-markup"><code class="language-markup">&lt;bean id=&quot;resource&quot; class=&quot;helloworldrestlet.HelloWorldResource&quot;
    scope=&quot;prototype&quot;&gt;
    &lt;property name=&quot;available&quot; value=&quot;true&quot; /&gt;
    &lt;property name=&quot;representationTemplates&quot;&gt;
        &lt;map&gt;
            &lt;entry key-ref=&quot;org.restlet.data.MediaType.TEXT_PLAIN&quot;
                value-ref=&quot;hwFreemarkerTextPlain&quot; /&gt;
            &lt;entry key-ref=&quot;org.restlet.data.MediaType.TEXT_HTML&quot;
                value-ref=&quot;hwFreemarkerTextHtml&quot; /&gt;
            &lt;entry key-ref=&quot;org.restlet.data.MediaType.APPLICATION_JSON&quot;
                value-ref=&quot;jsonRepresentationFactory&quot; /&gt;
        &lt;/map&gt;
    &lt;/property&gt;
&lt;/bean&gt;

&lt;bean id=&quot;hwFreemarkerTextPlain&quot;
    class=&quot;edu.luc.etl.restlet.spring.FreemarkerRepresentationFactory&quot;&gt;
    &lt;property name=&quot;templateName&quot; value=&quot;hw-plain.ftl&quot; /&gt;
    &lt;property name=&quot;freemarkerConfig&quot; ref=&quot;freemarkerConfig&quot; /&gt;
&lt;/bean&gt;

&lt;bean id=&quot;hwFreemarkerTextHtml&quot;
    class=&quot;edu.luc.etl.restlet.spring.FreemarkerRepresentationFactory&quot;&gt;
    &lt;property name=&quot;templateName&quot; value=&quot;hw-html.ftl&quot; /&gt;
    &lt;property name=&quot;freemarkerConfig&quot; ref=&quot;freemarkerConfig&quot; /&gt;
&lt;/bean&gt;

&lt;bean id=&quot;jsonRepresentationFactory&quot;
    class=&quot;edu.luc.etl.restlet.spring.JsonRepresentationFactory&quot; /&gt;

&lt;!-- omitted beans for specific MediaType static fields --&gt;

&lt;bean id=&quot;freemarkerConfig&quot;
    class=&quot;freemarker.template.Configuration&quot;&gt;
    &lt;property name=&quot;directoryForTemplateLoading&quot;
        value=&quot;src/test/resources/presentation&quot; /&gt;
    &lt;property name=&quot;objectWrapper&quot;&gt;
        &lt;bean class=&quot;freemarker.template.DefaultObjectWrapper&quot; /&gt;
    &lt;/property&gt;
&lt;/bean&gt;
</code></pre>

When using this approach, the ServerResources themselves become very
simple, for example:

<pre class="language-java"><code class="language-java">public class HelloWorldResource extends ConfigurableRestletResource {
    @Override
    public Representation get(Variant variant) {
    Map&lt;String, Object&gt; dataModel = Collections.singletonMap("DATE", (Object) new Date());
    return createTemplateRepresentation(variant.getMediaType(), dataModel);
    }
}
</code></pre>

A working proof-of-concept for this approach is available through
Git at
[https://github.com/LoyolaChicagoCode/configurableresource-restlet-java](https://github.com/LoyolaChicagoCode/configurableresource-restlet-java).
Support for the missing configuration of representations tied to
responses to non-GET requests is in the works.
