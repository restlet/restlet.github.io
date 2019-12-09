---
title: Current Release
parent: Downloads
layout: homepage
---

{% include current_version_downloader.html %}


The Maven repository for Restlet is accessible from {{ site.data.maven.baseUrl }} and contains all Restlet JARs and third party dependencies that aren’t available in the main public Maven repository. It is automatically refreshed once a day if the build succeeds.

## Sample POM
Each Restlet Framework project needs at least one dependency: the Restlet core module and we assume that you will use Jackson for JSON support. You also need to configure your Maven client to point to the dedicated Restlet repository. Just open and edit the pom.xml file for your project and add the following lines of text:

```xml
<repositories>
  <repository>
    <id>maven-restlet</id>
    <name>Restlet repository</name>
    <url>{{ site.data.maven.baseUrl }}</url>
  </repository>
</repositories>

<properties>
  <restlet-version>{{ site.data.downloads.currentVersion.release }}</restlet-version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.restlet.jse</groupId>
    <artifactId>org.restlet</artifactId>
    <version>${restlet-version}</version>
  </dependency>
  <dependency>
    <groupId>org.restlet.jse</groupId>
    <artifactId>org.restlet.ext.jackson</artifactId>
    <version>${restlet-version}</version>
  </dependency>
</dependencies>
```

[Download Sample](/downloads/current/pom.xml) |
[More information](/documentation/user-guide/{{ site.default_doc_version }}/introduction/getting-started/maven)
