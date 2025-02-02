---
title: Sample
long-title: Sample application
parent: Android
section: guide-editions
version: '2.6'
nav_order: 1
---
# Introduction

This sample application aims at illustrating the port of the Restlet API
on the Google Android platform.

# Architecture

The developed application uses the software architecture illustrated
below. On the upper left side, you have an enhanced Android contacts
application that can recognize the friends of your contacts. For this,
you need to enter the URI of the FOAF profile of your contacts in the
"Note" field. In the future, a specific "FOAF" field will be added and
this URI could also be guessed or provided via alternative means.

This FOAF URI entered can be either local (our case for testing reasons
and to illustrate server-side Restlet support) or remote to use your
mobile Web access if available. When run, the enhanced contacts
applications lists the current contacts registered in the address book.
For those who provide a FOAF URI, a click on their entry in the list
invokes the FOAF service illustrated below. This service is built on top
of Restlet and its recently added [RDF
extension](../../extensions/rdf).
It retrieves the FOAF representation, parses it and displays the friends
of your contact in the GUI. The user can then add some of those friends
as new local contacts.

For testing purpose, we run a local HTTP server with Restlet that can
server FOAF profiles (in the RDF/N-Triples media type) at those URIs:

-   http://localhost/users/1
-   http://localhost/users/2

# Screenshots

List of currently registered contacts in the Android's address book

List of friends of the selected contact

A new contact has been added

# Implementation

## "FOAF" Service

### Declaration of the service (AndroidManifest.xml):

<pre class="language-markup"><code class="language-markup">&lt;service android:name=&quot;.service.ContactService&quot; android:exported=&quot;true&quot; android:enabled=&quot;true&quot;&gt;
&nbsp;&nbsp;&nbsp; &lt;intent-filter&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;action android:name=&quot;org.restlet.example.android.service.IContactService&quot; /&gt;
&nbsp;&nbsp;&nbsp; &lt;/intent-filter&gt;
&lt;/service&gt;
</code></pre>

### Declaration of the IPC (inter process communication) interface (org/restlet/example/android/service/IContactService.aidl)

<pre class="language-java"><code class="language-java">package org.restlet.example.android.service;

    interface IContactService {
        List&lt;FoafContact&gt; getFriends(String foafUri);
}
</code></pre>

### Implementation of the FoafContact class

This class, referenced in the IPC interface description file, must
implement the Parcelable java interface.

<pre class="language-java"><code class="language-java">public class FoafContact implements Parcelable {
    /**
     * Used to de-serialize a stream into a FoafContact.
     */
    public static final Parcelable.Creator&lt;FoafContact&gt; CREATOR = new Parcelable.Creator&lt;FoafContact&gt;() {
        public FoafContact createFromParcel(Parcel in) {
            return new FoafContact(in);
        }

        public FoafContact[] newArray(int size) {
            return new FoafContact[size];
        }
    };

    /** First name of the contact. */
    private String firstName;

    /** FOAF URI of the contact. */
    private String foafUri;

    /** Image representation of the contact. */
    private String image;

    /** Last name of the user. */
    private String lastName;

    /** Phone number of the user. */
    private String phone;

    public FoafContact() {
        super();
    }

    private FoafContact(Parcel in) {
        super();
        firstName = in.readString();
        lastName = in.readString();
        phone = in.readString();
    }

    public int describeContents() {
        return 0;
    }

    [ getters/setters ]
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(firstName);
        dest.writeString(lastName);
        dest.writeString(phone);
    }
}
</code></pre>

### Implementation of the service (org.restlet.example.android.ContactService)

Basically, the service consists in getting the FOAF profile according to
its URI, then parsing this RDF document (in this case, it is generated
in N-Triples format), and retrieving the list of friends declared in
this FOAF profile.

<pre class="language-java"><code class="language-java">ClientResource foafProfile = new ClientResource(foafUri);
Representation rep = foafProfile.get();
if (foafProfile.getStatus().isSuccess()) {
    FoafRepresentation foafRep = new FoafRepresentation(rep);
    return foafRep.getFriends();
}
</code></pre>

## Contact activity

This activity is in charge to display the list of friends of a contact
(assuming it has a correct foaf URI, in the "Note" field of the address
book). It calls the "FOAF" service.

### Declaration of the activity (AndroidManifest.xml)

<pre class="language-markup"><code class="language-markup">&lt;activity android:name=&quot;.ContactActivity&quot; android:label=&quot;@string/contact&quot;&gt;
    &lt;intent-filter&gt;
    &lt;category android:name=&quot;android.intent.category.DEFAULT&quot; /&gt;
    &lt;action android:name=&quot;org.restlet.android.example.CONTACT_DETAIL&quot; /&gt;
    &lt;/intent-filter&gt;
&lt;/activity&gt;
</code></pre>

### Declaration of its layout (res/layout/contact.xml)

<pre class="language-markup"><code class="language-markup">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    android:orientation=&quot;vertical&quot; android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;fill_parent&quot;&gt;
    &lt;ListView android:id=&quot;@android:id/list&quot; android:layout_width=&quot;fill_parent&quot;
        android:layout_height=&quot;fill_parent&quot; android:layout_weight=&quot;1&quot;
            android:drawSelectorOnTop=&quot;false&quot; style=&quot;@style/contacts_list&quot; /&gt;
    &lt;TextView android:id=&quot;@+id/empty&quot; android:layout_width=&quot;fill_parent&quot;
            android:layout_height=&quot;fill_parent&quot; style=&quot;@style/empty&quot; android:text=&quot;&quot; /&gt;
    &lt;ImageView android:id=&quot;@+id/imagefoaf&quot; android:src=&quot;@drawable/restletandroid&quot;
        android:layout_width=&quot;fill_parent&quot; android:layout_height=&quot;wrap_content&quot;
            android:adjustViewBounds=&quot;true&quot; /&gt;
&lt;/LinearLayout&gt;
</code></pre>

### Implementation (org.restlet.example.android.ContactActivity)

Connection to the remote service. Refreshes the list of friends of the
current contact.

<pre class="language-java"><code class="language-java">private ServiceConnection connection = new ServiceConnection() {
    public void onServiceConnected(ComponentName name, IBinder service) {
        contactService = IContactService.Stub.asInterface(service);
        // Once connected, then update the interface
        loadFriends();
            }
    public void onServiceDisconnected(ComponentName name) {
        contactService = null;
    }
};
</code></pre>

Load the list of friends of the current contact, from its foaf profile.
It simply calls the contactService method "getFriends(String)".

<pre class="language-java"><code class="language-java">private void loadFriends() {
    if (contactService != null) {
        try {
            List&lt;FoafContact&gt; list = contactService.getFriends(this.contact.getFoafUri());
            this.friends = new ArrayList&lt;Contact&gt;();
            for (int i = 0; i &lt; list.size(); i++) {
                Contact contact = new Contact();
                contact.setFirstName(list.get(i).getFirstName());
                contact.setLastName(list.get(i).getLastName());
                        contact.setPhone(list.get(i).getPhone());
                friends.add(contact);
            }
        } catch (RemoteException e) {
            Log.e("contactFoaf", "error", e);
        }
    }
    handler.sendEmptyMessage(0);
}
</code></pre>

Used to unbind the service.

<pre class="language-java"><code class="language-java">@Override
protected void onPause() {
    super.onPause();
    if (contactService != null) {
        this.unbindService(connection);
    }
}
</code></pre>

Used to bind the service, when the activity starts.

<pre class="language-java"><code class="language-java">@Override
protected void onStart() {
    super.onStart();
    if (contactService == null) {
        bindService(new Intent(
                "org.restlet.example.android.service.IContactService"),
                connection, Context.BIND_AUTO_CREATE);
    }
}
</code></pre>
