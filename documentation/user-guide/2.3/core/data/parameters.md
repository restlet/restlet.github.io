---
title: Parameters
parent: Data package
section: guide-code
version: '2.3'
nav_order: 1
---
# Getting parameter values

This is a common need to retrieve data, especially "key=value" pairs from the query, the entity, or the cookies. Here are some sample lines of code which illustrate this feature.

## Getting values from a web form

The web form is in fact the entity of the POST request sent to the
server, thus you have access to it via request.getEntity().
 There is a shortcut which allows to have a list of all input fields:

 <pre class="language-java"><code class="language-java">    Form form = new Form(request.getEntity())
    for (Parameter parameter : form) {
        System.out.print("parameter " + parameter.getName());
        System.out.println("/" + parameter.getValue());
    }
</code></pre>

## Getting values from a query

The query is a part of the identifier (the URI) of the request resource. Thus, you have access to it via request.getResourceRef().getQuery(). There is a shortcut which allows to have a list of all "key=value" pairs:

<pre class="language-java"><code class="language-java">Form form = request.getResourceRef().getQueryAsForm();
for (Parameter parameter : form) {
    System.out.print("parameter " + parameter.getName());
    System.out.println("/" + parameter.getValue());
}
</code></pre>

## Getting values from the cookies

Cookies are directly available from the request via the request.getCookies() method. It returns a collection of "Cookie" objects which extends the Parameter class and contains additional attributes:

<pre class="language-java"><code class="language-java">for (Cookie cookie : request.getCookies()) {
    System.out.println("name = " + cookie.getName());
    System.out.println("value = " + cookie.getValue());
    System.out.println("domain = " + cookie.getDomain());
    System.out.println("path = " + cookie.getPath());
    System.out.println("version = " + cookie.getVersion());
}
</code></pre>