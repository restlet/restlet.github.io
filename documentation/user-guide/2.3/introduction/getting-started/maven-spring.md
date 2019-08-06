---
title: Maven and Spring
long-title: Getting started with Maven and Spring
parent: Getting started
section: guide-introduction
version: '2.3'
nav_order: 3
---
# Overview

This document outlines how to integrate the Restlet Framework with Maven
and Spring. It is not a tutorial on using the Restlet Framework.

# Prerequisites

The reader should be familiar with [Maven](http://maven.apache.org/),
[Spring](http://www.springsource.org/) and the Restlet Framework since it
deals exclusively with integration
issues. To play along you will need to have a version of Maven installed
on your environment. The code in this document has been tested against
Maven 2.2.1.

# The Steps

## Step 1: Create a Maven Project

We can use the Maven '**archetype**' goal to quickly create a basic java
project structure. We define the name of the artifact and the group
(i.e. namespace) and the plugin will create a set of directories and
some skeleton java source files. We will delete the App and AppTest
source files since we will be creating our own classes.

<pre class="language-bash"><code class="language-bash">mvn archetype:create -DgroupId=com.mycompany.basecamp -DartifactId=restlet-basecamp

restlet-basecamp/
restlet-basecamp/pom.xml
restlet-basecamp/src
restlet-basecamp/src/main
restlet-basecamp/src/main/java
restlet-basecamp/src/main/java/com
restlet-basecamp/src/main/java/com/mycompany
restlet-basecamp/src/main/java/com/mycompany/restlet
restlet-basecamp/src/main/java/com/mycompany/restlet/basecamp
restlet-basecamp/src/main/java/com/mycompany/restlet/basecamp/App.java  
restlet-basecamp/src/test
restlet-basecamp/src/test/java
restlet-basecamp/src/test/java/com
restlet-basecamp/src/test/java/com/mycompany
restlet-basecamp/src/test/java/com/mycompany/restlet
restlet-basecamp/src/test/java/com/mycompany/restlet/basecamp
restlet-basecamp/src/test/java/com/mycompany/restlet/basecamp/AppTest.java
</code></pre>

## Step 2: Configure the POM

The pom.xml file generate from the previous step was for a 'jar'
project. We are creating a 'war' project so we will make significant
changes. The pom defines its dependency on some Restlet components, in
particular the Spring and Servlet extension packages.  It also defines
the Jetty plugin since we will be running this web service in an
embedded Jetty server.

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd&quot;&gt;
  &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
  &lt;groupId&gt;com.mycompany.restlet.basecamp&lt;/groupId&gt;
  &lt;artifactId&gt;restlet-basecamp&lt;/artifactId&gt;
  &lt;packaging&gt;war&lt;/packaging&gt;
  &lt;version&gt;1.5&lt;/version&gt;
  &lt;name&gt;Bootstrapping Restlet Project&lt;/name&gt;
  &lt;repositories&gt;
    &lt;repository&gt;
      &lt;id&gt;restlet&lt;/id&gt;
      &lt;url&gt;http://maven.restlet.com/&lt;/url&gt;
    &lt;/repository&gt;
  &lt;/repositories&gt;
  &lt;dependencies&gt;
    &lt;dependency&gt;
      &lt;groupId&gt;org.restlet.jee&lt;/groupId&gt;
      &lt;artifactId&gt;org.restlet&lt;/artifactId&gt;
      &lt;version&gt;2.0.1&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
      &lt;groupId&gt;org.restlet.jee&lt;/groupId&gt;
      &lt;artifactId&gt;org.restlet.ext.servlet&lt;/artifactId&gt;
      &lt;version&gt;2.0.1&lt;/version&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
      &lt;groupId&gt;org.restlet.jee&lt;/groupId&gt;
      &lt;artifactId&gt;org.restlet.ext.spring&lt;/artifactId&gt;
      &lt;version&gt;2.0.1&lt;/version&gt;
    &lt;/dependency&gt;
  &lt;/dependencies&gt;
  &lt;build&gt;
    &lt;finalName&gt;basecamp&lt;/finalName&gt;
    &lt;plugins&gt;
      &lt;plugin&gt;
        &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
        &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
        &lt;configuration&gt;
          &lt;source&gt;1.5&lt;/source&gt;
          &lt;target&gt;1.5&lt;/target&gt;
        &lt;/configuration&gt;
      &lt;/plugin&gt;
      &lt;plugin&gt;
        &lt;groupId&gt;org.mortbay.jetty&lt;/groupId&gt;
        &lt;artifactId&gt;maven-jetty-plugin&lt;/artifactId&gt;
        &lt;version&gt;6.1.25&lt;/version&gt;
        &lt;configuration&gt;
          &lt;contextPath&gt;${basecamp.server.contextpath}&lt;/contextPath&gt;
          &lt;scanIntervalSeconds&gt;10&lt;/scanIntervalSeconds&gt;
          &lt;webXml&gt;${project.build.directory}/${project.build.finalName}/WEB-INF/web.xml&lt;/webXml&gt;
        &lt;/configuration&gt;
      &lt;/plugin&gt;
    &lt;/plugins&gt;
  &lt;/build&gt;
  &lt;properties&gt;
    &lt;basecamp.server.contextpath&gt;basecamp&lt;/basecamp.server.contextpath&gt;
  &lt;/properties&gt;
&lt;/project&gt;
</code></pre>

## Step 3: Create the BaseCampResource

We will create the simplest of resources, called BaseCampResource, which
extends ServerResource and responds to the HTTP GET method. Note the use
of annotations, which is part of  the Restlet Framework.  For the
purpose of this document we will only define this simple resource.

<pre class="language-java"><code class="language-java">package com.mycompany.restlet.basecamp.resource.demo;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class BaseCampResource extends ServerResource {

    @Get
    public String getResource()  {
        return "Hello World!";
    }
}
</code></pre>

## Step 4: Create the BaseCampApplication

In this step we define our Restlet Application, namely
BaseCampApplication, which extends the core framework class. It's not
really required for this example but if you need to override base class
behaviour this is how you would go about it.

<pre class="language-java"><code class="language-java">package com.mycompany.restlet.basecamp.application;

import org.restlet.Application;

public class BaseCampApplication extends Application {
}
</code></pre>

## Step 5: Sprinkle Some Spring

The application context, is used by Spring, to create and start the
various components.

-   **basecampComponent** is the Spring wrapper, which is a core
    framework class. This class references our application
-   **basecampApplication** points to our application, which was
    developed in Step 4. It also reference the router, which determines
    how URLs are mapped to resource classes.
-   **router** is the default router, which is also part of the core
    framework
-   **'/hello'** is a reference to our resource class. Any bean name
    that starts with a forward slash ('/') is assumed to be a route to a
    resource and as such is registered with the router. In this example
    we only define one resource and one route.

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE beans PUBLIC &quot;-//SPRING//DTD BEAN 2.0//EN&quot; &quot;http://www.springframework.org/dtd/spring-beans-2.0.dtd&quot;&gt;
&lt;beans default-lazy-init=&quot;false&quot; default-autowire=&quot;no&quot; default-dependency-check=&quot;none&quot; default-merge=&quot;false&quot;&gt;
  &lt;bean id=&quot;basecampComponent&quot; class=&quot;org.restlet.ext.spring.SpringComponent&quot; lazy-init=&quot;default&quot; autowire=&quot;default&quot; dependency-check=&quot;default&quot;&gt;
    &lt;property name=&quot;defaultTarget&quot; ref=&quot;basecampAppliction&quot; /&gt;
  &lt;/bean&gt;
  &lt;bean id=&quot;basecampAppliction&quot; class=&quot;com.mycompany.restlet.basecamp.application.BaseCampApplication&quot; lazy-init=&quot;default&quot; autowire=&quot;default&quot; dependency-check=&quot;default&quot;&gt;
    &lt;property name=&quot;root&quot; ref=&quot;router&quot; /&gt;
  &lt;/bean&gt;
  &lt;!--  Define the router --&gt;
  &lt;bean name=&quot;router&quot; class=&quot;org.restlet.ext.spring.SpringBeanRouter&quot; lazy-init=&quot;default&quot; autowire=&quot;default&quot; dependency-check=&quot;default&quot; /&gt;
  &lt;!-- Define all the routes --&gt;
  &lt;bean name=&quot;/hello&quot; class=&quot;com.mycompany.restlet.basecamp.resource.demo.BaseCampResource&quot; scope=&quot;prototype&quot; autowire=&quot;byName&quot; lazy-init=&quot;default&quot; dependency-check=&quot;default&quot; /&gt;
&lt;/beans&gt;
</code></pre>

## Step 6: Set up the web.xml

Finally, we need to configure the web.xml, which is packaged in the war.
The important parts are the **context-param** entries. One points to the
the SpringComponent class instance in our application context and the
other points to the location of the application context file.

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;web-app xmlns=&quot;http://java.sun.com/xml/ns/j2ee&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; id=&quot;restlet-basecamp&quot; version=&quot;2.4&quot; xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd&quot;&gt;
  &lt;display-name&gt;Restlet Basecamp&lt;/display-name&gt;
  &lt;listener&gt;
    &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;
  &lt;/listener&gt;
  &lt;context-param&gt;
    &lt;param-name&gt;org.restlet.component&lt;/param-name&gt;
    &lt;param-value&gt;basecampComponent&lt;/param-value&gt;
  &lt;/context-param&gt;
  &lt;context-param&gt;
    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;
    &lt;param-value&gt;WEB-INF/applicationContext.xml&lt;/param-value&gt;
  &lt;/context-param&gt;
  &lt;servlet&gt;
    &lt;servlet-name&gt;basecamp&lt;/servlet-name&gt;
    &lt;servlet-class&gt;org.restlet.ext.spring.SpringServerServlet&lt;/servlet-class&gt;
    &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
  &lt;/servlet&gt;
  &lt;servlet-mapping&gt;
    &lt;servlet-name&gt;basecamp&lt;/servlet-name&gt;
    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;
  &lt;/servlet-mapping&gt;
&lt;/web-app&gt;
</code></pre>

## Step 7: Build It

To create the war file execute '**mvn package'** in your shell. The war
file will in the **target** subdirectory.

<pre class="language-bash"><code class="language-bash">jima:restlet-basecamp jima$ mvn package

[INFO] ------------------------------------------------------------------------
[INFO] Building Bootstrapping Restlet Project
[INFO]    task-segment: [package]
[INFO] ------------------------------------------------------------------------

[INFO] [resources:resources {execution: default-resources}]
[INFO] Copying 0 resource
[INFO] [compiler:compile {execution: default-compile}]
[INFO] Nothing to compile - all classes are up to date
[INFO] [resources:testResources {execution: default-testResources}]
[INFO] Copying 0 resource
[INFO] [compiler:testCompile {execution: default-testCompile}]
[INFO] Nothing to compile - all classes are up to date
[INFO] [surefire:test {execution: default-test}]
[INFO] Surefire report directory: /Users/jima/projects/restlet-basecamp/restlet-basecamp/target/surefire-reports

-------------------------------------------------------
 T E S T S
-------------------------------------------------------
There are no tests to run.

Results :

Tests run: 0, Failures: 0, Errors: 0, Skipped: 0

[INFO] [war:war {execution: default-war}]
[INFO] Packaging webapp
[INFO] Assembling webapp[restlet-basecamp] in [/Users/jima/projects/restlet-basecamp/restlet-basecamp/target/summer]
[INFO] Dependency[Dependency {groupId=org.restlet.jee, artifactId=org.restlet, version=2.0.1, type=jar}] has changed (was Dependency {groupId=org.restlet.jee, artifactId=org.restlet, version=2.0.1, type=jar}).
[INFO] Dependency[Dependency {groupId=org.restlet.jee, artifactId=org.restlet.ext.servlet, version=2.0.1, type=jar}] has changed (was Dependency {groupId=org.restlet.jee, artifactId=org.restlet.ext.servlet, version=2.0.1, type=jar}).
[INFO] Dependency[Dependency {groupId=org.restlet.jee, artifactId=org.restlet.ext.spring, version=2.0.1, type=jar}] has changed (was Dependency {groupId=org.restlet.jee, artifactId=org.restlet.ext.spring, version=2.0.1, type=jar}).
[INFO] Processing war project
[INFO] Copying webapp resources[/Users/jima/projects/restlet-basecamp/restlet-basecamp/src/main/webapp]
[INFO] Webapp assembled in[112 msecs]
[INFO] Building war: /Users/jima/projects/restlet-basecamp/restlet-basecamp/target/summer.war
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESSFUL
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4 seconds
[INFO] Finished at: Tue Nov 09 21:30:38 EST 2010
[INFO] Final Memory: 18M/81M
[INFO] ------------------------------------------------------------------------
</code></pre>

## Step 8: Run It

To run the web service in an embedded jetty server simple execute 
"**mvn jetty:run-war**" this will compile and package the war file and
then run it up inside a jetty servlet container. The web service will be
available on **localhost:8080** with a root context of '**/basecamp**'

<pre class="language-bash"><code class="language-bash">jima:restlet-basecamp jima$ mvn jetty:run-war

[INFO] [jetty:run-war {execution: default-cli}]
[INFO] Configuring Jetty for project: Bootstrapping Restlet Project
[INFO] Context path = /basecamp
[INFO] Tmp directory =  determined at runtime
[INFO] Web defaults = org/mortbay/jetty/webapp/webdefault.xml
[INFO] Web overrides =  none
[INFO] Starting jetty 6.1.25 ...
[INFO] Started Jetty Server
[INFO] Starting scanner at interval of 10 seconds.
</code></pre>

If you now go to your web browser and enter the following URL the
service, which you have just created, should respond with 'Hello World!'

  ![Web browser screenshot](images/basecamp-hello.png)


Accessing the resource via a browser

Finally, if you go back to the console, where you started the server you
should see some logging similar to what is displayed below

<pre class="language-bash"><code class="language-bash">    Nov 9, 2010 9:34:31 PM org.restlet.engine.log.LogFilter afterHandle
    INFO: 2010-11-09    21:34:31    0:0:0:0:0:0:0:1%0   -   0:0:0:0:0:0:0:1%0   8080    GET /basecamp/hello -   200 12  0   57  http://localhost:8080   Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-us) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5 -
</code></pre>

## Step 9: Deploy It

You can also deploy the web service to a standalone web server such as
[Apache Tomcat](http://tomcat.apache.org/)
using the [Tomcat Maven Plugin](http://tomcat.apache.org/maven-plugin.html).
Basically, you need to define the plugin in your pom.xml and call '**mvn
tomcat:deploy**' and '**mvn tomcat:undeploy**' to deploy and undeploy
the web service respectively.

An minimal configured tomcat maven plugin is shown below but you should
consult the documentation for the finer details.

<pre class="language-markup"><code class="language-markup">&lt;plugin&gt;
  &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
  &lt;artifactId&gt;tomcat-maven-plugin&lt;/artifactId&gt;
  &lt;configuration&gt;
    &lt;server&gt;${tomcat.server}&lt;/server&gt;
    &lt;url&gt;${tomcat.server.manager}&lt;/url&gt;
    &lt;warFile&gt;${project.build.directory}/${project.build.finalName}.war&lt;/warFile&gt;
    &lt;path&gt;${basecamp.server.contextpath}&lt;/path&gt;
  &lt;/configuration&gt;
&lt;/plugin&gt;
</code></pre>

# Resources

This archive contains all the source code described in this document.

[restlet-basecamp](/technical-resources/restlet-framework/archives/examples/maven-spring/${restlet-version-minor}/restlet-basecamp.zip "restlet-basecamp")
(application/zip, 8.4 kB)
