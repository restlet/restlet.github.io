---
title: FAQ
long-title: Oracle XDB Restlet Adapter - FAQ
parent: XDB
section: guide-extensions
version: '2.2'
nav_order: 4
---
* Where Restlet logging information goes?

__Restlet__ framework and __XMLDB Restlet Adapter__ uses __JDK__ logging package, by default logging information goes to $ORACLE_BASE/diag/rdbms/$SID/$SID/trace directory.
Due __REST WS__ are started by a background process automatically controlled by Oracle database logging information is at files named $SID_snnn_pid.trc, for example:


```bash
-bash-3.2$ more test_s000_10388.trc
Trace file /u01/app/oracle/diag/rdbms/test/test/trace/test_s000_10388.trc
Oracle Database 11g Release 11.1.0.6.0 - Production
ORACLE_HOME = /u01/app/oracle/product/11.1.0.6.0/db_1
System name:    Linux
Node name:      mochoa.exa.unicen.edu.ar
Release:        2.6.22.19-laptop-2mdv
Version:        #1 SMP Mon May 5 21:03:49 EDT 2008
Machine:        i686
Instance name: test
Redo thread mounted by this instance: 1
Oracle process number: 17
Unix process pid: 10388, image: oracle@mochoa.exa.unicen.edu.ar (S000)


*** 2008-06-04 15:28:23.018
*** SESSION ID:(140.49) 2008-06-04 15:28:23.018
*** CLIENT ID:() 2008-06-04 15:28:23.018
*** SERVICE NAME:(SYS$USERS) 2008-06-04 15:28:23.018
*** MODULE NAME:() 2008-06-04 15:28:23.018
*** ACTION NAME:() 2008-06-04 15:28:23.018


jox_call_xdb_class_ c_state 0


*** 2008-06-04 15:28:23.018
jox_call_xdb_class_ argvec[0] 0 argvec[1] 0


*** 2008-06-04 15:28:23.715
UsersRestlet: init
UsersRestlet: [Restlet Engine] - The ServerServlet address = null
UsersRestlet: [Restlet Engine] - The ServerServlet port = 8080
UsersRestlet: [Restlet Engine] - The ServerServlet endpoint = 1
UsersRestlet: [Restlet Engine] - Try to load 'org.restlet.attribute.application'
parameter from '/home/'||USER||'/restlet/UsersRestlet
.xml


*** 2008-06-04 15:28:25.580
UsersRestlet: [Restlet Engine] - Try to load 'org.restlet.attribute.component' parameter from '/home/'||USER||'/restlet/UsersRestlet.xml
UsersRestlet: [Restlet Engine] - Try to load 'org.restlet.component' parameter from '/home/'||USER||'/restlet/UsersRestlet.xml


*** 2008-06-04 15:28:27.089
Jun 4, 2008 6:28:26 PM org.restlet.Connector <init>
WARNING: The connector has been instantiated without any protocol.
UsersRestlet: [Restlet Engine] - Try to load 'org.restlet.application' parameter
from '/home/'||USER||'/restlet/UsersRestlet.xml
UsersRestlet: [Restlet Engine] - Schema: RESTLET class:
RESTLET:org.restlet.example.tutorial.Part12 loader: class oracle.aurora.rdbms.

DbmsJava
UsersRestlet: [Restlet Engine] - Try to load 'org.restlet.attribute.server'
parameter from '/home/'||USER||'/restlet/UsersRestlet.xml
UsersRestlet: [Restlet Engine] - Attaching application:
org.restlet.example.tutorial.Part12@8b9e5a01 to URI: /userapp
Jun 4, 2008 6:28:27 PM org.restlet.engine.http.HttpServerCall parseHost
INFO: Couldn't find the mandatory "Host" HTTP header.
Jun 4, 2008 6:28:27 PM org.restlet.ext.xdb.XdbServletWarClientHelper start
INFO: efective user is: ANONYMOUS


*** 2008-06-04 15:28:27.588
Jun 4, 2008 6:28:27 PM org.restlet.engine.application.LogFilter afterHandle

INFO: 2008-06-04
18:28:27
-
-
-       8080
GET
/userapp/users/scott/orders/300 -
200     28
-    155
http://null
-       -
```


* How many concurrent session are started by Oracle?


As mentioned in previous answer the Oracle JVM session which receives the request is automatically started by Oracle, how many concurrent sessions are started by Oracle Listener is automatically computed by Oracle and you don't care about it. My testing shows that for heavy workload there is around 5 to 7 % of concurrent request.


* Which is the effective Oracle user when run a REST WS?


It depends on the HTTP authorization mechanism.

__REST WS__ which are available as anonymous access, no HTTP authorization information, runs with ANONYMOUS Oracle user and PUBLIC database role.
__REST WS__ which are authorized though HTTP header __Authorization __are executed with his effective Oracle user, for example SCOTT.


* How to enable anonymous REST WS?


First unlock ANONYMOUS Oracle account. By default __XMLDB Restlet Adapter__ do this command at __postInstall.sql__ script


<pre class="language-sql"><code class="language-sql">SQL> alter user anonymous account unlock;
</code></pre>


Then you have to register your __Restlet__ application into __XMLDB__ configuration file (named /xdbconfig.xml) with this __Servlet__ role:


<pre class="language-markup"><code class="language-markup">&lt;servlet xmlns=&quot;http://xmlns.oracle.com/xdb/xdbconfig.xsd&quot;&gt;
&Tab;&lt;servlet-name&gt;UsersRestlet&lt;/servlet-name&gt;
&Tab;&lt;servlet-language&gt;Java&lt;/servlet-language&gt;
&Tab;&lt;display-name&gt;Restlet Servlet&lt;/display-name&gt;
&Tab;&lt;servlet-class&gt;org.restlet.ext.xdb.XdbServerServlet&lt;/servlet-class&gt;
&Tab;&lt;servlet-schema&gt;PUBLIC&lt;/servlet-schema&gt;
&Tab;&lt;init-param xmlns=&quot;http://xmlns.oracle.com/xdb/xdbconfig.xsd&quot;&gt;
&Tab;&Tab;&lt;param-name&gt;org.restlet.application&lt;/param-name&gt;
&Tab;&Tab;&lt;param-value&gt;RESTLET:org.restlet.example.tutorial.Part12&lt;/param-value&gt;
&Tab;&Tab;&lt;description&gt;REST User Application&lt;/description&gt;
&Tab;&lt;/init-param&gt;
&Tab;&lt;security-role-ref xmlns=&quot;http://xmlns.oracle.com/xdb/xdbconfig.xsd&quot;&gt;
&Tab;&Tab;&lt;description /&gt;
&Tab;&Tab;&lt;role-name&gt;PUBLIC&lt;/role-name&gt;
&Tab;&Tab;&lt;role-link&gt;PUBLIC&lt;/role-link&gt;
&Tab;&lt;/security-role-ref&gt;
&lt;/servlet&gt;
</code></pre>


Above registration can be done by a following PLSQL script executed logged as SYS:


<pre class="language-bash"><code class="language-bash">DECLARE
  configxml SYS.XMLType;
begin
  dbms_xdb.deleteServletMapping(&apos;UsersRestlet&apos;);
  dbms_xdb.deleteServlet(&apos;UsersRestlet&apos;);
  dbms_xdb.addServlet(name=&gt;&apos;UsersRestlet&apos;,

 language=&gt;&apos;Java&apos;,

class=&gt;&apos;org.restlet.ext.xdb.XdbServerServlet&apos;,

 dispname=&gt;&apos;Restlet
Servlet&apos;,schema=&gt;&apos;PUBLIC&apos;);
  -- Modify the configuration
  -- Due this servlet provide public access, it can not load
  -- &apos;/home/&apos;||USER||&apos;/restlet/UsersRestlet.xml&apos; from XMLDB repository
  SELECT
INSERTCHILDXML(xdburitype(&apos;/xdbconfig.xml&apos;).getXML(),&apos;/xdbconfig/sysconfig/protocolconfig/httpconfig/webappconfig/servletconfig/servlet-list/servlet[servlet-name=&quot;UsersRestlet&quot;]&apos;,&apos;init-param&apos;,

  XMLType(&apos;&lt;init-param xmlns=&quot;http://xmlns.oracle.com/xdb/xdbconfig.xsd&quot;&gt;
 &lt;param-name&gt;org.restlet.application&lt;/param-name&gt;
 &lt;param-value&gt;RESTLET:org.restlet.example.tutorial.Part12&lt;/param-value&gt;
 &lt;description&gt;REST User Application&lt;/description&gt;
 &lt;/init-param&gt;&apos;),&apos;xmlns=&quot;http://xmlns.oracle.com/xdb/xdbconfig.xsd&quot;&apos;) INTO
configxml
  FROM DUAL;
  -- Update the configuration to use the modified version
  --I got this error at this line :
  dbms_xdb.cfg_update(configxml);
  dbms_xdb.addServletSecRole(SERVNAME =&gt; &apos;UsersRestlet&apos;,ROLENAME =&gt;
&apos;PUBLIC&apos;,ROLELINK =&gt; &apos;PUBLIC&apos;);
  dbms_xdb.addServletMapping(&apos;/userapp/*&apos;,&apos;UsersRestlet&apos;);
  commit;
end;
/
commit;
</code></pre>


For more information on how to register a __Servlet__ with anonymous access read
[Using Protocols to Access the Repository](http://download.oracle.com/docs/cd/B28359_01/appdev.111/b28369/xdb22pro.htm#CHDHAGBF).


* How can I define my Application in XdbServerServlet?

XMLDB do not accept context parameters so unlike __org____.restlet.ext.servlet.ServerServlet__ class, __XdbServerServlet__ have two way to define __org.restlet.application parameter__.
First option was used in previous examples, it means using __Servlet 2.2 <init-param>__ tag, this is very useful for anonymous __REST__ applications.
For authenticated applications there is another option which is to put an XML file at XMLDB repository using this predefined path:


<pre class="language-bash"><code class="language-bash">/home/[USER]/wars/[appName]/WEB-INF/restlet.xml
</code></pre>


for example, `/home/__SCOTT__/wars/__DirectoryExample__/WEB-INF/restlet.xml` where __USER__ is the effective connected user name, for example `SCOTT`, and `appName` is the Servlet name; __name__ argument in __dbms_xdb.addServlet__ procedure used for registering Servlet in __XMLDB__, in above example is __DirectoryExample__.


This file look like:


<pre class="language-markup"><code class="language-markup">&lt;component&gt;
    &lt;defaultHost&gt;
         &lt;attach uriPattern=&quot;/root/&quot; targetClass=&quot;org.restlet.test.xdb.DirectoryApplication&quot;/&gt;
    &lt;/defaultHost&gt;
    &lt;statusService enabled=&quot;true&quot; contactEmail=&quot;mochoa@ieee.org&quot;/&gt;
&lt;/component&gt;
</code></pre>


Second option do not require __DBA__ role if you want to update your application class name, for a complete explanation of [restlet.xml](/documentation/schemas/{{ page.version }}/Component.xsd) file syntax look at [Component java documentation]({{ site.data.javadoc.preMavenCentral.baseUrl }}{{ page.version }}/jse/api/org/restlet/Component.html).


* How can I run XDB Restlet adapter behind a proxy?

If you want to use Apache mod_proxy behind Oracle XMLDB Restlet adapter for security reason or to exploit caching support follow this example configuration:



<pre class="language-bash"><code class="language-bash">&lt;IfModule mod_proxy.c&gt;

    # &lt;Proxy&gt; - Container for directives affecting resources located in
the proxied location
    &lt;Proxy *&gt;
        Order deny,allow
        Allow from all
    #    Allow from .your-domain.com
    &lt;/Proxy&gt;
    ProxyRequests On
    ProxyVia On
    ProxyPreserveHost On
    SetEnv proxy-nokeepalive 1
    ProxyPass / http://localhost:8080/
&lt;/IfModule&gt;
</code></pre>

Above configuration, usually in __/etc/httpd/modules.d/30_mod_proxy.conf__, will forward all request to `http://localhost:80/` to `http://localhost:8080/` assuming that your Oracle listener is in the same host as Apache.
If you want to configure Apache mod_cache to speed GET request which have expiration Date header, for example, follow this configuration:


<pre class="language-bash"><code class="language-bash">&lt;IfModule mod_cache.c&gt;
    CacheEnable mem /userapp
    CacheEnable mem /orawsv
    CacheEnable mem /ds
&lt;/IfModule&gt;
</code></pre>

This configuration will enable Apache mod_mem_cache on directories __/ds__ __/oraws__ and __/userapp__.
