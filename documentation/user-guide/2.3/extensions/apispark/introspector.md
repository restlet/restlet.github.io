---
title: introspector
long-title: APISpark extension Introspector
parent: APISpark
section: guide-extensions
version: '2.3'
nav_order: 1
---
# Introduction

The Introspector tool is made to import the contract of your Web API in the <a href="https://apispark.restlet.com/" target="_blank">APISpark</a> full-stack PaaS for web APIs.

It will allow you to:

-   Introspect your Restlet-based or JAX-RS Web API or parse a Swagger definition to retrieve its description
-   Display and edit this description within APISpark
-   Synchronize Web API changes initiated from your API's code or Swagger

In these scenarios we'll leverage the Introspector tool by loading a Web API definition into APISpark with the three types of inputs available. You can find a complete example of documentation generated via this tool [here](https://apispark.restlet.com/apis/1427/versions/1/overview/), the description fields weren't retrieved from the Restlet Framework code, they were added manually in APISpark.

# Launch process

In a first example, we will document a Restlet-based Web API. Users have to point the Introspector to the class extending org.restlet.Application. Here, the Application class in our code is org.restlet.api.MyContacts.

<pre class="language-bash"><code class="language-bash">java -cp "/path/to/your/lib/*" org.restlet.ext.apispark.Introspector -u 55955e02-0e99-47f8 -p 6f3ee88e-8405-44c8 org.restlet.api.MyContacts
</code></pre>

Then we will document an API based on its Swagger definition.

<pre class="language-bash"><code class="language-bash">java -cp "/path/to/your/lib/*" org.restlet.ext.apispark.Introspector -u 55955e02-0e99-47f8 -p 6f3ee88e-8405-44c8 -l swagger http://petstore.swagger.io/api/api-docs
</code></pre>

And finish with a JAX-RS API.

<pre class="language-bash"><code class="language-bash">java -cp "/path/to/your/lib/*" org.restlet.ext.apispark.Introspector -u 55955e02-0e99-47f8 -p 6f3ee88e-8405-44c8 org.jaxrs.api.MyContacts
</code></pre>

__Note:__ For the JAX-RS introspection to work, users have to point the Introspector to a class extending javax.ws.rs.core.Application and listing all the JAX-RS annotated classes as follows:

<pre class="language-java"><code class="language-java">package org.coenraets.directory;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.core.Application;

public class MyContacts extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(EmployeeResource.class);
        return classes;
    }
}
</code></pre>

Whether you use this class to run your Web API or not, you must create it to run the Introspector.

## Configuration

### Using maven

You can use the following pom.xml to get the dependencies required for the Introspector. The pom is available [here](http://maven.restlet.com/org/restlet/jse/org.restlet.ext.apispark/2.3.1/org.restlet.ext.apispark-2.3.1.pom).

* In a terminal, run : "mvn install"
(* To use it in eclipse, run in your terminal : "mvn eclipse:eclipse")
* Run the main class : org.restlet.ext.apispark.Introspector

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
&Tab;xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd&quot;&gt;
&Tab;&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
&Tab;&lt;parent&gt;
&Tab;&Tab;&lt;groupId&gt;org.restlet.jse&lt;/groupId&gt;
&Tab;&Tab;&lt;artifactId&gt;org.restlet.parent&lt;/artifactId&gt;
&Tab;&Tab;&lt;version&gt;2.3.1&lt;/version&gt;
&Tab;&lt;/parent&gt;

&Tab;&lt;artifactId&gt;org.restlet.ext.apispark&lt;/artifactId&gt;
&Tab;&lt;name&gt;Restlet Extension - APISpark&lt;/name&gt;
&Tab;&lt;description&gt;Integration with APISpark cloud platform, by Restlet.&lt;/description&gt;

&Tab;&lt;dependencies&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;com.google.guava&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;guava&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;16.0.1&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;javax.ws.rs&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;javax.ws.rs-api&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;2.0&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;org.raml&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;raml-parser&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;0.8.7&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;com.wordnik&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;swagger-annotations&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;1.3.10&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;org.restlet.jse&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;org.restlet.lib.swagger-models&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;1.5.0-SNAPSHOT&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;org.raml&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;raml-parser&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;0.8.7&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;org.restlet.jse&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;org.restlet&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;2.3.1&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&Tab;&lt;dependency&gt;
&Tab;&Tab;&Tab;&lt;groupId&gt;org.restlet.jse&lt;/groupId&gt;
&Tab;&Tab;&Tab;&lt;artifactId&gt;org.restlet.ext.jackson&lt;/artifactId&gt;
&Tab;&Tab;&Tab;&lt;version&gt;2.3.1&lt;/version&gt;

&Tab;&Tab;&lt;/dependency&gt;
&Tab;&lt;/dependencies&gt;
&lt;/project&gt;
</code></pre>

### Manually


You must add the following jars (provided in
[Restlet Framework](http://restlet.com/downloads/current#release=stable&edition=jse&distribution=zip
"download restlet framework"))
in the "/path/to/your/lib" folder or manually to the classpath.

In Restlet Framework lib directory:

-   org.restlet.jar (Restlet API)
-   org.restlet.ext.apispark.jar (Restlet APISpark extension with Introspector class)
-   org.restlet.ext.jackson.jar (Restlet Jackson extension)
-   org.restlet.ext.xml (Restlet XML extension in Restlet framework lib directory)


In Restlet Framework lib/com.fasterxml.jackson_2.4/ directory:

-   com.fasterxml.jackson.annotations.jar
-   com.fasterxml.jackson.core.jar
-   com.fasterxml.jackson.csv.jar
-   com.fasterxml.jackson.databind.jar
-   com.fasterxml.jackson.smile.jar
-   com.fasterxml.jackson.xml.jar
-   com.fasterxml.jackson.yaml.jar

Your packaged Web API:

-   org.restlet.api.jar org.jaxrs.api.jar (your packaged Web API)


## APISpark tokens

The parameters -u and -p are mandatory, they correspond to your APISpark user name and secret key. You can get those [here](https://apispark.restlet.com/account/overview) under the **My account** tab in the **Tokens** secion. You will need to <a href="https://apispark.restlet.com/signin" target="_blank">sign up</a> first.

![apispark tokens](images/apispark-tokens.jpg)

## Load Web API definition into APISpark (first call)

Here is the result, we get from the Introspector:

<pre class="language-ini"><code class="language-ini">Your Web API descriptor's id is: 123456
Your Web API documentation is accessible at this URL: https://apispark.restlet.com/apis/123456/versions/1/overview
</code></pre>

![Descriptor in APISpark](images/descriptor-in-apispark.jpg "Descriptor in APISpark")

## Update your Web API definition (Subsequent calls)


You need to add a parameter -d giving the id of the definition, hosted on APISpark, that you want to update. You can find the parameter -d in two ways.

-   It will be in the response body when you first use the extension on your API.
-   If you did not write it down then you can go to your dashboard, click on the Web API Contract you want to update and get it from the URL. The URL should look like this: https://apispark.restlet.com/apis/[definition_id]/version/1/


## Debug the Web API introspection

If you want the introspector to display information about the web API definition, you can add the -v parameter to the command line. It will switch the application to a verbose mode.

## More about the Introspector Tool

The Restlet extension for APISpark provides a source code introspector that takes a class (your Restlet class extending the class Application) from your Web API as a parameter and instantiates its components to retrieve the contract of your API.

Here is its commande line help:

<pre class="language-bash"><code class="language-bash">
SYNOPSIS
       org.restlet.ext.apispark.Introspector [credentials] [actions] [options] [--language
       swagger SWAGGER_DEFINITION_URL_OR_PATH | APPLICATION]

DESCRIPTION
       Publish to the APISpark platform the description of your Web API, represented by
       APPLICATION, the full name of your Restlet or JAX-RS application class or by the Swagger
       definition available at URL/PATH
       If the whole process is successful, it displays the url of the corresponding descriptor or
       connector cell.

EXAMPLES
       org.restlet.ext.apispark.Introspector -u 1234 -p Xy12 --create-descriptor
       com.acme.Application
       org.restlet.ext.apispark.Introspector -u 1234 -p Xy12 --new-version --id 60
       com.acme.Application
       org.restlet.ext.apispark.Introspector -u 1234 -p Xy12 --update --update-strategy replace
       --id 60 --version 1 --language swagger http://acme.com/api/swagger

OPTIONS
       -h, --helpPrints this help.

       [credentials]
       -u, --username username
              The mandatory APISpark user name.
       -p, --password password
              The mandatory APISpark user secret key.

       [actions]
       -d, --create-descriptor
              Creates a new descriptor from introspection.
       -c, --create-connector
              Creates a new connector from introspection.
       -n, --new-version
              Creates a new version of the descriptor/connector identified by the -i (--id) option
       -U, --update
              Updates the cell descriptor/connector specified by the -i (--id) and -v (--version)
              options.
              Use the default update strategy (update) except if -S (--update-strategy) option is
              specified.

       [options]
       -i, --id cellId
              The identifier of an existing cell hosted by APISpark you want to update with this
              new documentation.
              Required if -n (--new-version) or -U (--update) options are specified.
       -v, --version cellVersion
              The version of the cell to be updated.
              Required if -U (--update) option is specified.
       -s, --update-strategy strategy
              Specifies the update strategy.
              Available strategies:
              - update: (default) new objects will be added to the APISpark's descriptor/connector,
              primitive fields of existing objects will be updated. Nothing will be deleted.
              - replace: deletes all the information in the descriptor/connector on APISpark's
              and fills it again with introspected definition.
       --component componentClass
              The optional full name of your Restlet Component class. This allows to collect some
              other data, such as the endpoint.
       -l, --language languageName
              The optional name of the description language of the definition you want to upload.
              Possible value:
              - swagger: Swagger 1.2 specification.
       --sections
              Set section of introspected resources from java package name.
       -v, --verbose
              The optional parameter switching the process to a verbose mode.
       --application-name name
              The optional parameter overriding the name of the API.
       --endpoint endpoint
              The optional parameter overriding the endpoint of the API.
       --jaxrs-resources resourcesClasses
              The optional parameter providing the list of fully qualified classes separated by a
              comma that should be introspected. Example:
              com.example.MyResource,com.example.MyResource2.
              Replaces javax.ws.rs.core.Application#getClasses.

ENHANCE INTROSPECTION
       You can extend the basic introspection and enrich the generated documentation by providing
       dedicated helpers to the introspector.
       By default, swagger annotation are supported.
       Introspection use the Java Service Loader system.
       To add a new helper, create a
       'META-INF/services/org.restlet.ext.apispark.internal.introspection.IntrospectionHelper' file
       with the name of your implementation class.
</code></pre>
