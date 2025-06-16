# [Restlet Framework website](https://restlet.talend.com/)

Here is the home of the [Restlet Framework website](https://restlet.talend.com/). It contains the home page, documentation and tutorials.

## Technical documentation

### Running the project locally

- Using Docker and a powerfull machine:

```
cd /path/to/restlet.github.io
docker run --rm --volume="$PWD:/srv/jekyll:Z" --publish 4000:4000 jekyll/jekyll jekyll serve
```

- If you think you can easily install ruby and so on:
  - install ruby according to the requirements [here](https://jekyllrb.com/docs/)
  - run `bundle install`
  - run `bundle exec jekyll serve` and go to http://127.0.0.1:4000/

NB: to iterate faster you can add the `--incremental` flag, but it doesn't work for every kind of change so when in doubt do a regular build.

NB2: even with incremental the build can be very long especially if you modify content that is included in every page as it has to regenerate everything, you can divide it by 3 by removing the mobile nav menu which is very expensive (comment the `{% include documentation/mobile-nav.html %}` in `_includes/documentation/contentView.html`)
You can further reduce it by deleting parts of the doc or versions you are not working on.

### New major/minor version checklist

- in `/documentation/` 
  - [ ] make a copy of the most recent version directory (ex /documentation/2.5) and edit the inner file (changelog) as needed (remember the title)
  
- in `/documentation/javadoc`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.5'` where 2.5 is the old version and change the version
  
- in `/documentation/tutorials`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.5'` where 2.5 is the old version and change the version
  
- in `/documentation/user-guide`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.5'` where 2.5 is the old version and change the version
  - [ ] do a search and replace of `redirect_to: /documentation/user-guide/2.5/`where 2.5 is the old version and change the version
  - [ ] Add what's new for the appropriate version in `documentation/user-guide/2.6/introduction/whats-new/`
  - [ ] Change default what's new url in the `redirect_to` of file `documentation/user-guide/2.6/introduction/whats-new/index.md`
  - [ ] at the root index.md (`/documentation/user-guide/2.6/index.md`): update the title to reflect the new version 

- in `/_data/versions.yml`
 - [ ] change `currentVersion`
 
- [ ] in `_config.yml`, change the `default_doc_version`

### New patch version checklist

- in `/_data/versions.yml`
- [ ] change `latestVersion`
