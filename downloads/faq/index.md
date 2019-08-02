---
title: FAQ
parent: Download
---
**What are the differences between stable, testing and unstable releases?**

The Restlet Framework is available under three versions, tagged like Debian releases]:

- "Stable" is the release that we recommend for applications in production. The API of this release is frozen and only bug fixes are made. You can download this version from the “Current release” tab above.

- "Testing" is the release that we recommend for new developments. We are looking for feedback and contributions regarding bugs and missing features. You will find it in the “Other releases” tab above, select the most recent Branch and either a “M” (Milestone) or “RC” (Release Candidate”) Release.

- "Unstable" is the release where active development happens. It corresponds to builds of the development trunk passing all unit tests. You will find it in the “Other releases” tab above, select the most recent Branch and the “Snapshot” Release.

**Which editions of Restlet Framework are available and what are their specificities?**

The following editions of Restlet Framework are available for download:

- Java Standard Edition: this edition is aimed for development and deployment of applications inside a regular Java virtual machine using the internal HTTP server of the Restlet Engine, or a pluggable one such as Jetty.

- Java Enterprise Edition: this edition is aimed for development and deployment of applications inside Java EE application server, or more precisely inside Servlet containers such as Apache Tomcat.

- Google App Engine: due to the restrictions of the GAE, we need to provide an adaptation of Restlet for this environment. GAE is based on Java 6, with a restricted list of APIs.

- Android: this edition is a port of the Restlet Framework to the Android mobile OS.

- Google Web Toolkit: this edition is a client-side port of the Restlet Framework to GWT 2.2 and above releases.

- OSGi Environments: this edition is dedicated to OSGi environments such as Eclipse Equinox and Apache Felix and makes space for OSGi specific features in the framework. It is only recommended if you intend to develop OSGi applications.

More details are available in the [user guide](/documentation/user-guide/{{ site.default_doc_version }}).

**Is there a complete documentation available for Restlet Framework?**

Of course! Please visit the [User guide](/documentation/user-guide/{{ site.default_doc_version }}) in the Technical Resources section of this website. You can also check out [Tutorials](/documentation/tutorials/{{ site.default_doc_version }}) or access the Javadocs.
