---
title: Current Release
parent: Downloads
layout: homepage
---

Starting from release 2.5, the Restlet Framework is available from Maven Central repository.

## Sample POM for version 2.5
Each Restlet Framework project needs at least one dependency: the Restlet core module, and we assume that you will use Jackson for JSON support. As Restlet is now published into the Maven Central repository, just edit the pom.xml file for your project and add the following lines of text. For the GWT edition, just use "org.restlet.gwt" for the groupId instead of "org.restlet":

```xml
<properties>
  <restlet-version>2.5.1</restlet-version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.restlet</groupId>
    <artifactId>org.restlet</artifactId>
    <version>${restlet-version}</version>
  </dependency>
  <dependency>
    <groupId>org.restlet</groupId>
    <artifactId>org.restlet.ext.jackson</artifactId>
    <version>${restlet-version}</version>
  </dependency>
</dependencies>
```

[Download Sample](/downloads/current/pom.xml) |
[More information](/documentation/user-guide/{{ site.default_doc_version }}/introduction/getting-started/maven)
