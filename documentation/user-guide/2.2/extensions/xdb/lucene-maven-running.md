---
title: Running and testing
long-title: XMLDB Restet Adapter/Lucene/Maven - Running/Testing
parent: XDB
section: guide-extensions
version: '2.2'
nav_order: 8
---
* Starting Jetty to debug these services outside OJVM


This Maven target provides a client side environment to test and debug REST WS without installing it inside the OJVM. Note that in this server side implementation of REST WS we are using a unique entry point to get the SQL connection, this connection when running outside the database use System's properties to get user, password and SQLNet connect string to connect to the target database.


```
[mochoa@mochoa lucene-restlet]$ mvn jetty:run
[INFO] Scanning for projects...
[INFO] Searching repository for plugin with prefix: 'jetty'.
[INFO]
----------------------------------------------------------------------------

[INFO] Building org.apache.lucene.ws
[INFO]    task-segment: [jetty:run]
[INFO]
----------------------------------------------------------------------------

[INFO] Preparing jetty:run
[INFO] [resources:resources]
.....

[INFO] Property db.str=test was set
[INFO] Property db.usr=LUCENE was set
[INFO] Property db.pwd=LUCENE was set

2008-06-19 09:21:03.559::INFO:  Logging to STDERR via org.mortbay.log.StdErrLog

[INFO] Context path = /
[INFO] Tmp directory =  determined at runtime
[INFO] Web defaults = org/mortbay/jetty/webapp/webdefault.xml
[INFO] Web overrides =  none
[INFO] Webapp directory = /home/mochoa/jdevhome/mywork/lucene-restlet/src/main/webapp
[INFO] Starting jetty 6.1.7 ...
2008-06-19 09:21:03.796::INFO:  jetty-6.1.7
2008-06-19 09:21:04.286::INFO:  No Transaction manager found - if your webapp
requires one, please configure one.
2008-06-19 09:21:05.171::INFO:  Started SelectChannelConnector@0.0.0.0:8088

[INFO] Started Jetty Server
[INFO] Starting scanner at interval of 10 seconds.
2008-06-19 09:24:08.039:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - The
ServerServlet address = null
2008-06-19 09:24:08.039:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - The
ServerServlet port = 8080
2008-06-19 09:24:08.039:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - The
ServerServlet endpoint = 1
2008-06-19 09:24:08.039:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - Try to
load 'org.restlet.attribute.application' parameter from
'/home/'||USER||'/restlet/UsersRestlet.xml
2008-06-19 09:24:11.584:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - Try to
load 'org.restlet.attribute.component' parameter from
'/home/'||USER||'/restlet/UsersRestlet.xml
2008-06-19 09:24:11.595:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - Try to
load 'org.restlet.component' parameter from
'/home/'||USER||'/restlet/UsersRestlet.xml
Jun 19, 2008 9:24:11 AM org.restlet.Connector <init>
WARNING: The connector has been instantiated without any protocol.
2008-06-19 09:24:11.808:/:INFO:  UsersRestlet: [Noelios Restlet Engine] - Try to
load 'org.restlet.attribute.server' parameter from
'/home/'||USER||'/restlet/UsersRestlet.xml
2008-06-19 09:24:11.818:/:INFO:  UsersRestlet: [Noelios Restlet Engine] -
Attaching application: org.apache.lucene.ws.LuceneApplication@5878d2 to URI:
/lucene
Jun 19, 2008 9:24:11 AM com.noelios.restlet.ext.xdb.XdbServletWarClientHelper
start
INFO: efective user is: __LUCENE__

Jun 19, 2008 9:24:12 AM com.noelios.restlet.LogFilter afterHandle
INFO: 2008-06-19        09:24:12        -        -        -       8080     GET     /lucene/         -       200      157     -        704     http://localhost:8088 -       -

```


Note that __LUCENE__ user is configured in pom.xml file, so it will passed to Jetty as System properties and used by XMLDB Restlet adapter as effective user. If you will try to test LuceneApplication using telnet scripts change LUCENE/LUCENE to scott/tiger into pom.xml file.


You can debug and test __LuceneApplication.java__ using Restlet default servlet engine starting it as a simple Java application, but this scenary will not test XMLDB Restlet stack.


* Testing with telnet


Directory src/main/scripts have several .txt file which includes HTTP content information to test Lucene REST WS API. For example to get all Lucene Domain Indexes at SCOTT's schema you can execute:



<pre><code class="language-bash">[mochoa@mochoa lucene-restlet]$ cat src/main/scripts/test_get_scott.txt
GET /lucene/ HTTP/1.0
Authorization: Basic c2NvdHQ6dGlnZXI=
Host: localhost:8080


[mochoa@mochoa lucene-restlet]$ telnet localhost 8080
Trying 127.0.0.1...
Connected to live.dbprism.mochoa.dyndns.org (127.0.0.1).
Escape character is '^]'.
GET /lucene/ HTTP/1.0
Authorization: Basic c2NvdHQ6dGlnZXI=
Host: localhost:8080


HTTP/1.1 200 OK
MS-Author-Via: DAV
DAV: 1,2,&lt;http://www.oracle.com/xdb/webdav/props&gt;
Date: Wed, 18 Jun 2008 23:08:06 GMT
Server: Noelios-Restlet-Engine/1.1.snapshot
Content-Type: application/atomsvc+xml; charset=ISO-8859-1
Vary: Accept-Charset, Accept-Encoding, Accept-Language, Accept
Content-Length: 330
Expires: Wed, 18 Jun 2008 23:08:16 GMT
</code>

<code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-1&quot;?&gt;
&lt;service xmlns=&quot;http://purl.org/atom/app#&quot;&gt;
   &lt;workspace title=&quot;Lucene Web Service&quot;&gt;
         &lt;collection href=&quot;SOURCE_BIG_LIDX/&quot; title=&quot;Index Name: SOURCE_BIG_LIDX status: VALID&quot;&gt;
              &lt;member-type&gt;entry&lt;/member-type&gt;
         &lt;/collection&gt;
   &lt;/workspace&gt;
&lt;/service&gt;
</code>

<code class="language-bash">Connection closed by foreign host.
</code>
</pre>


Note that the Authorization header have a B64 encoding information of scott:tiger user/password, if your database have different values it will not work. Also we are using XMLDB default HTTP port (8080). The example shows that scott have one Lucene Domain Index named __SOURCE_BIG_LIDX__. This index was created using a table and index creation SQL script like:


<pre class="language-sql"><code class="language-sql">SQL> create table test_source_big as (select * from all_source);


SQL&gt; create index source_big_lidx on test_source_big(text)
indextype is lucene.LuceneIndex
parameters('AutoTuneMemory:true;Analyzer:org.apache.lucene.analysis.StopAnalyzer;\

MergeFactor:500;FormatCols:line(0000);ExtraCols:line "line"');

</code></pre>


* Testing with JMeter plugin for Maven


Download and install [JMeter Maven Plugin](https://cwiki.apache.org/confluence/display/jmeter/JMeterMavenPlugin).
Install required libraries from JMeter distribution


<pre class="language-bash"><code class="language-bash">mvn install:install-file -DgroupId=org.apache.jmeter -DartifactId=jmeter -Dversion=2.2 -Dpackaging=jar -Dfile=/home/mochoa/Download/jmeter-2.2.jar -DpomFile=/home/mochoa/Download/jmeter-2.2.pom
mvn install:install-file -DgroupId=org.apache.jorphan -DartifactId=jorphan -Dversion=2.2 -Dpackaging=jar -Dfile=/usr/local/jakarta-jmeter-2.3.1/lib/jorphan.jar
mvn install:install-file -DgroupId=org.mozilla.javascript -DartifactId=javascript -Dversion=1.0 -Dpackaging=jar -Dfile=/usr/local/jakarta-jmeter-2.3.1/lib/js_rhino1_6R5.jar  
mvn install:install-file -DgroupId=jcharts -DartifactId=jcharts -Dversion=0.7.5 -Dpackaging=jar -Dfile=/usr/local/jakarta-jmeter-2.3.1/lib/jCharts-0.7.5.jar  

</code></pre>


pom.xml file modifications


<pre class="language-markup"><code class="language-markup">....
    &lt;dependency&gt;
      &lt;groupId&gt;org.apache.jmeter&lt;/groupId&gt;
      &lt;artifactId&gt;maven-jmeter-plugin&lt;/artifactId&gt;
      &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;/dependency&gt;
....
      &lt;plugin&gt;
        &lt;groupId&gt;org.apache.jmeter&lt;/groupId&gt;
        &lt;artifactId&gt;maven-jmeter-plugin&lt;/artifactId&gt;
        &lt;configuration&gt;
          &lt;includes&gt;
            &lt;include&gt;test_get_scott.jmx&lt;/include&gt;
          &lt;/includes&gt;
&lt;reportDir&gt;target/jmeter-reports&lt;/reportDir&gt;
        &lt;/configuration&gt;
      &lt;/plugin&gt;
....
</code></pre>


running


<pre class="language-bash"><code class="language-bash">mvn org.apache.jmeter:maven-jmeter-plugin:jmeter
</code></pre>


* Measuring performance using Apache JMeter


Using some of the JMeter templates at directory __src/test/____jmeter__ you can perform performance test of Lucene REST WS API over Lucene Domain Index.
