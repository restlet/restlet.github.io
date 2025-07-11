---
title: Presentation layer
weight: 3
---
When compared to the Servlet API, the Restlet API doesn't have a sister
API like Java Server Pages (JSP). Instead we made the design choice to
be equally open to all presentation technologies. This openess is
materialized in the Representation class which is used for response
entities. 

More concretely, we provide integrations with three popular template
technologies : XSLT, Apache FreeMarker, Apache Velocity and Thymeleaf.

The design idea of those extensions is to use a TemplateRepresentation
that combines at generation time a data model with a template document.
