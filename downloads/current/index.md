---
title: Current Release
parent: Downloads
layout: homepage
---

{% include current_version_downloader.html %}


## Sample POM
Each Restlet Framework project needs at least one dependency: the Restlet core module and we assume that you will use Jackson for JSON support. As Restlet is now published into the Maven Central repository, just edit the pom.xml file for your project and add the following lines of text:

```xml
<properties>
  <restlet-version>{{ site.data.downloads.currentVersion.release }}</restlet-version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.restlet.java</groupId>
    <artifactId>org.restlet</artifactId>
    <version>${restlet-version}</version>
  </dependency>
  <dependency>
    <groupId>org.restlet.java</groupId>
    <artifactId>org.restlet.ext.jackson</artifactId>
    <version>${restlet-version}</version>
  </dependency>
</dependencies>
```

[Download Sample](/downloads/current/pom.xml) |
[More information](/documentation/user-guide/{{ site.default_doc_version }}/introduction/getting-started/maven/)
