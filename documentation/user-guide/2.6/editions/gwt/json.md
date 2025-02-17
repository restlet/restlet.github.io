---
title: JSON
long-title: Working with JSON
parent: Google Web Toolkit
section: guide-editions
version: '2.6'
nav_order: 4
---
# Description

The GWTedition contains a JSON extension that provides a
org.restlet.client.ext.json.JsonRepresentation class that you can
leverage to either parse a JSON representation received or to serialize
a JSON value.

Prior to leverage this extension, ensure to update your `module.gwt.xml` configuration file with the following instruction:

<pre class="language-markup"><code class="language-markup">&lt;inherits name=&quot;org.restlet.JSON&quot; /&gt;
</code></pre>

Here is a sample code taken from the example application. The
JsonRepresentation gives access to the underlying JSONValue after the
representation has been parsed.

<pre class="language-java"><code class="language-java">ClientResource r = new ClientResource("/test");

// Set the callback object invoked when the response is received.
r.setOnResponse(new Uniform() {
    public void handle(Request request, Response response) {
        // Get the representation as an JsonRepresentation
        JsonRepresentation rep = new JsonRepresentation(response.getEntity());

        // Displays the properties and values.
        try {
            JSONObject object = rep.getValue().isObject();
            if (object != null) {
                for (String key : object.keySet()) {
                    jsonRoot.addItem(key + ":" + object.get(key));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
});

// Indicates the client preferences and let the server handle
// the best representation with content negotiation.
r.get(MediaType.APPLICATION_JSON);
</code></pre>
