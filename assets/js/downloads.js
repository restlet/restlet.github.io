function downloadIIFE (versions, baseUrl) {

  function getUrl (branch, release, edition) {
    var excludeEdition = branch === '1.0' || branch === '1.1' || branch === '1.2';
    var editionFragment = excludeEdition ? '' : edition  + '-';
    return baseUrl + branch + '/restlet-' + editionFragment + release + '.zip';
  }

  function getReleases (branch) {
    return versions[ branch ].releases;
  }

  function createSelectOption (releaseKey, release) {
    var option = document.createElement("option");
    option.value = releaseKey;
    option.text = release.name;
    return option;
  }

  var branchSelect = document.querySelector('#id_branch');
  var releaseSelect = document.querySelector('#id_release');
  var editionSelect = document.querySelector('#id_edition');

  function populateReleases (releases) {
    while (releaseSelect.firstChild) { // Purge existing values
      releaseSelect.firstChild.remove();
    }

    Object.keys(releases).forEach(function (key) {
      var release = releases[ key ];
      releaseSelect.add(createSelectOption(key, release));
    });
  }

  // Replace placeholder releases (there in case js is disabled)
  var currentReleases = getReleases(branchSelect.value);
  populateReleases(currentReleases);

  branchSelect.addEventListener('change', function changeBranch (event) {
    var releases = getReleases(event.target.value);

    populateReleases(releases);

    // Set release date
    var releaseDateElement = document.querySelector('#download_date');
    var currentReleaseKey = releaseSelect.firstChild.value;
    releaseDateElement.innerText = releases[ currentReleaseKey ].release_date;

    // Set links
    var changeLogLink = document.querySelector('#change_log_link');
    changeLogLink.href = '/documentation/' + event.target.value + '/changelog';

    var changeLogBranch = document.querySelector('.download_name');
    changeLogBranch.innerText = event.target.value;
  });

  releaseSelect.addEventListener('change', function changeRelease (event) {
    var currentBranch = branchSelect.value;
    var releaseDateElement = document.querySelector('#download_date');
    var currentReleaseKey = event.target.value;
    releaseDateElement.innerText = getReleases(currentBranch)[ currentReleaseKey ].release_date;
  });

  var releaseIndex = releaseSelect.value;
  var releaseId = getReleases(branchSelect.value)[ releaseIndex ][ 'id' ];
  window.location = getUrl(branchSelect.value, releaseId, editionSelect.value);
};