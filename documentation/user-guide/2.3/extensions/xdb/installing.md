---
title: Installing
long-title: Oracle XDB Restlet Adapter - Installing
parent: XDB
section: guide-extensions
version: '2.3'
nav_order: 2
---
First edit into your home directory a file named build.properties with:


<pre class="language-bash"><code class="language-bash"># Restlet project
# xdb_11.1 specific
sqlnet.string=test
jdbc.username=RESTLET
jdbc.password=RESTLET
jdbc.sysusr=sys
jdbc.syspwd=change_on_install
</code></pre>

 - `sqlnet.string` property is a valid Oracle __SQLNet__ connect string to the target database.
 - `jdbc.{username|password}` are a valid Oracle user name and password to be created for storing Restlet code. Note that in Oracle 11g user name and password are case sensitive by default, so use always uppercase values to work well with the __.sql__ script provided in this installer.
 - `jdbc.{sysusr|syspwd}` are a valid OracleDBA User account used to create above user schema and other related task only performed by user who have DBA role.

Also is necessary a valid __ORACLE_HOME__ environment variable defined to a valid Oracle 11g home directory, this variable then is used to locate for example the __SQLPlus__ application.

Second create a sub-directory into Restlet __library__ directory named __oracle.xdb_11.1__, put into this new directory these Oracle libraries:


<pre class="language-bash"><code class="language-bash">$ORACLE_HOME/jdbc/lib/ojdbc5.jar
$ORACLE_HOME/rdbms/jlib/xdb.jar
$ORACLE_HOME/lib/xmlparserv2.jar

</code></pre>


edit a a file named __library.xml__ into above directory with this content.


<pre class="language-markup"><code class="language-markup">&lt;library id=&quot;xdb&quot;&gt;
  &lt;package name=&quot;oracle.xdb&quot; /&gt;
  &lt;version&gt;11.1&lt;/version&gt;
  &lt;release&gt;1&lt;/release&gt;
  &lt;distributions&gt;
    &lt;distribution id=&quot;classic&quot; /&gt;
  &lt;/distributions&gt;
  &lt;homeUri&gt;
   &lt;a href=&quot;http://www.oracle.com/technology/tech/xml/xmldb/index.html&quot;&gt;http://www.oracle.com/technology/tech/xml/xmldb/index.html&lt;/a&gt;
  &lt;/homeUri&gt;
&lt;/library&gt;
</code></pre>


edit another new file named __build.properties__ into above directory with:


<pre class="language-bash"><code class="language-bash">bin.includes = META-INF/,\
 ojdbc5.jar,\
 xdb.jar,\
 xmlparserv2.jar
</code></pre>

then edit the file __pom.xml__ into __modules__ directory of Restlet sources addind a new line in section __properties__ with:


<pre class="language-markup"><code class="language-markup">&lt;lib-xdb-version&gt;11.1.1&lt;/lib-xdb-version&gt;
</code></pre>


To compile Restlet sources and generate all Maven artifacts and Restlet libraries go to __build__ directory and execute __ant__ without arguments.
Finally go the directory:


<pre class="language-bash"><code class="language-bash"># cd build/temp/jee/dist/classic/restlet-jee-2.1snapshot/src/org.restlet.ext.xdb_11.1/resources
</code></pre>

and execute __Ant__ without argument:

<pre class="language-bash"><code class="language-bash"># ant
</code></pre>


To start using XDB Adapter __ant__ without arguments is the only target required in a fresh database install. Other targets are provided during development stage, for example if you update the adapter code only the target __load-server-side-runtime__ is required to re-install it.


** Enabling your __XMLDB HTTP__ support


Oracle databases do not enable by default XMLDB HTTP repository access. To enable it using SQLPlus connected as SYSDBA execute:


<pre class="language-sql"><code class="language-sql">SQL&gt; exec dbms_xdb.sethttpport(8080);
</code></pre>

Restart your database and test with a browser or any WebDAV enable file manager a connection to http://localhost:8080/
