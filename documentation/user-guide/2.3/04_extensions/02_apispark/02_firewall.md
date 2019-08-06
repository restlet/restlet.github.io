# Introduction

This service integrated in the APISpark extension adds rate limitation to your web API.

# Configuration

## Using Maven

Add the following dependency in your pom.xml :

<pre class="language-markup"><code class="language-markup">&lt;dependency&gt;
&Tab;&Tab;&lt;groupId&gt;org.restlet.jse&lt;/groupId&gt;
&Tab;&Tab;&lt;artifactId&gt;org.restlet.ext.apispark&lt;/artifactId&gt;
&Tab;&Tab;&lt;version&gt;2.3.4&lt;/version&gt;
&lt;/dependency&gt;
</code></pre>

## Manually

You must add the following jars (provided in
[Restlet Framework](http://restlet.com/downloads/current#release=stable&edition=jse&distribution=zip) in the "/path/to/your/lib" folder or manually to the classpath.

* 	org.restlet.jar (Restlet core)
* 	org.restlet.ext.apispark.jar (Restlet APISpark extension with firewall)
*	com.google.guava_16.0
*	javax.ws.rs_2.0

# Usage example

We will document first the simplest way to configure the firewall, then the way that gives your more control.

## Apispark service

The firewall is available via a service that you can add to the list of supported services of your Application.
This allows to protect an entire application, or, if set on the Component, it protects the entire set of Applications of the Component.

Here is a way to add such service in the constuctor of an Application:

<pre class="language-java"><code class="language-java">public MyApplication() {
    ApiSparkService apiSparkService = new ApiSparkService();
    apiSparkService.setFirewallEnabled(true);

    FirewallConfig firewallConfig = apiSparkService.getFirewallConfig();

    // Create a periodic rate limitation rule with a period of 60 seconds and a limit of 10 calls per IP address.
    firewallConfig.addIpAddressesPeriodicCounter(60, TimeUnit.SECONDS, 10);

    // Create a concurrent rate limitation rule with a limit of 10 calls per IP address.
    firewallConfig.addIpAddressesConcurrencyCounter(10);

    getServices().add(apiSparkService);
}
</code></pre>

As you may have noticed above, the list of supported firewall rules are set using a FirewallConfig object. We will give more details about configuration later.

## Firewall filter

Behind the scene, the ApiSparkService relies on a filter.
Using this filter gives more controls:

* protect a specific set of URLs
* add firewall rules based on roles.

To use the firewall filter, first create an instance of FirewallFilter

<pre class="language-java"><code class="language-java">List<FirewallRule> rules  = new ArrayList<>();

    FirewallFilter firewallFilter = new FirewallFilter(getContext(), rules);
    FirewallConfig firewallConfig = new FirewallConfig(rules);
</code></pre>

# Firewall configuration

Then, on your firewall you can add multiple rules using the FirewallConfig object. For now, these rules are rate limiters.
There are two kinds of rate limiters :

* Concurrent rate limiter : Limits the number of concurrent requests.
* Periodic rate limiter : Limits the number of requests on a given period.

The list of all pre-defined rules is available from the [Javadocs](/documentation/javadocs/{{ page.version }}/jse/ext/org/restlet/ext/apispark/FirewallConfig.html)

Here are sample factories to create a Firewall rule (located in class FirewallConfig).

* Create a periodic rate limiter, with users identified by their identifier (after authentication), a limit depending on their role and a default limit (for non authenticated users or for users without a role)  

<pre class="language-java"><code class="language-java">// Create a map that associates roles with limits.  
    Map<String, Integer> limitsPerRole = new HashMap<String, Integer>();

    // Associate the role "owner" to a limit of 100 requests.  
    limitsPerRole.put("owner", 100);

    // Associate the role "user" to a limit of 10 requests.  
    limitsPerRole.put("user", 10);

    // Create a periodic rate limitation rule with a period of 60 seconds, the defined limits per role and a default limit of 5 requests.  
    firewallConfig.addRolesPeriodicCounter(60, TimeUnit.SECONDS, limitsPerRole, 5);
</code></pre>

* Create a periodic rate limiter, with users identified by their identifier (after authentication), a limit depending on their role and without a default limit (set by default at O)

<pre class="language-java"><code class="language-java">// Create a period rate limitation rule with a period of 60 seconds, the defined limits per role (defined in the example above).  
firewallConfig.addRolesPeriodicCounter(60, limitsPerRole);
</code></pre>

* Create a periodic rate limiter, with users identified by their IP address. Same limit for all.  

<pre class="language-java"><code class="language-java">// Create a periodic rate limitation rule with a period of 60 seconds and a limit of 10 calls per IP address.
firewallConfig.addIpAddressesPeriodicCounter(60, TimeUnit.SECONDS, 10)
</code></pre>

* Create a concurrent rate limiter, with users identified by their identifier (after authentication) and with a limit depending on their role and a default limit (for non authenticated users or for users without a role)  

<pre class="language-java"><code class="language-java">// Create a map which will associate roles with limits.  
Map<String, Integer> limitsPerRole = new HashMap<String, Integer>();

// Associate the role "owner" to a limit of 10 requests.  
limitsPerRole.put("owner", 10);

// Associate the role "user" to a limit of 5 requests.  
limitsPerRole.put("user", 5);

// Create a period rate limitation rule the defined limits per role and a default limit of 2 requests.  
firewallConfig.addRolesConcurrencyCounter(limitsPerRole, 2);
</code></pre>

* Create a concurrent rate limiter, with users identified by their identifier (after authentication) and with a limit depending on their role and without a default limit (set by default at O)  

<pre class="language-java"><code class="language-java">// Create a period rate limitation rule the defined limits per role.  
firewallConfig.addRolesConcurrencyCounter(limitsPerRole);
</code></pre>

* Create a concurrent rate limiter, with users identified by their IP address. Same limit for all.

<pre class="language-java"><code class="language-java">// Create a concurrent rate limitation rule with a limit of 10 calls per IP address.
firewallConfig.addIpAddressesConcurrencyCounter(10)
</code></pre>

# Go further

It is also possible to customize the use of the Rate Limitation rules.

A Rate limitation rule is associated to several objects :

* A CountingPolicy which gives an identifier to the request. Here are the existing Counting Policies (it's also possible to implement your own CountingPolicy):  
    * IpAddressCountingPolicy : The identifier is the IP Address of the client.  
    * UserCountingPolicy : The identifier is the identifier of the client (given by the ChallengeAuthenticator).  

* A (or several) ThresholdHandler which make a action when a limit is reached.
  * A ThresholdHandler owns a LimitPolicy. This LimitPolicy associates an identifier (defined in the CountingPolicy) to a limit. Here are the existing Limit Policies (it's also possible to implement your own LimitPolicy):
    * RoleLimitPolicy : Associates the role of the client to a limit.
    * UniqueLimitPolicy : Attributes the same Limit Policy for all requests.
  * There are also different implementation of ThresholdHandler :
    * BlockingHandler : Returns a 429 response (Too many requests) when the limit is reached.
    * RateLimitationHandler : Returns a 429 response (Too many requests) when the limit is reached and adds some "Rate Limitation headers" :

<pre class="language-ini"><code class="language-ini">X-RateLimit-Limit : 500 # Number of requests authorized for a period
X-RateLimit-Remaining : 289 # Number of remaining requests authorized for the current period
X-RateLimit-Reset : 123456789 # When the period will reset
</code></pre>

## Example

* Create a Rate Limiter which counts
    * IP Addresses
    * On a 1 minute period
    * With a unique limit : 10 calls
    * With a RateLimitationHandler (to return the "Rate limitationHeaders")

<pre class="language-java"><code class="language-java">// Add a periodic rule with a period of 1 minute (60 seconds) and a IPCountingPolicy (to count the clients IP addresses)
FirewallCounterRule rule = new PeriodicFirewallCounterRule(60, TimeUnit.SECONDS, new IpCountingPolicy());

// Attach an RateLimitationHandler (with a UniqueLimitPolicy) to the FirewallRule
rule.addHandler(new RateLimitationHandler(new UniqueLimitPolicy(10));

// Attach the rule
firewallConfig.addCounter(rule);
</code></pre>
