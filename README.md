# [Restlet Framework website](https://restlet.talend.com/)

Here is the home of the [Restlet Framework website](https://restlet.talend.com/). It contains the home page, documentation and tutorials.

## Technical documentation

### Running the project locally

- install ruby according to the requirements [here](https://jekyllrb.com/docs/)
- run `bundle install`
- run `bundle exec jekyll serve` and go to http://127.0.0.1:4000/

NB: to iterate faster you can add the `--incremental` flag but it doesn't work for every kind of change so when in doubt do a regular build

NB2: even with incremental the build can be very long especially if you modify content that is included in every page as it has to regenerate everything, you can divide it by 3 by removing the mobile nav menu which is very expensive (comment the `{% include documentation/mobile-nav.html %}` in `_includes/documentation/contentView.html`)
You can further reduce it by deleting parts of the doc or versions you are not working on.

### New major version checklist

- in `/documentation/` 
  - [ ] make a copy of the most recent version directory (ex /documentation/2.3) and edit the inner file (changelog) as needed (don't forget the title)
  
- in `/documentation/javadoc`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.3'` where 2.3 is the old version and change the version
  
- in `/documentation/tutorials`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.3'` where 2.3 is the old version and change the version
  
- in `/documentation/user-guide`
  - [ ] copy the most recent version directory
  - [ ] do a search and replace of `version: '2.3'` where 2.3 is the old version and change the version
  - [ ] do a search and replace of `redirect_to: /documentation/user-guide/2.3/`where 2.3 is the old version and change the version
  - [ ] Add what's new for appropriate version in `documentation/user-guide/2.4/introduction/whats-new/`
  - [ ] Change default what's new url in the `redirect_to` of file `documentation/user-guide/2.4/introduction/whats-new/index.md`
  - [ ] at the root index.md (`/documentation/user-guide/2.4/index.md`): update the title to reflect the new version 

- in `/documentation/schemas/`
  - copy the most recent version directory
  
- in `/_data/downloads.yml`
 - [ ] change `currentVersion`
 - [ ] add the version/release you created in `versions`
 
- [ ] in `_config.yml`, change the `default_doc_version`

